import "./App.css";
import React from "react";
import { Typography, Grid, Container, Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
// import SilamBG from "./assets/img/silam-bg.JPG";
import SilamBGTop from "./assets/img/silam-bg-top.JPG";
import SilamHP from "./assets/img/silam-hp.png";
import SilamWonder from "./assets/img/silam-wonder.svg";
import Navbar from "./components/Navbar.js";
function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  return (
    <div className="App">
      <Navbar />
      <body>
        <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            SILAM
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Sistem Informasi & Layanan Mahasiswa
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Politeknik Negeri Batam
          </Typography>

          <img
            src={SilamBGTop}
            alt="Silam Background"
            height="100%"
            width="100%"
            sx={{ marginTop: "-100px", zIndex: -1 }}
          />
          {/* style={{ objectFit: "cover" }} */}

          <Box>Tabel kotak disini</Box>

          <Box
            sx={{
              marginTop: 50,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item sx={{ boxShadow: "none" }}>
                  <img
                    src={SilamHP}
                    alt="Silam Gambar HP"
                    height="100%"
                    width="100%"
                    sx={{ marginTop: "-100px", zIndex: -1 }}
                  />
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item
                  sx={{ textAlign: "left", fontSize: 20, boxShadow: "none" }}
                >
                  <Typography sx={{ fontSize: 34, fontWeight: 700 }}>
                    Apa saja jenis layanan yang tersedia?
                  </Typography>
                  <Typography sx={{ fontSize: 25 }}>
                    SILAM menyediakan pelayanan mahasiswa dan memberikan
                    informasi terkini.
                  </Typography>
                  <br />
                  <Typography sx={{ fontSize: 25 }}>
                    Selain sebagai pusat pelayanan, SILAM merupakan pusat
                    informasi bagi:
                  </Typography>
                  <Typography sx={{ fontSize: 25 }}>
                    <li>Mahasiswa aktif polibatam</li>
                    <li>Alumni polibatam</li>
                    <li>Masyarakat umum dan lainnya</li>
                  </Typography>
                  <br />
                  <Typography sx={{ fontSize: 25 }}>
                    Kami akan berusaha memberikan pelayanan dan informasi yang
                    tepat sesuai dengan permintaan dan kebutuhan. Hal-hal lain
                    yang tidak dapat diselesaikan langsung akan kami arahkan ke
                    unit terkait yang ada di kami.
                  </Typography>
                </Item>
              </Grid>
            </Grid>
          </Box>

          <hr />
          <Box
            sx={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 50,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item sx={{ textAlign: "left", fontSize: 20, boxShadow: "none" }}>
                  <Typography sx={{ fontSize: 34, fontWeight: 700 }}>Tentang SILAM</Typography>
                  <Typography sx={{ fontSize: 25 }}>
                    Sistem Informasi dan Layanan Mahasiswa (SILAM) Politeknik
                    Negeri Batam tempat terkumpulnya informasi dan layanan
                    mahasiswa yang diperlukan mahasiswa. Informasi terkait
                    Wisuda , Konseling dan Pelayanan UKT juga terdapat pada
                    SILAM. Mahasiswa tidak perlu merasa kesulitan lagi untuk
                    mencari informasi yang diperlukan , cukup mengakses SILAM
                    dan cari yang diperlukan.
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item sx={{ boxShadow: "none" }}>
                  <img
                    src={SilamWonder}
                    alt="Silam Gambar Orang"
                    height="100%"
                    width="100%"
                    sx={{ marginTop: "-100px", zIndex: -1 }}
                  />{" "}
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </body>
    </div>
  );
}

export default App;
