"use client";

import { Button, Card, Stack, Typography } from "@mui/material";
import { useRouter } from "@/components/compat/navigation";
import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export const Success = () => {
  const router = useRouter();
  const [shareLink, setShareLink] = useState("");
  const [emailFailed, setEmailFailed] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"link" | "email">("link");
  const [expiryDays, setExpiryDays] = useState(3);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const link = params.get("link") ?? "";
    const mode = params.get("mode") === "email" ? "email" : "link";
    const days = Number(params.get("days") || 3);

    setShareLink(link);
    setEmailFailed(params.get("email") === "failed");
    setDeliveryMode(mode);
    setExpiryDays(Number.isFinite(days) && days > 0 ? days : 3);

    if (link && mode === "link" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch(() => undefined);
    }
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
        maxWidth: "680px",
        mx: "auto",
        backgroundColor: "rgba(0, 47, 77, 0.88)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "28px",
        boxShadow: "0 24px 64px rgba(0, 15, 28, 0.7)",
        color: "#f8fafc",
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2.5}
        sx={{
          padding: { xs: "36px 24px", sm: "44px 36px" },
        }}
      >
        <div
          aria-hidden="true"
          className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400"
        >
          <FiCheck className="w-7 h-7" />
        </div>

        <Typography
          variant="h1"
          fontWeight={800}
          textAlign="center"
          sx={{ color: "#FFFFFF", fontSize: { xs: "1.85rem", sm: "2.25rem" }, letterSpacing: "-0.02em" }}
        >
          {deliveryMode === "email" && !emailFailed ? "Transfer Sent" : "Link Ready"}
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: "#cbd5e1",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            maxWidth: 500,
          }}
        >
          {emailFailed
            ? "Your upload is finished, but the recipient email could not be sent. Copy this link and send it manually."
            : deliveryMode === "email"
              ? `We emailed your download link to the recipient. It remains active for ${expiryDays} ${expiryDays === 1 ? "day" : "days"}.`
              : `Anyone with this link can download your files for the next ${expiryDays} ${expiryDays === 1 ? "day" : "days"}.`}
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
              mt: 0.5,
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
                flexShrink: 0,
                width: { xs: "100%", sm: "auto" },
                textTransform: "none",
                backgroundColor: "#f7bc6a",
                color: "#001d32",
                fontWeight: 700,
                borderRadius: "12px",
                px: 3,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#ffddb4",
                },
              }}
            >
              {copied ? "Copied" : "Copy Link"}
            </Button>
          </Stack>
        )}

        <Button
          variant="text"
          onClick={() => router.push("/transfer")}
          sx={{
            mt: 0.5,
            textTransform: "none",
            color: "#cbd5e1",
            fontWeight: 600,
            fontSize: "0.9rem",
            borderRadius: "10px",
            px: 2.5,
            py: 0.75,
            "&:hover": {
              color: "#ffddb4",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          Send More Files
        </Button>
      </Stack>
    </Card>
  );
};

