import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";

export default function ProfileEditContact() {
  const [alamatSama, setAlamatSama] = useState(false);

  const handleSwitchChange = () => {
    setAlamatSama(!alamatSama);
  };

  return (
    <Container maxWidth="1200">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Kontak Pribadi
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Informasi Kontak Pribadi
        </Typography>
        <Grid container spacing={2}>
          {/* Informasi Kontak */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              defaultValue="bagusdp2011@gmail.com"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nomor Ponsel"
              defaultValue="081278732817"
            />
          </Grid>

          {/* Alamat KTP */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Alamat KTP
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Provinsi"
              defaultValue="Prov. Kepulauan Riau"
            >
              <MenuItem value="Prov. Kepulauan Riau">
                Prov. Kepulauan Riau
              </MenuItem>
              <MenuItem value="Prov. Natuna">Prov. Natuna</MenuItem>
              {/* Tambahkan pilihan provinsi lainnya */}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kota/Kabupaten"
              defaultValue="Kota Batam"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kecamatan"
              defaultValue="Kec. Buliang"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Desa/Kelurahan"
              defaultValue="Batu Aji"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Kode Pos" defaultValue="29422" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Alamat" defaultValue="Genta 1" />
          </Grid>

          {/* Alamat Domisili */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Alamat Domisili
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={alamatSama}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              }
              label="Alamat Domisili sama dengan KTP"
            />
          </Grid>

          {!alamatSama && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Provinsi"
                  defaultValue="Prov. Kepulauan Riau"
                >
                  <MenuItem value="Prov. Kepulauan Riau">
                    Prov. Kepulauan Riau
                  </MenuItem>
                  <MenuItem value="Prov. Natuna">Prov. Natuna</MenuItem>
                  {/* Tambahkan pilihan provinsi lainnya */}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Kota/Kabupaten"
                  defaultValue="Kota Batam"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Kecamatan"
                  defaultValue="Kec. Buliang"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Desa/Kelurahan"
                  defaultValue="Batu Aji"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Kode Pos" defaultValue="29422" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Alamat"
                  defaultValue="Genta 1"
                />
              </Grid>
            </>
          )}

          {/* Koordinat Alamat Domisili */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Koordinat Alamat Domisili"
              placeholder="Isi dengan koordinat yang sesuai domisili. Contoh: -0.214049370713076, 104.98453910643149"
              helperText="Pastikan titik koordinat dan alamat domisili yang Anda tuliskan telah sesuai."
            />
          </Grid>

          {/* Tombol Simpan */}
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
