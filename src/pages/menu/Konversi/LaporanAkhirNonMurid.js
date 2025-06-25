import React, { useEffect } from "react";
import TableLapAkhirAktorLain from "../../../components/tables/TableLapAkhirAktorLain";
import { Stack, Typography, Box, Grid } from "@mui/material";

import { getAllSubmissionLAData } from "../../../service/Submission.Service";
import { getUserByTarget } from "../../../service/Static.Service";
import { useSearchParams, Navigate, useLocation } from "react-router-dom";

export default function LaporanAkhirNonMurid({ menuAccess, accessId }) {
  const [submissions, setSubmissions] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [finalReportList, setFinalReportList] = React.useState([]);
  const [selectedSubmission, setSelectedSubmission] = React.useState(null);
  const [message, setMessage] = React.useState("Tidak ada dokumen tersedia");
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const submissionId = searchParams.get("SubmissionId");
  const StudentID = searchParams.get("NIM");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSubmissionLAData();
        setSubmissions(data);       
        
        const userDataFetched = await getUserByTarget(submissionId);
        setUserData(userDataFetched.student);

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
        if (submissionId) {
          const selected = data.find(
            (item) => item.SubmissionID === submissionId
          );
          setSelectedSubmission(selected || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Lembar Hasil Nilai Mahasiswa
      </Typography>

      {menuAccess.CanRead ? (
        <Stack spacing={3}>
          <Box
            sx={{
              mx: 10,
              my: 4,
              py: 3,
              px: 4,
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              gutterBottom
            >
              Informasi Mahasiswa
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "100%", maxWidth: 800 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <b>NIM:</b> {userData?.NIM || "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <b>Fakultas:</b> {userData?.ProdiName || "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <b>Nama:</b> {userData?.Name || "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <b>Universitas:</b> Politeknik Negeri Batam
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>

          <TableLapAkhirAktorLain
            access={menuAccess}
            accessId={accessId}
            dataTable={submissions}
            onRowSelect={(submission) => setSelectedSubmission(submission)}
          />
        </Stack>
      ) : (
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Sorry, you don't have access to view this page.
        </Typography>
      )}
    </>
  );
}
