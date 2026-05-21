"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type FileContextType = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const SELECTED_FILE_CACHE_KEY = "gigasend:selected-files:v1";
const MAX_FILE_CACHE_BYTES = 3 * 1024 * 1024;

type CachedFile = {
  name: string;
  type: string;
  lastModified: number;
  dataUrl: string;
};

const FileContext = createContext<FileContextType>({
  files: [],
  setFiles: () => [],
});

export function useFileContext() {
  return useContext(FileContext);
}

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (files.length > 0 || typeof window === "undefined") return;

    const raw = window.sessionStorage.getItem(SELECTED_FILE_CACHE_KEY);
    if (!raw) return;

    try {
      const cachedFiles = JSON.parse(raw) as CachedFile[];
      Promise.all(cachedFiles.map(async (cachedFile) => {
        const response = await fetch(cachedFile.dataUrl);
        const blob = await response.blob();
        return new File([blob], cachedFile.name, {
          type: cachedFile.type,
          lastModified: cachedFile.lastModified,
        });
      })).then((restoredFiles) => {
        setFiles(restoredFiles);
        window.sessionStorage.removeItem(SELECTED_FILE_CACHE_KEY);
      }).catch(() => {
        window.sessionStorage.removeItem(SELECTED_FILE_CACHE_KEY);
      });
    } catch {
      window.sessionStorage.removeItem(SELECTED_FILE_CACHE_KEY);
    }
  }, [files.length]);

  return (
    <FileContext.Provider value={{ files, setFiles }}>
      {children}
    </FileContext.Provider>
  );
}

export async function cacheFilesForTransfer(files: File[]) {
  if (typeof window === "undefined") return false;
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_FILE_CACHE_BYTES) return false;

  try {
    const cachedFiles = await Promise.all(files.map(async (file) => ({
      name: file.name,
      type: file.type,
      lastModified: file.lastModified,
      dataUrl: await fileToDataUrl(file),
    })));
    window.sessionStorage.setItem(SELECTED_FILE_CACHE_KEY, JSON.stringify(cachedFiles));
    return true;
  } catch (error) {
    console.warn("Unable to cache selected files for transfer:", error);
    window.sessionStorage.removeItem(SELECTED_FILE_CACHE_KEY);
    return false;
  }
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
