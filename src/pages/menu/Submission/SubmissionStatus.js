import React, { useEffect } from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Stack, Typography, Box, Card, Divider, Avatar } from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { getSubmissionStatus } from "../../../service/Submission.Service";

const stats = [
  // { label: "Revision", value: 56, icon: <CalendarMonthIcon />, backColor: "#FFC107"},
  {
    label: "Processing",
    value: 12689,
    icon: <HourglassEmptyOutlinedIcon />,
    backColor: "#2196F3",
  },
  {
    label: "Approved",
    value: 124,
    icon: <CheckOutlinedIcon />,
    backColor: "#4CAF50",
  },
  {
    label: "Rejected",
    value: 32,
    icon: <CloseOutlinedIcon />,
    backColor: "#F44336",
  },
];

export default function SubmissionStatus({ menuAccess, accessId }) {
  const [submissions, setSubmissions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submissions = await getSubmissionStatus();
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
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              mb: 3,
              boxShadow: "none",
              border: "1px solid rgba(224, 224, 224, 1)",
              borderRadius: "8px",
            }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Avatar
                    variant="rounded"
                    sx={{ backgroundColor: `${stat.backColor}20` }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { color: stat.backColor },
                    })}
                  </Avatar>
                </Box>
                {/* Tambahkan Divider kecuali untuk elemen terakhir */}
                {index < stats.length - 1 && (
                  <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                )}
              </React.Fragment>
            ))}
          </Card>
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
