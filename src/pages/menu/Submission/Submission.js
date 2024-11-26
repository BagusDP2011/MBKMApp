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
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled } from "@mui/system";
import { submit } from "../../../service/Submission.Service";
import { getUserByAccessID } from "../../../service/Static.Service";
import { decodeToken } from "../../../service/Auth.Service";
import ExchangeProgram from "./ExchangeProgram";

let steps = ["Data Diri", "Program MBKM"];
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

function Submission() {
  const [user, setUser] = useState({});
  const [supervisor, setSupervisor] = useState([]);

  function not(a, b) {
    return a.filter((value) => !b.includes(value));
  }

  function intersection(a, b) {
    return a.filter((value) => b.includes(value));
  }

  const [formSubmission, setFormSubmission] = useState({
    StudentID: "",
    SupervisorID: "",
    ProdiID: 0,
    ProgramType: "",
    Reason: "",
    Title: "",
    InstitutionName: "",
    StartDate: "",
    EndDate: "",
    Position: "",
    ActivityDetails: "",
    ExchangeProgram: []
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
      steps = steps.filter((i) => {
        return i !== "Data Pertukaran Pelajar";
      });
    }

    setFormSubmission({
      ...formSubmission,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(formSubmission);
  };

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([
    "001-Statistika-4",
    "009-Dasar Pemrograman-3",
    "007-Jaringan Komputer-4",
  ]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleExchangeProgramChange = (updatedExchangeProgram) => {
    setFormSubmission((prev) => ({
      ...prev,
      ExchangeProgram: updatedExchangeProgram,
    }));
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={` ${value}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

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
            <FormGrid size={{ xs: 6, xl:6, sm:6 }}>
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
            <FormGrid size={{ xs: 6, xl:6, sm:6 }}>
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
            <FormGrid size={{ xs: 6, xl:6, sm:6 }}>
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
            <FormGrid size={{ xs: 6, xl:6, sm:6 }}>
              <InputLabel>Dosen Pembimbing</InputLabel>
              <FormControl fullWidth>
                <Select
                  name="SupervisorID"
                  value={formSubmission.SupervisorID}
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
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                // label="Tanggal Mulai"
                name="StartDate"
                type="date"
                value={formSubmission.StartDate}
                onChange={handleChange}
                helperText="Wajib diisi untuk kegiatan MSIB"
                required
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                // label="Tanggal Berakhir"
                name="EndDate"
                type="date"
                value={formSubmission.EndDate}
                onChange={handleChange}
                helperText="Wajib diisi untuk kegiatan MSIB"
                required
              />
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid item size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Jenis Pertukaran Pelajar</InputLabel>
                <Select
                  name="exchangeStudy"
                  value={formSubmission.ProgramType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="AntarProdiPoltek">
                    Antar Prodi dii Politeknik Negeri Batam
                  </MenuItem>
                  <MenuItem value="AntarProdiNoPoltek">
                    Antar Prodi pada Perguruan Tinggi yang berbeda
                  </MenuItem>
                  <MenuItem value="ProdiSamaNoPoltek">
                    Prodi sama pada Perguruan Tinggi yang berbeda
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nama Program Studi Tujuan"
                name="destinationprodi"
                value={formSubmission.destinationprodi}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item size={{ xs: 12}}>
              <ExchangeProgram onRowsChange={handleExchangeProgramChange}/>
            </Grid>
            {/* <Grid
              container
              spacing={2}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid item>{customList(left)}</Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  sx={{ alignItems: "center" }}
                >
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                    aria-label="move all right"
                  >
                    ≫
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                    aria-label="move all left"
                  >
                    ≪
                  </Button>
                </Grid>
              </Grid>
              <Grid item>{customList(right)}</Grid>
            </Grid> */}
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
              py:"1.7rem",
              px:"1rem"
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
                <Button type="submit" variant="contained" color="primary">
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
