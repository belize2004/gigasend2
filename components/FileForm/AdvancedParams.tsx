"use client";

import { useState } from "react";
import { Collapse, Stack, Typography } from "@mui/material";
import Image from '@/components/compat/Image';

export const AdvancedParams = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Stack
        component="button"
        type="button"
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          cursor: "pointer",
          color: "#ffddb4",
          background: "transparent",
          border: "none",
          padding: 0,
          "&:hover": { color: "#FFFFFF" },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="caption" sx={{ color: "inherit", fontWeight: 600 }}>
          Advanced Options
        </Typography>
        <Image
          src="/arrowDown.svg"
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
    </>
  );
};