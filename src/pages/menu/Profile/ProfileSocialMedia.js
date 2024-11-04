import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Outlet } from "react-router-dom";


export default function ProfileSocialMedia () {
  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialMedia((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic untuk menyimpan perubahan
    console.log('Data disimpan:', socialMedia);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 1200,
        margin: 'auto',
        mt: 4,
        p: 2,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Akun Media Sosial
      </Typography>
      
      <TextField
        label="Facebook"
        name="facebook"
        variant="outlined"
        fullWidth
        margin="normal"
        value={socialMedia.facebook}
        onChange={handleChange}
      />

      <TextField
        label="Instagram"
        name="instagram"
        variant="outlined"
        fullWidth
        margin="normal"
        value={socialMedia.instagram}
        onChange={handleChange}
      />

      <TextField
        label="Twitter"
        name="twitter"
        variant="outlined"
        fullWidth
        margin="normal"
        value={socialMedia.twitter}
        onChange={handleChange}
      />

      <Typography variant="body2" color="textSecondary" sx={{ mt: 1, textAlign: 'center' }}>
        Silakan kosongkan apabila kamu tidak memiliki akun media sosial
      </Typography>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: '#ff6b6b',
          ':hover': {
            backgroundColor: '#ff4c4c',
          },
        }}
      >
        Simpan Perubahan
      </Button>
      <Outlet />
    </Box>
  );
};