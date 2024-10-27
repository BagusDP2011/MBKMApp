import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";

export default function ProfileBank() {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "auto",
        mt: 4,
        p: 2,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Rekening Bank
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Semua pendanaan dari Kampus Merdeka akan ditransfer ke rekening ini.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nama Bank"
            defaultValue="BNI"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nomor Rekening"
            defaultValue="906245818"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nama Pemilik Rekening"
            defaultValue="BAGUS DWI PUTRA"
            disabled
          />
        </Grid>
      </Grid>
    </Box>
  );
}
