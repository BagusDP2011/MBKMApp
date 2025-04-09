import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Logbook() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" />;
  }
  const parameters = [
    "Program bermanfaat bagi pengembangan diri (Softskill dan hardskill)",
    "Ilmu yang diperoleh di kampus dapat diimplementasikan pada kegiatan Merdeka Belajar",
    "Mendapat pengalaman dan ilmu baru yang belum diperoleh saat belajar di kampus",
    "Pengelolaan program Merdeka Belajar efektif",
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <Outlet />
      <Box maxWidth="md" mx="auto" p={3}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Umpan Balik Kegiatan Merdeka Belajar
            <br />
            Politeknik Negeri Batam
          </Typography>

          {/* Data Mahasiswa */}
          <Box mb={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              1. Data Mahasiswa
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <b>Nama</b>: Anjani Maitri
              </Grid>
              <Grid item xs={12} sm={6}>
                <b>NIM</b>: 3312010222
              </Grid>
              <Grid item xs={12} sm={6}>
                <b>Program Studi</b>: Teknik Informatika
              </Grid>
              <Grid item xs={12} sm={6}>
                <b>Jenis Program</b>: Pertukaran Pelajar
              </Grid>
              <Grid item xs={12}>
                <b>Tempat Merdeka Belajar</b>: Politeknik Negeri Batam
              </Grid>
            </Grid>
            <Typography
              variant="caption"
              color="text.secondary"
              mt={1}
              display="block"
            >
              *Isikan dengan tempat mahasiswa melakukan kegiatan Merdeka Belajar
              (cth. Tempat magang, Studi Independen, Proyek Kemanusiaan, dll).
            </Typography>
          </Box>

          {/* Parameter Evaluasi */}
          <Box mb={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              2. Parameter Evaluasi
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Parameter</TableCell>
                    <TableCell align="center">
                      Sangat Setuju
                      <br />
                      (-4)
                    </TableCell>
                    <TableCell align="center">
                      Setuju
                      <br />
                      (-3)
                    </TableCell>
                    <TableCell align="center">
                      Kurang Setuju
                      <br />
                      (-2)
                    </TableCell>
                    <TableCell align="center">
                      Tidak Setuju
                      <br />
                      (-1)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parameters.map((param, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{param}</TableCell>
                      {[...Array(4)].map((_, i) => (
                        <TableCell align="center" key={i}>
                          <RadioGroup row name={`param${index}`}>
                            <FormControlLabel
                              value={`opt${i}`}
                              control={<Radio size="small" />}
                              label=""
                            />
                          </RadioGroup>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Kesan dan Pesan */}
          <Box mb={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              3. Kesan dan Pesan terhadap Kegiatan Merdeka Belajar
            </Typography>

            <Box mb={2}>
              <FormLabel component="legend">
                1. Kesan terhadap program Merdeka Belajar:
              </FormLabel>
              <TextField
                fullWidth
                defaultValue="Bagus, karena dengan program ini mahasiswa jadi banyak memiliki peluang untuk mengikuti kegiatan."
                variant="outlined"
                size="small"
                margin="dense"
              />
            </Box>

            <Box mb={2}>
              <FormLabel component="legend">
                2. Kendala ketika mengikuti program Merdeka Belajar:
              </FormLabel>
              <TextField
                fullWidth
                defaultValue="Tidak ada."
                variant="outlined"
                size="small"
                margin="dense"
              />
            </Box>

            <Box mb={2}>
              <FormLabel component="legend">
                3. Masukan untuk pengelolaan program Merdeka Belajar:
              </FormLabel>
              <TextField
                fullWidth
                defaultValue="Tidak ada."
                variant="outlined"
                size="small"
                margin="dense"
              />
            </Box>
          </Box>

          <Box textAlign="right">
            <Button variant="contained" color="success">
              Simpan
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
