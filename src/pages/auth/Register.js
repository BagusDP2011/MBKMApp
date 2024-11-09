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
} from "@mui/material";
import axios from 'axios';
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";

// Separate input component
const MyInput = ({ label, name, value, onChange, type = "text", ...props }) => (
  <TextField
    label={label}
    name={name}
    type={type}
    variant="outlined"
    fullWidth
    margin="normal"
    value={value}
    onChange={onChange}
    {...props}
  />
);

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userID: "",
    email: "",
    name: "",
    password: "",
    accountType: "personal",
    ProdiID: "1",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/register", formData);
      alert("Registration successful: " + JSON.stringify(response.data));
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

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
    maxWidth: 'sm',
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
  }));

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

        {/* Use MyInput component for each TextField */}
        <MyInput
          label="UserID / NIM"
          name="userID"
          type="number"
          value={formData.userID}
          onChange={handleChange}
        />
        <MyInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <MyInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <MyInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <FormControl component="fieldset" sx={{ marginTop: "10px" }}>
          <FormLabel component="legend">ProdiID</FormLabel>
          <RadioGroup
            row
            name="ProdiID"
            value={formData.ProdiID}
            onChange={handleChange}
          >
            <FormControlLabel value="IF" control={<Radio />} label="IF" />
            <FormControlLabel value="Meka" control={<Radio />} label="Meka" />
            <FormControlLabel value="Elektro" control={<Radio />} label="Elektro" />
            <FormControlLabel value="Welding" control={<Radio />} label="Welding" />
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
};

export default RegistrationForm;
