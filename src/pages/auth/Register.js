import React, { useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Stack,
  Card as MuiCard
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";



// Styled components moved outside the functional component to avoid re-creation
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  maxWidth: "sm",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

// Main registration form component
const RegistrationForm = React.memo(() => {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    name: "",
    password: "",
    accountType: "personal",
    prodiId: "1",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      console.log('trial');
      console.log(formData);
      const response = await axios.post("http://localhost:3001/api/register", formData);
      console.log('sukses');
      alert("Registration successful! Redirecting to login page.");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <RegisterContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography variant="h5" gutterBottom>
          Registration
        </Typography>

        <center>
          <FormControl component="fieldset" sx={{ marginBottom: "10px" }}>
            <RadioGroup
              row
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <FormControlLabel
                value="personal"
                control={<Radio />}
                label="Personal"
              />
              <FormControlLabel value="silam" control={<Radio />} label="Silam" />
            </RadioGroup>
          </FormControl>
        </center>

        <TextField
          label="UserID / NIM"
          name="userId"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.userId}
          onChange={handleChange}
        />
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />

        <FormControl component="fieldset" sx={{ marginTop: "10px" }}>
          <FormLabel component="legend">Prodi</FormLabel>
          <RadioGroup
            row
            name="prodiId"
            value={formData.prodiId}
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Informatika" />
            <FormControlLabel value="2" control={<Radio />} label="Multimedia" />
            <FormControlLabel value="3" control={<Radio />} label="Geomatika" />
            {/* <FormControlLabel value="4" control={<Radio />} label="RPL" /> */}
          </RadioGroup>
        </FormControl>

        <Typography sx={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          By clicking Register, you agree on our{" "}
          <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>
            terms and conditions.
          </a>
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: "10px", backgroundColor: "#007bff", color: "#fff" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card>
    </RegisterContainer>
  );
});

export default RegistrationForm;
