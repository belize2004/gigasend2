import { Typography, SxProps, Theme } from "@mui/material";
import Link from '@/components/compat/Link';

export const TermsConditions = ({ sx }: { sx?: SxProps<Theme> }) => {
  return (
    <Link href={"/terms"} className="text-slate-300 hover:text-gold-400 transition-colors">
      <Typography sx={{ textDecoration: "underline", color: "inherit", ...sx }} variant="body2">
        Terms and Conditions
      </Typography>
    </Link>
  );
};