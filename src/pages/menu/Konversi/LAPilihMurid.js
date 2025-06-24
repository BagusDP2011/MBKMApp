import React, { useEffect } from "react";
import TableKonversiMuridLA from "../../../components/tables/TableKonversiMuridLA";
import { Stack, Typography } from "@mui/material";
import { getAllSubmissionLASukses } from "../../../service/Submission.Service";
import { getUserByUserID } from "../../../service/Static.Service";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LAPilihMurid({ menuAccess, accessId }) {
  const [selectedSubmission, setSelectedSubmission] = React.useState([]);
  const [submissions, setSubmissions] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [searchParams] = useSearchParams();
  const submissionId = searchParams.get("submissionId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSubmissionLASukses();
        setSubmissions(data);
        
        if (submissionId) {
          const selected = data.find(
            (item) => item.SubmissionID === submissionId
          );
          console.log(selected);
          setSelectedSubmission(selected || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

    const handleOnRowSelect =  async (submission) => {
          const userDataFetched = await getUserByUserID(submission.SubmissionID);
        setUserData(userDataFetched);
          navigate(`/menu/konversi nilai/hasil mbkm?SubmissionId=${submission.id}&NIM=${submission.StudentID}`);
    };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Pilih murid yang ingin ada nilai
      </Typography>

      {menuAccess.CanRead ? (
        <Stack spacing={3}>
          <TableKonversiMuridLA
            access={menuAccess}
            accessId={accessId}
            dataTable={submissions}
            onRowSelect={(submission) => handleOnRowSelect(submission)}
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
