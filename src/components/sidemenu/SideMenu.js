import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import MenuContent from "./MenuContent";
import {
  Stack,
  Avatar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { AuthContext } from "../../service/AuthContext";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu({ menus }) {
  const [user, setUser] = useState(null);
  const [NIM, setNIM] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logoutContext } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#FF4C51",
      confirmButtonColor: "#3F8CFE",
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.setItem("logoutMessage", "Anda berhasil logout");
        logoutContext();
        navigate("/signin");
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.name);
        setNIM(decodedToken.id);
      } catch (error) {
        console.error("Failed to decode the token:", error);
        setUser("Tamu Terlarang");
        setNIM("NIM Tamu");
      }
    } else {
      setUser("Tamu Terlarang");
      setNIM("NIM Tamu");
    }
  }, []);

  return (
    <Drawer variant="permanent" sx={{ zIndex: 1000 }}>
      <MenuContent menus={menus} />

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {user && (
          <Avatar sx={{ width: 40, height: 40 }}>
            {user[0].toUpperCase()}
          </Avatar>
        )}
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            {user}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {NIM}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Drawer>
  );
}
