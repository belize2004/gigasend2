import { Typography, SxProps, Theme } from "@mui/material";
import Link from '@/components/compat/Link';

export const TermsConditions = ({ sx }: { sx?: SxProps<Theme> }) => {
  return (
    <Link href={"/"}>
      <Typography sx={{ textDecoration: "underline", ...sx }} variant="body2">
        Terms And Conditions
      </Typography>
    </Link>
  );
};