import React, { useEffect } from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Stack, Typography } from "@mui/material";
import {
  getSubmission,
} from "../../../service/Submission.Service";

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
          <TableSubmission access={menuAccess} accessId={accessId} dataTable={submissions} />
        </Stack>
      ) : (
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Sorry you dont have access to view this page
        </Typography>
      )}
    </React.StrictMode>
  );
}
