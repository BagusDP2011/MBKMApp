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
import { getSubmissionByID, approveSubmission } from "../../../service/Submission.Service";
import { useParams } from "react-router-dom";

export default function DetailSubmission({ menuAccess, accessId }) {
  const [tabValue, setTabValue] = React.useState(0);
  const [submission, setSubmission] = React.useState({});
  const [student, setStudent] = React.useState({});
  const [submissionApproval, setSubmissionApproval] = React.useState([]);
  const [submissionAttachment, setSubmissionAttachment] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submission = await getSubmissionByID(id);
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

        console.log(submitTimeline);

        const updatedSubmissionApproval = [
          submitTimeline,
          ...submission.submissionApproval,
        ];
        setSubmissionApproval(updatedSubmissionApproval);
        setSubmissionAttachment(submission.submissionAttachment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString) => {
    console.log(dateString);
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

  const showAlert = () => {
    Swal.fire({
      title: "Hello!",
      text: "This is a SweetAlert in React",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };

  const handleApprove = async (submissionId) => {
    Swal.fire({
      title: "Approve Submission",
      text: "Are you sure want to approve this submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#FF4C51',
      confirmButtonColor: '#3F8CFE',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await approveSubmission(submissionId, accessId)
      }
    });
  };

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
            <Avatar
              alt="Seth Hallam"
              src=""
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            <Typography variant="h6">{student.Name}</Typography>
            {/* <Box
              sx={{
                backgroundColor: "rgb(22 177 255 / 0.16)",
                px: "8px",
                height: "22.875px",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "#16B1FF", fontSize: "0.9rem" }}
                fontWeight="bold"
              >
                3312311045
              </Typography>
            </Box> */}
            <Typography variant="subtitle2" color="primary" fontWeight="medium">
              {student.NIM}
            </Typography>
          </Box>

          {/* <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Box textAlign="center">
              <CheckCircleIcon color="primary" />
              <Typography variant="body1">1.23k</Typography>
              <Typography variant="caption">Task Done</Typography>
            </Box>
            <Box textAlign="center">
              <StarIcon color="secondary" />
              <Typography variant="body1">568</Typography>
              <Typography variant="caption">Project Done</Typography>
            </Box>
          </Stack> */}

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
                <Typography variant="body2">Fahrizal</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Email:
                </Typography>
                <Typography variant="body2">{student.Email}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Prodi:
                </Typography>
                {/* <Box
                  sx={{
                    backgroundColor: "rgb(86 202 0 / 0.16)",
                    px: "8px",
                    height: "22.875px",
                    borderRadius: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#56CA00", fontSize: "0.9rem" }}
                    fontWeight="bold"
                  >
                    Teknik Informatika
                  </Typography>
                </Box> */}
                <Typography variant="body2">{student.ProdiName}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Contact:
                </Typography>
                <Typography variant="body2">+62879912314</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Place, Date of Birth:
                </Typography>
                <Typography variant="body2">Batam, 30 May 1986</Typography>
              </Box>
            </Stack>
          </CardContent>

          {accessId !== 1 && (
            <Box display="flex" gap={2} px="1rem" pt="1rem" pb="2rem">
              <Button
                sx={{ width: "100%", textTransform: "none" }}
                variant="outlined"
                color="error"
              >
                Reject
              </Button>
              <Button
                sx={{ width: "100%", textTransform: "none" }}
                variant="contained"
                color="primary"
                onClick={() => handleApprove(submission.SubmissionID)}
              >
                Approve
              </Button>
            </Box>
          )}
        </Card>

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
                      color={
                        item.ApprovalStatus === "Approved" ||
                        item.ApprovalStatus === "Submit"
                          ? "primary"
                          : "warning"
                      }
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
        </Tabs>

        {tabValue === 0 && <Card></Card>}
      </Grid>
    </Grid>
  );
}
