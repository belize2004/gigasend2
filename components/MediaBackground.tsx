"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { PexelsImage } from "@/types/pexels";

type Media = {
  type: "image";
  url: string;
};

type PexelsResponse = {
  photos?: PexelsImage[];
};

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;
const PEXELS_IMAGE_API =
  "https://api.pexels.com/v1/search?query=ocean+night&orientation=landscape&per_page=20";

export function MediaBackground({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [media, setMedia] = useState<Media | null>(null);
  const [fade, setFade] = useState(false);

  const fetchRandomMedia = async () => {
    try {
      const res = await fetch(PEXELS_IMAGE_API, {
        headers: { Authorization: PEXELS_API_KEY },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch media");
      }

      const data: PexelsResponse = await res.json();

      if (data.photos && data.photos.length > 0) {
        const random =
          data.photos[Math.floor(Math.random() * data.photos.length)];
        setMedia({ type: "image", url: random.src.landscape });
      }
    } catch (err) {
      console.error("Error fetching media:", err);
    }
  };

  useEffect(() => {
    fetchRandomMedia();
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        fetchRandomMedia();
        setFade(false);
      }, 1000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#001d32",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: fade ? 0 : 0.35,
          transition: "opacity 1s ease-in-out",
          zIndex: 0,
        }}
      >
        {media?.type === "image" ? (
          <Box
            component="img"
            src={media.url}
            alt="Background"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "none",
            }}
          />
        ) : null}
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#f1f5f9",
          backgroundColor: "rgba(0, 29, 50, 0.78)",
          backdropFilter: "blur(12px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}