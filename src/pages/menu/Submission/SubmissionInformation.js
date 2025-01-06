import React, { PureComponent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Link,
} from "@mui/material";

import Gb1 from "../../../assets/img/MBKM1.jpg";
import Gb2 from "../../../assets/img/MBKM2.jpg";
import Gb3 from "../../../assets/img/MBKM3.jpg";
import Gb4 from "../../../assets/img/MBKM4.jpg";
import Gb5 from "../../../assets/img/MBKM5.jpg";
import Gb6 from "../../../assets/img/MBKM6.png";
import Gb7 from "../../../assets/img/MBKM7.jpg";
import Gb8 from "../../../assets/img/MBKM8.png";

export default class SubmissionInformation extends PureComponent {
  render() {
    const programs = [
      {
        id: 1,
        image: Gb1,
        description: `Tujuan program penelitian/riset adalah memperkuat pool talent peneliti secara topikal, mendapatkan kompetensi penelitian melalui pembimbingan
        langsung oleh peneliti di lembaga riset/pusat studi, dan Meningkatkan ekosistem dan kualitas riset di laboratorium dan lembaga riset
        Indonesia.`,
      },
      {
        id: 3,
        image: Gb3,
        description: `Tujuan program kegiatan wirausaha adalah memberikan mahasiswa yang memiliki minat berwirausaha untuk
        mengembangkan usahanya lebih dini dan terbimbing dan menangani permasalahan pengangguran yang menghasilkan pengangguran
        intelektual dari kalangan sarjana.`,
      },

      {
        id: 4,
        image: Gb4,
        description: `TTujuan program studi/proyek independen adalah mewujudkan gagasan mahasiswa dalam mengembangkan produk inovatif yang
        menjadi gagasannya, menyelenggarakan pendidikan berbasis riset dan pengembangan (R&D), 
        dan meningkatkan prestasi mahasiswa dalam ajang nasional dan internasional.`,
      },

      {
        id: 5,
        image: Gb5,
        description: `Tujuan program membangun desa/kuliah kerja adalah memberikan kesempatan kepada mahasiswa untuk memanfaatkan ilmu pengetahuan, teknologi, dan keterampilan
        yang dimilikinya bekerjasama dengan banyak pemangku kepentingan di lapangan dan membantu percepatan pembangunan di wilayah pedesaan bersama dengan
        Kementerian Desa PDTT.`,
      },

      {
        id: 6,
        image: Gb6,
        description: `Tujuan program magang praktik kerja adalah memberikan pengalaman yang cukup kepada mahasiswa, pembelajaran langsung di tempat kerja (experiential learning). Selama magang
        mahasiswa akan mendapatkan hardskills (keterampilan, complex problem solving, analytical
        skills, dan lain-lain), maupun soft skills (etika profesi/kerja, komunikasi, kerjasama, dan lainlain).`,
      },

      {
        id: 7,
        image: Gb7,
        description: `Tujuan program asistensi mengajar di satuan pendidikan adalah memberikan kesempatan bagi mahasiswa yang memiliki minat dalam bidang
        pendidikan untuk turut serta mengajarkan dan memperdalam ilmunya dengan cara menjadi guru di satuan pendidikan dan
        membantu meningkatkan pemerataan kualitas pendidikan.`,
      },

      {
        id: 8,
        image: Gb8,
        description: `Tujuan program pertukaran pelajar adalah menunjang terpenuhinya capaian pembelajaran baik yang sudah tertuang dalam struktur kurikulum program studi
        maupun pengembangan kurikulum untuk memperkaya capaian pembelajaran lulusan yang
        dapat berbentuk mata kuliah pilihan.`,
      },
      {
        id: 2,
        image: Gb2,
        description: `Tujuan program proyek kemanusiaan adalah menyiapkan mahasiswa unggul yang menjunjung tinggi nilai kemanusiaan
        dalam menjalankan tugas berdasarkan agama, moral, dan etika serta melatih mahasiswa memiliki kepekaan sosial untuk menggali dan menyelami
        permasalahan.`,
      },

    ];
    return (
      <Box>
        <Box>
          {/* Header */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Selamat Datang di Sistem Informasi Merdeka Belajar Kampus
                Merdeka
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container sx={{ marginTop: 3 }}>
            {/* Welcome Message */}
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
              <Typography variant="body1" color="text.primary" component="span">
                Program Merdeka Belajar Kampus Merdeka adalah inisiatif dari
                Kementerian Pendidikan dan Kebudayaan untuk memberikan
                pengalaman belajar di luar kampus. Temukan semua informasi yang
                Anda butuhkan di halaman ini dan untuk panduan Kegiatan MBKM
                Polibatam dapat akses{" "}
              </Typography>
              <Link
                href="https://tr.ee/yR-rQMJn8S"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                underline="hover"
                variant="body1"
              >
                disini
              </Link>
              .
            </Paper>
          </Container>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} marginTop={4}>
            {/* Looping untuk setiap produk */}
            {programs.map((program) => (
              <Grid item xs={12} sm={8} md={6} key={program.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={program.image}
                  />

                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.primary"
                      style={{ wordWrap: "break-word" }}
                      textAlign="justify"
                    >
                      {program.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }
}
