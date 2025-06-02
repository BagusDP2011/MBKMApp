import React, { useState, useEffect, useRef } from "react";
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
  Chip,
  Modal
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachmentSubmissionLaporanAkhir from "../Submission/AttachmentSubmissionLaporanAkhir";
import pdfIcon from "../../../assets/img/icons8-pdf-48.png";
import { useAlert } from "../../../components/AlertProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Dialog from "../../../utils/Dialog";

import { getSubmissionByUserId } from "../../../service/Submission.Service";

// Modal reject Style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DocumentUpload() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const [mySubmissionId, getMySubmissionId] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const MAX_FILE_SIZE = 5242880; //5MB
  const [formSubmission, setFormSubmission] = useState({
    Attachment: [],
  });
  const [files, setFiles] = useState([]);
  const [infofiles, setInfofiles] = useState([]);
  const [fileExt, setFileExt] = useState("");
  const [finalReportList, setFinalReportList] = useState([]);
  const token = localStorage.getItem("token");
  const decodedPayload = jwtDecode(token);
  const [resSuccess, setResSuccess] = useState(false);
  const [openModalRejectInfo, setOpenModalRejectInfo] = useState(false);
  const [selectedReportId, setSelectedIdReport] = useState(null);
  const [form, setForm] = useState({
    files: [],
    fileName: "",
    fileType: "",
    link: "",
  });
  const attachmentRef = useRef();

  useEffect(() => {
    const fetchRequest = async () => {
      if (!mySubmissionId || !token) return;
      try {
        const data = await axios.get(
          "http://localhost:3001/api/logbook/get-final-report",
          {
            params: { SubmissionID: mySubmissionId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFinalReportList(data.data.result);
        if (data.data.message) {
          setMessage("Belum ada dokumen yg di upload.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequest();
  }, [resSuccess, mySubmissionId, token]);

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
    setInfofiles(updatedFiles[0]);
    const fileExtension = updatedFiles[0].name.split(".").pop(); // Mendapatkan ekstensi setelah titik (.)
    setFileExt(fileExtension);

    setFormSubmission((prev) => ({
      ...prev,
      Attachment: updatedFiles,
    }));
  };

  useEffect(() => { }, [infofiles]);

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
          errorMessage = `${file.name} melebihi ukuran maksimal 5 MB.`;
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
      setError("Anda belum melakukan pengajuan!");
      return;
    }
    if (formSubmission.Attachment.length === 0) {
      setError("Tidak ada file yang dipilih.");
      return;
    }

    const formData = new FormData();
    formSubmission.Attachment.forEach((file) => {
      formData.append("Attachment[]", file.base64);
      formData.append("submissionID", mySubmissionId);
      formData.append("filename", file.name);
    });

    try {
      const response = await axios.post(
        `http://localhost:3001/api/logbook/upload-final-report`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setResSuccess(!resSuccess);
        showAlert("Submission Final has been created", "success");
        if (attachmentRef.current) {
          attachmentRef.current.resetFiles();
        }
        setInfofiles({});
      } else {
        showAlert("Failed Upload File Final Report", "error");
        setError("Gagal mengupload file.");
      }
    } catch (error) {
      // Selama itu sukses ya ndak papa dong xixixiii
      // console.error(error);
      // setError("Terjadi kesalahan saat mengupload file.");
    }
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getSubmissionByUserId(decodedPayload.id);
        getMySubmissionId(data[0].SubmissionID);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequest();
  }, []);

  const deleteFinalReport = async (id) => {
    const result = await Dialog.fire({
      title: "Anda yakin?",
      text: "File yg di hapus tidak bisa di kembalikan!",
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
          setError("Gagal mengupload file.");
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

  const handleOpenInfoReject = (id) => {
    setSelectedIdReport(id)
    setOpenModalRejectInfo(true);
  };
  const handleCloseModalRejectInfo = () => {
    setOpenModalRejectInfo(false);
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
              {/* <TableCell>Jenis Dokumen</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finalReportList?.length > 0 ? (
              finalReportList?.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <img alt="pdf" src={pdfIcon} width={20} />
                      {doc.AttachmentName}
                    </div>
                  </TableCell>
                  {/* <TableCell>{doc.AttachType}</TableCell> */}
                  <TableCell>
                    <Chip
                      label={doc?.Status}
                      sx={{
                        backgroundColor: (doc?.Status ?? '').includes('Approve')
                          ? 'rgba(76, 175, 80, 0.1)'
                          : (doc?.Status ?? '').includes('Waiting')
                            ? 'rgba(33, 150, 243, 0.1)' // biru muda
                            : 'rgba(244, 67, 54, 0.1)', // merah muda

                        color: (doc?.Status ?? '').includes('Approve')
                          ? '#4caf50'
                          : (doc?.Status ?? '').includes('Waiting')
                            ? '#2196f3' // biru
                            : '#f44336', // merah

                        fontWeight: 500,
                        fontSize: '0.8rem',
                        borderRadius: '8px',
                        border: `1px solid ${(doc?.Status ?? '').includes('Approve')
                          ? 'rgba(76, 175, 80, 0.4)'
                          : (doc?.Status ?? '').includes('Waiting')
                            ? 'rgba(33, 150, 243, 0.4)'
                            : 'rgba(244, 67, 54, 0.4)'
                          }`,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >

                    <IconButton onClick={() => handleOpenPDF(doc)}>
                      <VisibilityIcon />
                    </IconButton>
                    {(doc?.Status === 'Waiting Approval' || doc?.Status === 'TU Reject' || doc?.Status === 'KPS Reject') && (
                      <>
                        <IconButton onClick={() => deleteFinalReport(doc.LAAttachmentID)}>
                          <DeleteIcon />
                        </IconButton>

                        {doc?.Status !== 'Waiting Approval' && (
                          <IconButton onClick={() => handleOpenInfoReject(doc.LAAttachmentID)}>
                            <InfoIcon />
                          </IconButton>
                        )}
                      </>
                    )}

                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  {message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

      <AttachmentSubmissionLaporanAkhir
        onFilesChange={handleFilesChange}
        ref={attachmentRef}
      />

      <Box className="max-w-md mx-auto">
        <Typography variant="caption">
          ( Maksimal total ukuran file: 5 MB )<br />( Jenis file yang diijinkan:{" "}
          <strong>pdf</strong> )
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          name="fileName"
          value={infofiles?.name || "Nama File"}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          name="fileType"
          value={
            infofiles && fileExt
              ? fileExt
              : "Jenis Dokumen"
          }
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          name="link"
          value={
            infofiles && infofiles.size
              ? (infofiles.size / 1024 / 1024).toFixed(2) + " MB"
              : "Size Dokumen"
          }
          disabled
        />
        <Box className="mt-4 text-center item-right">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </Box>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      {/* Modal untuk pesan reject */}
      {selectedReportId && (
        <Modal
          open={openModalRejectInfo}
          onClose={handleCloseModalRejectInfo}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <IconButton
              onClick={handleCloseModalRejectInfo}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
              Feedback TU/KPS:
            </Typography>

            {finalReportList?.length > 0 ? (
              finalReportList
                .filter(item => item.LAAttachmentID === selectedReportId)
                .map(item => (
                  <Typography key={item.LAAttachmentID} sx={{ mt: 2 }}>
                    {item.Comment || 'Belum ada Feedback yg diberikan.'}
                  </Typography>
                ))
            ) : (
              <Typography sx={{ mt: 2 }} color="textSecondary">
                Tidak ada data yang tersedia.
              </Typography>
            )}


          </Box>
        </Modal>
      )}
    </Box>
  );
}
