import React, { useState } from "react";
import { Stack } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import { BorderColor, BorderLeft, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { HelpOutline } from "@mui/icons-material";
import { iconsMap } from "../../mapItem/mapItem";
import { styled } from "@mui/material/styles";

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '.7rem 1.4rem',
  "&.Mui-selected": {
    boxShadow: "inset 4px 0 0 0 #3F8CFE",
    color: "#3F8CFE",
    "& .MuiListItemIcon-root": {
      color: "#3F8CFE",
    },
  },
}));


const secondaryListItems = [
  { Text: "Settings", Icon: <SettingsSuggestOutlinedIcon /> },
  { Text: "About", Icon: <InfoOutlined /> },
  { Text: "Feedback", Icon: <HelpOutline /> },
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

  const getIcon = (IconString) => {
    return iconsMap[IconString];
  };

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between", mt: "60px" }}>
      <List disablePadding>
        {menus.map((item) => (
          <React.StrictMode key={item.MenuID}>
            <ListItem disablePadding>
              <CustomListItemButton
                component={Link}
                to={
                  item.MenuID === item.ParentID &&
                  item.child &&
                  item.child.length > 0
                    ? null
                    : item.url
                }
                sx={{ columnGap: 1 }}
                selected={item.MenuID === selectedMenu && !isSubMenu}
                onClick={() =>
                  item.child && item.child.length > 0
                    ? handleOpenSubMenuClick(item.MenuID)
                    : handleMenuClick(item.MenuID)
                }
              >
                <ListItemIcon sx={{ minWidth: "max-content" }}>
                  {getIcon(item.Icon)}
                </ListItemIcon>
                <ListItemText sx={{ fontWeight: 600 }}>
                  {item.Title}
                </ListItemText>
                {item.child && item.child.length > 0 ? (
                  item.MenuID === openSubmenu ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </CustomListItemButton>
            </ListItem>

            {item.child && item.child.length > 0 && (
              <Collapse
                in={item.MenuID === openSubmenu}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding component="div">
                  {item.child.map((subMenu) => (
                    <ListItem
                      key={subMenu.MenuID}
                      disablePadding
                      sx={{ pl: 2 }}
                    >
                      <CustomListItemButton
                        component={Link}
                        to={subMenu.url}
                        sx={{ columnGap: 1 }}
                        selected={
                          subMenu.MenuID === selectedSubMenu && isSubMenu
                        }
                        onClick={() => handleSubMenuClick(subMenu.MenuID)}
                      >
                        <ListItemIcon sx={{ minWidth: "max-content" }}>
                          {getIcon(subMenu.Icon)}
                        </ListItemIcon>
                        <ListItemText
                          primary={subMenu.Title}
                          sx={{ fontWeight: 600 }}
                        />
                      </CustomListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.StrictMode>
        ))}
      </List>

      <List disablePadding>
        {secondaryListItems.map((item, index) => (
          <ListItem disablePadding key={index} sx={{ display: "block" }}>
            <CustomListItemButton sx={{ columnGap: 1 }}>
              <ListItemIcon sx={{ minWidth: "max-content" }}>
                {item.Icon}
              </ListItemIcon>
              <ListItemText primary={item.Text} sx={{ fontWeight: 600 }} />
            </CustomListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
