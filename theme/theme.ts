"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f7bc6a",
    },
    background: {
      default: "#001d32",
      paper: "#002f4d",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: "var(--font-body), 'Fira Sans', sans-serif",
    fontSize: 14,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          lineHeight: "20px",
          variants: [
            {
              props: { variant: "body1" },
              style: {
                color: "#f1f5f9",
                fontWeight: 700,
              },
            },
            {
              props: { variant: "body2" },
              style: {
                color: "#94a3b8",
              },
            },
            {
              props: { variant: "h6" },
              style: {
                color: "#ffffff",
                fontWeight: 400,
              },
            },
            {
              props: { variant: "caption" },
              style: {
                color: "#f7bc6a",
                fontWeight: 500,
              },
            },
            {
              props: { variant: "subtitle1" },
              style: {
                color: "#fb7185",
                lineHeight: "22px",
                fontWeight: 600,
              },
            },
            {
              props: { variant: "h1" },
              style: {
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "16px",
              },
            },
          ],
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          display: "inline-block",
          marginBottom: 8,
          fontSize: "14px",
          fontWeight: 600,
          color: "#e2e8f0",
          "&.Mui-focused": {
            color: "#f7bc6a",
          },
          "&::after": {
            content: "''",
            borderRadius: "2px",
            position: "absolute",
            width: "4px",
            height: "4px",
            backgroundColor: "#f7bc6a",
            top: "50%",
            transform: "translate(150%, -50%)",
          },
        },
        asterisk: {
          display: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "none",
          fontSize: "14px",
          color: "#f8fafc",
        },
        input: {
          color: "#f8fafc",
          "&::placeholder": {
            color: "#94a3b8",
            opacity: 0.7,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: 0,
          height: 20,
          color: "#f8fafc",
        },
        root: {
          padding: "11px 11px",
          border: "1px solid",
          backgroundColor: "rgba(0, 29, 50, 0.85)",
          borderColor: "rgba(255, 255, 255, 0.14)",
          color: "#f8fafc",
          borderRadius: "8px",
          transition: "border 120ms ease-in",
          "&:hover": {
            borderColor: "#f7bc6a",
          },
          "&.Mui-focused": {
            borderColor: "#f7bc6a",
          },
        },
        sizeSmall: {
          style: {
            padding: "7px 11px",
          },
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "8px",
          color: "#002f4d",
          fontWeight: 700,
          padding: "10px 14px",
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            fontSize: "14px",
            color: "inherit",
          },
          textTransform: "none",
          variants: [
            {
              props: { color: "primary" },
              style: {
                backgroundColor: "#f7bc6a",
                borderColor: "#f7bc6a",
                boxShadow: "none",
                color: "#002f4d",
                fontWeight: 700,
                "&.Mui-disabled": {
                  backgroundColor: "rgba(247, 188, 106, 0.25)",
                  borderColor: "rgba(247, 188, 106, 0.25)",
                  color: "rgba(255, 255, 255, 0.4)",
                },
                "&:hover": {
                  backgroundColor: "#ffddb4",
                  borderColor: "#ffddb4",
                  boxShadow: "none",
                },
              },
            },
            {
              props: { variant: "outlined" },
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: "rgba(247, 188, 106, 0.4)",
                color: "#f7bc6a",
                "&:hover": {
                  backgroundColor: "rgba(247, 188, 106, 0.1)",
                  borderColor: "#f7bc6a",
                },
                "&.Mui-disabled": {
                  color: "rgba(247, 188, 106, 0.35)",
                  borderColor: "rgba(247, 188, 106, 0.15)",
                },
              },
            },
          ],
        },
        sizeLarge: {
          padding: "14px 20px",
          fontSize: "16px",
          lineHeight: "18px",
        },
        sizeMedium: {
          padding: "10px 20px",
          fontSize: "14px",
          lineHeight: "18px",
        },
        sizeSmall: {
          padding: "8px 20px",
          fontSize: "12px",
          lineHeight: "14px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "none",
          padding: "0px",
          backgroundColor: "rgba(0, 47, 77, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.09)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          "&:last-child": {
            paddingBottom: "0px",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#002f4d",
        },
        bar1: {
          backgroundColor: "#f7bc6a",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;