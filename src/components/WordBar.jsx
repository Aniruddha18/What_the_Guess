import React from "react";
import { wordGuessItem } from "./style";
import { Box, Typography } from "@mui/material";

export const PercentageBar = ({ percentage, item }) => {
  const getColor = (percentage) => {
    if (percentage && percentage >= 95) {
      return "rgba(0, 255, 0, 0.8)"; // Bright Green for 95% and above with 80% opacity
    } else if (percentage >= 90) {
      return "rgba(0, 200, 0, 0.8)"; // Green for 90-94% with 80% opacity
    } else if (percentage >= 80) {
      return "rgba(0, 150, 0, 0.8)"; // Darker Green for 80-89% with 80% opacity
    } else if (percentage >= 70) {
      return "rgba(102, 204, 255, 0.8)"; // Light Blue for 70-79% with 80% opacity
    } else if (percentage >= 60) {
      return "rgba(51, 153, 255, 0.8)"; // Blue for 60-69% with 80% opacity
    } else if (percentage >= 50) {
      return "rgba(255, 204, 0, 0.8)"; // Yellow for 50-59% with 80% opacity
    } else if (percentage >= 40) {
      return "rgba(255, 153, 0, 0.8)"; // Orange for 40-49% with 80% opacity
    } else if (percentage >= 30) {
      return "rgba(255, 102, 0, 0.8)"; // Darker Orange for 30-39% with 80% opacity
    } else if (percentage >= 20) {
      return "rgba(255, 51, 0, 0.8)"; // Red-Orange for 20-29% with 80% opacity
    } else {
      return "rgba(255, 0, 0, 0.8)"; // Red for below 20% with 80% opacity
    }
  };

  const barStyle = {
    width: percentage ? `${percentage}%` : "0%",
    height: "100%",
    backgroundColor: getColor(percentage),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "5px",
    transition: "width 0.5s",
  };

  return (
    <Box sx={wordGuessItem}>
      <Box sx={barStyle}>
        <Typography component="i" variant="body1">
          <strong>{item}</strong>
        </Typography>
      </Box>
    </Box>
  );
};
