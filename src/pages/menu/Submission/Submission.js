import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  StepLabel,
  Step,
  Stack,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const steps = ["Data Diri", "Program MBKM", "Data Pertukaran Pelajar"];

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
    exchangeStudy: "",
    destinationprodi: "",
  });
  function not(a, b) {
    return a.filter((value) => !b.includes(value));
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.includes(value));
  }

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

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(["001-Statistika-4", "009-Dasar Pemrograman-3", "007-Jaringan Komputer-4",]);
  const [right, setRight] = React.useState([ ]);

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
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
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
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={` ${value }`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  const renderForm = (stepNum) => {
    switch (stepNum) {
      case 0:
        return (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nama Lengkap"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="NIM"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Program Studi"
                name="programStudy"
                value={formData.programStudy}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Wali Dosen / Penanggung Jawab</InputLabel>
                <Select
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="DosenA">Dosen A</MenuItem>
                  <MenuItem value="DosenB">Dosen B</MenuItem>
                  <MenuItem value="DosenC">Dosen C</MenuItem>
                  <MenuItem value="DosenD">Dosen D</MenuItem>
                  <MenuItem value="DosenE">Dosen E</MenuItem>
                  <MenuItem value="DosenF">Dosen F</MenuItem>
                </Select>
                <FormHelperText>
                  isikan nama dosen wali apabila tidak ada dosen pembimbing
                  magang/TA
                </FormHelperText>
              </FormControl>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid item xs={12} md={12}>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Judul Kegiatan"
                name="activityTitle"
                value={formData.activityTitle}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Uncontrolled picker"
                />
                <DatePicker
                  label="Controlled picker"
                />
              </DemoContainer>
            </LocalizationProvider> */}
            <Grid item xs={12}>
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
      case 2:
        return(
          <>
          <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Jenis Pertukaran Pelajar</InputLabel>
                <Select
                  name="exchangeStudy"
                  value={formData.exchangeStudy}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="AntarProdiPoltek">Antar Prodi dii Politeknik Negeri Batam</MenuItem>
                  <MenuItem value="AntarProdiNoPoltek">Antar Prodi pada Perguruan Tinggi yang berbeda</MenuItem>
                  <MenuItem value="ProdiSamaNoPoltek">Prodi sama pada Perguruan Tinggi yang berbeda</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nama Program Studi Tujuan"
                name="destinationprodi"
                value={formData.destinationprodi}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center', }}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" sx={{ alignItems: 'center' }}>
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
    </Grid>
          </>
        )
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
        <Grid container spacing={2}>
          {renderForm(stepNum)}
          <Grid item xs={12}>
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
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
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
