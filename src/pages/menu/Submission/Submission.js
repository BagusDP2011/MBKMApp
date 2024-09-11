import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

function Submission() {
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    programStudy: "",
    supervisor: "",
    freedomProgramType: "",
    reasonForChoosing: "",
    activityTitle: "",
    partnerInstitution: "",
    position: "",
    activityDuration: "",
    activityDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log("Form submitted:", formData);
  };

  return (
    <Container sx={{ mx: 0 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Pendaftaran MBKM Politeknik Negeri Batam Jurusan Teknik Informatika
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
              <Divider xs={12} md={12} sx={{marginTop: 2, marginBottom: 2}}>Data Diri</Divider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nama Lengkap"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="NIM"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Program Studi"
                name="programStudy"
                value={formData.programStudy}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <TextField
                fullWidth
                label="Wali Dosen"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                required
              /> */}
              <FormControl fullWidth>
                <InputLabel>Wali Dosen / Penanggung Jawab</InputLabel>
                <Select
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="DosenA">Dosen A</MenuItem>
                  <MenuItem value="DosenB">Dosen B</MenuItem>
                  <MenuItem value="DosenC">Dosen C</MenuItem>
                  <MenuItem value="DosenD">Dosen D</MenuItem>
                  <MenuItem value="DosenE">Dosen E</MenuItem>
                  <MenuItem value="DosenF">Dosen F</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider xs={12} md={12} sx={{marginTop: 5, marginBottom: 2}}>Program MBKM</Divider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Jenis Program Merdeka</InputLabel>
                <Select
                  name="freedomProgramType"
                  value={formData.freedomProgramType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Program A">Proyek Kemanusiaan</MenuItem>
                  <MenuItem value="Program B">Kegiatan Wirausaha</MenuItem>
                  <MenuItem value="Program C">Studi Independen</MenuItem>
                  <MenuItem value="Program C">Kuliah Kerja Nyata</MenuItem>
                  <MenuItem value="Program C">Magang Praktik Kerja</MenuItem>
                  <MenuItem value="Program C">
                    Asistensi Mengajar di Satuan Pendidikan
                  </MenuItem>
                  <MenuItem value="Program C">Pertukaran Pelajar</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alasan Memilih Program"
                name="reasonForChoosing"
                value={formData.reasonForChoosing}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Judul Kegiatan"
                name="activityTitle"
                value={formData.activityTitle}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nama Lembaga Mitra/ Perusahaan"
                name="partnerInstitution"
                value={formData.partnerInstitution}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Posisi Di Perusahaan"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Durasi Kegiatan"
                name="activityDuration"
                value={formData.activityDuration}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rincian Kegiatan"
                name="activityDetails"
                value={formData.activityDetails}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Daftar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Submission;
