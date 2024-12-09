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
} from "@mui/material";
import Navbar from "./../components/Navbar";
import PoltekImage from "./../assets/img/bersama.jpg"; // Import gambar
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
      {/* Gambar penuh dengan teks */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "800px",
          backgroundImage: `url(${PoltekImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          <Typography
            variant="h4"
            sx={{ color: "#fff", fontWeight: "medium" }}
          >
            Teknik Informatika
          </Typography>
        </Box>
      </Box>

      {/* Card Pengumuman */}
      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            backgroundColor: "#e3f2fd", // Warna biru muda
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
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
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Panduan MBKM
        </Typography>
        <Divider sx={{ mb: 2 }} />
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

      {/* Footer - Informasi Kontak */}
      <Box sx={{ bgcolor: "#2452A8", color: "#fff", py: 2, mt: 4 }}>
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
            Jl. Ahmad Yani Batam Kota. Kota Batam. kepulauan Riau. Indonesia
            </Typography>
            <Typography variant="body1">
              Email:{" "}
              <Link href="mailto:info@polibatam.ac.id" sx={{ color: "#fff" }}>
                info@polibatam.ac.id
              </Link>
            </Typography>
            <Typography variant="body1">
              Fax: +62 778 123456
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default SilamKW;