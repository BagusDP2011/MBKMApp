import React, { PureComponent } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";

export default class SubmissionInformation extends PureComponent {
  render() {
    return (
      <Container maxWidth="1200" sx={{ paddingTop: 4 }}>
        {/* Program Information */}
        {/* <Box mb={2}>
          <Typography variant="h6">Web Development & UI/UX Design</Typography>
          <Typography variant="body2">ID Kegiatan: 10613836</Typography>
          <Typography variant="body2">
            Periode program: 6 Sep 2024 - 31 Des 2024
          </Typography>
          <Button variant="text" color="primary">
            Lihat Detail
          </Button>
        </Box> */}

        {/* Informasi */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Informasi</Typography>
            <Typography variant="body2">
              Jika terjadi kendala dan butuh bantuan, hubungi mentor dan DPP
              (Dosen Pembimbing Program). Informasi kontak tersedia{" "}
              <Button variant="text" color="primary">
                di sini
              </Button>
              .
            </Typography>
          </CardContent>
        </Card>

        {/* Syarat Sertifikat */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Lengkapi Persyaratan untuk Dapat Sertifikat!
            </Typography>
            <Typography variant="body2">
              Kamu hanya bisa dapatkan sertifikat setelah semua persyaratan
              lengkap
            </Typography>
            <ul>
              <li>Seluruh laporan bulanan lengkap dan disetujui oleh mentor</li>
              <li>Laporan akhir telah dikumpulkan</li>
            </ul>
            <Button variant="outlined" color="primary" fullWidth>
              Download Sertifikat
            </Button>
          </CardContent>
          <Alert severity="warning" sx={{ m: 2 }}>
            Segera lengkapi laporan untuk pencairan BBH dan sertifikat program!
          </Alert>
        </Card>

        {/* Dashboard Laporan Aktivitas */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Dashboard Laporan Aktivitas</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Isi Laporan Bulanan & Laporan Akhir di sini. Pastikan semua
              laporan selesai sesuai jadwal.
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>
                Progress Laporanmu
              </Typography>
              <LinearProgress
                variant="determinate"
                value={25}
                sx={{ flex: 1 }}
              />
            </Box>
            <Typography variant="body2" sx={{ mt: 1, ml: 2 }}>
              <li>3 laporan bulanan belum dibuat</li>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 2 }}>
              <li>Laporan akhir belum diunggah</li>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Lihat
            </Button>
          </CardContent>
        </Card>

        {/* Lacak Pembiayaan BBH */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Lacak Pembiayaan BBH</Typography>
            <Typography variant="body2">
              Cek dan lacak status proses pembiayaan Bantuan Biaya Hidup (BBH).
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Lihat
            </Button>
          </CardContent>
        </Card>

        {/* Penilaian Mentor */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Penilaian Mentor - Oktober</Typography>
            <Typography variant="body2">
              Beri penilaian kamu terhadap mentor sebagai bahan evaluasi.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Beri Penilaian
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }
}
