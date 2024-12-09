import React from "react";
import {
  Box,
  Grid2 as Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import ThinkingCuate from "../../../assets/img/Multitasking-cuate.svg";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { EventAvailableTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

const Dashboard = () => {
  const navigate = useNavigate();
  // Data untuk grafik
  const barChartData = [
    { year: "2016", profit: 20000, income: 35000, expense: 15000 },
    { year: "2017", profit: 25000, income: 40000, expense: 20000 },
    { year: "2018", profit: 30000, income: 45000, expense: 25000 },
    { year: "2019", profit: 35000, income: 50000, expense: 30000 },
    { year: "2020", profit: 40000, income: 55000, expense: 35000 },
    { year: "2021", profit: 45000, income: 60000, expense: 40000 },
    { year: "2022", profit: 50000, income: 65000, expense: 45000 },
  ];

  const pieChartData = [
    { category: "1 Quarter", value: 28 },
    { category: "2 Quarter", value: 22 },
    { category: "3 Quarter", value: 30 },
    { category: "4 Quarter", value: 20 },
  ];

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid item size={8}>
        <Card
          sx={{
            padding: 3,
            display: "flex",
            alignItems: "center",
            boxShadow: "none",
            border: "1px solid rgba(224, 224, 224, 1)",
            position: "relative",
            overflow: "visible",
          }}
        >
          <Box sx={{ maxWidth: "60%" }}>
            <Typography variant="h5" fontWeight="bold" mb={5}>
              Selamat Datang Kembali Fahrizal!
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Cek aktivitas terkini di dashboard untuk memaksimalkan pengalaman
              MBKM Anda!
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "-1.6rem",
              right: 0,
              zIndex: 99,
            }}
          >
            <img src={ThinkingCuate} width={300} />
          </Box>
        </Card>
      </Grid>

      {/* Revenue and Transactions */}
      <Grid item size={2}>
        <Card
          sx={{
            padding: 2,
            boxShadow: "none",
            border: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="text.secondary">
            Revenue
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="green">
            $95k
          </Typography>
          <Typography variant="caption" color="green">
            +12% Revenue Increase
          </Typography>
        </Card>
      </Grid>

      <Grid item size={2}>
        <Card
          sx={{
            padding: 2,
            boxShadow: "none",
            border: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="text.secondary">
            Transactions
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="blue">
            12.1k
          </Typography>
          <Typography variant="caption" color="blue">
            +38% Daily Transactions
          </Typography>
        </Card>
      </Grid>

      {/* Bar Chart */}
      <Grid item size={8} md={8}>
        <Card
          sx={{
            boxShadow: "none",
            border: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ height: 340, p: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Status Pengajuan
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      "Teknik Informatika",
                      "Terapan Animasi",
                      "Keamanan Siber",
                    ],
                  },
                ]}
                series={[
                  { data: [4, 3, 5], color: "#2196F3" },
                  { data: [1, 6, 3], color: "#4CAF50", },
                  { data: [2, 5, 6], color: "#F44336" },
                ]}
                width={500}
                height={300}
              />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                rowGap: 4,
                flex: 1,
              }}
            >
              {stats.map((stat, index) => (
                <Box sx={{ display: "flex", columnGap: 1 }}>
                  <Avatar
                    variant="rounded"
                    sx={{ backgroundColor: `${stat.backColor}20` }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { color: stat.backColor },
                    })}
                  </Avatar>
                  <Box>
                    <Typography Typography variant="body2" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="#2E263DB2">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Button
                sx={{ width: "100%", textTransform: "none" }}
                variant="contained"
                color="primary"
                onClick={() => navigate("/menu/mbkm/status%20pengajuan")}
              >
                Submission Status
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* Total Sales */}
      <Grid item size={4} md={4}>
        <Card
          sx={{
            padding: 2,
            boxShadow: "none",
            border: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Total Pengajuan
          </Typography>
          <Box sx={{ height: 300 }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Teknik Informatika" },
                    { id: 1, value: 15, label: "Terapan Animasi" },
                    { id: 2, value: 20, label: "Keamanan Siber" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
