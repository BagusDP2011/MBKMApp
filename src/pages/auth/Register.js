import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Stack,
  Box,
  Card as MuiCard,
  Typography,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Home } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import BackgroundImage from "../../assets/img/backround.png";

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  height: "100vh",
  overflow: "hidden",
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "flex-end", // Align similar to SignIn page
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "500px",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: "#0D47A1",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
  color: "white",
  marginRight: theme.spacing(4),
}));

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    name: "",
    password: "",
    accountType: "personal",
    prodiId: "1",
    kontak: "",
    tempattanggallahir: "",

  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log(formData)
      const response = await axios.post(
        "http://localhost:3001/api/register",
        formData
      );
      alert("Registration successful! Redirecting to login page.");
      // navigate("/signin");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <RegisterContainer>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          // backgroundColor: "#282c34",
          padding: "5px",
        }}
      >
        {/* Tombol Kembali */}
        <IconButton
          sx={{
            position: "absolute",
            top: 5,
            right: 40,
            color: "black",
          }}
          onClick={() => navigate("/")}
        >
          <Home sx={{ marginRight: "4px" }} />
          <span style={{ fontSize: "14px", color: "black" }}>Kembali</span>
        </IconButton>
      </Box>
      <Card variant="outlined">
        <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
          Registrasi Mahasiswa
        </Typography>

        {/* <center>
          <FormControl component="fieldset" sx={{ marginBottom: "10px", color: "white" }}>
            <RadioGroup
              row
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <FormControlLabel
                value="personal"
                control={<Radio sx={{ color: "white", '&.Mui-checked': { color: "white" } }} />}
                label={<Typography sx={{ color: "white" }}>Personal</Typography>}
              />
              <FormControlLabel
                value="silam"
                control={<Radio sx={{ color: "white", '&.Mui-checked': { color: "white" } }} />}
                label={<Typography sx={{ color: "white" }}>Silam</Typography>}
              />
            </RadioGroup>
          </FormControl>
        </center> */}
        <FormControl
          component="fieldset"
          sx={{ marginTop: "10px", color: "white" }}
        >
          <FormLabel component="legend" sx={{ color: "white" }}>
            UserID / NIM
          </FormLabel>
          <TextField
            label="UserID / NIM"
            name="userId"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.userId}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#BBDEFB" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <FormLabel component="legend" sx={{ color: "white" }}>
            Name
          </FormLabel>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#BBDEFB" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <FormLabel component="legend" sx={{ color: "white" }}>
            Email
          </FormLabel>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#BBDEFB" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <FormLabel component="legend" sx={{ color: "white" }}>
            Password
          </FormLabel>
          <TextField
            label="Password harus lebih dari 6 angka atau huruf"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#BBDEFB" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <FormLabel component="legend" sx={{ color: "white" }}>
            Prodi
          </FormLabel>
          <FormControl fullWidth>
            <Select
              name="prodiId"
              value={formData.prodiId}
              onChange={handleChange}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#BBDEFB",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="1">D3 Informatika</MenuItem>
              <MenuItem value="2">D3 Geomatika</MenuItem>
              <MenuItem value="3">D4 Animasi</MenuItem>
              <MenuItem value="4">D4 Teknologi Rekayasa Multimedia</MenuItem>
              <MenuItem value="5">D4 Rekayasa Keamanan Siber</MenuItem>
              <MenuItem value="6">D4 Rekayasa Perangkat Lunak</MenuItem>
              <MenuItem value="7">S2 Rekayasa/ Teknik Komputer</MenuItem>
              <MenuItem value="8">D4 Teknologi Permainan</MenuItem>
            </Select>
        <FormLabel component="legend" sx={{ color: "white" }}>
            Kontak
          </FormLabel>
          <TextField
            label="Kontak"
            name="kontak"
            variant="outlined"
            fullWidth
            value={formData.kontak}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#BBDEFB" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <FormLabel component="legend" sx={{ color: "white" }}>
            Tempat Tanggal lahir
          </FormLabel>
          <TextField
            label="Tempat Tanggal lahir"
            name="tempattanggallahir"
            variant="outlined"
            fullWidth
            value={formData.tempattanggallahir}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#BBDEFB" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          </FormControl>
        </FormControl>

        <center>
          <Typography
            sx={{ fontSize: "16px", color: "white", marginTop: "10px" }}
          >
            Anda punya akun? Silahkan{" "}
            <a
              href="/signin"
              style={{ color: "#BBDEFB", textDecoration: "none" }}
            >
              login disini
            </a>
          </Typography>
        </center>
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: "10px",
            bgcolor: "#1E88E5",
            "&:hover": { bgcolor: "#1565C0" },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card>
    </RegisterContainer>
  );
};

export default RegistrationForm;
