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
}) => {
  return (
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
};

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

export default function TableKonversi({ access, accessId, dataTable }) {
  const [submissions, setSubmissions] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState();
  const [columns, setColumns] = React.useState([]);
  const navigate = useNavigate();
  const showAlert = useAlert();

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSubmissions(dataTable);
        const columnData = await getColumn("Konversi", accessId);
        setColumns(columnData.column);
        setColumnVisibilityModel(columnData.visibility);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataTable]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const getExportColumn = () => {
    return Object.keys(columns.visibility).filter(
      (key) => columns.visibility[key]
    );
  };

  const handleColumnResizeCommitted = debounce((params) => {
    console.log(
      `Column ${params.colDef.field} finalized resize to: ${params.width}`
    );

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.field === params.colDef.field
          ? { ...col, width: params.width }
          : col
      )
    );

    const col = columns.filter((col) => col.field === params.colDef.field)[0];
  }, 300);

  const handleSelectionChange = (selectionModel) => {
    const selectedIDs = new Set(selectionModel);
    const selectedData = submissions.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedData);
  };

  const processColumns = () => {
    return columns.map((col) => {
      if (col.field === "Actions") {
        return {
          ...col,
          renderCell: (params) => {
            const status = params.row.Status;
            return (
              <Stack
                sx={{
                  height: "100%",
                  alignItems: "center",
                  columnGap: 1,
                }}
                direction="row"
              >
                <Tooltip title="Detail" placement="top">
                  <IconButtonCustom
                    icon={<VisibilityOutlinedIcon />}
                    onClick={() => navigate(`/menu/mbkm/detail/${params.id}`)}
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
  };

  const getParams = (params) => {
    console.log(params);
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
        setSubmissions(breadcrumbData);
      }
    });
  };

  const getRowHeight = (params) => {
    const approvalList = params.model.ApprovalStatus || [];
    return 52 + approvalList.length * 20;
  };

  return (
    <DataGrid
      sx={{ px: "1rem", py: "2rem" }}
      rows={submissions}
      columns={processColumns()}
      initialState={{
        pagination: { paginationModel },
        density: "comfortable",
      }}
      getRowId={(row) => row.SubmissionID}
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
    />
  );
}
