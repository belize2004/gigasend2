import type { APIRoute } from "astro";
import {
  findShareById,
  findUserById,
  getDb,
  markShareDownloadNotified,
  type RuntimeLocals,
} from "@/lib/d1";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { configure, ZipWriter } from "@zip.js/zip.js";
import {
  generateDownloadNotificationEmail,
  generateDownloadNotificationText,
  sendEmailViaCloudflare,
} from "@/lib/email";
import { captureMonitoringException } from "@/lib/monitoring";
import { brand } from "@/lib/brand";
import { formatBytes } from "@/lib/utils";

const DOWNLOAD_ORIGIN = brand.downloadOrigin;
const ZIP_DOWNLOAD_MAX_BYTES = 2 * 1024 * 1024 * 1024;
const ZIP_DOWNLOAD_MAX_FILES = 25;
const LARGE_TRANSFER_ZIP_PART_COUNT = 5;

configure({
  maxWorkers: 1,
  useCompressionStream: false,
  useWebWorkers: false,
});

function parseFileKeys(fileKey: string) {
  try {
    const parsed = JSON.parse(fileKey);
    if (Array.isArray(parsed) && parsed.every((key) => typeof key === "string")) {
      return parsed;
    }
  } catch {
    // Older transfers store a single R2 key directly.
  }

  return [fileKey];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getDownloadUrl(fileKey: string) {
  return `${DOWNLOAD_ORIGIN}/${fileKey.split("/").map(encodeURIComponent).join("/")}`;
}

function getFileName(fileKey: string) {
  const keyName = fileKey.split("/").pop() ?? "download";
  return keyName.replace(/-\d{13}-[a-zA-Z0-9]+(?=\.[^.]+$|$)/, "");
}

function renderDownloadPage(input: {
  downloadUrl?: string;
  expiresAt: string;
  fileKeys: string[];
  shareId: string;
  zipAvailable: boolean;
  fileSize?: number;
}) {
  const safeDownloadUrl = input.downloadUrl ? escapeHtml(input.downloadUrl) : "";
  const isSingle = input.fileKeys.length === 1;
  const zipBatches = getZipBatches(input.fileKeys);

  const batchLinks = zipBatches.map((batch, index) => {
    const href = escapeHtml(`/download/${input.shareId}?zip=1&batch=${index}`);
    return `<li><a href="${href}" download>Download ZIP part ${index + 1} of ${zipBatches.length} <span>${batch.length} files</span></a></li>`;
  }).join("");

  const directDownloadLinks = input.fileKeys.map((fileKey, index) => {
    const fileName = escapeHtml(getFileName(fileKey));
    const href = escapeHtml(isSingle ? `/download/${input.shareId}?download=1` : `/download/${input.shareId}?file=${index}`);
    return `<li><a href="${href}" download>${fileName}</a></li>`;
  }).join("");

  const intro = isSingle
    ? `Your file is ready to download.`
    : input.zipAvailable
      ? `This transfer includes ${input.fileKeys.length} files. ${brand.productName} can package them into one ZIP download for you, or you can download files individually.`
      : `This transfer is too large to package into one ZIP. Download it in ${zipBatches.length} ZIP parts below.`;

  const primaryButtonLabel = isSingle
    ? `Download File ${input.fileSize ? `(${formatBytes(input.fileSize)})` : ""}`
    : "Download ZIP";

  const primaryButton = safeDownloadUrl
    ? `<a class="button" href="${safeDownloadUrl}" download>${primaryButtonLabel}</a>`
    : "";

  const batchSection = (input.zipAvailable || isSingle) ? "" : `
      <section>
        <h2>ZIP parts</h2>
        <ul class="files">${batchLinks}</ul>
      </section>`;

  const directSection = isSingle ? `
      <section>
        <h2>File details</h2>
        <ul class="files">${directDownloadLinks}</ul>
      </section>` : input.zipAvailable ? `
      <section>
        <h2>Individual files</h2>
        <ul class="files">${directDownloadLinks}</ul>
      </section>` : `
      <details>
        <summary>Show individual file links</summary>
        <ul class="files">${directDownloadLinks}</ul>
      </details>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Download Files | ${brand.productName}</title>
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111827; background: #f5f8fc; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 32px 16px; }
      main { width: min(760px, 100%); background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12); padding: clamp(24px, 4vw, 40px); }
      .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 26px; margin-bottom: 28px; }
      .icon { width: 32px; height: 32px; border-radius: 7px; display: grid; place-items: center; color: #fff; background: linear-gradient(135deg, #2563eb, #a855f7); }
      h1 { margin: 0 0 8px; font-size: clamp(28px, 5vw, 42px); letter-spacing: 0; }
      p { margin: 0 0 24px; color: #4b5563; line-height: 1.55; }
      h2 { margin: 28px 0 12px; font-size: 18px; }
      .button { display: inline-flex; align-items: center; justify-content: center; min-height: 54px; padding: 0 28px; border-radius: 8px; background: linear-gradient(135deg, #2563eb, #a855f7); color: #fff; font-weight: 800; text-decoration: none; box-shadow: 0 16px 30px rgba(37, 99, 235, 0.24); }
      .button:hover { filter: brightness(0.96); }
      .files { list-style: none; margin: 28px 0 0; padding: 0; display: grid; gap: 10px; max-height: min(52vh, 520px); overflow: auto; }
      h2 + .files { margin-top: 0; }
      .files a { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 16px; border: 1px solid #e5e7eb; border-radius: 8px; color: #1d4ed8; background: #f8fafc; text-decoration: none; overflow-wrap: anywhere; }
      .files span { color: #6b7280; font-size: 13px; white-space: nowrap; }
      .files a:hover { background: #eef4ff; border-color: #bfdbfe; }
      details { margin-top: 24px; }
      summary { cursor: pointer; color: #1d4ed8; font-weight: 700; }
      .footer-bar { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #6b7280; flex-wrap: wrap; gap: 12px; }
      .report-link { color: #9ca3af; text-decoration: none; }
      .report-link:hover { color: #ef4444; text-decoration: underline; }
    </style>
  </head>
  <body>
    <main>
      <div class="brand"><span class="icon">↑</span><span>${brand.productName}</span></div>
      <h1>${isSingle ? "Your file is ready" : "Your files are ready"}</h1>
      <p>${intro}</p>
      ${primaryButton}
      ${batchSection}
      ${directSection}
      <div class="footer-bar">
        <span>Available until ${escapeHtml(new Date(input.expiresAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }))}</span>
        <a class="report-link" href="mailto:${brand.contactEmail}?subject=Report%20Abuse%20-%20Transfer%20${input.shareId}" target="_blank" rel="noopener noreferrer">Report Abuse / Phishing</a>
      </div>
    </main>
  </body>
</html>`;
}

function getZipBatches(fileKeys: string[]) {
  const batches: string[][] = [];
  const filesPerBatch = Math.ceil(fileKeys.length / LARGE_TRANSFER_ZIP_PART_COUNT);

  for (let index = 0; index < fileKeys.length; index += filesPerBatch) {
    batches.push(fileKeys.slice(index, index + filesPerBatch));
  }

  return batches;
}

type R2BucketBinding = {
  get: (key: string) => Promise<{ body: ReadableStream<Uint8Array> | null } | null>;
};

async function streamZip(fileKeys: string[], bucket?: R2BucketBinding) {
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const zipWriter = new ZipWriter(writable);

  (async () => {
    try {
      const usedFileNames = new Map<string, number>();
      for (const fileKey of fileKeys) {
        const readable = bucket
          ? await getR2BindingStream(bucket, fileKey)
          : await getS3ObjectStream(fileKey);
        if (!readable) throw new Error(`Unable to read ${fileKey}`);

        const fileName = getUniqueFileName(getFileName(fileKey), usedFileNames);
        await zipWriter.add(fileName, readable, {
          level: 0,
          useCompressionStream: false,
          useWebWorkers: false,
        });
      }
    } catch (error) {
      console.error("Failed to stream download ZIP:", error);
    } finally {
      await zipWriter.close().catch((error) => {
        console.error("Failed to close download ZIP:", error);
      });
    }
  })();

  return readable;
}

async function getR2BindingStream(bucket: R2BucketBinding, fileKey: string) {
  const object = await bucket.get(fileKey);
  return object?.body ?? null;
}

async function getS3ObjectStream(fileKey: string) {
  const object = await r2Client.send(new GetObjectCommand({
    Bucket: r2BucketName,
    Key: fileKey,
  }));

  return toReadableStream(object.Body);
}

function toReadableStream(body: unknown): ReadableStream<Uint8Array> | null {
  if (!body) return null;
  if (body instanceof ReadableStream) return body as ReadableStream<Uint8Array>;

  if (typeof body === "object" && body !== null) {
    const candidate = body as {
      transformToWebStream?: () => ReadableStream<Uint8Array>;
      transformToByteArray?: () => Promise<Uint8Array>;
      arrayBuffer?: () => Promise<ArrayBuffer>;
      [Symbol.asyncIterator]?: () => AsyncIterator<Uint8Array>;
    };

    if (typeof candidate.transformToWebStream === "function") {
      return candidate.transformToWebStream();
    }

    if (typeof candidate.transformToByteArray === "function") {
      return new ReadableStream<Uint8Array>({
        async start(controller) {
          controller.enqueue(await candidate.transformToByteArray!());
          controller.close();
        },
      });
    }

    if (typeof candidate.arrayBuffer === "function") {
      return new ReadableStream<Uint8Array>({
        async start(controller) {
          controller.enqueue(new Uint8Array(await candidate.arrayBuffer!()));
          controller.close();
        },
      });
    }

    const getAsyncIterator = candidate[Symbol.asyncIterator];
    if (typeof getAsyncIterator === "function") {
      const iterator = getAsyncIterator.call(candidate);
      return new ReadableStream<Uint8Array>({
        async pull(controller) {
          const next = await iterator.next();
          if (next.done) {
            controller.close();
          } else {
            controller.enqueue(next.value);
          }
        },
      });
    }
  }

  return null;
}

function getUniqueFileName(fileName: string, usedFileNames: Map<string, number>) {
  const currentCount = usedFileNames.get(fileName) ?? 0;
  usedFileNames.set(fileName, currentCount + 1);

  if (currentCount === 0) return fileName;

  const extIndex = fileName.lastIndexOf(".");
  if (extIndex <= 0) return `${fileName} (${currentCount + 1})`;

  return `${fileName.slice(0, extIndex)} (${currentCount + 1})${fileName.slice(extIndex)}`;
}

function buildContentDisposition(rawFileName: string): string {
  const asciiFallback = String(rawFileName || "download")
    .replace(/[^\x20-\x7E]/g, "_")
    .replace(/["\\]/g, "_");
  const encoded = encodeURIComponent(rawFileName || "download");
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
}

async function sendDownloadNotification({
  db,
  fileCount,
  share,
  emailBinding,
}: {
  db: ReturnType<typeof getDb>;
  fileCount: number;
  share: NonNullable<Awaited<ReturnType<typeof findShareById>>>;
  emailBinding?: any;
}) {
  try {
    if (!share.userId || share.userId.startsWith("guest_")) return;

    const sender = await findUserById(db, share.userId);
    if (!sender || !sender.email || sender.email.endsWith("@guest.gigasend.us")) return;

    const shouldNotify = await markShareDownloadNotified(db, share.id);
    if (!shouldNotify) return;

    const deliveryLabel = share.email === "__share_link__"
      ? "Shareable link"
      : `Sent to ${share.email}`;

    await sendEmailViaCloudflare(emailBinding, {
      from: brand.emailFrom,
      to: sender.email,
      subject: `Your ${brand.productName} transfer was downloaded`,
      html: generateDownloadNotificationEmail({
        deliveryLabel,
        fileSize: share.size,
        link: share.link,
        numberOfFiles: fileCount,
      }),
      text: generateDownloadNotificationText({
        deliveryLabel,
        fileSize: share.size,
        link: share.link,
        numberOfFiles: fileCount,
      }),
      headers: {
        "X-Entity-Ref-ID": `${share.id}-download-notification`,
      },
    });
  } catch (error) {
    console.error("Failed to send download notification:", error);
    captureMonitoringException(error, {
      user: { id: share.userId },
      tags: { feature: "email", route: "download", notification: "download" },
      context: {
        shareId: share.id,
        fileCount,
        fileSize: share.size,
      },
    });
  }
}

export const GET: APIRoute = async ({ params, locals, url }) => {
  const id = params.id;
  if (!id) {
    return new Response("Missing download id", { status: 400 });
  }

  try {
    const db = getDb(locals);
    const emailBinding = (locals as any)?.runtime?.env?.EMAIL;
    const share = await findShareById(db, id);
    if (!share || !share.fileKey) {
      return new Response("Download not found", { status: 404 });
    }

    if (new Date(share.expiresAt) <= new Date()) {
      return new Response("Download link expired", { status: 410 });
    }

    const fileKeys = parseFileKeys(share.fileKey);
    const bucket = (locals as RuntimeLocals).runtime?.env?.FILES;
    const isDirectDownload = url.searchParams.get("download") === "1";
    const requestedFileIndex = url.searchParams.get("file");

    // 1. Single file direct download requested
    if (fileKeys.length === 1 && isDirectDownload) {
      await sendDownloadNotification({ db, fileCount: fileKeys.length, share, emailBinding });
      const fileKey = fileKeys[0];
      const rawFileName = getFileName(fileKey);
      if (bucket) {
        const obj = await bucket.get(fileKey);
        if (obj && obj.body) {
          const headers = new Headers();
          (obj as any).writeHttpMetadata?.(headers);
          headers.set("Content-Type", "application/octet-stream");
          headers.set("Content-Disposition", buildContentDisposition(rawFileName));
          if (typeof obj.size === "number" && obj.size >= 0) {
            headers.set("Content-Length", String(obj.size));
          }
          headers.set("X-Content-Type-Options", "nosniff");
          headers.set("Cache-Control", "private, no-store");
          return new Response(obj.body, { headers });
        }
      }
      return Response.redirect(getDownloadUrl(fileKey), 302);
    }

    // 2. Multi-file specific file download requested
    if (requestedFileIndex !== null) {
      const fileIndex = parseInt(requestedFileIndex, 10);
      if (!isNaN(fileIndex) && fileKeys[fileIndex]) {
        const fileKey = fileKeys[fileIndex];
        const rawFileName = getFileName(fileKey);
        await sendDownloadNotification({ db, fileCount: fileKeys.length, share, emailBinding });
        if (bucket) {
          const obj = await bucket.get(fileKey);
          if (obj && obj.body) {
            const headers = new Headers();
            (obj as any).writeHttpMetadata?.(headers);
            headers.set("Content-Type", "application/octet-stream");
            headers.set("Content-Disposition", buildContentDisposition(rawFileName));
            if (typeof obj.size === "number" && obj.size >= 0) {
              headers.set("Content-Length", String(obj.size));
            }
            headers.set("X-Content-Type-Options", "nosniff");
            headers.set("Cache-Control", "private, no-store");
            return new Response(obj.body, { headers });
          }
        }
        return Response.redirect(getDownloadUrl(fileKey), 302);
      }
    }

    // 3. Multi-file ZIP download requested
    const zipAvailable = share.size <= ZIP_DOWNLOAD_MAX_BYTES && fileKeys.length <= ZIP_DOWNLOAD_MAX_FILES;
    if (url.searchParams.get("zip") === "1") {
      const requestedBatch = url.searchParams.get("batch");
      const batches = getZipBatches(fileKeys);
      const batchIndex = requestedBatch == null ? null : Number(requestedBatch);
      const batchFileKeys = batchIndex == null
        ? fileKeys
        : batches[batchIndex];

      if (!zipAvailable && (batchIndex == null || Number.isNaN(batchIndex) || !batchFileKeys)) {
        return Response.redirect(`/download/${share.id}`, 302);
      }

      await sendDownloadNotification({ db, fileCount: fileKeys.length, share, emailBinding });
      return new Response(await streamZip(batchFileKeys, bucket), {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": buildContentDisposition(
            `${brand.zipFilenamePrefix}-${share.id}${batchIndex == null ? "" : `-part-${batchIndex + 1}-of-${batches.length}`}.zip`
          ),
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "private, no-store",
        },
      });
    }

    // 4. Default: Render Download Landing Page
    return new Response(renderDownloadPage({
      downloadUrl: fileKeys.length === 1 ? `/download/${share.id}?download=1` : (zipAvailable ? `/download/${share.id}?zip=1` : undefined),
      expiresAt: share.expiresAt,
      fileKeys,
      shareId: share.id,
      zipAvailable,
      fileSize: share.size,
    }), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error serving download:", error);
    captureMonitoringException(error, {
      tags: { feature: "download", route: "download/[id]" },
      context: { shareId: id },
    });
    return new Response("Unable to process download right now. Please try again in a moment.", {
      status: 500,
    });
  }
};

