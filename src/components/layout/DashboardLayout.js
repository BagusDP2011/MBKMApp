import React from "react";
import { Box, Stack } from "@mui/material";
import SideMenu from "../sidemenu/SideMenu";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { Navigate } from "react-router-dom";

export default function DashboardLayout({ menus }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu menus={menus} />
      <Box component="main" sx={{ width: "100%", mt: 3 }}>
        <Stack sx={{ mx: 3 }}>
          <Stack
            spacing={2}
            sx={{
              mx: 12,
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
