"use client";

export const GradientBackground = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      filter: "blur(128px)",
      maxWidth: "56rem",
      height: "800px",
      marginLeft: "auto",
      marginRight: "auto",
      background:
        "linear-gradient(125deg, rgba(14, 143, 209, 0.22) 10%, rgba(0, 67, 106, 0.45) 45%, rgba(247, 188, 106, 0.14) 85%, rgba(0, 29, 50, 0.6) 100%)",
    }}
  />
);