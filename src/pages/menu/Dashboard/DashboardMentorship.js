import React, { useEffect } from "react";
import {
  Box,
  Grid2 as Grid,
  Typography,
  Card,
  Button,
  Avatar,
  Divider,
  CardContent,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import ThinkingCuate from "../../../assets/img/Multitasking-cuate.svg";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";

import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ComScheduler from "../../../components/scheduler/Scheduler";
import { getLogbookMentorship } from "../../../service/Logbook.Service";

import { useNavigate } from "react-router-dom";
import {
  getSubmissionProgramType,
  getSubmissionMentorshipTotal,
} from "../../../service/Dashboard.Service";

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

const DashboardMentorship = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [logbook, setLogbook] = React.useState([]);
  const [barChartData, setBarChartData] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const [pieChartData, setPieChartDate] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const dataStatus = await getSubmissionProgramType();
        const dataTotal = await getSubmissionMentorshipTotal();
        setBarChartData(dataStatus);
        setPieChartDate(dataTotal);

        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let e = 0;
        let f = 0;

        dataStatus.series[0].data.forEach((e) => {
          a += parseInt(e);
        });

        dataStatus.series[1].data.forEach((e) => {
          b += parseInt(e);
        });

        dataStatus.series[2].data.forEach((e) => {
          c += parseInt(e);
        });
        dataStatus.series[3].data.forEach((e) => {
          d += parseInt(e);
        });
        dataStatus.series[4].data.forEach((e) => {
          e += parseInt(e);
        });
        dataStatus.series[5].data.forEach((e) => {
          f += parseInt(e);
        });

        stats[0].value = a;
        stats[1].value = b;
        stats[2].value = c;
        stats[3].value = d;
        stats[4].value = e;
        stats[5].value = f;

        const logbooks = await getLogbookMentorship();
        setLogbook(
          logbooks.map((item) => ({
            id: item.ID,
            label: item.Label,
            date: item.Date,
            color: "#1976d2",
          }))
        );

        setTotal(a + b + c + d + e + f);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
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
                      Daftar Bimbingan
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
                      rowGap: 1,
                      flex: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {total} Bimbingan
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
                      onClick={() => navigate("/menu/mbkm/daftar%20bimbingan")}
                    >
                      Daftar Bimbingan
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
                  Total Bimbingan {total}
                </Typography>
                <Box sx={{ height: 300 }}>
                  <PieChart
                    // margin={{ right: 250 }}
                    series={[
                      {
                        data: pieChartData,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
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
      {logbook && (
        <Box
          sx={{
            marginTop: "1.5rem",
            boxShadow: "none",
            border: "1px solid rgba(224, 224, 224, 1)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              px: "1.5rem",
              py: "1rem",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Logbook Kegiatan
            </Typography>
          </Box>
          <Divider />
          <CardContent>
            <ComScheduler data={logbook} />
          </CardContent>
        </Box>
      )}
    </Box>
  );
};

export default DashboardMentorship;
