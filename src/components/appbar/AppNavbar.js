import React from "react";
import { AppBar, Typography, Box, Stack } from "@mui/material";
import Logo from "../../assets/img/KampusMerdekaBelajar.png";

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
        px: "32px",
        py: 1,
        zIndex: 1201,
      }}
    >
      <Stack direction="row" sx={{gap:1}}>
        {/* <Box sx={{ width: "70px", height: "auto" }}>
          <img src={Logo} width="100%" />
        </Box> */}
        <Typography
          variant="h5"
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          MBKM
        </Typography>
      </Stack>
    </AppBar>
  );
}
