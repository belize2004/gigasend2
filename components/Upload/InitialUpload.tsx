import { Stack } from "@mui/material";
import { FileUploader } from "./FileUploader";
import { TermsConditions } from "../TermsConditions";
import Image from '@/components/compat/Image';

export const InitialUpload = () => {
  return (
    <Stack
      padding={4}
      sx={{
        backgroundColor: "rgba(0, 47, 77, 0.85)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 24px 60px rgba(0, 15, 28, 0.65)",
        color: "#f8fafc",
      }}
      borderRadius={"24px"}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Stack
        sx={{ padding: "24px", justifyContent: "center", alignItems: "center" }}
      >
        <Image src="/logo.png" alt="logo" width={168} height={36} />
      </Stack>
      <FileUploader />
      <TermsConditions sx={{ color: "#cbd5e1" }} />
    </Stack>
  );
};