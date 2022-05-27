import React from "react";
import { Box, LinearProgress } from "@mui/material";

export function LinearLoader() {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: ["flex-start", "flex-start", "center"],
      }}
    >
      <LinearProgress sx={{ width: 1 }} />
    </Box>
  );
}
