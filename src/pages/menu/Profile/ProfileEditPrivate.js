// Profile.js
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

export default function ProfileEditPrivate() {
  return (
    <Container maxWidth="1200">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Informasi Pribadi
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nama Panjang"
              defaultValue="BAGUS DWI PUTRA"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Jenis Kelamin"
              defaultValue="LAKI-LAKI"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tempat Kelahiran"
              defaultValue="BATAM"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tanggal Lahir"
              type="date"
              defaultValue="1997-11-20"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth select label="Agama" defaultValue="Islam">
              <MenuItem value="Islam">Islam</MenuItem>
              <MenuItem value="Kristen">Kristen</MenuItem>
              <MenuItem value="Katolik">Katolik</MenuItem>
              <MenuItem value="Hindu">Hindu</MenuItem>
              <MenuItem value="Buddha">Buddha</MenuItem>
              <MenuItem value="Konghucu">Konghucu</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="NIK"
              defaultValue="0000000000000000"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Perguruan Tinggi"
              defaultValue="Politeknik Negeri Batam"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="NIM" defaultValue="3312311132" disabled/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Program Studi"
              defaultValue="Teknik Informatika"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth select label="Jenjang" defaultValue="D3">
              <MenuItem value="D3">D3</MenuItem>
              <MenuItem value="D4">D4</MenuItem>
              <MenuItem value="S1">S1</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Semester Masuk"
              defaultValue="Ganji 2023"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Status Awal Mahasiswa"
              defaultValue="Peserta didik baru"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Asal SMA" defaultValue="SMKN 1 BATAM" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Simpan Perubahan
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}