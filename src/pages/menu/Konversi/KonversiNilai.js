import React, { useEffect } from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Stack, Typography, Box, Card, Divider, Avatar } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { getSubmissionLAData } from "../../../service/Submission.Service";
import { decodeToken } from "../../../service/Auth.Service";
import TableKonversi from "../../../components/tables/TableKonversi";

const stats = [
  {
    label: "Pending",
    value: 0,
    icon: <HourglassEmptyOutlinedIcon />,
    backColor: "#2196F3",
  },
  {
    label: "Approved",
    value: 0,
    icon: <CheckOutlinedIcon />,
    backColor: "#4CAF50",
  },
  {
    label: "Rejected",
    value: 0,
    icon: <CloseOutlinedIcon />,
    backColor: "#F44336",
  },
];

export default function KonversiNilai({ menuAccess, accessId }) {
  const [submissions, setSubmissions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubmissionLAData();
        console.log(data);
        setSubmissions(data);
        stats[0].value = data.filter((x) => x.AttachmentStatus === "Pending").length || 0;
        stats[1].value =
          data.filter((x) => x.AttachmentStatus === "Approved").length || 0;
        stats[2].value =
          data.filter((x) => x.AttachmentStatus === "Rejected").length || 0;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.StrictMode>
      KONVERSI NILAI
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
          <TableKonversi
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
