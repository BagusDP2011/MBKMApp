import React, { useEffect } from "react";
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
  FormHelperText,
  InputLabel,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import Swal from "sweetalert2";
import {
  getSubmissionByID,
  approveSubmission,
  rejectSubmission,
} from "../../../service/Submission.Service";
import pdfIcon from "../../../assets/img/icons8-pdf-48.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import SubmissionPDF from "./SubmissionPDF";
import { styled } from "@mui/system";
import PDFViewerComponent from "./PDFViewerComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserByAccessID } from "../../../service/Static.Service";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { reAssign } from "../../../service/Submission.Service";
import { useAlert } from "../../../components/AlertProvider";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const revisions = [
  {
    RevisionID: 1,
    RevisionNote:
      "Tolong di perbaiki lagi file jadwalnya dan Rincian kegiatannya di perjelas",
    RevisionDate: "2024-11-30T02:05:36.000Z",
    ApproverName: "KPS",
  },
];

const getDotColor = (status, total, index) => {
  if (status === "Rejected") {
    return "#F44336"; // Merah
  } else if (status === "Pending") {
    return "#FFC107"; // Kuning (Warning)
  } else if (status === "Approved" && total === index) {
    return "#4CAF50"; // Hijau
  } else {
    return "#2196F3"; // Biru
  }

  // switch (status) {
  //   case "Approved":
  //     return "#4CAF50"; // Hijau
  //   case "Rejected":
  //     return "#F44336"; // Merah
  //   case "Submit":
  //     return "#2196F3"; // Biru
  //   default:
  //     return "#FFC107"; // Kuning (Warning)
};

export default function DetailSubmission({ menuAccess, accessId }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [base64pdf, setBase64pdf] = React.useState("");
  const [tabValue, setTabValue] = React.useState(0);
  const [submission, setSubmission] = React.useState({});
  const [student, setStudent] = React.useState({});
  const [submissionApproval, setSubmissionApproval] = React.useState([]);
  const [submissionAttachment, setSubmissionAttachment] = React.useState([]);
  const [exchangeProgram, setExchangeProgram] = React.useState({});
  const showAlert = useAlert();

  const [isReAssign, setIsReAssign] = React.useState(false);
  const [supervisors, setSupervisors] = React.useState([]);

  const [totalCredits, setTotalCredits] = React.useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const submission = await getSubmissionByID(id);
        const supervisors = await getUserByAccessID(6);
        setSupervisors(supervisors);
        setSubmission(submission.submission);
        setStudent(submission.student);
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

    return `${formattedDate}, ${formattedTime}`;
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
        await approveSubmission(submissionId);
        navigate(`/menu/mbkm/daftar%20pengajuan`);
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
      await rejectSubmission(submissionId, rejectionNote);

      navigate(`/menu/mbkm/daftar%20pengajuan`);
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

  return (
    <Grid container spacing={3}>
      <Grid item size={4}>
        <Card
          sx={{ boxShadow: "none", border: "1px solid rgba(224, 224, 224, 1)" }}
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
              <Avatar 
                sx={{ width: 80, height: 80, mb: 2 }}
              >{student.Name[0].toUpperCase()}</Avatar>
            )}
            <Typography variant="h6" textAlign="center">
              {student.Name}
            </Typography>
            <Typography variant="subtitle2" color="primary" fontWeight="medium">
              {student.NIM}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <CardContent sx={{ py: 0 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" fontWeight="medium">
                Details
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Username:
                </Typography>
                <Typography variant="body2" color="#2E263DB2">
                  Fahrizal
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
                  Contact:
                </Typography>
                <Typography variant="body2" color="#2E263DB2">
                  +62879912314
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Place, Date of Birth:
                </Typography>
                <Typography variant="body2" color="#2E263DB2">
                  Batam, 30 May 1986
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
                  New Submission
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
              Revision Note
            </Typography>
            <Divider />
            <CardContent>
              {revisions.map((item, index) => (
                <Typography
                  key={item.RevisionID}
                  variant="body2"
                  color="#2E263DB2"
                >
                  {(index += 1)}.{item.RevisionNote} - {item.ApproverName}
                </Typography>
              ))}
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
            Approval Timeline
          </Typography>
          <Divider />
          <CardContent>
            <Timeline position="alternate" sx={{ padding: 0, margin: 0 }}>
              {submissionApproval.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot
                      // color={
                      //   item.ApprovalStatus === "Approved" ||
                      //   item.ApprovalStatus === "Submit"
                      //     ? "primary"
                      //     : "warning"
                      // }

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
          <Tab label="Overview" />
          <Tab label="Document" />
          <Tab label="Preview Document" disabled={true} />
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
                    sx={{ display: "flex", columnGap: 1, alignItems: "center" }}
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
                          sx={{ display: "flex", width: "100%", columnGap: 3 }}
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
                {submissionAttachment.map((attch) => (
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
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {tabValue === 2 && <PDFViewerComponent base64File={base64pdf} />}
      </Grid>
    </Grid>
  );
}
