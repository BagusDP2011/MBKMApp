/* Perubahan utama: 
1. Menyaring dokumen berdasarkan SubmissionID bukan LAAttachmentID agar filter dokumen tersimpan relevan.
2. Memastikan properti "link" pada dokumen tersedia sebelum digunakan untuk membuka PDF.
3. Menambahkan prop "onRowSelect" ke TableKonversiMurid dan memicu fungsi tersebut saat memilih baris.
4. Memastikan key pada TableRow tidak undefined (gunakan LAAttachmentID).
*/

// File: KonversiMurid.js

import React, { useEffect } from "react";
import TableKonversiMurid from "../../../components/tables/TableKonversiMurid";
import {
  Stack,
  Typography,
  Box,
  Card,
  Divider,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { getAllSubmissionLAData } from "../../../service/Submission.Service";

const stats = [
  { label: "Pending", value: 0, icon: <HourglassEmptyOutlinedIcon />, backColor: "#2196F3" },
  { label: "Approved", value: 0, icon: <CheckOutlinedIcon />, backColor: "#4CAF50" },
  { label: "Rejected", value: 0, icon: <CloseOutlinedIcon />, backColor: "#F44336" },
];

export default function KonversiMurid({ menuAccess, accessId }) {
  const [submissions, setSubmissions] = React.useState([]);
  const [finalReportList, setFinalReportList] = React.useState([]);
  const [selectedSubmission, setSelectedSubmission] = React.useState(null);
  const [message, setMessage] = React.useState("Tidak ada dokumen tersedia");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSubmissionLAData();
        setSubmissions(data);

        stats[0].value = data.filter((x) => x.AttachmentStatus === "Pending").length || 0;
        stats[1].value = data.filter((x) => x.AttachmentStatus === "Approved").length || 0;
        stats[2].value = data.filter((x) => x.AttachmentStatus === "Rejected").length || 0;

        setFinalReportList(
          data.map((item) => ({
            AttachmentName: item.AttachmentName,
            AttachType: item.AttachType,
            Status: item.AttachmentStatus,
            LAAttachmentID: item.LAAttachmentID,
            SubmissionID: item.SubmissionID,
            link: item.link,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenPDF = (doc) => {
    if (doc.link) window.open(doc.link, "_blank");
  };

  const deleteFinalReport = (id) => {
    setFinalReportList((prev) => prev.filter((item) => item.LAAttachmentID !== id));
  };

  const filteredReports = selectedSubmission
    ? finalReportList.filter((doc) => doc.SubmissionID === selectedSubmission.SubmissionID)
    : [];

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        KONVERSI NILAI MURID OLEH TU
      </Typography>

      {menuAccess.CanRead ? (
        <Stack spacing={3}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              boxShadow: "none",
              border: "1px solid rgba(224, 224, 224, 1)",
              borderRadius: "8px",
            }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Avatar variant="rounded" sx={{ backgroundColor: `${stat.backColor}20` }}>
                    {React.cloneElement(stat.icon, { sx: { color: stat.backColor } })}
                  </Avatar>
                </Box>
                {index < stats.length - 1 && <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />}
              </React.Fragment>
            ))}
          </Card>

          <TableKonversiMurid
            access={menuAccess}
            accessId={accessId}
            dataTable={submissions}
            onRowSelect={(submission) => setSelectedSubmission(submission)}
          />

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Dokumen Tersimpan
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 6 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Jenis Dokumen</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((doc, index) => (
                    <TableRow key={doc.LAAttachmentID}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <PictureAsPdfIcon />
                          {doc.AttachmentName}
                        </Box>
                      </TableCell>
                      <TableCell>{doc.AttachType}</TableCell>
                      <TableCell>{doc.Status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenPDF(doc)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => console.log("Approve clicked", doc)}>
                          <DoneOutlineIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteFinalReport(doc.LAAttachmentID)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      {message}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      ) : (
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Sorry, you don't have access to view this page.
        </Typography>
      )}
    </>
  );
}

/* Perubahan pada TableKonversiMurid:
1. Menambahkan prop onRowSelect.
2. Menghubungkan event onRowClick ke pemanggilan onRowSelect dengan row data.
*/

// Tambahkan pada TableKonversiMurid:
// <DataGrid
//   onRowClick={(params) => onRowSelect && onRowSelect(params.row)}
//   ...
// />

// Dan pada parameter fungsi komponen:
// export default function TableKonversi({ access, accessId, dataTable, onRowSelect })
