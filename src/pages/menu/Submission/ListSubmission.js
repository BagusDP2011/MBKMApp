import React, { useState } from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Box, Stack, Typography } from "@mui/material";

export default function ListSubmission({ menuAccess, accessId }) {
  const [open, setOpen] = useState(false);  // State untuk modal
  const [submissionData, setSubmissionData] = useState({
    namaLengkap: "",
    nim: "",
    programStudi: "",
    dosenWali: "",
    jenisProgramMerdeka: "",
    judulKegiatan:"",
    alasanMemilih:"",
    namaLembaga:"",
    posisidiPerusahaan:"",
    rincianKegiatan:""

  });  // State untuk menyimpan data pengajuan

  const handleOpen = (data) => {
    setSubmissionData(data);  // Mengisi state dengan data pengajuan
    setOpen(true);  // Membuka modal
  };
  
  const handleClose = () => setOpen(false);  // Menutup modal

  // Dummy data submission yang mungkin kamu dapat dari tabel
  const dummySubmission = {
    namaLengkap: "Ahmed Al Kaf",
    nim: "1234567890",
    programStudi: "WASIT MAGANG",
    dosenWali: "PRESIDEN AFC",
    jenisProgramMerdeka: "Magang",
    judulKegiatan: "Merdeka",
    alasanMemilih: "Gatau",
    namaLembaga: "BAHRAIN",
    posisidiPerusahaan: "KEPALA SUKU",
    rincianKegiatan: "Tidur"
  };

  return (
    <React.StrictMode>
      {menuAccess.CanRead ? (
        <Stack>
          {/* Tabel pengajuan, di sini bisa memasukkan TableSubmission */}
          <TableSubmission access={menuAccess} accessId={accessId} />
          
          {/* Tombol untuk membuka modal, gunakan data dari tabel */}
          <Button variant="contained" onClick={() => handleOpen(dummySubmission)}>
            Open Submission Details
          </Button>

          {/* Modal dari Material-UI */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                Detail Pengajuan
              </Typography>
              
              {/* NAMA LENGKAP */}
              <TextField
                fullWidth
                label="NAMA LENGKAP"
                value={submissionData.namaLengkap}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              {/* NIM */}
              <TextField
                fullWidth
                label="NIM"
                value={submissionData.nim}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              {/* PROGRAM STUDI */}
              <TextField
                fullWidth
                label="PROGRAM STUDI"
                value={submissionData.programStudi}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              {/* DOSEN WALI */}
              <TextField
                fullWidth
                label="DOSEN WALI"
                value={submissionData.dosenWali}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              {/* JENIS PROGRAM MERDEKA */}
              <TextField
                fullWidth
                label="JENIS PROGRAM MERDEKA"
                value={submissionData.jenisProgramMerdeka}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              <TextField
                fullWidth
                label="JUDUL KEGIATAN"
                value={submissionData.judulKegiatan}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              <TextField
                fullWidth
                label="ALASAN MEMILIH PROGRAM"
                value={submissionData.alasanMemilih}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              <TextField
                fullWidth
                label="NAMA LEMBAGA MITRA/PERUSAHAAN"
                value={submissionData.namaLembaga}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              <TextField
                fullWidth
                label="POSISI DI PERUSAHAAN"
                value={submissionData.posisidiPerusahaan}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              <TextField
                fullWidth
                label="RINCIAN KEGIATAN"
                value={submissionData.rincianKegiatan}
                InputProps={{
                  readOnly: true,
                }}
                margin="normal"
              />

              {/* Tombol untuk menutup modal */}
              <Button onClick={handleClose} variant="contained" sx={{ mt: 3, marginLeft:110 }}>
                  Done
              </Button>
            </Box>
          </Modal>
        </Stack>
      ) : (
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Sorry you don't have access to view this page
        </Typography>
      )}
    </React.StrictMode>
  );
}
