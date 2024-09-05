import React from "react";
import { AppBar, Typography } from "@mui/material";

export default function AppNavbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "background.paper",
        backgroundImage: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        px:'32px',
        py:1,
        zIndex:1201
      }}
    >
      <Typography variant="h5" component="h5" sx={{ color: "text.primary", fontWeight:'bold' }}>
        Progam MBKM
      </Typography>
    </AppBar>
  );
}
