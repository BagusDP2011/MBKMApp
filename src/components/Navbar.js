import React from "react";
import { AppBar, Toolbar, Button, Box, Link } from "@mui/material";
import "../App.css";
import PolibatamLogo from "../assets/img/polibatam-white.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: "#7e9fbb", color: "#FFFFFF80" }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          marginLeft: 25,
          marginRight: 25,
          height: 80,
        }}
      >
        <Box sx={{ marginTop: 4 }}>
          <img
            src={PolibatamLogo}
            alt="SILAM Logo"
            height="50px"
            style={{ marginRight: "10px" }}
          />
          <Button
            color="inherit"
            sx={{
              fontWeight: "bold",
              fontSize: 30,
              marginBottom: 4,
              color: "white",
            }}
          >
            S I L A M
          </Button>
        </Box>
        <Button
          color="inherit"
          sx={{ fontWeight: 400, fontSize: 20, textTransform: "none" }}
        >
          Beranda
        </Button>
        <Button
          color="inherit"
          sx={{ fontWeight: 400, fontSize: 20, textTransform: "none" }}
        >
          Beasiswa
        </Button>
        <Button
          color="inherit"
          sx={{ fontWeight: 400, fontSize: 20, textTransform: "none" }}
        >
          Wisuda
        </Button>
        <Button
          color="inherit"
          sx={{ fontWeight: 400, fontSize: 20, textTransform: "none" }}
        >
          MBKM
        </Button>
        <Button
          color="inherit"
          sx={{ fontWeight: 400, fontSize: 20, textTransform: "none" }}
        >
          Informasi Lainnya
        </Button>
          <Button
            color="inherit"
            variant="contained"
            sx={{
              fontWeight: 600,
              fontSize: 20,
              textTransform: "none",
              color: "#7e9fbb",
            }}
            onClick={() => navigate("/menu")}
          >
            Login
          </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
