"use client";

import { Button, Card, Stack, Typography } from "@mui/material";
import Image from '@/components/compat/Image';
import { useRouter } from '@/components/compat/navigation';
import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export const Success = () => {
  const router = useRouter();
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShareLink(params.get("link") ?? "");
  }, []);

  const copyShareLink = async () => {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card sx={{ width: "100%", maxWidth: "768px", mx: "auto" }}>
      <Stack
        alignItems="center"
        position="relative"
        justifyContent="center"
        sx={{
          padding: "40px 24px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack position="relative" height={55} width={"100%"} top={-150}>
          <Image
            src={"/success.png"}
            alt="Success Icon"
            width={336}
            height={336}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "auto",
              zIndex: 0,
            }}
          />
        </Stack>
        <Stack
          gap={3}
          zIndex={1}
          alignItems="center"
          position="relative"
          justifyContent="center"
        >
          <Typography variant="h1" fontWeight={600} textAlign="center">
            Congratulation!
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              "@media (min-width: 600px)": {
                margin: "0 70px",
              },
            }}
          >
            {shareLink
              ? "Your shareable link is ready. Anyone with this link can download the files until it expires."
              : "Email sent! The recipient has 3 days to download your files."}
          </Typography>
          {shareLink && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              gap={1}
              sx={{
                width: "100%",
                maxWidth: 560,
                border: "1px solid #D5D7DA",
                borderRadius: 2,
                backgroundColor: "#F6F8FB",
                padding: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  fontFamily: "monospace",
                  overflowWrap: "anywhere",
                  padding: "8px",
                }}
              >
                {shareLink}
              </Typography>
              <Button
                variant="contained"
                type="button"
                onClick={copyShareLink}
                startIcon={copied ? <FiCheck /> : <FiCopy />}
                sx={{ textTransform: "none" }}
              >
                {copied ? "Copied" : "Copy link"}
              </Button>
            </Stack>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/transfer")}
          >
            New Transfer?
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
