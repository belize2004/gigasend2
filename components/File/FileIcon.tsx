import React from "react";
import { FiX } from "react-icons/fi";
import { fileTypeColor } from "./fileTypeColors";
import Image from '@/components/compat/Image';

interface FileProps {
  name: string;
  size: number;
  type: string;
}

interface FileDisplayItemProps {
  file: FileProps;
  onRemove: (id: string) => void;
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const FileDisplayItem: React.FC<FileDisplayItemProps> = ({
  file,
  onRemove,
}) => {
  const nameExt = file.name.includes(".")
    ? file.name.split(".").pop()?.toLowerCase() || ""
    : "";
  const mimeExt = file.type.includes("/")
    ? file.type.split("/").pop()?.split("+")[0]?.toLowerCase() || ""
    : "";
  const finalExtension = nameExt || mimeExt || "file";
  const fileColor = fileTypeColor[finalExtension] || "#f7bc6a";

  return (
    <div className="flex flex-row justify-between items-center p-3.5 bg-[#001d32]/85 backdrop-blur-md rounded-[14px] border border-white/10 hover:border-[#f7bc6a]/40 transition-colors w-full">
      <div className="flex flex-row justify-between w-full items-center gap-4">
        <div className="relative w-10 h-10 rounded-[10px] bg-[#002f4d]/90 border border-white/10 flex items-center justify-center shrink-0">
          <Image src="/file.svg" alt="file icon" width={28} height={28} />
          <div
            className="absolute top-0.5 right-0.5 h-[15px] rounded px-1 flex items-center justify-center"
            style={{ backgroundColor: fileColor }}
          >
            <span className="text-[9px] font-bold text-white leading-[15px] text-center">
              {finalExtension?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="min-w-0 text-left">
              <p className="break-all text-slate-50 font-semibold text-sm">
                {file.name}
              </p>
              <span className="text-[#ffddb4] font-mono text-xs">
                {formatBytes(file.size)}
              </span>
            </div>
            <button
              type="button"
              aria-label={`Remove ${file.name}`}
              onClick={() => onRemove(file.name)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/15 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDisplayItem;