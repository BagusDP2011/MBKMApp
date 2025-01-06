import React, { useEffect } from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Stack, Typography, Card, Avatar, Divider, Box } from "@mui/material";
import { getSubmissionMentorship } from "../../../service/Submission.Service";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

const stats = [
  {
    label: "Proyek Kemanusiaan",
    value: 0,
    icon: <PeopleAltOutlinedIcon />,
    backColor: "#FF4C51",
  },
  {
    label: "Kegiatan Wirausaha",
    value: 0,
    icon: <BusinessCenterOutlinedIcon />,
    backColor: "#4CAF50",
  },
  {
    label: "Studi /Proyek Independen",
    value: 0,
    icon: <SchoolOutlinedIcon />,
    backColor: "#FFB400",
  },
  {
    label: "Kuliah Kerja Nyata Tematik",
    value: 0,
    icon: <HomeWorkOutlinedIcon />,
    backColor: "#8C57FF",
  },
  {
    label: "Magang Praktik Kerja",
    value: 0,
    icon: <WorkOutlineOutlinedIcon />,
    backColor: "#2196F3",
  },
  {
    label: "Pertukaran Pelajar",
    value: 0,
    icon: <PublicOutlinedIcon />,
    backColor: "#8A8D93",
  },
];

export default function SubmissionMentorship({ menuAccess, accessId }) {
  const [submissions, setSubmissions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submissions = await getSubmissionMentorship();
        setSubmissions(submissions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.StrictMode>
      {menuAccess.CanRead ? (
        <Stack>
          <TableSubmission
            access={menuAccess}
            accessId={accessId}
            dataTable={submissions}
          />
        </Stack>
      ) : (
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Sorry you dont have access to view this page
        </Typography>
      )}
    </React.StrictMode>
  );
}
