import React from "react";
import { Box } from "@mui/material";
import NotFoundImg from "../assets/img/404Cuate.svg";

export default function NotFound() {
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
