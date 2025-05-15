import JSZip from "jszip";

export const zipFiles = async (files: FileList | File[]): Promise<Blob> => {
  const zip = new JSZip();
  Array.from(files).forEach((file) => {
    zip.file(file.name, file);
  });
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
};
