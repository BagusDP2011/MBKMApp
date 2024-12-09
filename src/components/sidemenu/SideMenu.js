import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import MenuContent from "./MenuContent";
import { Stack, Avatar, Box, Typography } from "@mui/material";
import AvatarLogo from "../../assets/img/Profile.jpg";
import {jwtDecode} from "jwt-decode";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
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
        <Avatar
          sizes="small"
          alt="User Avatar"
          src={AvatarLogo}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {user}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            NIM: {NIM}
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  );
}
