import React, { useState, useEffect } from "react";
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
import { decodeToken } from "../../../service/Auth.Service";
import axios from "axios";
import { useAlert } from "../../../components/AlertProvider";
import { getKuisioner } from "../../../service/Logbook.Service";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Kuisioner() {
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [kuisioner, setKuisioner] = React.useState({});
  const [locked, setLocked] = useState(false);

  const token = localStorage.getItem("token");
  const showAlert = useAlert();

  const parameters = [
    "Program bermanfaat bagi pengembangan diri (Softskill dan hardskill)",
    "Ilmu yang diperoleh di kampus dapat diimplementasikan pada kegiatan Merdeka Belajar",
    "Mendapat pengalaman dan ilmu baru yang belum diperoleh saat belajar di kampus",
    "Pengelolaan program Merdeka Belajar efektif",
  ];

  const [feedback, setFeedback] = useState({
    userId: user.id,
    kesan: "",
    kendala: "",
    masukan: "",
    evaluasi: Array(parameters.length).fill(""), // Inisialisasi array untuk evaluasi
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const dataToSend = {
      userId: user.id || null,
      evaluasi: JSON.stringify(feedback.evaluasi) || null,
      kesan: feedback.kesan || null,
      kendala: feedback.kendala || null,
      masukan: feedback.masukan || null,
    };

    console.log(dataToSend);

    try {
      const response = await axios.post(
        `http://localhost:3001/api/kuisioner`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        showAlert("Feedback successfully submitted");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        showAlert("Error occurred while submitting feedback");
      }
    } catch (error) {
      console.error(error);
      showAlert("Error occurred while submitting feedback");
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setRedirect(true);
        return;
      }

      const decodedUser = decodeToken();
      setUser(decodedUser);
      setFeedback((prev) => ({
        ...prev,
        userId: decodedUser.id,
      }));
      try {
        const data = await getKuisioner(decodedUser.id);
        setKuisioner(data[0]);
        if (data[0]) {
          setLocked(true);
        } else {
          setLocked(false);
        }
      } catch (error) {
        console.error("Error fetching kuisioner:", error);
      }
    };

    init();
  }, []);

  if (redirect) {
    return <Navigate to="/signin" />;
  }

  return (
    <Box maxWidth="xl" mx="auto" p={3}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {locked ? (
          <>
            <Outlet />
            <center>
              <CheckCircleIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
            </center>
            <Typography variant="h6" align="center" gutterBottom>
              Umpan Balik Sudah Diberikan
            </Typography>
            <Typography variant="body1" align="center" sx={{ mt: 2, mb: 3 }}>
              Terima kasih telah memberikan umpan balik terhadap kegiatan
              Merdeka Belajar. Data Anda sudah kami terima dan tidak dapat
              diubah kembali.
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              Jika ada perubahan atau informasi tambahan, silakan hubungi admin
              atau pihak pengelola program.
            </Typography>
          </>
        ) : (
          <>
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
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      1. Data Mahasiswa
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <b>Nama</b>: {user.name || ""}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <b>NIM</b>: {user.id || ""}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <b>Program Studi</b>: {user.prodiName || ""}
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
                      *Isikan dengan tempat mahasiswa melakukan kegiatan Merdeka
                      Belajar (cth. Tempat magang, Studi Independen, Proyek
                      Kemanusiaan, dll).
                    </Typography>
                  </Box>

                  {/* Parameter Evaluasi */}
                  <Box mb={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      2. Parameter Evaluasi
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Parameter</TableCell>
                            <TableCell align="center">
                              Tidak Setuju
                              <br />
                              (1)
                            </TableCell>
                            <TableCell align="center">
                              Kurang Setuju
                              <br />
                              (2)
                            </TableCell>
                            <TableCell align="center">
                              Setuju
                              <br />
                              (3)
                            </TableCell>
                            <TableCell align="center">
                              Sangat Setuju
                              <br />
                              (4)
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
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    ml={4}
                                  >
                                    <RadioGroup
                                      row
                                      name={`evaluasi_${index}`} // Nama unik untuk setiap parameter
                                      value={feedback.evaluasi[index]}
                                      onChange={(e) => {
                                        const newEvaluasi = [
                                          ...feedback.evaluasi,
                                        ];
                                        newEvaluasi[index] = e.target.value; // Update nilai evaluasi untuk parameter tertentu
                                        setFeedback((prev) => ({
                                          ...prev,
                                          evaluasi: newEvaluasi,
                                        }));
                                      }}
                                    >
                                      <FormControlLabel
                                        value={`${i + 1}`}
                                        control={<Radio size="small" />}
                                        label=""
                                      />
                                    </RadioGroup>
                                  </Box>
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
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      3. Kesan dan Pesan terhadap Kegiatan Merdeka Belajar
                    </Typography>

                    <Box mb={2}>
                      <FormLabel component="legend" for="kesan">
                        1. Kesan terhadap program Merdeka Belajar:
                      </FormLabel>
                      <TextField
                        multiline
                        minRows={3}
                        fullWidth
                        value={feedback.kesan}
                        name="kesan"
                        id="kesan"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        margin="dense"
                      />
                    </Box>

                    <Box mb={2}>
                      <FormLabel component="legend" for="kendala">
                        2. Kendala ketika mengikuti program Merdeka Belajar:
                      </FormLabel>
                      <TextField
                        multiline
                        minRows={3}
                        fullWidth
                        value={feedback.kendala}
                        name="kendala"
                        id="kendala"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        margin="dense"
                      />
                    </Box>

                    <Box mb={2}>
                      <FormLabel component="legend" for="masukan">
                        3. Masukan untuk pengelolaan program Merdeka Belajar:
                      </FormLabel>
                      <TextField
                        multiline
                        minRows={3}
                        fullWidth
                        value={feedback.masukan}
                        name="masukan"
                        id="masukan"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        margin="dense"
                      />
                    </Box>
                  </Box>

                  <Box textAlign="right">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleSubmit}
                    >
                      Simpan
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
