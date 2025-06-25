import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  Box,
  Stack,
  Tooltip,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import {
  getSubmission,
  deleteSubmission,
} from "../../service/Submission.Service";
import { getColumn } from "../../service/Static.Service";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../AlertProvider";

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

export default function TableKonversiMuridLA({
  access,
  accessId,
  dataTable,
  onRowSelect,
}) {
  const [submissions, setSubmissions] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState();
  const [columns, setColumns] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();
  const showAlert = useAlert();

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processedData = dataTable.map((item, index) => ({
          ...item,
          id: item.SubmissionID || `temp-id-${index}`,
        }));
        setSubmissions(processedData);
        setFilteredRows(processedData); // Awal: tampilkan semua
        const columnData = await getColumn("Konversi", accessId);
        setColumns(columnData.column);
        setColumnVisibilityModel(columnData.visibility);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataTable]);

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
    const selectedData = filteredRows.filter((row) => selectedIDs.has(row.id));
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
          const response = await deleteSubmission(submissionId);
          showAlert(response.message, "success");

          const refreshed = await getSubmission(accessId);
          const updated = refreshed.map((item, index) => ({
            ...item,
            id: item.SubmissionID || `temp-id-${index}`,
          }));
          setSubmissions(updated);
          setFilteredRows(updated);
        } catch (error) {
          showAlert("Error while delete submission", "error");
        }
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
                    onClick={() => onRowSelect?.(params.row)}
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

  const handleSearch = () => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const filtered = submissions.filter((item) => {
      const date = new Date(item.SubmissionDate);
      if (from && date < from) return false;
      if (to && date > to) return false;
      return true;
    });

    setFilteredRows(filtered);
  };

  return (
    <>
      {/* Filter Tanggal */}
      <Box sx={{ display: "flex", gap: 2, px: 3, mt: 2, alignItems: "center" }}>
        <TextField
          label="From Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <TextField
          label="To Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Tabel */}
      <DataGrid
        sx={{ px: "1rem", py: "2rem" }}
        rows={filteredRows}
        columns={processColumns()}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
          density: "comfortable",
        }}
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
      />
    </>
  );
}
