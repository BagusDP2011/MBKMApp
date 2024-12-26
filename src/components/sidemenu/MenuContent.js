import React, { useState, useContext } from "react";
import {
  Box,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
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
import { iconsMap } from "../../mapItem/mapItem";
import { styled } from "@mui/material/styles";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../service/AuthContext";
import lambang from "../../assets/img/lambang.png";

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontWeight: 500,
  },
  "&.Mui-selected": {
    boxShadow: "inset 5px 0 0 0 #3F8CFE",
    color: "#3F8CFE",
    "& .MuiListItemIcon-root": {
      color: "#3F8CFE",
    },
  },
}));

export default function MenuContent({ menus }) {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isSubMenu, setIsSubMenu] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const { logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };
  const handleLogoutConfirm = () => {
    localStorage.setItem("logoutMessage", "Anda berhasil logout");
    logoutContext();
    navigate("/signin");
  };
  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };
  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Konfirmasi Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Anda yakin ingin keluar dari aplikasi?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Batal
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Ya, Keluar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pesan Logout */}
      {logoutMessage && (
        <Typography
          sx={{
            backgroundColor: "#dff0d8",
            color: "#3c763d",
            padding: "10px",
            textAlign: "center",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          {logoutMessage}
        </Typography>
      )}

      <Box>
        <Stack 
          sx={{ 
            gap: 1, 
            alignItems: "center", 
            p: 3,
            justifyContent: "center",
            flexDirection: "column" 
          }}
        >
          <img
            src={lambang} 
            alt="MBKM Logo" 
            style={{ 
              maxWidth: "800px", 
              maxHeight: "100px"
            }} 
          />
        </Stack>
        {/* <Stack direction="row" sx={{ gap: 1, alignItems: "center", p: 3 }}>
          <AutoAwesomeIcon sx={{ fontSize: "2.5rem", color: "#3F8CFE" }} />
          <Typography variant="h5" fontWeight="900" color="#252e4a">
            MBKM
          </Typography>
        </Stack> */}

        <List disablePadding dense>
          {menus.map((item) => (
            <React.Fragment key={item.MenuID}>
              <ListItem sx={{ color: "#A6A6A6", fontWeight: 20 }} dense>
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
                    {item.child
                      .filter((item) => !item.HideMenu)
                      .map((subMenu) => (
                        <ListItem
                          key={subMenu.MenuID}
                          disablePadding
                          sx={{ pl: 2.5 }}
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
                              sx={{ fontWeight: 700 }}
                            />
                          </CustomListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* <List disablePadding dense>
        <ListItem>
          <CustomListItemButton
            sx={{ columnGap: 1 }}
            onClick={handleLogoutClick}
          >
            <ListItemIcon sx={{ minWidth: "max-content", color: "#A6A6A6" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </CustomListItemButton>
        </ListItem>
      </List> */}
    </Stack>
  );
}
