import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link as LinkRouter } from "@mui/material";
import { Link } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbNameMap = {
    "/menu": "Menu",
    "/menu/dashboard": "Dashboard",
    "/menu/mbkm": "MBKM",
    "/menu/mbkm/informasi": "Informasi",
    "/menu/mbkm/pengajuan": "Pengajuan",
    "/menu/mbkm/daftar%20pengajuan": "Daftar Pengajuan",
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography key={to} sx={{ color: "text.primary" }}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter
            component={Link}
            underline="hover"
            color="inherit"
            to={to}
            key={to}
          >
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}
