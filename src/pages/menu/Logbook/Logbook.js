import React, { useState, useEffect } from "react";
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
import AttachmentSubmission from "../Submission/AttachmentSubmission";
import pdfIcon from "../../../assets/img/icons8-pdf-48.png";
import { useAlert } from "../../../components/AlertProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Dialog from "../../../utils/Dialog";

import { getSubmissionByUserId } from "../../../service/Submission.Service"

export default function DocumentUpload() {
  const showAlert = useAlert();
  const navigate = useNavigate()
  const [mySubmissionId, getMySubmissionId] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const MAX_FILE_SIZE = 1048576;
  const [formSubmission, setFormSubmission] = useState({
    Attachment: [],
  });
  const [files, setFiles] = useState([]);
  const [finalReportList, setFinalReportList] = useState([]);
  const token = localStorage.getItem("token");
  const decodedPayload = jwtDecode(token);
  const [resSuccess, setResSuccess] = useState(false);
  const [form, setForm] = useState({
    files: [],
    fileName: "",
    fileType: "",
    link: "",
  });
console.log('mySubmissionId', mySubmissionId)
  useEffect(() => {
    const fetchRequest = async () => {
      if (!mySubmissionId || !token) return;
      try {
        const data = await axios.get('http://localhost:3001/api/logbook/get-final-report', {
          params: { SubmissionID: mySubmissionId },
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setFinalReportList(data.data.result)
        if (data.data.message) {
          setMessage('Belum ada dokumen yg di upload.')
        }

      } catch (error) {
        console.log(error)
      }
    }
    fetchRequest()
  }, [resSuccess, mySubmissionId, token])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    setFormSubmission((prev) => ({
      ...prev,
      Attachment: updated,
    }));
  };

  const handleFilesChange = (updatedFiles) => {
    setFormSubmission((prev) => ({
      ...prev,
      Attachment: updatedFiles,
    }));
  };

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    let errorMessage = null;

    const readFileAsBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

    const processFiles = async () => {
      const validFiles = [];
      for (const file of selectedFiles) {
        const isPDF = file.type === "application/pdf";
        if (!isPDF) {
          errorMessage = `${file.name} bukan file PDF yang valid.`;
          break;
        } else if (file.size > MAX_FILE_SIZE) {
          errorMessage = `${file.name} melebihi ukuran maksimal 1 MB.`;
          break;
        } else {
          try {
            const base64 = await readFileAsBase64(file);
            validFiles.push({
              name: file.name,
              size: file.size,
              base64,
            });
          } catch (err) {
            errorMessage = `Gagal memproses ${file.name}.`;
            break;
          }
        }
      }

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError(null);
        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        handleFilesChange(updatedFiles);
      }
    };

    processFiles();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (mySubmissionId == 0) {
      setError('Anda belum melakukan pengajuan!');
      return;
    }
    if (formSubmission.Attachment.length === 0) {
      setError('Tidak ada file yang dipilih.');
      return;
    }

    const formData = new FormData();
    formSubmission.Attachment.forEach((file) => {
      formData.append('Attachment[]', file.base64);
      formData.append('submissionID', mySubmissionId);
      formData.append('filename', file.name);
    });

    try {

      const response = await axios.post(
        `http://localhost:3001/api/logbook/upload-final-report`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setResSuccess(!resSuccess);
        showAlert("Submission Final has been created", "success");
      } else {
        showAlert("Failed Upload File Final Report", "error");
        setError('Gagal mengupload file.');
      }
    } catch (error) {
      console.error(error);
      setError('Terjadi kesalahan saat mengupload file.');
    }
  };
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getSubmissionByUserId(decodedPayload.id)
        getMySubmissionId(data[0].SubmissionID)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRequest()
  }, [])

  const deleteFinalReport = async (id) => {
    const result = await Dialog.fire({
      title: 'Anda yakin?',
      text: 'File yg di hapus tidak bisa di kembalikan!',
    });
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(
          `http://localhost:3001/api/logbook/delete-final-report/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setResSuccess(!resSuccess);
          showAlert(" Final report has been deletes", "success");
        } else {
          showAlert("Failed delete File Final Report", "error");
          setError('Gagal mengupload file.');
        }
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };

  const handleOpenPDF = (doc) => {
    const base64String = doc.Base64;

    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${base64String}'></iframe>`
    );
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
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finalReportList?.length > 0 ? (
              finalReportList?.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img alt="pdf" src={pdfIcon} width={30} />
                      {doc.AttachmentName}
                    </div>
                  </TableCell>
                  <TableCell>{doc.AttachType}</TableCell>
                  <TableCell>{doc.link}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenPDF(doc)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteFinalReport(doc.LAAttachmentID)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" style={{ textAlign: 'center', padding: '20px' }}>
                  {message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="mt-5">
        <Typography variant="subtitle1" align="center" fontWeight="bold" gutterBottom>
          Upload Dokumen
        </Typography>
      </Box>

      <AttachmentSubmission onFilesChange={handleFilesChange} />

      <Box className="max-w-md mx-auto">
        <Typography variant="caption">
          ( Maksimal total ukuran file: 1 MB )<br />
          ( Jenis file yang diijinkan: <strong>pdf</strong> )
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </Box>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}
