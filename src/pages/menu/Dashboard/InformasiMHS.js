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
} from '@mui/material';

import Gb from "../../../assets/img/gambar1.jpg";
import Gb2 from "../../../assets/img/gambar2.jpg";
import Gb3 from "../../../assets/img/gambar5.png";
import Gb4 from "../../../assets/img/gambar6.png";
import Gb5 from "../../../assets/img/gambar7.jpg";
import Gb6 from "../../../assets/img/gambar8.jpg";
import Gb7 from "../../../assets/img/gambar9.jpg";

export default class InformasiMHS extends PureComponent {
  render() {
    const products = [
      { id: 1, name: "Produk A", price: "Rp100.000", stock: 10, image: Gb2 },
      { id: 2, name: "Produk B", price: "Rp200.000", stock: 5, image: Gb3 },
      { id: 3, name: "Produk C", price: "Rp300.000", stock: 8, image: Gb4 },
      { id: 4, name: "Studi/Proyek Independen", price: "Rp400.000", stock: 6, image: Gb5 },
      { id: 5, name: "Magang Praktik Kerja", price: "Rp500.000", stock: 4, image: Gb6 },
      { id: 6, name: "Kegiatan Wirausaha", price: "Rp600.000", stock: 7, image: Gb7 },
    ];
    return (
      <Container sx={{ marginTop: "20px" }}>
        <Box>
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Sistem Informasi dan Layanan Mahasiswa Polibatam
            </Typography>
          </Toolbar>
        </AppBar>
        </Box>

        <Grid container spacing={4} marginTop={4}>
        {/* Looping untuk setiap produk */}
        {products.map((product) => (
          <Grid item xs={12} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Deskripsi {product.name}. Ini adalah produk berkualitas tinggi
                  dengan fitur terbaik.
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