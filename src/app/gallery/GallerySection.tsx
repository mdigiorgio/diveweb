// src/app/gallery/GallerySection.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SectionTitle } from "@/utils/index";

// -------------------------------------------------
// 1. Data Interface
// -------------------------------------------------

/**
 * Interface for the minimal structure of a YouTube playlist item required
 * by this component to display the video iframe.
 */
interface YouTubeVideo {
  snippet: {
    title: string;
    resourceId: {
      videoId: string;
    }; // Add other properties here if needed later (e.g., publishedAt, description)
  };
}

// We define the uniform sizing as a flex-basis value.
// 30% allows for 3 videos per row with some spacing between them.
const FLEX_BASIS_SIZE = "30%";

export default function GallerySection(): React.ReactElement {
  // Explicitly type the state for videos
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const UPLOADS_PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_UPLOADS_PLAYLIST;
  const youtubeURL: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${UPLOADS_PLAYLIST_ID}&key=${API_KEY}`;

  useEffect(() => {
    if (!API_KEY || !UPLOADS_PLAYLIST_ID) {
      console.error("YouTube API Key or Playlist ID is missing.");
      setLoading(false);
      return;
    }

    async function fetchVideos() {
      try {
        const res = await fetch(youtubeURL);
        const data = await res.json();

        if (data.items) {
          // Limit the number of videos shown to 3 for mobile and 9 for desktop
          const numVideos: number = isMobile ? 3 : 9;
          setVideos(data.items.slice(0, numVideos) as YouTubeVideo[]);
        } else {
          console.error("No videos found or API error:", data);
          setVideos([]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [youtubeURL]);

  const handleViewMore = () => {
    window.open(youtubeURL, "_blank");
  };

  return (
    <Container maxWidth="lg">
      {/* @ts-ignore: Assuming SectionTitle is a valid component */}
      <SectionTitle>Gallery 🎬</SectionTitle>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : videos.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ py: 6 }}
        >
          No recent videos available. Please check the API key and playlist ID.
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4, // Use the 'gap' property for consistent spacing
            }}
          >
            {videos.map((video: YouTubeVideo, idx: number) => (
              <Box
                key={idx}
                sx={{
                  // 1. Force items to take calculated width
                  flexBasis: { xs: "100%", sm: "45%", md: FLEX_BASIS_SIZE },
                  flexGrow: 0,
                  flexShrink: 0, // 2. Set internal layout to vertical

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%", // Takes 100% of the calculated flex-basis width
                    // 3. Guarantee 16:9 Aspect Ratio (56.25% height relative to width)
                    paddingBottom: "56.25%",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3, // Increased shadow for better separation
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?rel=0`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Button below videos, aligned right */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewMore}
              size={isMobile ? "small" : "medium"}
              sx={{
                background: "linear-gradient(135deg, #0077b6, #00b4d8)",
                textTransform: "none",
                fontSize: { xs: "0.8rem", md: "0.95rem" },
                px: { xs: 2.5, md: 4 },
                py: { xs: 0.8, md: 1.2 },
                borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background: "linear-gradient(135deg, #00b4d8, #90e0ef)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                },
              }}
            >
              View More
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
