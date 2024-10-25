import React, { useState, useContext } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
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
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../service/AuthContext";

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontWeight: 500,
  },
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
  const { logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    logoutContext();
    navigate("/signin");
  };

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
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Box>
        <Stack direction="row" sx={{ gap: 1, alignItems: "center", p: 3 }}>
          <AutoAwesomeIcon sx={{ fontSize: "2.5rem", color: "#3F8CFE" }} />
          <Typography variant="h5" fontWeight="900" color="#252e4a">
            MBKM
          </Typography>
        </Stack>
        <List disablePadding dense>
          {menus.map((item) => (
            <React.StrictMode key={item.MenuID}>
              <ListItem sx={{ color: "#A6A6A6", fontWeight: 500 }} dense>
                <CustomListItemButton
                  component={Link}
                  to={
                    item.MenuID === item.ParentID &&
                    item.child &&
                    item.child.length > 0
                      ? null
                      : item.url
                  }
                  sx={{ columnGap: 1.5 }}
                  selected={item.MenuID === selectedMenu && !isSubMenu}
                  onClick={() =>
                    item.child && item.child.length > 0
                      ? handleOpenSubMenuClick(item.MenuID)
                      : handleMenuClick(item.MenuID)
                  }
                >
                  <ListItemIcon
                    sx={{ minWidth: "max-content", color: "#A6A6A6" }}
                  >
                    {getIcon(item.Icon)}
                  </ListItemIcon>
                  <ListItemText>{item.Title}</ListItemText>
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
                  <List
                    component="div"
                    dense
                    sx={{ color: "#A6A6A6", fontWeight: 500 }}
                  >
                    {item.child.filter((item) => !item.HideMenu).map((subMenu) => (
                      <ListItem
                        key={subMenu.MenuID}
                        disablePadding
                        sx={{ pl: 4 }}
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
                            sx={{ fontWeight: 500 }}
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
      </Box>
      {/* <List disablePadding dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} sx={{ color: "#A6A6A6", fontWeight: 500 }}>
            <CustomListItemButton sx={{ columnGap: 1 }}>
              <ListItemIcon sx={{ minWidth: "max-content", color: "#A6A6A6" }}>
                {item.Icon}
              </ListItemIcon>
              <ListItemText primary={item.Text} />
            </CustomListItemButton>
          </ListItem>
        ))}
      </List> */}

      <List disablePadding dense>
        <ListItem>
          <CustomListItemButton sx={{ columnGap: 1 }} onClick={() => logout()}>
            <ListItemIcon sx={{ minWidth: "max-content", color: "#A6A6A6" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </CustomListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
