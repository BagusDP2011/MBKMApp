import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import EmergencyIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DocIcon from '@mui/icons-material/DescriptionOutlined';
import SaveIcon from '@mui/icons-material/BookmarkBorderOutlined';
import KeluarIcon from '@mui/icons-material/LogoutOutlined';
import EditIcon from "@mui/icons-material/Edit";
import { Outlet } from "react-router-dom";

export default function ProfileMenu() {
  const handleClick = (section) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6">Lihat/Edit Profil</Typography>
      </Box>

      {/* Notification */}
      <Alert severity="info" sx={{ mb: 3, py: 2 }}>
        Fitur "Rekening Bank" ini hanya berlaku untuk program MSIB dan Kampus Mengajar. Apabila Anda mengikuti program PMM, silakan menghubungi Pusat Bantuan.
      </Alert>

      <Box display="flex" gap={3}>
        {/* Profile and Contact Information */}
        <Box flex="1">
          {/* Profile Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src="/path/to/profile-photo.jpg"
                  alt="Profile Photo"
                  sx={{ width: 64, height: 64 }}
                />
                <Box>
                  <Typography variant="h6">Yusti Noviyanti</Typography>
                  <Typography variant="body2" color="textSecondary">
                    NIM : 3312311096
                  </Typography>
                </Box>
              </Box>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              >
                Edit Foto
              </Button>
            </CardContent>
          </Card>
          
          {/* Profile Menu */}
<Box flex="2">
  <Card>
    <CardContent>
      <List component="nav">
        <ListItem button onClick={() => handleClick("profil")} sx={{ py: 2 }}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profil" />
        </ListItem>
        <Divider light />

        <ListItem button onClick={() => handleClick("lengkapi-dokumen")} sx={{ py: 2 }}>
          <ListItemIcon>
            <DocIcon /> 
          </ListItemIcon>
          <ListItemText primary="Lengkapi Dokumen" />
        </ListItem>
        <Divider light />

        <ListItem button onClick={() => handleClick("item-tersimpan")} sx={{ py: 2 }}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary="Item Tersimpan" />
        </ListItem>
        <Divider light />

        <ListItem button onClick={() => handleClick("ganti-kata-sandi")} sx={{ py: 2 }}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Ganti Kata Sandi" />
        </ListItem>
        <Divider light />

        <ListItem button onClick={() => handleClick("keluar")} sx={{ py: 2 }}>
          <ListItemIcon>
            <KeluarIcon /> 
          </ListItemIcon>
          <ListItemText primary="Keluar" />
        </ListItem>
      </List>
    </CardContent>
  </Card>
</Box>
        </Box>
        <Box flex="2">
          <Card>
            <CardContent>
              <List component="nav">
                <ListItem button onClick={() => handleClick("data-pribadi")} sx={{ py: 2 }}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Data Pribadi" />
                </ListItem>
                <Divider light />

                <ListItem button onClick={() => handleClick("kontak-pribadi")} sx={{ py: 2 }}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Kontak Pribadi" />
                </ListItem>
                <Divider light />

                <ListItem button onClick={() => handleClick("kontak-darurat")} sx={{ py: 2 }}>
                  <ListItemIcon>
                    <EmergencyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Kontak Darurat" />
                </ListItem>
                <Divider light />

                <ListItem button onClick={() => handleClick("akun-media-sosial")} sx={{ py: 2 }}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Akun Media Sosial" />
                </ListItem>
                <Divider light />

                <ListItem button onClick={() => handleClick("rekening-bank")} sx={{ py: 2 }}>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Detail Rekening Bank" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Outlet />
    </Container>
  );
}
