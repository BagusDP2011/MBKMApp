import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon } from "./CustomIcons";
import { login } from "../../service/Auth.Service";
import { AuthContext } from "../../service/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../components/AlertProvider";
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';

import LogoImage from "../../assets/img/informatika.png";
import BackgroundImage from "../../assets/img/backround.png";
import Swal from "sweetalert2";
import { Home } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "450px",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: "#0D47A1",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
  color: "white",
  marginRight: theme.spacing(4),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "flex-end",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export default function SignIn(props) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  // Efek untuk menampilkan pesan logout
  useEffect(() => {
    // Cek apakah ada pesan logout di localStorage
    const message = localStorage.getItem("logoutMessage");
    if (message) {
      setLogoutMessage(message);
      // Hapus pesan dari localStorage setelah ditampilkan
      localStorage.removeItem("logoutMessage");

      // Hilangkan pesan setelah 2 detik
      const timer = setTimeout(() => {
        setLogoutMessage("");
      }, 2000);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    try {
      const token = await login({
        user: data.get("user"),
        email: data.get("email"),
        password: data.get("password"),
      });
      if (token) {
        loginContext(token);
        Swal.fire({
          title: "Success!",
          text: "Login berhasil!",
          icon: "success",
        });
        navigate("/menu");
      } else {
        console.error("Login failed, no token returned");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Anda gagal untuk masuk, silahkan coba lagi!",
        icon: "error",
      });
      console.error("Error during login:", error);
    }
  };

  const validateInputs = () => {
    const user = document.getElementById("user");
    const password = document.getElementById("password");

    let isValid = true;

    if (!user.value || !/\S+@\S+\.\S+/.test(user.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <SignInContainer>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          // backgroundColor: "#282c34",
          padding: "10px",
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
      {/* Pesan Logout */}
      {logoutMessage && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 800,
            width: "20%",
            backgroundColor: "#dff0d8",
            color: "#",
            padding: "10px",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          {logoutMessage}
        </Box>
      )}

      <Card variant="outlined">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src={LogoImage}
            alt="Logo"
            style={{ width: "300px", height: "240px" }}
          />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="user" sx={{ color: "white" }}>
              Email
            </FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="user"
              type="user"
              name="user"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#BBDEFB" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                  color: "white",
                },
                color: "white",
              }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password" sx={{ color: "white" }}>
                Password
              </FormLabel>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline", color: "#BBDEFB" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#BBDEFB" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" sx={{ color: "white" }} />}
            label="Remember me"
            sx={{ color: "white" }}
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            sx={{ bgcolor: "#1E88E5", "&:hover": { bgcolor: "#1565C0" } }}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center", color: "white" }}>
            Anda tidak punya akun? Silahkan{" "}
            <span>
              <Link
                href="/register"
                variant="body2"
                sx={{ alignSelf: "center", color: "#BBDEFB" }}
              >
                Daftar
              </Link>
            </span>
          </Typography>
        </Box>
        {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Google")}
            startIcon={<GoogleIcon />}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "#BBDEFB",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Sign in with Google
          </Button>
        </Box> */}
      </Card>
    </SignInContainer>
  );
}
