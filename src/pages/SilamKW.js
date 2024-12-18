import React from "react";
import {
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Link,
  Avatar,
} from "@mui/material";
import Navbar from "./../components/Navbar";
import vidiofile from "./../assets/vidio/1130.mp4";
import KampusMerdekaLogo from "./../assets/img/KampusMerdekaBelajar.png";
import gambarJur1 from "./../assets/jur/gambarJur1.png";
import gambarJur2 from "./../assets/jur/gambarJur2.png";
import gambarJur3 from "./../assets/jur/gambarJur3.png";
import gambarJur4 from "./../assets/jur/gambarJur4.png";
import gambarJur5 from "./../assets/jur/gambarJur5.png";
import gambarJur6 from "./../assets/jur/gambarJur6.png";
import gambarJur7 from "./../assets/jur/gambarJur7.png";
import gambarJur8 from "./../assets/jur/gambarJur8.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const announcements = [
  {
    date: "19 November 2024",
    content: "Pendaftaran untuk program beasiswa tahun 2024 telah dibuka.",
  },
  {
    date: "20 November 2024",
    content: "Pengumuman terkait jadwal wisuda akan segera dirilis.",
  },
  {
    date: "21 November 2024",
    content: "Info terbaru mengenai program MBKM semester depan.",
  },
];

