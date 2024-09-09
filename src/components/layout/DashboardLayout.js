import React from "react";
import { Box, Stack } from "@mui/material";
import SideMenu from "../sidemenu/SideMenu";
import AppNavbar from "../appbar/AppNavbar";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../breadcrumb/Breadcrumb";

export default function DashboardLayout({ menus }) {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu menus={menus} />
      <AppNavbar />
      <Box component="main" sx={{ width: "100%", mt:9 }}>
        <Stack spacing={2} sx={{ mx: 3 }}>
          <Stack
            spacing={2}
            sx={{
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Breadcrumb />
            <Outlet />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}