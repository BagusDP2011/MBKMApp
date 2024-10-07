import React, { useState } from "react";
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
  Checkbox,
  FormLabel,
  OutlinedInput,
  FormControlLabel,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled } from "@mui/system";

const steps = ["Data Diri", "Program MBKM", "Data Pertukaran Pelajar"];
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

function Submission() {
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    programStudy: "",
    supervisor: "",
    freedomProgramType: "",
    reasonForChoosing: "",
    activityTitle: "",
    partnerInstitution: "",
    position: "",
    activityDuration: "",
    activityDetails: "",
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const renderForm = (stepNum) => {
    switch (stepNum) {
      case 0:
        return (
            <>
              <FormGrid size={{ xs: 6}}>
                <FormLabel htmlFor="name" required>
                  Nama
                </FormLabel>
                <OutlinedInput
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Nama lengkap"
                  autoComplete="name"
                  onChange={handleChange}
                  required
                  size="medium"
                />
              </FormGrid>
              <FormGrid size={{ xs: 6}}>
                <FormLabel htmlFor="nim" required>
                  NIM
                </FormLabel>
                <OutlinedInput
                  id="nim"
                  name="nim"
                  type="nim"
                  placeholder="Nomor Induk Mahasiswa"
                  autoComplete="nim"
                  onChange={handleChange}
                  required
                  size="medium"
                />
              </FormGrid>
              <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="programStudy" required>
                  Program Studi
                </FormLabel>
                <OutlinedInput
                  id="programStudy"
                  name="programStudy"
                  type="programStudy"
                  placeholder="Program Studi"
                  autoComplete="programStudy"
                  onChange={handleChange}
                  required
                  size="medium"
                />
              </FormGrid>
              <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="supervisor" required>Wali Dosen</FormLabel>
                <OutlinedInput
                  id="supervisor"
                  name="supervisor"
                  type="supervisor"
                  placeholder="Wali Dosen"
                  autoComplete="supervisor"
                  onChange={handleChange}
                  required
                  size="medium"
                />
                <FormHelperText>isikan nama dosen wali apabila tidak ada dosen pembimbing magang/TA</FormHelperText>
              </FormGrid>
            </>
        );
      case 1:
        return (
          <>
            <Grid item="true" size={{ xs:12, md:12}}>
              <FormControl fullWidth>
                <InputLabel>Jenis Program Merdeka</InputLabel>
                <Select
                  name="freedomProgramType"
                  value={formData.freedomProgramType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Program A">Proyek Kemanusiaan</MenuItem>
                  <MenuItem value="Program B">Kegiatan Wirausaha</MenuItem>
                  <MenuItem value="Program C">Studi Independen</MenuItem>
                  <MenuItem value="Program C">Kuliah Kerja Nyata</MenuItem>
                  <MenuItem value="Program C">Magang Praktik Kerja</MenuItem>
                  <MenuItem value="Program C">
                    Asistensi Mengajar di Satuan Pendidikan
                  </MenuItem>
                  <MenuItem value="Program C">Pertukaran Pelajar</MenuItem>
                </Select>
                <FormHelperText>
                  wajib memilih salah satu, untuk lomba pilih Studi/Proyek
                  Independen
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs:12}}>
              <TextField
                fullWidth
                label="Judul Kegiatan"
                name="activityTitle"
                value={formData.activityTitle}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item="true" size={{ xs:12}}>
              <TextField
                fullWidth
                label="Alasan Memilih Program"
                name="reasonForChoosing"
                value={formData.reasonForChoosing}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item="true" size={{ xs:12, md:6}}>
              <TextField
                fullWidth
                label="Nama Lembaga Mitra/ Perusahaan"
                name="partnerInstitution"
                value={formData.partnerInstitution}
                onChange={handleChange}
                helperText="untuk lomba, isikan dengan nama lomba"
                required
              />
            </Grid>
            <Grid item="true" size={{ xs:12, md:6}}>
              <TextField
                fullWidth
                label="Posisi Di Perusahaan"
                name="position"
                value={formData.position}
                onChange={handleChange}
                helperText="Wajib diisi untuk kegiatan MSIB"
                required
              />
            </Grid>
            <Grid item="true" size={{ xs:12}}>
              <TextField
                fullWidth
                label="Rincian Kegiatan"
                name="activityDetails"
                value={formData.activityDetails}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
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
          {renderForm(stepNum)}
          <Grid item="true" size={{xs:12}}>
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
              >
                <ChevronLeftIcon />
              </Button>
              {stepNum < steps.length - 1 && (
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                >
                  <ChevronRightIcon />
                </Button>
              )}
              {stepNum === steps.length - 1 && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
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
