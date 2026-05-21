export function createUploadKey(fileName: string, planPrefix: string) {
  const extIndex = fileName.lastIndexOf(".");
  const baseName = extIndex >= 0 ? fileName.substring(0, extIndex) : fileName;
  const extension = extIndex >= 0 ? fileName.substring(extIndex) : "";
  const uniqueKey = `${baseName}-${Date.now()}-${Math.floor(Math.random() * 1e6)}${extension}`;

  return `${planPrefix}/${uniqueKey}`;
}
