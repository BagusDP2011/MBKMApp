import React, { PureComponent, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Alert,
  Divider,
} from "@mui/material";

export default function AttachmentSubmission() {
  const [files, setFiles] = useState({
    cv: "",
    transcript: "",
    ktp: "",
    organization: "",
    additional: "",
  });

  const [loading, setLoading] = useState(false); // State for loading status
  const [message, setMessage] = useState(""); // State for response message

  const handleFileChange = (e, fileType) => {
    setFiles({
      ...files,
      [fileType]: e.target.files[0] ? e.target.files[0].name : "",
    });
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading state saat pengiriman data dimulai
    setMessage(""); // Kosongkan pesan sebelumnya

    try {
      // const response = await fetch("https://api.example.com/upload-documents", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(files),
      // });


      // if (!response.ok) {
      //   throw new Error("Gagal mengirim data ke server.");
      // }
      console.log(files);
      // const data = await response.json();
      // setMessage("Data berhasil dikirim!"+ data ); // Set pesan sukses
    } catch (error) {
      setMessage(error.message); // Set pesan error
    } finally {
      setLoading(false); // Set loading state selesai
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6">Lengkapi Dokumen</Typography>
        <Typography variant="body2">
          Lengkapi profil dan dokumenmu untuk dapat mendaftar program.
          Informasimu akan kami simpan dengan aman.
        </Typography>
      </Box>

      {/* Warning Alert */}
      <Alert severity="warning" sx={{ mb: 5 }}>
        Pastikan kamu mengumpulkan dokumen sesuai ketentuan, ya!
        <li>Kesalahan data pada dokumen berakibat penolakan.</li>
        <li>Pemalsuan dokumen berakibat masuk ke daftar blacklist.</li>
      </Alert>

      {/* Document Upload Fields */}
      <Card sx={{ mb: 5 }}>
        <CardContent>
          {/* Curriculum Vitae */}
          <Box mb={2}>
            <Typography variant="subtitle1">
              Curriculum Vitae (Wajib)
            </Typography>
            <Typography variant="body2">
              Unggah CV kamu dalam format PDF dengan ukuran maksimal 2MB
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
              {files.cv || "Belum ada file yang dipilih"}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color="primary"
            >
              Ganti File
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, "cv")}
              />
            </Button>
          </Box>

          <Divider />

          {/* Transkrip Nilai */}
          <Box mb={2} mt={2}>
            <Typography variant="subtitle1">Transkrip Nilai (Wajib)</Typography>
            <Typography variant="body2">
              Unggah Transkrip Nilai kamu dalam format PDF dengan ukuran
              maksimal 2MB
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
              {files.transcript || "Belum ada file yang dipilih"}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color="primary"
            >
              Ganti File
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, "transcript")}
              />
            </Button>
          </Box>

          <Divider />

          {/* KTP */}
          <Box mb={2} mt={2}>
            <Typography variant="subtitle1">KTP (Wajib)</Typography>
            <Typography variant="body2">
              Unggah foto KTP kamu dalam format PDF dengan ukuran maksimal 2MB
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
              {files.ktp || "Belum ada file yang dipilih"}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color="primary"
            >
              Ganti File
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, "ktp")}
              />
            </Button>
          </Box>

          <Divider />

          {/* Sertifikat Pengalaman Organisasi */}
          <Box mb={2} mt={2}>
            <Typography variant="subtitle1">
              Sertifikat Pengalaman Organisasi (Opsional)
            </Typography>
            <Typography variant="body2">
              Kamu bisa tambahkan sertifikat dengan maksimal ukuran 5 MB
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
              {files.organization || "Belum ada file yang dipilih"}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color="primary"
            >
              Pilih File
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, "organization")}
              />
            </Button>
          </Box>

          <Divider />

          {/* Dokumen Tambahan */}
          <Box mb={2} mt={2}>
            <Typography variant="subtitle1">
              Dokumen Tambahan (Jika Perlu)
            </Typography>
            <Typography variant="body2">
              Unggah file dalam format PDF dengan ukuran maksimal 2 MB
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
              {files.additional || "Belum ada file yang dipilih"}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color="primary"
            >
              Pilih File
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, "additional")}
              />
            </Button>
          </Box>
        </CardContent>
      </Card>

      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {/* Save Button */}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </Container>
  );
}
