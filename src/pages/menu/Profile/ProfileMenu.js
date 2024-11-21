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
  Paper
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import EmergencyIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DocIcon from "@mui/icons-material/DescriptionOutlined";
import SaveIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeluarIcon from "@mui/icons-material/LogoutOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Outlet } from "react-router-dom";

export default function ProfileMenu() {
  const handleClick = (section) => {
    console.log(`Navigating to ${section}`);
  };
  const studentData = {
    NIM: '3312311132',
    Name: 'Bagus Dwi Putra',
    Phone: '081278732817',
    Email: 'bagusdp2011@gmail.com',
    Address: 'Perum Muka Kuning Indah 1 Blk Z no 24',
    Program: 'D3 - Teknik Informatika',
    Status: 'Aktif',
    Class: 'Malam - C',
    Advisor: 'Amirul Mu`minin, S.Ds., M.Ds.',
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6">Lihat/Edit Profil</Typography>
      </Box>

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

        </Box>
        <Box flex="1">
          {/* Notification */}
          <Alert severity="info" sx={{ mb: 3, py: 2 }}>
            Fitur "Rekening Bank" ini hanya berlaku untuk program MSIB dan
            Kampus Mengajar. Apabila Anda mengikuti program PMM, silakan
            menghubungi Pusat Bantuan.
          </Alert>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              DATA DIRI MAHASISWA
            </Typography>
            {Object.entries(studentData).map(([key, value]) => (
              <Typography key={key} variant="body1">
                <strong>{key}:</strong> {value}
              </Typography>
            ))}
            <Box mt={2}>
              <Button variant="contained" color="primary">
                Update Data
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Outlet />
    </Container>
  );
}
