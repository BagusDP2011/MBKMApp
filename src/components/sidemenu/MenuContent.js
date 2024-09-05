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
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function MenuContent({ menus }) {
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
                component={Link}
                to={
                  item.webMenuId === item.parentId &&
                  item.child &&
                  item.child.length > 0
                    ? null
                    : item.url
                }
                sx={{ columnGap: 1 }}
                selected={item.webMenuId === selectedMenu && !isSubMenu}
                onClick={() =>
                  item.child && item.child.length > 0
                    ? handleOpenSubMenuClick(item.webMenuId)
                    : handleMenuClick(item.webMenuId)
                }
              >
                <ListItemIcon sx={{ minWidth: "max-content" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
                {item.child && item.child.length > 0 ? (
                  item.webMenuId === openSubmenu ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>

            {item.child && item.child.length > 0 && (
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
                        component={Link}
                        to={subMenu.url}
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
