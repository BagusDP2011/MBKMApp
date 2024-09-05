import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import MenuContent from "./MenuContent";
import { Stack, Avatar, Box, Typography } from "@mui/material";
import AvatarLogo from "../../logo.svg";

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
  return (
    <Drawer variant="permanent">
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
          alt="Fahrizal Ali"
          src={AvatarLogo}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            Fahrizal Ali
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            frizali@gmail.com
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  );
}
