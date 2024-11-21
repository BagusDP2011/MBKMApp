import React from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { Outlet } from "react-router-dom";


export default function ProfileEmergency() {
  return (
    <Container maxWidth="1200">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Kontak Darurat
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Nama" defaultValue="Bagus Bokap" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Hubungan"
              defaultValue="Saudara Kandung"
            >
              <MenuItem value="Orang Tua">Orang Tua</MenuItem>
              <MenuItem value="Saudara Kandung">Saudara Kandung</MenuItem>
              <MenuItem value="Pasangan">Pasangan</MenuItem>
              <MenuItem value="Teman">Teman</MenuItem>
              {/* Tambahkan opsi lainnya jika diperlukan */}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nomor Telepon"
              defaultValue="081234567890"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Simpan Perubahan
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Outlet />
    </Container>
  );
}
