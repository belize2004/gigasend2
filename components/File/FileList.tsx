import React from "react";
import { useFileContext } from "@/context/FileContext";
import FileDisplayItem from "./FileIcon";

export const FileList = () => {
  const { files, setFiles } = useFileContext();

  const handleRemoveFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== id));
  };

  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-1">
      {files.map((file, index) => (
        <FileDisplayItem
          key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
          file={file}
          onRemove={handleRemoveFile}
        />
      ))}
    </div>
  );
};

export default FileList;