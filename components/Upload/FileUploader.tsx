"use client";

import React, { useId, useState } from "react";
import Image from '@/components/compat/Image';
import { Box, Button, Stack, Typography } from "@mui/material";
import { useFileContext } from "@/context/FileContext";

export function FileUploader() {
  const { setFiles } = useFileContext();
  const [inputKey, setInputKey] = useState(0);
  const inputId = useId();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setInputKey((key) => key + 1);
  };

  return (
    <Box
      sx={{
        border: "2px dashed",
        borderRadius: "8px",
        padding: "32px 24px",
        textAlign: "center",
        cursor: "pointer",
        width: "100%",
        maxWidth: "552px",
        borderColor: "primary.main",
        backgroundColor: "background.paper",
      }}
    >
      <Image src={"/upload.svg"} alt="Upload Icon" width={36} height={36} />
      <Typography variant="h6" gutterBottom>
        Click to add your{" "}
        <Typography variant="caption" fontWeight={700}>
          files
        </Typography>{" "}
        or add a{" "}
        <Typography variant="caption" fontWeight={700}>
          folder
        </Typography>
      </Typography>
      <Typography variant="body2">
        Supports all file types, up to your available plan storage
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" component="label" htmlFor={`${inputId}-files`}>
          Browse files
        </Button>
        <Button variant="outlined" color="primary" component="label" htmlFor={`${inputId}-folder`}>
          Browse folder
        </Button>
      </Stack>

      <input
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
    </Box>
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
