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
import { ZipWriter } from "@zip.js/zip.js";
import { formatBytes, renameDuplicates } from "@/lib/utils";
import axios from "axios";
import { UsageData } from "@/app/api/usage/route";
import { PLANS } from "@/lib/constant";
import pLimit from "p-limit";

type UploadFormData = z.infer<typeof UploadFormSchema>;
type UploadStatus = "initiating" | "uploading" | "zipping" | "sending email" | "finalizing" | null
const limit = pLimit(4);

export const FileForm = () => {
  const { files, setFiles } = useFileContext();
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const totalBytesRef = useRef(0);
  const totalUploadedRef = useRef(0);
  const chunkProgressRef = useRef<{ [chunkId: string]: number }>({});
  const uploadStartTimeRef = useRef<number | null>(null);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<number | null>(null);
  const [allowedLimit, setAllowedLimit] = useState(PLANS.free.storageBytes * (1024 ** 3));
  const [expiryLimit, setExpiryLimit] = useState(3); // in days
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(null)
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });
  const router = useRouter();
  const startTimeRef = useRef<null | number>(null)
  const partNumberRef = useRef(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormData>({
    resolver: zodResolver(UploadFormSchema),
  });

  const showToast = (msg: string) => setToast({ open: true, msg });

  async function uploadChunkToS3(chunk: Uint8Array, uploadId: string, key: string, partNumber: number): Promise<string> {
    let ETag: string = '';
    const MAX_RETRIES = 3;
    let retries = 0;

    // Request presigned URL for this chunk (this part doesn't need retries as it's a separate API call)
    const presignRes = await fetch("/api/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uploadId, key, partNumber }),
    });
    if (!presignRes.ok) throw new Error(`Failed to presign part ${partNumber}`);
    const { url: presignedUrl } = await presignRes.json();

    while (retries <= MAX_RETRIES) {
      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const eTagHeader = xhr.getResponseHeader("ETag");
              if (eTagHeader) {
                ETag = eTagHeader;
              }
              if (totalUploadedRef && totalUploadedRef.current !== undefined) { // Check if exists
                totalUploadedRef.current += chunk.length;
              }
              updateProgress();
              resolve();
            } else {
              reject(new Error(`Upload failed for part ${partNumber} with status ${xhr.status}`));
            }
          };
          xhr.onerror = () => reject(new Error("Network error during upload"));
          xhr.send(chunk);
        });
        // If the promise resolves, the upload was successful, break out of the retry loop
        break;
      } catch (error) {
        console.warn(`Attempt ${retries + 1} for part ${partNumber} failed:`, error);
        retries++;
        if (retries > MAX_RETRIES) {
          throw new Error(`Failed to upload part ${partNumber} after ${MAX_RETRIES} retries.`);
        }
        // Optional: Add a delay before retrying
        await new Promise(resolve => setTimeout(resolve, 2000 * retries)); // Exponential backoff for delay
      }
    }

    return ETag;
  }

  function updateProgress() {
    const uploaded = totalUploadedRef.current;
    const total = totalBytesRef.current;
    const progress = (uploaded / total) * 100;
    setOverallProgress(Math.min(progress, 100));

    const elapsed = (Date.now() - uploadStartTimeRef.current!) / 1000;

    if (elapsed >= 5 && uploaded > 0) {
      const speed = uploaded / elapsed;
      const timeLeft = (total - uploaded) / speed;
      setEstimatedTimeLeft(Math.max(0, Math.ceil(timeLeft)));
    } else {
      setEstimatedTimeLeft(null);
    }
  }


  const onSubmit = async (data: UploadFormData) => {
    if (!files || files.length === 0) {
      showToast("Please select at least one file.");
      return;
    }

    setUploading(true);
    setOverallProgress(0);
    uploadStartTimeRef.current = Date.now();
    startTimeRef.current = Date.now();


    // Initialize total bytes and progress trackers
    totalBytesRef.current = Array.from(files).reduce(
      (sum, f) => sum + f.size,
      0,
    );
    if (totalBytesRef.current > allowedLimit) {
      showToast(`You can only upload up to ${formatBytes(allowedLimit)}. Please remove some files.`);
      setUploading(false);
      return;
    }

    totalUploadedRef.current = 0;
    chunkProgressRef.current = {};

    try {
      let compressedFileSize = 0;
      const { writable, readable } = new TransformStream<Uint8Array, Uint8Array>();
      const zipWriter = new ZipWriter(writable);

      // Start background upload of the zip stream
      const reader = readable.getReader();
      const partsList: { PartNumber: number; ETag: string }[] = [];
      const uploadPromises: Array<Promise<void>> = [];
      // let partNumber = 1;

      setUploadStatus("initiating");
      // Step 1: Initiate multipart upload
      const initiateRes = await fetch("/api/uploads/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: "giga-sender.zip", contentType: "application/zip", fileSize: totalBytesRef.current }),
      });
      if (!initiateRes.ok) throw new Error("Failed to initiate upload");

      const { uploadId, key } = await initiateRes.json();
      const MIN_PART_SIZE = 8 * 1024 * 1024; // 8 MB
      let buffer = new Uint8Array(0);

      const uploadStreamPromise = (async () => {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          // if (done) break;
          if (value) {
            // Append to buffer
            const newBuffer = new Uint8Array(buffer.length + value.length);
            newBuffer.set(buffer);
            newBuffer.set(value, buffer.length);
            buffer = newBuffer;

            // Upload full chunks
            while (buffer.length >= MIN_PART_SIZE) {
              const chunk = buffer.slice(0, MIN_PART_SIZE);
              buffer = buffer.slice(MIN_PART_SIZE);
              if (uploadStatus != "uploading")
                setUploadStatus("uploading");


              const currPart = partNumberRef.current++;
              const uploadPromise = limit(async () => {
                return uploadChunkToS3(chunk, uploadId, key, currPart).then((etag) => {
                  partsList.push({ PartNumber: currPart, ETag: etag });
                  compressedFileSize += chunk.length;
                });
              });

              uploadPromises.push(uploadPromise);
              uploadPromise.finally(() => { //
                const index = uploadPromises.indexOf(uploadPromise);
                if (index > -1) {
                  uploadPromises.splice(index, 1);
                }
              });
            }
            console.log('uploadPromises', uploadPromises)
          }
        }

        await Promise.all(uploadPromises);

        // Upload remaining data after stream ends
        if (buffer.length > 0) {
          const finalChunk = buffer;

          const currPart = partNumberRef.current++;
          const finalPromise = limit(async () => {
            return uploadChunkToS3(finalChunk, uploadId, key, currPart).then(etag => {
              partsList.push({ PartNumber: currPart, ETag: etag });
              compressedFileSize += finalChunk.length;
            });
          });
          uploadPromises.push(finalPromise);
        }

        await Promise.all(uploadPromises);

        setUploadStatus("finalizing");
        // Complete the multipart upload
        const completeRes = await fetch("/api/uploads/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uploadId, key, parts: partsList }),
        });
        if (!completeRes.ok) {
          throw new Error(`Failed to complete upload for giga-sender.zip`);
        }
      })();

      const uniquelyNamedFiles = renameDuplicates(files);
      await Promise.all(
        uniquelyNamedFiles.map(file => zipWriter.add(file.name, file.stream(), {
          level: 0,
          bufferedWrite: true,
          useCompressionStream: false
        }))
      );
      await zipWriter.close();

      await uploadStreamPromise;
      setOverallProgress(100);

      setUploadStatus("sending email");
      const emailRes = await fetch("/api/uploads/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverEmail: data.receiverEmail,
          numberOfFiles: files.length,
          fileSize: compressedFileSize,
          message: data.message,
          fileKeys: [key],
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

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get<ApiResponse<UsageData>>('/api/usage');
        const data = res.data.data!;
        setAllowedLimit(data.allowedStorage - data.usedStorage);
        setExpiryLimit(data.expiryDays)
      } catch (error) {
        console.error('Error fetching usage limit:', error);
      }
    })()
  }, [])

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
                  {files.length} Selected File{files.length > 1 ? 's' : ''}
                </Typography>
                <Typography variant="body2">
                  {getSizeInReadableFormat(files)} of {formatBytes(allowedLimit)}
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
                  Expires on {new Date(Date.now() + expiryLimit * 24 * 60 * 60 * 1000).toDateString()}
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
          {uploadStatus &&
            <Typography color="white" variant="body2">
              Status: {uploadStatus}
            </Typography>
          }
          {estimatedTimeLeft !== null && (
            <>-
              <Typography color="white" variant="body2">
                Time remaining: {formatSeconds(estimatedTimeLeft)}
              </Typography>
              <Typography color="white" variant="body2">
                Uploaded: {formatBytes(totalUploadedRef.current)} of {formatBytes(totalBytesRef.current)}
              </Typography>
              <Typography color="white" variant="body2">
                Start time: {new Date(startTimeRef.current ?? 0).toLocaleTimeString()}
              </Typography>
            </>
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

function getSizeInReadableFormat(files: File[]): string {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  return formatBytes(totalBytes)
}

const formatSeconds = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 || hrs > 0 ? `${mins}m ` : ""}${secs}s`;
};