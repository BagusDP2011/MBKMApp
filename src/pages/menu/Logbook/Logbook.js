import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function DocumentUpload() {
  const [documents, setDocuments] = useState([
    {
      fileName: "Dok Assesmen.pdf",
      fileType: "pdf",
      link: "shorturl.at/iHL89",
    },
  ]);

  const [form, setForm] = useState({
    fileName: "Dok Assesmen.pdf",
    fileType: "pdf",
    link: "shorturl.at/iHL89",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {
    setDocuments([...documents, form]);
    setForm({ fileName: "", fileType: "", link: "" });
  };

  const handleDelete = (index) => {
    const updated = documents.filter((_, i) => i !== index);
    setDocuments(updated);
  };

  return (
    <Box className="max-w-4xl mx-auto p-4">
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Dokumen Tersimpan
      </Typography>
      <TableContainer component={Paper} className="mb-6">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Jenis Dokumen</TableCell>
              <TableCell>Tautan Dokumen</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doc.fileName}</TableCell>
                <TableCell>{doc.fileType}</TableCell>
                <TableCell>{doc.link}</TableCell>
                <TableCell>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <Box className="mt-5">
        <Typography
          variant="subtitle1"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Upload Dokumen
        </Typography>
      </Box>

      <Box className="max-w-md mx-auto">
        <Typography variant="caption">
          ( Maksimal total ukuran file : 5 MB )<br />( Jenis file yang diijinkan
          : <strong>pdf, jpg, jpeg, png, doc, docx</strong>)
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="File"
          name="fileName"
          value={form.fileName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Jenis Dokumen"
          name="fileType"
          value={form.fileType}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Tautan Dokumen"
          name="link"
          value={form.link}
          onChange={handleChange}
        />
        <Box className="mt-4 text-center item-right">
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Box>
      </Box>

      {/* <Box className="text-right mt-6">
        <Button variant="contained" color="primary">
          Next
        </Button>
      </Box> */}
    </Box>
  );
}
