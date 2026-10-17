"use client";

import { Button, Card, Stack, Typography } from "@mui/material";
import Image from '@/components/compat/Image';
import { useRouter } from '@/components/compat/navigation';
import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export const Success = () => {
  const router = useRouter();
  const [shareLink, setShareLink] = useState("");
  const [emailFailed, setEmailFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShareLink(params.get("link") ?? "");
    setEmailFailed(params.get("email") === "failed");
  }, []);

  const copyShareLink = async () => {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      className="apple-glass"
      sx={{
        width: "100%",
        maxWidth: "768px",
        mx: "auto",
        backgroundColor: "rgba(0, 47, 77, 0.88)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "28px",
        boxShadow: "0 24px 64px rgba(0, 15, 28, 0.7)",
        color: "#f8fafc",
        overflow: "visible",
      }}
    >
      <Stack
        alignItems="center"
        position="relative"
        justifyContent="center"
        sx={{
          padding: "48px 28px",
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
          width="100%"
        >
          <span className="label-caps text-emerald-400 text-xs px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            Line-Rate Edge Delivery Active
          </span>
          <Typography
            variant="h1"
            fontWeight={800}
            textAlign="center"
            sx={{ color: "#FFFFFF", fontSize: { xs: "2rem", sm: "2.5rem" }, letterSpacing: "-0.02em" }}
          >
            Transfer Ready!
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              color: "#cbd5e1",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              "@media (min-width: 600px)": {
                margin: "0 50px",
              },
            }}
          >
            {emailFailed
              ? "Your upload is finished, but the recipient email could not be sent. Copy this link and send it manually."
              : shareLink
              ? "Your shareable link is ready. Anyone with this link can download the files at line-rate speed until it expires."
              : "Email sent! The recipient has 3 days to download your files."}
          </Typography>
          {shareLink && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              gap={1.5}
              alignItems="center"
              sx={{
                width: "100%",
                maxWidth: 580,
                border: "1px solid rgba(247, 188, 106, 0.35)",
                borderRadius: "16px",
                backgroundColor: "rgba(0, 29, 50, 0.9)",
                padding: 1.25,
                boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  fontFamily: "monospace",
                  color: "#ffddb4",
                  overflowWrap: "anywhere",
                  padding: "8px 12px",
                  fontSize: "0.85rem",
                }}
              >
                {shareLink}
              </Typography>
              <Button
                variant="contained"
                type="button"
                onClick={copyShareLink}
                startIcon={copied ? <FiCheck /> : <FiCopy />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#f7bc6a",
                  color: "#001d32",
                  fontWeight: 700,
                  borderRadius: "12px",
                  px: 2.5,
                  py: 1.2,
                  flexShrink: 0,
                  "&:hover": {
                    backgroundColor: "#ffddb4",
                  },
                }}
              >
                {copied ? "Copied!" : "Copy link"}
              </Button>
            </Stack>
          )}
          <Button
            variant="outlined"
            onClick={() => router.push("/transfer")}
            sx={{
              textTransform: "none",
              borderColor: "rgba(247, 188, 106, 0.5)",
              color: "#ffddb4",
              fontWeight: 700,
              borderRadius: "12px",
              px: 4,
              py: 1.25,
              "&:hover": {
                borderColor: "#f7bc6a",
                backgroundColor: "rgba(247, 188, 106, 0.12)",
              },
            }}
          >
            Send Another Package →
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

