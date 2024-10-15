import * as React from "react";
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
  TextField,
  LinearProgress,
  Grid2 as Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

export default function UserProfileWithTabsAndTimeline() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const approvalData = [
    {
      AccDescription: "Tata Usaha",
      Level: 1,
      ApprovalID: 4,
      SubmissionID: "c5bdf4fc-0994-4140-a02e-eb4adab05792",
      ApproverID: 1,
      ApprovalStatus: "Approved",
      ApprovalDate: "2024-10-13T17:00:00.000Z",
    },
    {
      AccDescription: "KPS",
      Level: 2,
      ApprovalID: 5,
      SubmissionID: "c5bdf4fc-0994-4140-a02e-eb4adab05792",
      ApproverID: 2,
      ApprovalStatus: "Approved",
      ApprovalDate: "2024-10-15T17:00:00.000Z",
    },
    {
      AccDescription: "Dosbing",
      Level: 3,
      ApprovalID: 6,
      SubmissionID: "c5bdf4fc-0994-4140-a02e-eb4adab05792",
      ApproverID: 2,
      ApprovalStatus: "Approved",
      ApprovalDate: "2024-10-15T17:00:00.000Z",
    },
  ];

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

  return (
    <Grid container spacing={4}>
      <Grid item size={4}>
        <Card sx={{ boxShadow: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" marginTop='1rem'>
            <Avatar
              alt="Seth Hallam"
              src="" // tambahkan src gambar jika ada
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            <Typography variant="h6">Muhammad Fahrizal Ali Pradana</Typography>
            <Typography variant="subtitle2" color="primary">
              3312311045
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

          <CardContent>
            <Stack spacing={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                Details
              </Typography>
              <Typography variant="body2">Username: Fahrizal</Typography>
              <Typography variant="body2">Email: shallamb@gmail.com</Typography>
              <Typography variant="body2">Prodi: Teknik Informatika</Typography>
              {/* <Typography variant="body2">Role: Subscriber</Typography> */}
              {/* <Typography variant="body2">Tax ID: Tax-8894</Typography> */}
              <Typography variant="body2">Contact: +6289677124</Typography>
              <Typography variant="body2">
                Place, Date of Birth: Batam, 30 May 1986
              </Typography>
            </Stack>
          </CardContent>

          <Box display="flex" justifyContent="center" gap={2} p={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckOutlinedIcon />}
            >
              Approve
            </Button>
            <Button variant="outlined" color="error" startIcon={<BlockIcon />}>
              Reject
            </Button>
          </Box>
        </Card>

        <Card sx={{ marginTop: "32px", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Approval Timeline</Typography>
            <Timeline position="alternate">
              {approvalData.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot
                      color={
                        item.ApprovalStatus === "Approved"
                          ? "primary"
                          : "success"
                      }
                    />
                    {index < approvalData.length - 1 && <TimelineConnector />}
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

        {/* Tab Content - Project List */}
        {tabValue === 0 && (
          <Card sx={{boxShadow: 3}}>
            <CardContent>
              <Typography variant="h6">Project List</Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Example of a project row */}
              {projects.map((project) => (
                <Box key={project.id} mb={2}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {project.name} ({project.type})
                    </Typography>
                    <Typography variant="body2">{project.hours} hrs</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2">{project.taskCount}</Typography>
                    <Box sx={{ width: "70%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                      />
                    </Box>
                    <Typography variant="body2">{project.progress}%</Typography>
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

// Dummy Project Data
const projects = [
  {
    id: 1,
    name: "BGC eCommerce App",
    type: "React Project",
    taskCount: "122/240",
    progress: 78,
    hours: "18:42",
  },
  {
    id: 2,
    name: "Falcon Logo Design",
    type: "Figma Project",
    taskCount: "9/56",
    progress: 18,
    hours: "20:42",
  },
  {
    id: 3,
    name: "Dashboard Design",
    type: "VueJS Project",
    taskCount: "290/320",
    progress: 62,
    hours: "120:87",
  },
  {
    id: 4,
    name: "Foodstira Mobile App",
    type: "Xamarin Project",
    taskCount: "7/63",
    progress: 8,
    hours: "89:19",
  },
  {
    id: 5,
    name: "Dojo React Project",
    type: "Python Project",
    taskCount: "120/186",
    progress: 49,
    hours: "230:10",
  },
  {
    id: 6,
    name: "Blockchain Website",
    type: "Sketch Project",
    taskCount: "99/109",
    progress: 92,
    hours: "342:41",
  },
  {
    id: 7,
    name: "Hoffman Website",
    type: "HTML Project",
    taskCount: "98/110",
    progress: 88,
    hours: "12:45",
  },
];
