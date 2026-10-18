export function createUploadKey(fileName: string, planPrefix: string) {
  const leafName = String(fileName || "file")
    .split(/[/\\]/)
    .pop()
    ?.replace(/[\x00-\x1F\x7F]/g, "")
    .trim() || "file";
  const extIndex = leafName.lastIndexOf(".");
  const baseName = extIndex > 0 ? leafName.substring(0, extIndex) : leafName;
  const extension = extIndex > 0 ? leafName.substring(extIndex) : "";
  const randomEntropy = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const uniqueKey = `${baseName}-${Date.now()}-${randomEntropy}${extension}`;

  return `${planPrefix}/${uniqueKey}`;
}

