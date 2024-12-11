import React, { PureComponent } from 'react'
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
} from '@mui/material';

import Gb2 from "../../../assets/img/gambar2.jpg";
import Gb3 from "../../../assets/img/gambar5.png";
import Gb4 from "../../../assets/img/gambar6.png";
import Gb5 from "../../../assets/img/gambar7.jpg";
import Gb6 from "../../../assets/img/gambar8.jpg";
import Gb7 from "../../../assets/img/gambar9.jpg";

export default class SubmissionInformation extends PureComponent {
  render() {
    const products = [
      { id: 1, image: Gb2, description: `Program Magang dan Studi Independen Bersertifikat Kampus Merdeka memberikan kesempatan 
        kepada mahasiswa untuk mengasah dan mendapatkan kemampuan, pengetahuan dan sikap di dunia industri dengan cara bekerja 
        dan belajar secara langsung dalam proyek atau permasalahan riil. ` },
      { id: 2, image: Gb3, description: `Pertukaran pelajar/mahasiswa adalah kegiatan belajar mahasiswa diluar program studi
        asal untuk memperoleh pengalaman belajar dan kompetensi tambahan sesuai dengan
        minat mahasiswa dan ketersediaan mata kuliah di program studi tujuan` },
      { id: 3, image: Gb4, description: "dewi3" },
      { id: 4, image: Gb5, description: "dewi4" },
      { id: 5, image: Gb6, description: "dewi5" },
      { id: 6, image: Gb7, description: "dewi6" },
    ];
    return (
     <Container sx={{ marginTop: "20px" }}>
        <Box>
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Selamat Datang di Sistem Informasi Merdeka Belajar Kampus Merdeka
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container sx={{ marginTop: 3 }}>
          {/* Welcome Message */}
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="body1" color="text.primary" component="span">
              Program Merdeka Belajar Kampus Merdeka adalah inisiatif dari Kementerian Pendidikan dan Kebudayaan 
              untuk memberikan pengalaman belajar di luar kampus. Temukan semua informasi yang Anda butuhkan di halaman ini 
              dan untuk panduan Kegiatan MBKM Polibatam dapat akses{" "}
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
          </Link>.
          </Paper>
        </Container>
        </Box>

        <Grid container spacing={4} marginTop={4}>
        {/* Looping untuk setiap produk */}
        {products.map((product) => (
          <Grid item xs={12} sm={8} md={6} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
              />
                
              <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <Typography variant="body2" color="text.primary" style={{ wordWrap: 'break-word'}}>
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
    )
  }
}