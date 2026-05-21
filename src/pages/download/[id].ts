import type { APIRoute } from "astro";
import { findShareById, getDb, type RuntimeLocals } from "@/lib/d1";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { configure, ZipWriter } from "@zip.js/zip.js";

const DOWNLOAD_ORIGIN = "https://download.gigasend.us";
const ZIP_DOWNLOAD_MAX_BYTES = 2 * 1024 * 1024 * 1024;
const ZIP_DOWNLOAD_MAX_FILES = 25;

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
  return keyName.replace(/-\d{13}-\d{1,6}(?=\.[^.]+$|$)/, "");
}

function renderDownloadPage(input: {
  downloadUrl?: string;
  expiresAt: string;
  fileKeys: string[];
  zipAvailable: boolean;
}) {
  const safeDownloadUrl = input.downloadUrl ? escapeHtml(input.downloadUrl) : "";
  const downloadLinks = input.fileKeys.map((fileKey) => {
    const fileName = escapeHtml(getFileName(fileKey));
    const href = escapeHtml(getDownloadUrl(fileKey));
    return `<li><a href="${href}" download>${fileName}</a></li>`;
  }).join("");
  const intro = input.zipAvailable
    ? `This transfer includes ${input.fileKeys.length} files. GigaSend can package them into one ZIP download for you, or you can download files individually.`
    : `This transfer is too large to package into one ZIP in the browser. Download the files individually below.`;
  const primaryButton = input.zipAvailable && safeDownloadUrl
    ? `<a class="button" href="${safeDownloadUrl}">Download ZIP</a>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Download Files | GigaSend</title>
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111827; background: #f5f8fc; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 32px 16px; }
      main { width: min(760px, 100%); background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12); padding: clamp(24px, 4vw, 40px); }
      .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 26px; margin-bottom: 28px; }
      .icon { width: 32px; height: 32px; border-radius: 7px; display: grid; place-items: center; color: #fff; background: linear-gradient(135deg, #2563eb, #a855f7); }
      h1 { margin: 0 0 8px; font-size: clamp(28px, 5vw, 42px); letter-spacing: 0; }
      p { margin: 0 0 24px; color: #4b5563; line-height: 1.55; }
      .button { display: inline-flex; align-items: center; justify-content: center; min-height: 54px; padding: 0 28px; border-radius: 8px; background: linear-gradient(135deg, #2563eb, #a855f7); color: #fff; font-weight: 800; text-decoration: none; box-shadow: 0 16px 30px rgba(37, 99, 235, 0.24); }
      .button:hover { filter: brightness(0.96); }
      .files { list-style: none; margin: 28px 0 0; padding: 0; display: grid; gap: 10px; max-height: min(52vh, 520px); overflow: auto; }
      .files a { display: block; padding: 14px 16px; border: 1px solid #e5e7eb; border-radius: 8px; color: #1d4ed8; background: #f8fafc; text-decoration: none; overflow-wrap: anywhere; }
      .files a:hover { background: #eef4ff; border-color: #bfdbfe; }
      .expires { margin-top: 20px; font-size: 14px; color: #6b7280; }
    </style>
  </head>
  <body>
    <main>
      <div class="brand"><span class="icon">↑</span><span>GigaSend</span></div>
      <h1>Your files are ready</h1>
      <p>${intro}</p>
      ${primaryButton}
      <ul class="files">${downloadLinks}</ul>
      <div class="expires">Available until ${escapeHtml(new Date(input.expiresAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }))}</div>
    </main>
  </body>
</html>`;
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

export const GET: APIRoute = async ({ params, locals, url }) => {
  const id = params.id;
  if (!id) {
    return new Response("Missing download id", { status: 400 });
  }

  const db = getDb(locals);
  const share = await findShareById(db, id);
  if (!share || !share.fileKey) {
    return new Response("Download not found", { status: 404 });
  }

  if (new Date(share.expiresAt) <= new Date()) {
    return new Response("Download link expired", { status: 410 });
  }

  const fileKeys = parseFileKeys(share.fileKey);
  if (fileKeys.length === 1) {
    return Response.redirect(getDownloadUrl(fileKeys[0]), 302);
  }

  const zipAvailable = share.size <= ZIP_DOWNLOAD_MAX_BYTES && fileKeys.length <= ZIP_DOWNLOAD_MAX_FILES;
  if (url.searchParams.get("zip") === "1") {
    if (!zipAvailable) {
      return Response.redirect(`/download/${share.id}`, 302);
    }

    const bucket = (locals as RuntimeLocals).runtime?.env?.FILES;
    return new Response(await streamZip(fileKeys, bucket), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="gigasend-${share.id}.zip"`,
        "Cache-Control": "private, no-store",
      },
    });
  }

  return new Response(renderDownloadPage({
    downloadUrl: `/download/${share.id}?zip=1`,
    expiresAt: share.expiresAt,
    fileKeys,
    zipAvailable,
  }), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
};
