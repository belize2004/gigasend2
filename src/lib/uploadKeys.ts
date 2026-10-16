export function createUploadKey(fileName: string, planPrefix: string) {
  const extIndex = fileName.lastIndexOf(".");
  const baseName = extIndex >= 0 ? fileName.substring(0, extIndex) : fileName;
  const extension = extIndex >= 0 ? fileName.substring(extIndex) : "";
  const randomEntropy = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const uniqueKey = `${baseName}-${Date.now()}-${randomEntropy}${extension}`;

  return `${planPrefix}/${uniqueKey}`;
}
