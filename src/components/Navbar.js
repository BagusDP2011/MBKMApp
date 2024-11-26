import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import PolibatamLogo from "../assets/img/polibatam-white.png";
import MBKM from "../assets/img/KampusMerdekaBelajar.png";
import { useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";

const programItems = [
  { label: "Beasiswa", path: "/beasiswa" },
  { label: "Wisuda", path: "/wisuda" },
  { label: "Pertukaran Mahasiswa", path: "/pertukaran-mahasiswa" },
];

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#2452A8", width: "100%", top: 0, zIndex: 1000 }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
          height: 80,
        }}
      >
        {/* Logo dan Judul */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => navigate("/")} sx={{ p: 0 }}>
            <img
              src={PolibatamLogo}
              alt="Polibatam Logo"
              height="50px"
              style={{ marginRight: "10px" }}
            />
          </IconButton>
          <IconButton onClick={() => navigate("/")} sx={{ p: 0 }}>
            <img
              src={MBKM}
              alt="MBKM"
              height="50px"
              style={{ marginRight: "10px" }}
            />
          </IconButton>
        </Box>

        {/* Menu Navigasi */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            sx={{
              fontWeight: 400,
              fontSize: 18,
              textTransform: "none",
              "&:hover": {
                color: "white",
                textDecoration: "underline",
              },
            }}
          >
            Beranda
          </Button>

          {/* Menu Program dengan Dropdown */}
          <Button
            color="inherit"
            startIcon={<DescriptionIcon />}
            onClick={handleMenuOpen}
            sx={{
              fontWeight: 400,
              fontSize: 18,
              textTransform: "none",
              "&:hover": {
                color: "white",
                textDecoration: "underline",
              },
            }}
          >
            Program
          </Button>

          {/* Dropdown Items */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose(null)}
            sx={{ mt: 2 }}
          >
            {programItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuClose(item.path)}
                sx={{
                  fontSize: 16,
                  "&:hover": { bgcolor: "#d4e2f0", color: "#2452A8" },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Tombol Login */}
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FFFFFF",
            color: "#7e9fbb",
            fontWeight: 600,
            fontSize: 16,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#d4e2f0",
            },
          }}
          onClick={() => navigate("/signin")}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
