// Profile.js
import React from "react";
import { Box, Container, Typography, Card, CardContent, Divider, Alert, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import EmergencyIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Outlet } from "react-router-dom";


export default function ProfileMenu() {
  // Fungsi untuk menangani navigasi atau pengiriman data saat mengklik item profil
  const handleClick = (section) => {
    // Gantikan URL sesuai dengan endpoint atau halaman yang ingin dituju
    console.log(`Navigating to ${section}`);
    // Contoh: Mengirim permintaan ke backend atau mengarahkan ke halaman lain
    // fetch(`https://api.example.com/${section}`, { method: "GET" });
  };

  return (
    <Container maxWidth="1200" sx={{ paddingTop: 4 }}>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6">Lihat/Edit Profil</Typography>
      </Box>

      {/* Notification */}
      <Alert severity="info" sx={{ mb: 2 , py: 4 }}>
        Fitur "Rekening Bank" ini hanya berlaku untuk program MSIB dan Kampus Mengajar. Apabila Anda mengikuti program PMM, silakan menghubungi Pusat Bantuan.
      </Alert>

      {/* Profile Sections */}
      <Card>
        <CardContent>
          <List component="nav">
            {/* Data Pribadi */}
            <ListItem button onClick={() => handleClick("data-pribadi")}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Data Pribadi" />
            </ListItem>
            <Divider />

            {/* Kontak Pribadi */}
            <ListItem button onClick={() => handleClick("kontak-pribadi")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Kontak Pribadi" />
            </ListItem>
            <Divider />

            {/* Kontak Darurat */}
            <ListItem button onClick={() => handleClick("kontak-darurat")}>
              <ListItemIcon>
                <EmergencyIcon />
              </ListItemIcon>
              <ListItemText primary="Kontak Darurat" />
            </ListItem>
            <Divider />

            {/* Akun Media Sosial */}
            <ListItem button onClick={() => handleClick("akun-media-sosial")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Akun Media Sosial" />
            </ListItem>
            <Divider />

            {/* Detail Rekening Bank */}
            <ListItem button onClick={() => handleClick("rekening-bank")}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Detail Rekening Bank" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Outlet />
    </Container>
  );
}
