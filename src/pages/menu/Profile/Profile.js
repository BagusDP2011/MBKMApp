import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Profile () {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
        <Outlet />
    </Box>
  );
}
