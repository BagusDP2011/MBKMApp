import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import MenuContent from "./MenuContent";
import { Divider } from "@mui/material";
import { Outlet } from "react-router-dom";


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
    <div>
      <Drawer variant="permanent">
        <MenuContent menus={menus} />
        <Divider />
      </Drawer>
      <Outlet/>
    </div>
  );
}
