import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Tab,
  Tabs,
  Grid2 as Grid,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  Select,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  FormLabel,
  OutlinedInput,
  Paper,
  TableSortLabel,
  TablePagination,
  Chip,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import Swal from "sweetalert2";
import {
  getSubmissionByID,
  approveSubmission,
  rejectSubmission,
  approveFinalReport,
  rejectFinalReport,
} from "../../../service/Submission.Service";
import pdfIcon from "../../../assets/img/icons8-pdf-48.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import PDFViewerComponent from "./PDFViewerComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserByAccessID } from "../../../service/Static.Service";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { reAssign } from "../../../service/Submission.Service";
import { useAlert } from "../../../components/AlertProvider";
import ComScheduler from "../../../components/scheduler/Scheduler";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import {
  submitLogbook,
  getLogbookBySubmissionID,
} from "../../../service/Logbook.Service";
import dayjs from "dayjs";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const getDotColor = (status, total, index) => {
  if (status === "Rejected") {
    return "#F44336";
  } else if (status === "Pending") {
    return "#FFC107";
  } else if (status === "Approved" && total === index) {
    return "#4CAF50";
  } else {
    return "#2196F3";
  }
};

export default function DetailSubmission({ menuAccess, accessId }) {
  const [openModalLogbook, setOpenModalLogBook] = React.useState(false);
  const [isLoadingLogbook, setIsLoadingLogbook] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [base64pdf, setBase64pdf] = React.useState("");
  const [tabValue, setTabValue] = React.useState(0);
  const [submission, setSubmission] = React.useState({});
  const [student, setStudent] = React.useState({});
  const [submissionApproval, setSubmissionApproval] = React.useState([]);
  const [submissionAttachment, setSubmissionAttachment] = React.useState([]);
  const [exchangeProgram, setExchangeProgram] = React.useState({});
  const [logbook, setLogbok] = React.useState([]);
  const showAlert = useAlert();

  const [isReAssign, setIsReAssign] = React.useState(false);
  const [supervisors, setSupervisors] = React.useState([]);

  const [totalCredits, setTotalCredits] = React.useState(0);

  const [order, setOrder] = useState("desc"); // Sorting order
  const [orderBy, setOrderBy] = useState("date"); // Default sort column
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [finalReportList, setFinalReportList] = useState([]);
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("token");
  const findAksesId = jwtDecode(token);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      if (!id) return;
      try {
        const data = await axios.get(
          "http://localhost:3001/api/logbook/get-final-report",
          {
            params: { SubmissionID: id },
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
  }, [token]);

  const [formLogbook, setFormLogbook] = useState({
    SubmissionID: "",
    Label: "",
    Date: dayjs(),
    Deskripsi: "",
  });

  const handleModalOpen = () => {
    setOpenModalLogBook(true);
  };

  const handleModalCancel = () => {
    setOpenModalLogBook(false);
  };

  const handelSubmitLogbook = async () => {
    setIsLoadingLogbook(true);
    await submitLogbook(formLogbook);

    const logbooks = await getLogbookBySubmissionID(id);
    setLogbok(
      logbooks.map((item) => ({
        id: item.ID,
        label: item.Label,
        date: item.Date,
        deskripsi: item.Deskripsi,
        color: "#1976d2",
      }))
    );

    setOpenModalLogBook(false);
    setIsLoadingLogbook(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const submission = await getSubmissionByID(id);
        const supervisors = await getUserByAccessID(6);
        const logbooks = await getLogbookBySubmissionID(id);
        setSupervisors(supervisors);
        setSubmission(submission.submission);
        setStudent(submission.student);
        setLogbok(
          logbooks.map((item) => ({
            id: item.ID,
            label: item.Label,
            date: item.Date,
            deskripsi: item.Deskripsi,
            color: "#1976d2",
          }))
        );
        let submitTimeline = {
          AccDescription: submission.student.Name,
          Level: 0,
          ApprovalID: 0,
          SubmissionID: submission.submission.SubmissionID,
          ApproverID: 0,
          ApprovalStatus: "Submit",
          ApprovalDate: submission.submission.SubmissionDate,
        };

        const updatedSubmissionApproval = [
          submitTimeline,
          ...submission.submissionApproval,
        ];
        setSubmissionApproval(updatedSubmissionApproval);
        setExchangeProgram(submission.exchangeProgram);
        setSubmissionAttachment(submission.submissionAttachment);
        setFormLogbook({
          ...formLogbook,
          SubmissionID: submission.submission.SubmissionID,
        });

        if (submission?.exchangeProgram?.Courses.length > 0) {
          const total = submission?.exchangeProgram?.Courses.map((c) =>
            parseInt(c.Credits)
          ).reduce((sum, current) => sum + current, 0);
          setTotalCredits(total);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (newDate) => {
    setFormLogbook({
      ...formLogbook,
      Date: newDate,
    });
  };

  const dateFormatted = (date) => {
    const utcDate = new Date("2025-01-06T03:28:53.453Z");
    const localDate = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    return localDate;
  };

  const handleLabelChange = (e) => {
    const { name, value } = e.target;

    setFormLogbook({
      ...formLogbook,
      Label: value,
    });
  };

  const handleDescChange = (e) => {
    const { name, value } = e.target;

    setFormLogbook({
      ...formLogbook,
      Deskripsi: value,
    });
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReAssign = async () => {
    await reAssign(submission);
    showAlert("Submission updated already", "success");
    setIsReAssign(false);
    navigate(0);
  };

  const handleChangeLecturer = (e) => {
    const { name, value } = e.target;
    setSubmission((prevSubmission) => ({
      ...prevSubmission,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const optionsDate = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Jakarta",
    };

    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate}`;
  };

  const showPdf = (base64) => {
    setBase64pdf(base64);
    setTabValue(2);
  };

  const handleApprove = async (submissionId) => {
    Swal.fire({
      title: "Approve Submission",
      text: "Are you sure want to approve this submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#FF4C51",
      confirmButtonColor: "#3F8CFE",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        var response = await approveSubmission(submissionId);
        setIsLoading(false);
        navigate(`/menu/mbkm/daftar%20pengajuan`);
        showAlert(response.message, "success");
      }
    });
  };
  const handleApproveFinalReport = async (ReportID) => {
    Swal.fire({
      title: "Approve Final Report",
      text: "Are you sure want to approve this Report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#FF4C51",
      confirmButtonColor: "#3F8CFE",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        var response = await approveFinalReport(ReportID, findAksesId.accessId);
        setIsLoading(false);
        window.location.reload();
        setTabValue(1);
        showAlert(response.message, "success");
      }
    });
  };

  const handleReject = async (submissionId) => {
    const { value: rejectionNote } = await Swal.fire({
      title: "Reject Submission",
      text: "Are you sure want to reject this submission?",
      icon: "warning",
      input: "textarea",
      inputPlaceholder: "Write your reason for rejection...",
      inputAttributes: {
        "aria-label": "Write your reason for rejection",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3F8CFE",
      confirmButtonColor: "#FF4C51",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a reason for rejection!";
        }
      },
    });

    if (rejectionNote) {
      setIsLoading(true);
      var response = await rejectSubmission(submissionId, rejectionNote);
      setIsLoading(false);
      navigate(`/menu/mbkm/daftar%20pengajuan`);
      showAlert(response.message, "success");
    }
  };
  const handleRejectFinalReport = async (ReportID) => {
    const { value: rejectionNote } = await Swal.fire({
      title: "Reject Submission",
      text: "Are you sure want to reject this Report?",
      icon: "warning",
      input: "textarea",
      inputPlaceholder: "Write your reason for rejection...",
      inputAttributes: {
        "aria-label": "Write your reason for rejection",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3F8CFE",
      confirmButtonColor: "#FF4C51",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a reason for rejection!";
        }
      },
    });

    if (rejectionNote) {
      setIsLoading(true);
      var response = await rejectFinalReport(
        ReportID,
        rejectionNote,
        findAksesId.accessId
      );
      setIsLoading(false);
      window.location.reload();
      setTabValue(1);
      showAlert(response.message, "success");
    }
  };

  function getBase64FileSize(base64String) {
    const stringLength = base64String.length;
    const padding = base64String.endsWith("==")
      ? 2
      : base64String.endsWith("=")
      ? 1
      : 0;
    const sizeInBytes = (stringLength * 3) / 4 - padding;
    return sizeInBytes;
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  if (isLoading) {
    return (
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          columnGap: 1,
        }}
      >
        <CircularProgress /> Loading...
      </Stack>
    );
  }

  // Data untuk pagination logbook
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sort function
  const sortedLogbook = [...logbook].sort((a, b) => {
    if (orderBy === "date") {
      return (new Date(b.date) - new Date(a.date)) * (order === "asc" ? 1 : -1);
    }
    return a.label.localeCompare(b.label) * (order === "asc" ? 1 : -1);
  });

  // Paginated data
  const paginatedLogbook = sortedLogbook.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  // End of pagination logbook

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item size={4}>
          <Card
            sx={{
              boxShadow: "none",
              border: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginTop="2rem"
              px="1rem"
            >
              {student.UserPhoto && (
                <Avatar
                  alt="Seth Hallam"
                  src={`data:image/jpeg;base64,${student.UserPhoto}`}
                  sx={{ width: 80, height: 80, mb: 2 }}
                />
              )}
              {student.Name && !student.UserPhoto && (
                <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                  {student.Name[0].toUpperCase()}
                </Avatar>
              )}
              <Typography variant="h6" textAlign="center">
                {student.Name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                fontWeight="medium"
              >
                {student.NIM}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <CardContent sx={{ py: 0 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Detail
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Username:
                  </Typography>
                  <Typography variant="body2" color="#2E263DB2">
                    {student.Name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Email:
                  </Typography>
                  <Typography variant="body2" color="#2E263DB2">
                    {student.Email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Prodi:
                  </Typography>
                  <Typography variant="body2" color="#2E263DB2">
                    {student.ProdiName}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Kontak:
                  </Typography>
                  <Typography variant="body2" color="#2E263DB2">
                    {student.Kontak}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Tempat Tanggal Lahir:
                  </Typography>
                  <Typography variant="body2" color="#2E263DB2">
                    {student.TempatTanggalLahir}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>

            {accessId !== 1 && submission.IsApprove === 0 && (
              <Box display="flex" gap={2} px="1rem" pt="1rem" pb="2rem">
                <Button
                  sx={{ width: "100%", textTransform: "none" }}
                  variant="contained"
                  color="primary"
                  onClick={() => handleApprove(submission.SubmissionID)}
                >
                  Approve
                </Button>
                <Button
                  sx={{ width: "100%", textTransform: "none" }}
                  variant="outlined"
                  color="error"
                  onClick={() => handleReject(submission.SubmissionID)}
                >
                  Reject
                </Button>
              </Box>
            )}

            {submission.Status === "Rejected" &&
              accessId === 1 &&
              menuAccess.CanEdit && (
                <Box px="1rem" pt="1rem" pb="2rem">
                  <Button
                    sx={{ width: "100%", textTransform: "none" }}
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/menu/mbkm/pengajuan")}
                  >
                    Pengajuan Baru
                  </Button>
                </Box>
              )}
          </Card>

          {submission.Status === "Rejected" && (
            <Card
              sx={{
                marginTop: "1.5rem",
                boxShadow: "none",
                border: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              <Typography variant="h6" sx={{ margin: "1rem" }}>
                Catatan Revisi
              </Typography>
              <Divider />
              <CardContent>
                {/* {revisions.map((item, index) => (
                <Typography
                  key={item.RevisionID}
                  variant="body2"
                  color="#2E263DB2"
                >
                  {(index += 1)}.{item.RevisionNote} - {item.ApproverName}
                </Typography>
              ))} */}
                <Typography
                  key={submissionApproval[submissionApproval.length - 1].Level}
                  variant="body2"
                  color="#2E263DB2"
                >
                  {submissionApproval[submissionApproval.length - 1].Note} -{" "}
                  {
                    submissionApproval[submissionApproval.length - 1]
                      .AccDescription
                  }
                </Typography>
              </CardContent>
            </Card>
          )}

          <Card
            sx={{
              marginTop: "1.5rem",
              boxShadow: "none",
              border: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <Typography variant="h6" sx={{ margin: "1rem" }}>
              Jalur Persetujuan
            </Typography>
            <Divider />
            <CardContent>
              <Timeline position="alternate" sx={{ padding: 0, margin: 0 }}>
                {submissionApproval.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor: getDotColor(
                            item.ApprovalStatus,
                            submissionApproval.length - 1,
                            index
                          ),
                        }}
                      />
                      {index < submissionApproval.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1">
                        {item.AccDescription} - {item.ApprovalStatus}
                      </Typography>
                      <Typography variant="caption">
                        {item.ApprovalDate ? formatDate(item.ApprovalDate) : ""}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>
        <Grid item size={8}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Profile Tabs"
            sx={{ mb: 2 }}
          >
            <Tab label="Ringkasan" />
            <Tab label="Dokumen" />
            <Tab label="Pratinjau Dokumen" disabled={true} />
          </Tabs>

          {tabValue === 0 && (
            <>
              <Card
                sx={{
                  marginTop: "1.5rem",
                  boxShadow: "none",
                  border: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // rowGap: "1rem",
                      rowGap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        Informasi Kegiatan
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: "rgb(22 177 255 / 0.16)",
                          height: "24px",
                          borderRadius: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "#16B1FF",
                            fontSize: "0.8125rem",
                            paddingInline: "12px",
                          }}
                        >
                          {submission.ProgramType}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Dosen Pembimbing
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {!isReAssign && (
                          <Typography variant="body2" color="#2E263DB2">
                            {submission.LecturerGuardianName}
                          </Typography>
                        )}
                        {menuAccess.CanEdit &&
                          !isReAssign &&
                          accessId !== 1 &&
                          submission.IsApprove === 0 && (
                            <Button
                              sx={{
                                textTransform: "none",
                                color: "#2E263DB2",
                                padding: 0,
                              }}
                              onClick={() => setIsReAssign(true)}
                            >
                              Re-Assign
                            </Button>
                          )}

                        {isReAssign && accessId !== 1 && (
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              columnGap: 3,
                            }}
                          >
                            <FormGrid size={{ xs: 12, xl: 12, sm: 12 }}>
                              <FormControl fullWidth size="small">
                                <Select
                                  name="LecturerGuardianID"
                                  value={submission.LecturerGuardianID}
                                  onChange={handleChangeLecturer}
                                  required
                                >
                                  {supervisors.map((s) => (
                                    <MenuItem key={s.UserID} value={s.UserID}>
                                      {s.UserID} - {s.Name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </FormGrid>
                            <Box sx={{ display: "flex", columnGap: 1 }}>
                              <Button
                                sx={{
                                  maxWidth: "max-content",
                                  minWidth: "max-content",
                                  padding: 0,
                                }}
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    backgroundColor: "transparent",
                                    border: "1px solid rgb(118, 118, 118)",
                                  }}
                                >
                                  <IconButton
                                    color="rgba(224, 224, 224, 1)"
                                    onClick={() => handleReAssign()}
                                  >
                                    <SaveOutlinedIcon />
                                  </IconButton>
                                </Avatar>
                              </Button>
                              <Button
                                sx={{
                                  maxWidth: "max-content",
                                  minWidth: "max-content",
                                  padding: 0,
                                }}
                                onClick={() => setIsReAssign(false)}
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    backgroundColor: "transparent",
                                    border: "1px solid rgb(118, 118, 118)",
                                  }}
                                >
                                  <IconButton color="rgba(224, 224, 224, 1)">
                                    <CloseOutlinedIcon />
                                  </IconButton>
                                </Avatar>
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Tanggal Kegiatan
                      </Typography>
                      <Typography variant="body2" color="#2E263DB2">
                        {formatDate(submission.StartDate)} -{" "}
                        {formatDate(submission.EndDate)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Nama Perusahaan
                      </Typography>
                      <Typography variant="body2" color="#2E263DB2">
                        {submission.InstitutionName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Posisi
                      </Typography>
                      <Typography variant="body2" color="#2E263DB2">
                        {submission.Position}
                      </Typography>
                    </Box>
                    <Divider />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Detail Kegiatan
                    </Typography>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Alasan Memilih Program
                      </Typography>
                      <Typography variant="body2" color="#2E263DB2">
                        {submission.Reason}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Judul Program
                      </Typography>
                      <Typography variant="body2" color="#2E263DB2">
                        {submission.Title}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Rincian Kegiatan
                      </Typography>
                      <Typography variant="body2" color="#2E263DB2">
                        {submission.ActivityDetails}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {exchangeProgram?.Courses?.length > 0 && (
                <Card
                  sx={{
                    marginTop: "1.5rem",
                    boxShadow: "none",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <CardContent sx={{ paddingBottom: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        Mata Kuliah
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="#2E263DB2"
                        sx={{ mb: ".5rem" }}
                      >
                        {exchangeProgram.TypeExchange} -{" "}
                        {exchangeProgram.StudyProgramObjective}
                      </Typography>
                    </Box>
                  </CardContent>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow
                          sx={{
                            backgroundColor: "#F6F7FB",
                            borderBottom: "none",
                          }}
                        >
                          <TableCell>KODE</TableCell>
                          <TableCell>NAMA MATAKULIAH</TableCell>
                          <TableCell>JUMLAH SKS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {exchangeProgram.Courses.map((row) => (
                          <TableRow
                            key={row.CourseID}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.CourseCode}
                            </TableCell>
                            <TableCell>{row.CourseName}</TableCell>
                            <TableCell>{row.Credits}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              )}
            </>
          )}

          {tabValue === 1 && (
            <Card
              sx={{
                marginTop: "1.5rem",
                boxShadow: "none",
                border: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // rowGap: "1rem",
                    rowGap: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    Dokumen Kegiatan
                  </Typography>
                  {submissionAttachment?.length > 0 ? (
                    submissionAttachment.map((attch) => (
                      <Button
                        key={attch.AttachID}
                        sx={{
                          justifyContent: "space-between",
                          textTransform: "none",
                          alignItems: "center",
                          padding: 0,
                        }}
                        onClick={() => showPdf(attch.Base64)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <img alt="pdf" src={pdfIcon} width={30} />
                          <Tooltip title="Preview" placement="right">
                            <Typography variant="body2" color="#2E263DB2">
                              {attch.AttachName}
                            </Typography>
                          </Tooltip>
                        </Box>
                        <Typography variant="body2" color="#2E263DB2">
                          {formatFileSize(getBase64FileSize(attch.Base64))}
                        </Typography>
                      </Button>
                    ))
                  ) : (
                    <Typography variant="body2" color="#2E263DB2">
                      Belum ada file yg di upload.
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          )}
          {tabValue === 1 && (
            <>
              {(findAksesId.accessId === 2 || findAksesId.accessId === 4) && (
                <Card
                  sx={{
                    marginTop: "1.5rem",
                    boxShadow: "none",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        // rowGap: "1rem",
                        rowGap: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        Dokumen Laporan Akhir
                      </Typography>
                      {finalReportList?.length > 0 ? (
                        finalReportList.map((attch) => (
                          <Box
                            key={attch.SubmissionID}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              paddingY: 1,
                              borderBottom: "1px solid #ccc",
                            }}
                          >
                            {/* Bagian file info */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                gap: 1,
                                flexGrow: 1,
                              }}
                              onClick={() => showPdf(attch.Base64)}
                            >
                              <img alt="pdf" src={pdfIcon} width={30} />
                              <Tooltip title="Preview" placement="right">
                                <Typography variant="body2" color="#2E263DB2">
                                  {attch?.AttachmentName}
                                </Typography>
                              </Tooltip>
                              {/* <Typography variant="body2" color="#2E263DB2" sx={{ marginLeft: 2 }}>
                            {formatFileSize(getBase64FileSize(attch.Base64))}
                          </Typography> */}
                            </Box>

                            {(findAksesId.accessId === 2 &&
                              [
                                "TU Approve",
                                "TU Reject",
                                "KPS Approve",
                                "KPS Reject",
                              ].includes(attch?.Status)) ||
                            (findAksesId.accessId === 4 &&
                              ["KPS Approve", "KPS Reject"].includes(
                                attch?.Status
                              )) ? (
                              <Chip
                                label={attch?.Status}
                                sx={{
                                  backgroundColor: attch?.Status.includes(
                                    "Approve"
                                  )
                                    ? "rgba(76, 175, 80, 0.1)"
                                    : attch?.Status.includes("Waiting")
                                    ? "rgba(33, 150, 243, 0.1)"
                                    : "rgba(244, 67, 54, 0.1)",
                                  color: attch?.Status.includes("Approve")
                                    ? "#4caf50"
                                    : attch?.Status.includes("Waiting")
                                    ? "#2196f3"
                                    : "#f44336",
                                  fontWeight: 500,
                                  fontSize: "0.8rem",
                                  borderRadius: "8px",
                                  border: `1px solid ${
                                    attch?.Status.includes("Approve")
                                      ? "rgba(76, 175, 80, 0.4)"
                                      : attch?.Status.includes("Waiting")
                                      ? "rgba(33, 150, 243, 0.4)"
                                      : "rgba(244, 67, 54, 0.4)"
                                  }`,
                                }}
                              />
                            ) : findAksesId.accessId === 4 &&
                              (attch?.Status === "Waiting Approval" ||
                                attch?.Status === "TU Reject") ? (
                              <Chip
                                label={attch?.Status}
                                sx={{
                                  backgroundColor: attch?.Status.includes(
                                    "Approve"
                                  )
                                    ? "rgba(76, 175, 80, 0.1)"
                                    : attch?.Status.includes("Waiting")
                                    ? "rgba(33, 150, 243, 0.1)"
                                    : "rgba(244, 67, 54, 0.1)",
                                  color: attch?.Status.includes("Approve")
                                    ? "#4caf50"
                                    : attch?.Status.includes("Waiting")
                                    ? "#2196f3"
                                    : "#f44336",
                                  fontWeight: 500,
                                  fontSize: "0.8rem",
                                  borderRadius: "8px",
                                  border: `1px solid ${
                                    attch?.Status.includes("Approve")
                                      ? "rgba(76, 175, 80, 0.4)"
                                      : attch?.Status.includes("Waiting")
                                      ? "rgba(33, 150, 243, 0.4)"
                                      : "rgba(244, 67, 54, 0.4)"
                                  }`,
                                }}
                              />
                            ) : (
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() =>
                                    handleApproveFinalReport(
                                      attch?.LAAttachmentID
                                    )
                                  }
                                  sx={{ minWidth: 40, padding: 0 }}
                                >
                                  <CheckCircleIcon />
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    handleRejectFinalReport(
                                      attch?.LAAttachmentID
                                    )
                                  }
                                  sx={{ minWidth: 40, padding: 0 }}
                                >
                                  <CancelIcon />
                                </Button>
                              </Box>
                            )}
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="#2E263DB2">
                          Belum ada file yg di upload.
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {tabValue === 2 && <PDFViewerComponent base64File={base64pdf} />}
        </Grid>
      </Grid>

      {logbook && submission.Status === "Approved" && (
        <Box
          sx={{
            marginTop: "1.5rem",
            boxShadow: "none",
            border: "1px solid rgba(224, 224, 224, 1)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{ display: "flex", p: "1rem", justifyContent: "space-between" }}
          >
            <Typography variant="h6">Logbook Kegiatan</Typography>
            {menuAccess.CanAdd && (
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                color="primary"
                onClick={() => handleModalOpen()}
              >
                <AddIcon /> Tambah
              </Button>
            )}
          </Box>
          <Divider />
          <CardContent>
            <ComScheduler data={logbook} />
            <Dialog
              open={openModalLogbook}
              aria-labelledby="logout-dialog-title"
              aria-describedby="logout-dialog-description"
            >
              <DialogContent>
                <Box
                  sx={{
                    marginTop: "1.5rem",
                    boxShadow: "none",
                    border: "1px solid rgba(224, 224, 224, 1)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ margin: "1rem" }}>
                    Logbook Kegiatan
                  </Typography>
                  <Divider />
                  <CardContent>
                    <Box sx={{ px: "1rem", py: "1.7rem" }}>
                      <Box sx={{ mb: "1.5rem", textAlign: "left" }}>
                        <Typography variant="body2" color="#2E263DB2">
                          Catat aktivitas harian Anda secara singkat dan jelas.
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker", "DatePicker"]}
                        >
                          <DatePicker
                            sx={{ width: "100%" }}
                            label="Date"
                            defaultValue={formLogbook.Date}
                            onChange={handleDateChange}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <Box
                        sx={{
                          mt: "1.5rem",
                          textAlign: "left",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <FormLabel htmlFor="label">Label</FormLabel>
                        <OutlinedInput
                          id="label"
                          name="label"
                          type="label"
                          placeholder="Label Kegiatan"
                          autoComplete="label"
                          onChange={handleLabelChange}
                          size="medium"
                        />
                      </Box>
                      <Box
                        sx={{
                          mt: "1.5rem",
                          textAlign: "left",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <FormLabel htmlFor="deskripsi">Deskripsi</FormLabel>
                        <OutlinedInput
                          id="deskripsi"
                          name="deskripsi"
                          type="deskripsi"
                          placeholder="Deskripsi Kegiatan"
                          autoComplete="deskripsi"
                          onChange={handleDescChange}
                          size="medium"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Box>
              </DialogContent>
              <DialogActions>
                {!isLoadingLogbook && (
                  <Box>
                    <Button
                      color="primary"
                      onClick={() => handelSubmitLogbook()}
                    >
                      Simpan
                    </Button>
                    <Button color="primary" onClick={() => handleModalCancel()}>
                      Batal
                    </Button>
                  </Box>
                )}
                {isLoadingLogbook && (
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      columnGap: 1,
                    }}
                  >
                    <CircularProgress />
                    <Typography variant="body2" color="#2E263DB2">
                      Loading...
                    </Typography>
                  </Stack>
                )}
              </DialogActions>
            </Dialog>
          </CardContent>

          {/* Table for Logbook Data */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* Sortable Date Column */}
                  <TableCell sx={{ width: "25%", fontWeight: "bold" }}>
                    <TableSortLabel
                      active={orderBy === "date"}
                      direction={orderBy === "date" ? order : "asc"}
                      onClick={() => handleSort("date")}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>

                  {/* Sortable Label Column */}
                  <TableCell sx={{ width: "25%", fontWeight: "bold" }}>
                    <TableSortLabel
                      active={orderBy === "label"}
                      direction={orderBy === "label" ? order : "asc"}
                      onClick={() => handleSort("label")}
                    >
                      Label
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ width: "50%", fontWeight: "bold" }}>
                    <TableSortLabel
                      active={orderBy === "deskripsi"}
                      direction={orderBy === "deskripsi" ? order : "asc"}
                      onClick={() => handleSort("deskripsi")}
                    >
                      Deskripsi
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedLogbook.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {entry.date}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {entry.label}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      {entry.deskripsi}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={logbook.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
