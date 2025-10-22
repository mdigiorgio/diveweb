// src/components/SocialFloatingIcon.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function SocialFloatingIcon() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 12, sm: 16 },
        right: { xs: 12, sm: 16 },
        zIndex: 999,
      }}
    >
      <IconButton
        aria-label="Instagram"
        href="https://www.instagram.com/michele_airdg"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          bgcolor: "#E1306C",
          color: "#fff",
          p: { xs: 1, sm: 1.5 },
          fontSize: { xs: "1.5rem", sm: "2rem" },
          opacity: isScrolling ? 0.5 : 0.1, // slightly more visible when scrolling
          transition: "opacity 0.3s ease, transform 0.3s ease",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.1) translateY(-4px)", // subtle float effect
            bgcolor: "#E1306C", // keeps the pink color on hover
          },
        }}
      >
        <InstagramIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
