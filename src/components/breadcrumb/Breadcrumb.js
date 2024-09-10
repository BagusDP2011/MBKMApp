import React, { useState, useEffect } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link as LinkRouter } from "@mui/material";
import { Link } from "react-router-dom";

export default function Breadcrumb({title}) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [breadcrumbNameMap, setBreadcrumbMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBreadcrumb() {
      try {
        const response = await fetch('http://localhost:3001/api/breadcrumb');
        const data = await response.json();
        console.log(data)
        setBreadcrumbMap(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getBreadcrumb();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      {title}
    </Breadcrumbs>
  );
}