function SilamKW() {
  return (
    <div className="App">
      <Navbar />
      {/* Video sebagai latar belakang */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          src={vidiofile} // Menggunakan video sebagai background
          type="video/mp4"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1, // Agar video di belakang konten
          }}
        />
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "#fff", fontWeight: "bold", mb: 1 }}
          >
            Merdeka Belajar Kampus Merdeka
          </Typography>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: "medium" }}>
            Teknik Informatika
          </Typography>
        </Box>
      </Box>

      {/* Card Pengumuman */}
      <Container sx={{ mt: 10 }}>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            backgroundColor: "#e3f2fd", // Warna biru muda
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Pengumuman Terbaru
          </Typography>
          <List>
            {announcements.map((announcement, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: 2,
                  marginBottom: 2,
                }}
              >
                <ListItemText
                  primary={announcement.content}
                  secondary={`Tanggal: ${announcement.date}`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Lihat Semua Pengumuman
          </Button>
        </Box>
      </Container>

      {/* Panduan MBKM */}
      <Container sx={{ mt: 15 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Panduan MBKM
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="body1" sx={{ mb: 2 }}>
          Program MBKM (Merdeka Belajar Kampus Merdeka) adalah inisiatif dari
          Kementerian Pendidikan untuk memberikan kebebasan kepada mahasiswa
          dalam memilih jalur belajar. Berikut adalah panduan singkat untuk
          program ini:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. Pilihan Program"
              secondary="Pilih program seperti magang, pertukaran mahasiswa, atau riset sesuai minat."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2. Pendaftaran"
              secondary="Daftar melalui portal MBKM resmi atau hubungi koordinator kampus."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3. Proses Seleksi"
              secondary="Ikuti seleksi sesuai ketentuan program yang dipilih."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="4. Pelaksanaan Program"
              secondary="Mulai program dengan bimbingan dosen dan supervisor terkait."
            />
          </ListItem>
        </List>
      </Container>

      {/* Card Animasi */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 6, mt: 20 }}>
        Jurusan Teknik Informatika
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 4,
          flexWrap: "wrap",
          marginLeft: 10,
        }}
      >
        {[
          // Daftar program jurusan
          {
            title: "D3 Informatika",
            description:
              "Lulusan kami berkarir dan berkontribusi secara aktif dan inovatif dalam mengidentifikasi dan menyelesaikan berbagai masalah bidang Informatika",
            image: gambarJur1,
          },
          {
            title: "D3 Geomatika",
            description:
              "Lulusan program Teknologi Geomatika akan mencapai karir yang sukses sebagai teknisi profesional dalam survei, yang spesialis dalam pengukuran dan pemetaan Teknologi Geomatika serta ilmu Bumi",
            image: gambarJur2,
          },
          {
            title: "D4 Animasi",
            description:
              "Program Studi Animasi produksi gambar bergerak, video dan program televisi, perekam suara dan penerbitan musik bidang Animasi",
            image: gambarJur3,
          },
          {
            title: "D4 Teknologi Rekayasa Multimedia",
            description:
              "Lulusan program studi Sarjana Terapan Teknologi Rekayasa Multimedia memiliki kompetensi keahlian produksi multimedia",
            image: gambarJur4,
          },
          {
            title: "D4 Rekayasa Keamanan Siber",
            description:
              "Bekerja dengan pemangku kepentingan di seluruh organisasi untuk memastikan bahwa kontrol keamanan dan kepatuhan terintegrasi ke dalam proses bisnis dan sistem.",
            image: gambarJur5,
          },
          {
            title: "D4 Rekayasa Perangkat Lunak",
            description:
              "Program Studi D4 Rekayasa Perangkat Lunak berfokus menyiapkan lulusan sarjana terapan pada bidang pengembangan perangkat lunak yang memiliki kemampuan analisis, desain, perancangan, validasi, pengembangan (Pemograman), penjamin kualitas dan keamanan perangkat lunak (Software) untuk menghasilkan karya teknologi yang dapat berfungsi secara efektif dan efisien",
            image: gambarJur6,
          },
          {
            title: "S2 Rekayasa/ Teknik Komputer",
            description:
              "Profil Profesional Mandiri merupakan cerminan pencapaian kualitas yang diharapkan program studi untuk dimiliki oleh lulusan setelah berkarir dalam profesinya selama 3 (tiga) – 5 (lima) tahun.",
            image: gambarJur7,
          },
          {
            title: "D4 Teknologi Permainan",
            description:
              "Program Studi Sarjana Terapan Teknologi Permainan Politeknik Negeri Batam berfokus menyiapkan lulusan sarjana terapan pada bidang pengembangan Game yang memiliki kemampuan analisis, desain, perancangan, validasi, pengembangan (pemrograman), penjaminan kualitas, dan keamanan Game (software) untuk menghasilkan karya teknologi yang dapat berfungsi secara efektif dan efisien.",
            image: gambarJur8,
          },
        ].map((program, index) => (
          <Box
            key={index}
            sx={{
              width: "300px",
              height: "400px",
              perspective: "1000px", // Membuat efek 3D
              margin: 2,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transition: "transform 0.6s",
                "&:hover": {
                  transform: "rotateY(180deg)", // Membalikkan card
                },
              }}
            >
              {/* Sisi Depan */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  backgroundColor: "#6599B5", // Warna sisi depan
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  boxShadow: 3,
                }}
              >
                {/* Image Display */}
                <img
                  src={program.image} // Image source from program object
                  alt={program.title}
                  style={{ width: "200px", height: "auto", marginBottom: "10px" }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fff" }}
                >
                  {program.title}
                </Typography>
              </Box>

              {/* Sisi Belakang */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  backgroundColor: "#434141", // Warna sisi belakang
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  boxShadow: 3,
                  transform: "rotateY(180deg)", // Posisi awal sisi belakang
                }}
              >
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {program.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Garis Pemisah */}
      <Divider sx={{ mt: 6, mb: 5 }} />

      {/* Logo Kampus Merdeka yang bisa diklik */}
      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Partner
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Link
            href="https://kampusmerdeka.kemdikbud.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#2452A8",
              fontWeight: "bold",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Avatar
              alt="Logo Kampus Merdeka"
              src={KampusMerdekaLogo}
              sx={{
                width: 100,
                height: 50,
                mr: 2,
                borderRadius: 0,
              }}
            />
          </Link>
        </Box>
      </Container>

      {/* Footer - Informasi Kontak */}
      <Box sx={{ bgcolor: "#2452A8", color: "#fff", py: 15, mt: 4 }}>
        <Container>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
            Informasi Kontak
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body1">
              Jl. Ahmad Yani Batam Kota. Kota Batam. Kepulauan Riau. Indonesia
            </Typography>
            <Typography variant="body1">
              Email:{" "}
              <Link href="mailto:info@polibatam.ac.id" sx={{ color: "#fff" }}>
                info@polibatam.ac.id
              </Link>
            </Typography>
            <Typography variant="body1">Fax: +62 778 123456</Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default SilamKW;
