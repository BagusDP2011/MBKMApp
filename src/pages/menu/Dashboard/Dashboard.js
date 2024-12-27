import React, { useEffect } from "react";
import {
  Box,
  Grid2 as Grid,
  Typography,
  Card,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import ThinkingCuate from "../../../assets/img/Multitasking-cuate.svg";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { useNavigate } from "react-router-dom";
import {
  getSubmissionStatus,
  getSubmissionTotal,
} from "../../../service/Dashboard.Service";

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

const DashboardTU = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [barChartData, setBarChartData] = React.useState(null);
  const [pieChartData, setPieChartDate] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const dataStatus = await getSubmissionStatus();
        const dataTotal = await getSubmissionTotal();
        setBarChartData(dataStatus);
        setPieChartDate(dataTotal);

        let pending = 0;
        let approved = 0;
        let rejected = 0;

        dataStatus.series[0].data.forEach((e) => {
          pending += parseInt(e);
        });

        dataStatus.series[1].data.forEach((e) => {
          approved += parseInt(e);
        });

        dataStatus.series[2].data.forEach((e) => {
          rejected += parseInt(e);
        });

        stats[0].value = pending;
        stats[1].value = approved;
        stats[2].value = rejected;

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item container size={8} spacing={3}>
        <Grid item size={12}>
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
                Selamat Datang Kembali!
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                Cek aktivitas terkini di dashboard untuk memaksimalkan
                pengalaman MBKM Anda!
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
        <Grid item size={12}>
          {barChartData && (
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
                        data: barChartData.categories,
                      },
                    ]}
                    series={barChartData.series.map((s) => ({
                      data: s.data,
                      color: s.color,
                    }))}
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
                    justifyContent: "center",
                    rowGap: 4,
                    flex: 1,
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      5 Pengajuan
                    </Typography>
                    {/* <Typography variant="body2" color="#2E263DB2">
                      Periksa pengajuan yang tertunda di approval anda
                    </Typography> */}
                  </Box>
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
                        <Typography
                          Typography
                          variant="body2"
                          fontWeight="bold"
                        >
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
                    Status Pengajuan
                  </Button>
                </Box>
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Revenue and Transactions */}
      <Grid item size={4}>
        <Grid item size={12}>
          {pieChartData && (
            <Card
              sx={{
                padding: 3,
                boxShadow: "none",
                border: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Total Pengajuan
              </Typography>
              <Box sx={{ height: 300 }}>
                <PieChart
                  // margin={{ right: 250 }}
                  series={[
                    {
                      data: pieChartData,
                      highlightScope: { faded: "global", highlighted: "item" },
                    },
                  ]}
                  // width={400}
                  // height={200}
                />
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardTU;
