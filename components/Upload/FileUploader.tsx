"use client";

import React, { useId, useRef, useState } from "react";
import Image from "@/components/compat/Image";
import { useFileContext } from "@/context/FileContext";

async function extractFilesFromEntry(entry: any, pathPrefix = ""): Promise<File[]> {
  if (!entry) return [];

  if (entry.isFile) {
    return new Promise<File[]>((resolve) => {
      entry.file(
        (file: File) => {
          resolve(file.size > 0 ? [file] : []);
        },
        () => resolve([]),
      );
    });
  }

  if (entry.isDirectory) {
    const dirReader = entry.createReader();
    const allEntries: any[] = [];

    const readBatch = (): Promise<any[]> =>
      new Promise((resolve) => {
        dirReader.readEntries(
          (entries: any[]) => resolve(entries || []),
          () => resolve([]),
        );
      });

    let batch = await readBatch();
    while (batch.length > 0) {
      allEntries.push(...batch);
      batch = await readBatch();
    }

    const nestedResults = await Promise.all(
      allEntries.map((child) =>
        extractFilesFromEntry(child, `${pathPrefix}${entry.name}/`),
      ),
    );
    return nestedResults.flat();
  }

  return [];
}

export function FileUploader() {
  const { setFiles } = useFileContext();
  const [inputKey, setInputKey] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files).filter((file) => file.size > 0);
    if (selectedFiles.length > 0) {
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
    setInputKey((key) => key + 1);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const items = e.dataTransfer.items ? Array.from(e.dataTransfer.items) : [];
    const entries = items
      .map((item) => (typeof (item as any).webkitGetAsEntry === "function" ? (item as any).webkitGetAsEntry() : null))
      .filter(Boolean);

    if (entries.length > 0 && entries.some((entry) => entry.isDirectory)) {
      const extracted = (await Promise.all(entries.map((entry) => extractFilesFromEntry(entry)))).flat();
      if (extracted.length > 0) {
        setFiles((prev) => [...prev, ...extracted]);
        setInputKey((key) => key + 1);
      }
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.size > 0);
      if (droppedFiles.length > 0) {
        setFiles((prev) => [...prev, ...droppedFiles]);
        setInputKey((key) => key + 1);
      }
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("label") || target.closest("input")) {
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleContainerClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="w-full max-w-[552px] mx-auto rounded-[20px] px-6 py-8 text-center cursor-pointer backdrop-blur-md transition-all duration-250"
      style={{
        border: isDragging
          ? "2px dashed #f7bc6a"
          : "2px dashed rgba(247, 188, 106, 0.45)",
        backgroundColor: isDragging
          ? "rgba(0, 47, 77, 0.9)"
          : "rgba(0, 29, 50, 0.7)",
        boxShadow: isDragging
          ? "0 0 30px rgba(247, 188, 106, 0.2)"
          : "0 12px 32px rgba(0, 15, 28, 0.45)",
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{
          backgroundColor: "rgba(247, 188, 106, 0.15)",
          border: "1px solid rgba(247, 188, 106, 0.3)",
        }}
      >
        <Image src={"/upload.svg"} alt="Upload Icon" width={30} height={30} />
      </div>
      <h3 className="text-white font-bold text-lg tracking-tight mb-1.5 font-display">
        Click or drop to add your{" "}
        <span className="text-[#ffddb4] font-extrabold">files</span> or{" "}
        <span className="text-[#ffddb4] font-extrabold">folder</span>
      </h3>
      <p className="text-slate-300 text-[0.85rem] leading-relaxed">
        Supports all file types at line-rate edge speeds up to your available plan storage
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
        <label
          htmlFor={`${inputId}-files`}
          className="inline-flex items-center justify-center cursor-pointer rounded-xl px-6 py-2.5 text-sm font-bold text-[#001d32] bg-[#f7bc6a] hover:bg-[#ffddb4] transition-all"
          style={{
            boxShadow: "0 8px 20px rgba(247, 188, 106, 0.25)",
          }}
        >
          Browse files
        </label>
        <label
          htmlFor={`${inputId}-folder`}
          className="inline-flex items-center justify-center cursor-pointer rounded-xl px-6 py-2.5 text-sm font-bold text-[#ffddb4] transition-all hover:bg-[#f7bc6a]/15"
          style={{
            border: "1px solid rgba(247, 188, 106, 0.5)",
            backgroundColor: "rgba(0, 47, 77, 0.5)",
          }}
        >
          Browse folder
        </label>
      </div>

      <input
        ref={fileInputRef}
        key={`files-${inputKey}`}
        id={`${inputId}-files`}
        type="file"
        multiple
        style={visuallyHiddenInput}
        onChange={handleFileChange}
      />
      <input
        key={`folder-${inputKey}`}
        id={`${inputId}-folder`}
        type="file"
        multiple
        directory="true"
        webkitdirectory="true"
        mozdirectory="true"
        style={visuallyHiddenInput}
        onChange={handleFileChange}
      />
    </div>
  );
}

const visuallyHiddenInput: React.CSSProperties = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
};
