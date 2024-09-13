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
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { HelpOutline } from "@mui/icons-material";
import { iconsMap } from "../../mapItem/mapItem";
import { styled } from "@mui/material/styles";

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#EBF3FF",
    color: "#3F8CFE",
    "& .MuiListItemIcon-root": {
      color: "#3F8CFE",
    },
  },
}));

const secondaryListItems = [
  { text: "Settings", icon: <SettingsSuggestOutlinedIcon /> },
  { text: "About", icon: <InfoOutlined /> },
  { text: "Feedback", icon: <HelpOutline /> },
];

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

  const getIcon = (iconString) => {
    return iconsMap[iconString];
  };

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between", mt: "60px" }}>
      <List disablePadding dense>
        {menus.map((item) => (
          <React.StrictMode key={item.menuId}>
            <ListItem dense>
              <CustomListItemButton
                component={Link}
                to={
                  item.menuId === item.parentId &&
                  item.child &&
                  item.child.length > 0
                    ? null
                    : item.url
                }
                sx={{ columnGap: 1 }}
                selected={item.menuId === selectedMenu && !isSubMenu}
                onClick={() =>
                  item.child && item.child.length > 0
                    ? handleOpenSubMenuClick(item.menuId)
                    : handleMenuClick(item.menuId)
                }
              >
                <ListItemIcon sx={{ minWidth: "max-content" }}>
                  {getIcon(item.icon)}
                </ListItemIcon>
                <ListItemText sx={{ fontWeight:500 }}>{item.title}</ListItemText>
                {item.child && item.child.length > 0 ? (
                  item.menuId === openSubmenu ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </CustomListItemButton>
            </ListItem>

            {item.child && item.child.length > 0 && (
              <Collapse
                in={item.menuId === openSubmenu}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" dense>
                  {item.child.map((subMenu) => (
                    <ListItem
                      key={subMenu.menuId}
                      disablePadding
                      sx={{ pl: 4 }}
                    >
                      <CustomListItemButton
                        component={Link}
                        to={subMenu.url}
                        sx={{ columnGap: 1 }}
                        selected={
                          subMenu.menuId === selectedSubMenu && isSubMenu
                        }
                        onClick={() => handleSubMenuClick(subMenu.menuId)}
                      >
                        <ListItemIcon sx={{ minWidth: "max-content" }}>
                          {getIcon(subMenu.icon)}
                        </ListItemIcon>
                        <ListItemText primary={subMenu.title} sx={{ fontWeight:500 }} />
                      </CustomListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.StrictMode>
        ))}
      </List>

      <List disablePadding dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} sx={{ display: "block" }}>
            <CustomListItemButton sx={{ columnGap: 1 }}>
              <ListItemIcon sx={{ minWidth: "max-content" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ fontWeight:500 }} />
            </CustomListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
