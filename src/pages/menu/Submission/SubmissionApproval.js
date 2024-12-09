import React, { useEffect } from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Stack, Typography, Box, Card, Divider, Avatar } from "@mui/material";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { getSubmission } from "../../../service/Submission.Service";

const stats = [
  // { label: "Revision", value: 56, icon: <CalendarMonthIcon />, backColor: "#FFC107"},
  { label: "Processing", value: 12689, icon: <HourglassEmptyOutlinedIcon />,  backColor: "#2196F3" },
  { label: "Approved", value: 124, icon: <CheckOutlinedIcon />,  backColor: "#4CAF50" },
  { label: "Rejected", value: 32, icon: <CloseOutlinedIcon />,  backColor: "#F44336" },
];

export default function ListSubmission({ menuAccess, accessId }) {
  const [submissions, setSubmissions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submissions = await getSubmission();
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
