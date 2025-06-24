import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box, Stack, Tooltip, Typography, IconButton } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import {
  getSubmission,
  deleteSubmission,
} from "../../service/Submission.Service";
import {
  getColumn,
  createHasilLaporan,
  getRowHasil,
} from "../../service/Static.Service";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../AlertProvider";
import { decodeToken } from "../../service/Auth.Service";

// Komponen IconButton yang disesuaikan
const IconButtonCustom = ({
  icon,
  onClick,
  hoverColor = "#3F8CFE",
  color = "#757575",
}) => (
  <IconButton
    onClick={onClick}
    sx={{
      padding: 0,
      color: color,
      "&:hover": { color: hoverColor },
    }}
  >
    {icon}
  </IconButton>
);

// Toolbar untuk DataGrid
function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ pb: 1, px: 1.5 }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
        }}
      />
    </GridToolbarContainer>
  );
}

const paginationModel = { page: 0, pageSize: 10 };

// [UPDATE] Tambahkan onRowSelect ke parameter props
export default function TableLapAKhirAktorLain({
  access,
  accessId,
  dataTable,
  onRowSelect,
}) {
  const [dataUntukTable, setDataUntukTable] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState();
  const [columns, setColumns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    Kode_Matkul: "",
    Nama_Matkul: "",
    Nilai: "",
    Predikat: "",
  });
  const navigate = useNavigate();
  const showAlert = useAlert();

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataIsi = await getRowHasil();
        const dataDenganId = dataIsi.map((item) => ({
          ...item,
          id: item.HasilID,
        }));
        setDataUntukTable(dataDenganId);
        const columnData = await getColumn("LapAkhir2", accessId);
        setColumns(columnData.column);
        setColumnVisibilityModel(columnData.visibility);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getExportColumn = () =>
    Object.keys(columns.visibility).filter((key) => columns.visibility[key]);

  const handleColumnResizeCommitted = (params) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.field === params.colDef.field
          ? { ...col, width: params.width }
          : col
      )
    );
  };

  const handleSelectionChange = (selectionModel) => {
    const selectedIDs = new Set(selectionModel);
    const selectedData = dataUntukTable.filter((row) =>
      selectedIDs.has(row.id)
    );
    setSelectedRows(selectedData);
  };

  const handleDelete = async (submissionId) => {
    Swal.fire({
      title: "Delete Submission",
      text: "Are you sure want to delete this submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#FF4C51",
      cancelButtonColor: "#3F8CFE",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          var response = await deleteSubmission(submissionId);
          showAlert(response.message, "success");
        } catch (error) {
          showAlert("Error while delete submission", "error");
        }

        const breadcrumbData = await getSubmission(accessId);
        setDataUntukTable(breadcrumbData);
      }
    });
  };

  const processColumns = () =>
    columns.map((col) => {
      if (col.field === "Actions") {
        return {
          ...col,
          renderCell: (params) => {
            const status = params.row.Status;
            return (
              <Stack
                sx={{ height: "100%", alignItems: "center", columnGap: 1 }}
                direction="row"
              >
                <Tooltip title="Detail" placement="top">
                  <IconButtonCustom
                    icon={<VisibilityOutlinedIcon />}
                    onClick={() => onRowSelect?.(params.row)} // [UPDATE] Memanggil onRowSelect
                    hoverColor="#3F8CFE"
                  />
                </Tooltip>
                {access.CanDelete && status !== "Approved" && (
                  <Tooltip title="Delete" placement="top">
                    <IconButtonCustom
                      icon={<DeleteOutlineOutlinedIcon />}
                      onClick={() => handleDelete(params.id)}
                      hoverColor="#FF4C51"
                    />
                  </Tooltip>
                )}
              </Stack>
            );
          },
        };
      }

      if (col.field === "Status") {
        return {
          ...col,
          renderCell: (params) => {
            const getStatusColor = () => {
              switch (params.value) {
                case "Approved":
                  return "#56CA00";
                case "Rejected":
                  return "#FF4C51";
                case "Pending":
                  return "#16B1FF";
                default:
                  return "#000000";
              }
            };

            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: `${getStatusColor()}20`,
                    height: "24px",
                    width: "max-content",
                    borderRadius: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: getStatusColor(),
                      fontSize: "0.8125rem",
                      paddingInline: "12px",
                    }}
                  >
                    {params.value}
                  </Typography>
                </Box>
              </Box>
            );
          },
        };
      }

      return col;
    });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveRow = () => {
    if (dataUntukTable.length === 0) return;
    setDataUntukTable((prev) => prev.slice(0, -1));
  };

  // Fungsi simpan ke database
  const handleSaveToDatabase = async () => {
    try {
      const userData = decodeToken();
      let UserID = userData.id;

      const newData = {
        ...formData,
        StudentID: UserID,
      };
      await createHasilLaporan(newData);
      showAlert("Data berhasil ditambahkan", "success");

      // Refresh tabel
      const refreshed = await getRowHasil();
      setDataUntukTable(refreshed);
      handleCloseModal();
    } catch (err) {
      console.error(err);
      showAlert("Gagal menyimpan data", "error");
    }
  };

  return (
    <div>
      <center>
        <h1>Laporan Kegiatan</h1>
      </center>

      <DataGrid
        sx={{ px: "1rem", py: "2rem" }}
        rows={dataUntukTable}
        getRowId={(row) => row.HasilID}
        columns={processColumns()}
        initialState={{
          pagination: { paginationModel },
          density: "comfortable",
        }}
        pageSizeOptions={[5, 10]}
        selectionModel={selectedRows}
        slots={{
          toolbar: access.CanPrint ? CustomToolbar : null,
        }}
        slotProps={{
          toolbar: { csvOptions: { fields: getExportColumn } },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={handleColumnVisibilityChange}
        onColumnResize={handleColumnResizeCommitted}
        disableRowSelectionOnClick
        // [UPDATE] Tambahkan onRowClick dan teruskan ke onRowSelect
        onRowClick={(params) => {
          if (onRowSelect) {
            onRowSelect(params.row);
          }
        }}
      />
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", gap: 2, px: "1rem" }}
      >
        <IconButtonCustom
          icon={<Typography fontSize="1.5rem">+</Typography>}
          onClick={handleOpenModal}
          hoverColor="#4CAF50"
        />
        <IconButtonCustom
          icon={<Typography fontSize="1.5rem">−</Typography>}
          onClick={() => handleRemoveRow()} // Fungsi untuk hapus row
          hoverColor="#F44336"
        />
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Tambah Hasil Nilai</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            name="Kode_Matkul"
            id="Kode_Matkul"
            label="Kode Mata Kuliah"
            variant="outlined"
            value={formData.Kode_Matkul}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="Nama_Matkul"
            id="Nama_Matkul"
            label="Nama Mata Kuliah"
            variant="outlined"
            value={formData.Nama_Matkul}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="Nilai"
            id="Nilai"
            label="Input Nilai"
            variant="outlined"
            value={formData.Nilai}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="Predikat"
            id="Predikat"
            label="Predikat"
            variant="outlined"
            value={formData.Predikat}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Batal</Button>
          <Button onClick={handleSaveToDatabase} variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
