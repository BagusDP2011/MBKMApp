import React from "react";
import { Box, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import NotFoundImg from "../assets/img/404Cuate.svg";

export default function NotFound({ isLoading }) {
  if (isLoading) {
    return (
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          columnGap: 1,
        }}
      >
        <CircularProgress /> Loading...
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <img
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
          src={NotFoundImg}
          alt="Page not found"
        />
      </div>
    </Box>
  );
}
