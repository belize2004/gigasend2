"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FileUploader } from "../Upload/FileUploader";
// import { AdvancedParams } from "./AdvancedParams";
import { TermsConditions } from "../TermsConditions";
import FileList from "../File/FileList";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFormSchema } from "./schema/uploadSchema";
import { z } from "zod";
import { useFileContext } from "@/context/FileContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zipFiles } from "@/lib/zip";

type UploadFormData = z.infer<typeof UploadFormSchema>;

export const FileForm = () => {
  const { files, setFiles } = useFileContext();
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const totalBytesRef = useRef(0);
  const totalUploadedRef = useRef(0);
  const chunkProgressRef = useRef<{ [chunkId: string]: number }>({});
  const uploadStartTimeRef = useRef<number | null>(null);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<number | null>(null);
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormData>({
    resolver: zodResolver(UploadFormSchema),
  });

  const showToast = (msg: string) => setToast({ open: true, msg });

  const uploadSingleFile = async (
    file: File,
    fileIndex: number,
  ): Promise<string> => {
    // 1. Initiate multipart upload on the server to get uploadId and key
    const initiateRes = await fetch("/api/uploads/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, contentType: file.type }),
    });
    if (!initiateRes.ok) {
      throw new Error(`Failed to initiate upload for ${file.name}`);
    }
    const { uploadId, key } = await initiateRes.json();

    // 2. Calculate chunk size and total parts (using 10MB chunks here)
    const partSize = 5 * 1024 * 1024; // 5 MB
    const totalParts = Math.ceil(file.size / partSize);
    const partsList: { PartNumber: number; ETag: string }[] = [];

    // 3. Loop through each part of the file
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + partSize, file.size);
      const blobPart = file.slice(start, end); // File chunk

      // Request a presigned URL for this part from the server
      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploadId, key, partNumber }),
      });
      if (!presignRes.ok) {
        throw new Error(
          `Failed to get presigned URL for part ${partNumber} of ${file.name}`,
        );
      }
      const { url: presignedUrl } = await presignRes.json();

      // 4. Upload the file chunk directly to the presigned URL using XHR to track progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        // Update overall progress on each upload progress event
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const loaded = event.loaded;
            const chunkId = `${fileIndex}-${partNumber}`; // Unique ID for this file chunk
            const prevLoaded = chunkProgressRef.current[chunkId] || 0; // Bytes uploaded in previous event
            chunkProgressRef.current[chunkId] = loaded;
            totalUploadedRef.current += loaded - prevLoaded; // Increment global uploaded bytes
            // Calculate overall percentage across all files
            const percent = Math.round(
              (totalUploadedRef.current / totalBytesRef.current) * 100,
            );
            setOverallProgress(percent);

            // ⏱ Estimate time remaining
            if (uploadStartTimeRef.current !== null) {
              const elapsedMs = Date.now() - uploadStartTimeRef.current;
              const minSpeed = 1; // 1 byte/sec minimum to avoid divide-by-zero
              const speed = Math.max(totalUploadedRef.current / (elapsedMs / 1000), minSpeed);
              const remainingBytes = totalBytesRef.current - totalUploadedRef.current;
              const secondsLeft = remainingBytes / speed;
              setEstimatedTimeLeft(Math.max(0, secondsLeft));
            }
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            // On success, retrieve the ETag from the response headers
            const eTagHeader = xhr.getResponseHeader("ETag");
            if (eTagHeader) {
              partsList.push({ PartNumber: partNumber, ETag: eTagHeader });
            }
            resolve();
          } else {
            reject(
              new Error(`Upload failed for part ${partNumber} of ${file.name}`),
            );
          }
        };
        xhr.onerror = () =>
          reject(
            new Error(
              `Network error uploading part ${partNumber} of ${file.name}`,
            ),
          );
        xhr.send(blobPart); // Start upload of the chunk
      });
    }

    const completeRes = await fetch("/api/uploads/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uploadId, key, parts: partsList }),
    });
    if (!completeRes.ok) {
      throw new Error(`Failed to complete upload for ${file.name}`);
    }
    return key; // Return the unique file key (to be used later for download link)
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!files || files.length === 0) {
      showToast("Please select at least one file.");
      return;
    }

    if (data.senderEmail === data.receiverEmail) {
      showToast("Sender and receiver email cannot be the same.");
      return;
    }


    setUploading(true);
    setOverallProgress(0);
    uploadStartTimeRef.current = Date.now();


    // Initialize total bytes and progress trackers
    totalBytesRef.current = Array.from(files).reduce(
      (sum, f) => sum + f.size,
      0,
    );
    totalUploadedRef.current = 0;
    chunkProgressRef.current = {};

    try {
      // Upload all files concurrently
      const zipBlob = await zipFiles(files);
      const zipFile = new File([zipBlob], "giga-sender.zip", {
        type: "application/zip",
      });
      const fileKeys = await uploadSingleFile(zipFile, 0);
      setOverallProgress(100); // ensure progress is 100% at completion

      // 6. After uploads, call server to send download links via email
      const emailRes = await fetch("/api/uploads/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverEmail: data.receiverEmail,
          senderEmail: data.senderEmail,
          numberOfFiles: files.length,
          fileSize: zipBlob.size,
          message: data.message,
          fileKeys: [fileKeys],
        }),
      });
      if (!emailRes.ok) {
        throw new Error("Failed to send download links email.");
      }
      setFiles([]);
      setTimeout(() => {
        router.push("/success");
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      showToast(err.message ?? "Unexpected error");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    setValue("files", files);
  }, [files, setValue]);

  return (
    <Card sx={{ maxWidth: "768px", maxHeight: '80vh', overflowY: 'auto' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <CardContent sx={{ flex: "column" }}>
          <Stack
            sx={{
              padding: "24px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="/logo.png" alt="logo" width={168} height={36} />
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              padding: "24px",
              borderTop: "1px solid #D5D7DA",
              borderBottom: "1px solid #D5D7DA",
            }}
            gap={2}
            alignItems="stretch"
          >
            <Stack gap={2} width={{ xs: "100%", md: "50%" }}>
              <Stack>
                <Typography variant="body1">
                  {files.length} Downloaded File
                </Typography>
                <Typography variant="body2">
                  {getTotalSizeInGB(files)} of 50GB
                </Typography>
              </Stack>
              <Stack gap={2}>
                <FileUploader />
                <FileList />
              </Stack>
            </Stack>

            <Stack gap={2} width={{ xs: "100%", md: "50%" }}>
              <Stack>
                <Typography variant="body1">Email</Typography>
                <Typography variant="body2">
                  We will let you know when your files get downloaded
                </Typography>
              </Stack>
              <Stack
                borderRadius={2}
                padding={2}
                sx={{ backgroundColor: "#F6F8FB" }}
                flex={1}
                gap={2}
              >
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Receiver&apos;s email</FormLabel>
                  <TextField
                    // name="receiverEmail"
                    placeholder="e.g., receiver@example.com"
                    {...register("receiverEmail")}
                    error={!!errors.receiverEmail}
                    helperText={
                      errors.receiverEmail ? errors.receiverEmail.message : ""
                    }
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Sender&apos;s email</FormLabel>
                  <TextField
                    placeholder="e.g., yourmail@example.com"
                    {...register("senderEmail")}
                    error={!!errors.senderEmail}
                    helperText={
                      errors.senderEmail ? errors.senderEmail.message : ""
                    }
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Your message</FormLabel>
                  <TextField
                    placeholder="e.g., hi this is the file."
                    multiline
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "80px",
                        padding: 0,
                        "& textarea": {
                          height: "100% !important",
                          overflowY: "auto",
                          padding: "10px",
                          boxSizing: "border-box",
                        },
                      },
                    }}
                    {...register("message")}
                  />
                </FormControl>

                {/* <AdvancedParams /> */}
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={{ padding: "24px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography variant="subtitle1">
                  Expires on {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString()}
                </Typography>
                <TermsConditions sx={{ fontSize: "12px" }} />
              </Stack>

              <Stack direction="row" gap={2}>
                <Button onClick={() => router.replace('/')} variant="outlined" type="button">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Transfer
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </form>

      {uploading && (
        <Stack
          gap={2}
          justifyContent="center"
          alignItems="center"
          position="fixed"
          width="100vw"
          top={0}
          left={0}
          height="100vh"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 9999 }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={150}
              thickness={3}
              sx={{
                color: "rgba(255, 255, 255, 0.2)",
                filter: "blur(1px)",
                position: "absolute",
              }}
            />

            {/* Foreground Progress */}
            <CircularProgress
              variant="determinate"
              value={overallProgress}
              size={150}
              thickness={3}
              sx={{
                color: "#198CD2",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                fontSize={18}
                sx={{
                  color: "#FFF",
                }}
              >
                {`${Math.round(overallProgress)}%`}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="#FFF" mt={1}>
            We are processing your files...
          </Typography>
          {estimatedTimeLeft !== null && (
            <Typography color="white" variant="body2">
              Time remaining: {formatSeconds(estimatedTimeLeft)}
            </Typography>
          )}
        </Stack>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Card>
  );
};

function getTotalSizeInGB(files: File[]): string {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  if (totalBytes < 1024) {
    return `${totalBytes} B`;
  } else if (totalBytes < 1024 ** 2) {
    return `${(totalBytes / 1024).toFixed(2)} KB`;
  } else if (totalBytes < 1024 ** 3) {
    return `${(totalBytes / 1024 ** 2).toFixed(2)} MB`;
  } else {
    return `${(totalBytes / 1024 ** 3).toFixed(2)} GB`;
  }
}

const formatSeconds = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins > 0 ? `${mins}m ` : ""}${secs}s`;
};
