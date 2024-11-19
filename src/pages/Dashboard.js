import "./../App.css";
import React from "react";
// import { Typography, Grid, Box, Paper, Container, Button} from "@mui/material";
import { AppBar, Toolbar, Typography, Box, Container, Paper, Grid, Avatar, Button } from '@mui/material';
import { LineChart } from "@mui/x-charts/LineChart";

export default function Dashboard() {
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
    <Container sx={{ marginTop: "20px" }}>
      <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sistem Informasi dan Layanan Mahasiswa Polibatam
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ marginTop: 3 }}>
        {/* Welcome Message */}
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h5" gutterBottom>
            Selamat Datang Di Sistem Informasi dan Layanan Mahasiswa Polibatam
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Anda dapat menikmati layanan secara online.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Silakan lakukan update data diri terlebih dahulu di menu PROFILE sebelum melakukan pengajuan.
          </Typography>
        </Paper>

        {/* Student Data */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <Avatar
              alt={studentData.Name}
              src="/path/to/photo.jpg" // Replace with the real image path
              sx={{ width: 128, height: 128, margin: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
    </Container>
  );
}
