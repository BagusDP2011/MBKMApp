import React, { useState } from "react";
import { Stack } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const menus = [
  {
    webMenuId: 0,
    title: "Menu",
    url: "/menu",
    index: true,
  },
  {
    webMenuId: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    webMenuId: 2,
    title: "Files",
    icon: <DescriptionOutlinedIcon />,
    child: [
      {
        webMenuId: 3,
        title: "Achievements",
        url: "/achievements",
        icon: <TrendingUpIcon />,
      },
    ],
  },
].filter(item => !item.index);



export default function MenuContent(menu) {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isSubMenu, setIsSubMenu] = useState(null);

  const handleMenuClick = (id) => {
    setIsSubMenu(false);
    setSelectedMenu(id);
  };

  const handleSubMenuClick = (id) => {
    setIsSubMenu(true);
    setSelectedSubMenu(id);
  };

  const handleOpenSubMenuClick = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  return (
    <Stack>
      <List disablePadding dense>
        {menus.map((item) => (
          <React.StrictMode key={item.webMenuId}>
            <ListItem dense>
              <ListItemButton
                sx={{ columnGap: 1 }}
                selected={item.webMenuId === selectedMenu && !isSubMenu}
                onClick={() =>
                  item.child
                    ? handleOpenSubMenuClick(item.webMenuId)
                    : handleMenuClick(item.webMenuId)
                }
              >
                <ListItemIcon sx={{ minWidth: "max-content" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
                {item.child ? (
                  item.webMenuId === openSubmenu ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>

            {item.child && (
              <Collapse
                in={item.webMenuId === openSubmenu}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" dense>
                  {item.child.map((subMenu) => (
                    <ListItem
                      key={subMenu.webMenuId}
                      disablePadding
                      sx={{ pl: 4 }}
                    >
                      <ListItemButton
                        sx={{ columnGap: 1 }}
                        selected={
                          subMenu.webMenuId === selectedSubMenu && isSubMenu
                        }
                        onClick={() => handleSubMenuClick(subMenu.webMenuId)}
                      >
                        <ListItemIcon sx={{ minWidth: "max-content" }}>
                          {subMenu.icon}
                        </ListItemIcon>
                        <ListItemText primary={subMenu.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.StrictMode>
        ))}
      </List>
    </Stack>
  );
}
