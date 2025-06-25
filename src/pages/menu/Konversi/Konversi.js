import React, { useEffect } from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Stack, Typography, Box, Card, Divider, Avatar } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { getAllSubmissionLASukses } from "../../../service/Submission.Service";
import { decodeToken } from "../../../service/Auth.Service";
import TableHasil from "../../../components/tables/TableHasil";

export default function Konversi({ menuAccess, accessId }) {
  const [submissions, setSubmissions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSubmissionLASukses();
        console.log(data);
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.StrictMode>
      Hasil Nilai Mahasiswa
      {menuAccess.CanRead ? (
        <Stack>
          <TableHasil
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
