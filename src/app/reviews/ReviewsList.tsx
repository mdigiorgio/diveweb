// src/app/reviews/ReviewsList.tsx

"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";

interface Review {
  id: string;
  inserted_at: string;
  user_id: string;
  name: string;
  avatar_url: string;
  stars: number;
  content: string;
}

function ReviewItem({
  review,
  isMobile,
}: {
  review: Review;
  isMobile: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const wordThreshold: number = isMobile ? 50 : 150;
  const words: string[] = review.content.split(/\s+/);
  const wordCount: number = words.length;
  const isTruncatable: boolean = wordCount > wordThreshold;

  // We'll put the logic directly inside the Typography component
  const truncatedText: string = words.slice(0, wordThreshold).join(" ");

  const formattedDate: string = new Date(review.inserted_at).toLocaleDateString(
    "en-GB", // 'en-GB' locale consistently gives dd/mm/yyyy
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        background: `linear-gradient(145deg, #e3f2fd, #bbdefb)`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={review.avatar_url || "/images/default-avatar.jpg"}
          alt={review.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/images/default-avatar.jpg";
          }}
          sx={{
            width: 48,
            height: 48,
            border: `2px solid #4fc3f7`,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {review.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating value={review.stars} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Typography
        sx={{
          mt: 2,
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          color: "#000",
          lineHeight: 1.6,
        }}
      >
        {isTruncatable && !isExpanded ? (
          <>
            {truncatedText}
            {"... "}
            <Button
              onClick={() => setIsExpanded(true)} // One-way click
              size="small"
              sx={{
                p: 0,
                m: 0,
                minWidth: "auto", // Removes default padding
                display: "inline", // Makes it flow with text
                fontWeight: "bold",
                color: "primary.main",
                lineHeight: "inherit", // Matches the <Typography>
                verticalAlign: "baseline", // Aligns with text
                textTransform: "none",
                "&:hover": {
                  background: "none",
                  textDecoration: "underline",
                },
              }}
            >
              More
            </Button>
          </>
        ) : (
          // If not truncatable OR already expanded, show full content
          review.content
        )}
      </Typography>
    </Box>
  );
}

export default function ReviewsList({
  reviews,
  loading,
  error,
}: {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}): React.ReactElement {
  const theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAll, setShowAll] = useState<boolean>(false);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
        Error: cannot load reviews list
      </Typography>
    );
  }

  const maxVisible: number = isMobile ? 3 : 9;
  const visibleReviews: Review[] = showAll
    ? reviews
    : reviews.slice(0, maxVisible);
  const columns: number = isMobile ? 1 : 3;

  const reviewItems = visibleReviews.map((r) => (
    <ReviewItem key={r.id} review={r} isMobile={isMobile} />
  ));

  return (
    <Box sx={{ mt: 3 }}>
      {isMobile ? (
        <Stack spacing={3}>{reviewItems}</Stack>
      ) : (
        <Masonry columns={columns} spacing={3}>
          {reviewItems}
        </Masonry>
      )}

      {reviews.length > maxVisible && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => setShowAll(!showAll)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              py: 1,
              fontSize: "1rem",
              background: showAll
                ? "linear-gradient(135deg, #caf0f8, #ade8f4)"
                : "linear-gradient(135deg, #0077b6, #00b4d8)",
              color: showAll ? "#0077b6" : "#fff",
              "&:hover": {
                background: showAll
                  ? "linear-gradient(135deg, #90e0ef, #caf0f8)"
                  : "linear-gradient(135deg, #00b4d8, #90e0ef)",
              },
            }}
          >
            {showAll ? "Show Less" : "Show More Reviews"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
