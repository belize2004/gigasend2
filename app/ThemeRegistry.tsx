"use client";

import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";

const ThemeRegistry = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {children}
    </ThemeProvider>
  );
};

export default ThemeRegistry;