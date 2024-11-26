import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid2 as Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  StepLabel,
  Step,
  Stack,
  FormLabel,
  OutlinedInput,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/system";
import { submit } from "../../../service/Submission.Service";
import { getUserByAccessID } from "../../../service/Static.Service";
import { decodeToken } from "../../../service/Auth.Service";
import ExchangeProgram from "./ExchangeProgram";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

let steps = ["Data Diri", "Program MBKM"];
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

function Submission() {
  const [user, setUser] = useState({});
  const [supervisor, setSupervisor] = useState([]);

  const handleStartDateChange = (newStartDate) => {
    formSubmission.StartDate = newStartDate;
  };

  const handleEndDateChange = (newEndDate) => {
    formSubmission.EndDate = newEndDate;
  };

  const [formSubmission, setFormSubmission] = useState({
    StudentID: "",
    LecturerGuardianID: "",
    ProdiID: 0,
    ProgramType: "",
    Reason: "",
    Title: "",
    InstitutionName: "",
    StartDate: dayjs(),
    EndDate: dayjs(),
    Position: "",
    ActivityDetails: "",
    ExchangeProgram: {
      TypeExchange: "",
      StudyProgramObjective: "",
      Courses: [],
    },
  });

  const [stepNum, setStepNum] = useState(0);

  const handleNext = () => {
    setStepNum(stepNum + 1);
  };

  const handlePrevious = () => {
    setStepNum(stepNum - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ProgramType" && value === "Pertukaran Pelajar") {
      steps.push("Data Pertukaran Pelajar");
    } else if (name === "ProgramType") {
      steps = steps.filter((i) => i !== "Data Pertukaran Pelajar");
    }

    if (name === "typeExchange") {
      setFormSubmission((prev) => ({
        ...prev,
        ExchangeProgram: {
          ...prev.ExchangeProgram,
          TypeExchange: value,
        },
      }));
    } else if (name === "studyProgramObjective") {
      setFormSubmission((prev) => ({
        ...prev,
        ExchangeProgram: {
          ...prev.ExchangeProgram,
          StudyProgramObjective: value,
        },
      }));
    } else {
      setFormSubmission({
        ...formSubmission,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(formSubmission);
  };

  const handleCoursesChange = (updatedCourses) => {
    setFormSubmission((prev) => ({
      ...prev,
      ExchangeProgram: {
        ...prev.ExchangeProgram,
        Courses: updatedCourses,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const supervisors = await getUserByAccessID(6);
      setSupervisor(supervisors);
      setUser(decodeToken());
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setFormSubmission((prevForm) => ({
        ...prevForm,
        ProdiID: user.prodiId,
        StudentID: user.id,
      }));
    }
  }, [user]);
  const renderForm = (stepNum) => {
    switch (stepNum) {
      case 0:
        return (
          <>
            <FormGrid size={12}>
              <Typography variant="subtitle1" fontWeight="medium">
                Data Diri
              </Typography>
              <Typography variant="body2" color="#2E263DB2">
                Isi data diri Anda di bawah ini untuk melengkapi profil Anda.
              </Typography>
            </FormGrid>
            <FormGrid size={{ xs: 6, xl: 6, sm: 6 }}>
              <FormLabel htmlFor="name">Nama</FormLabel>
              <OutlinedInput
                id="name"
                name="name"
                type="name"
                placeholder="Nama lengkap"
                autoComplete="name"
                onChange={handleChange}
                disabled
                value={user.name || ""}
                size="medium"
              />
            </FormGrid>
            <FormGrid size={{ xs: 6, xl: 6, sm: 6 }}>
              <FormLabel htmlFor="nim">NIM</FormLabel>
              <OutlinedInput
                id="nim"
                name="nim"
                type="nim"
                placeholder="Nomor Induk Mahasiswa"
                autoComplete="nim"
                onChange={handleChange}
                disabled
                value={user.id || ""}
                size="medium"
              />
            </FormGrid>
            <FormGrid size={{ xs: 6, xl: 6, sm: 6 }}>
              <FormLabel htmlFor="programStudy">Program Studi</FormLabel>
              <OutlinedInput
                id="programStudy"
                name="programStudy"
                type="programStudy"
                placeholder="Program Studi"
                autoComplete="programStudy"
                onChange={handleChange}
                disabled
                value={user.prodiName || ""}
                size="medium"
              />
            </FormGrid>
            <FormGrid size={{ xs: 6, xl: 6, sm: 6 }}>
              <InputLabel>Dosen Pembimbing</InputLabel>
              <FormControl fullWidth>
                <Select
                  name="LecturerGuardianID"
                  value={formSubmission.LecturerGuardianID}
                  onChange={handleChange}
                  required
                >
                  {supervisor.map((s) => (
                    <MenuItem value={s.UserID}>
                      {s.UserID} - {s.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText>
                isikan nama dosen wali apabila tidak ada dosen pembimbing
                magang/TA
              </FormHelperText>
            </FormGrid>
          </>
        );
      case 1:
        return (
          <>
            <FormGrid size={12}>
              <Typography variant="subtitle1" fontWeight="medium">
                Program MBKM
              </Typography>
              <Typography variant="body2" color="#2E263DB2">
                Pilih dan lengkapi informasi mengenai program MBKM yang ingin
                Anda ikuti.
              </Typography>
            </FormGrid>
            <Grid item="true" size={{ xs: 12, md: 12 }}>
              <FormControl fullWidth>
                <InputLabel id="program-type-label">
                  Jenis Program Merdeka
                </InputLabel>
                <Select
                  labelId="program-type-label"
                  id="program-type"
                  name="ProgramType"
                  label="program-type-merkd"
                  value={formSubmission.ProgramType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Penilitian /Riset">
                    Penilitian /Riset
                  </MenuItem>
                  <MenuItem value="Proyek Kemanusiaan">
                    Proyek Kemanusiaan
                  </MenuItem>
                  <MenuItem value="Kegiatan Wirausaha">
                    Kegiatan Wirausaha
                  </MenuItem>
                  <MenuItem value="Studi /Proyek Independen">
                    Studi /Proyek Independen
                  </MenuItem>
                  <MenuItem value="Membangun Desa/Kuliah Kerja Nyata Tematik">
                    Membangun Desa/Kuliah Kerja Nyata Tematik
                  </MenuItem>
                  <MenuItem value="Magang Praktik Kerja">
                    Magang Praktik Kerja
                  </MenuItem>
                  <MenuItem value="Asistensi Mengajar di Satuan Pendidikan">
                    Asistensi Mengajar di Satuan Pendidikan
                  </MenuItem>
                  <MenuItem value="Pertukaran Pelajar">
                    Pertukaran Pelajar
                  </MenuItem>
                </Select>
                <FormHelperText>
                  wajib memilih salah satu, untuk lomba pilih Studi/Proyek
                  Independen
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Judul Kegiatan"
                name="Title"
                value={formSubmission.Title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item="true" size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Alasan Memilih Program"
                name="Reason"
                value={formSubmission.Reason}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item="true" size={{ xs: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Start Date"
                    defaultValue={formSubmission.StartDate}
                    onChange={handleStartDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item="true" size={{ xs: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="End Date"
                    defaultValue={formSubmission.EndDate}
                    onChange={handleEndDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Nama Lembaga Mitra/ Perusahaan"
                name="InstitutionName"
                value={formSubmission.InstitutionName}
                onChange={handleChange}
                helperText="untuk lomba, isikan dengan nama lomba"
                required
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Posisi Di Perusahaan"
                name="Position"
                value={formSubmission.Position}
                onChange={handleChange}
                helperText="Wajib diisi untuk kegiatan MSIB"
                required
              />
            </Grid>
            <Grid item="true" size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Rincian Kegiatan"
                name="ActivityDetails"
                value={formSubmission.ActivityDetails}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <FormGrid size={12}>
              <Typography variant="subtitle1" fontWeight="medium">
                Data Pertukaran Pelajar
              </Typography>
              <Typography variant="body2" color="#2E263DB2">
                Isi informasi yang diperlukan terkait program pertukaran pelajar
                yang Anda ikuti.
              </Typography>
            </FormGrid>
            <Grid item size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Jenis Pertukaran Pelajar</InputLabel>
                <Select
                  name="typeExchange"
                  value={formSubmission.ExchangeProgram.TypeExchange}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Antar Prodi di Politeknik Negeri Batam">
                    Antar Prodi di Politeknik Negeri Batam
                  </MenuItem>
                  <MenuItem value="Antar Prodi pada Perguruan Tinggi yang berbeda">
                    Antar Prodi pada Perguruan Tinggi yang berbeda
                  </MenuItem>
                  <MenuItem value="Prodi sama pada Perguruan Tinggi yang berbeda">
                    Prodi sama pada Perguruan Tinggi yang berbeda
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nama Program Studi Tujuan"
                name="studyProgramObjective"
                value={formSubmission.ExchangeProgram.StudyProgramObjective}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <ExchangeProgram onRowsChange={handleCoursesChange} />
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ width: "100%", my: 5 }}>
        <Stepper activeStep={stepNum} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Card
            sx={{
              boxShadow: "none",
              border: "1px solid rgba(224, 224, 224, 1)",
              width: "100%",
              py: "1.7rem",
              px: "1rem",
            }}
          >
            <CardContent>
              <Grid container spacing={3}>
                {renderForm(stepNum)}
              </Grid>
            </CardContent>
          </Card>
          <Grid item="true" size={{ xs: 12 }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Button
                type="button"
                variant="contained"
                color="primary"
                disabled={stepNum === 0}
                onClick={() => handlePrevious()}
                sx={{ textTransform: "none" }}
              >
                <ChevronLeftIcon />
                Back
              </Button>
              {stepNum < steps.length - 1 && (
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                  sx={{ textTransform: "none" }}
                >
                  Next
                  <ChevronRightIcon />
                  {/* <ArrowForwardIcon fontSize="small"/> */}
                </Button>
              )}
              {stepNum === steps.length - 1 && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  Submit
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Submission;
