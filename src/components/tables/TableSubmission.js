import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import {
  Box,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import { getSubmission } from "../../service/Submission.Service";
import { getColumn } from "../../service/Static.Service";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ pb: 1, px: 1.5 }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
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

export default function TableSubmission({ access, accessId }) {
  const [submissions, setSubmissions] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState();
  const [columns, setColumns] = React.useState([]);

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breadcrumbData = await getSubmission(accessId);
        setSubmissions(breadcrumbData);

        const columnData = await getColumn("Submission", accessId);
        setColumns(columnData.column);
        setColumnVisibilityModel(columnData.visibility);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      // if (col.field === "ApprovalStatus") {
      //   return {
      //     ...col,
      //     renderCell: (params) => (
      //       <List dense>
      //         {params.value.map((approval) => (
      //           <ListItem disablePadding key={approval.ApprovalID}>
      //             <ListItemText>
      //               {approval.AccDescription}:
      //               <Chip
      //                 className="capitalize"
      //                 variant="tonal"
      //                 color={
      //                   approval.ApprovalStatus === "Pending"
      //                     ? "warning"
      //                     : approval.ApprovalStatus === "inactive"
      //                     ? "secondary"
      //                     : "success"
      //                 }
      //                 label={approval.ApprovalStatus}
      //                 size="small"
      //               />
      //             </ListItemText>
      //           </ListItem>
      //         ))}
      //       </List>
      //     ),
      //   };
      // }

      if (col.field === "Actions") {
        return {
          ...col,
          renderCell: (params) => (
            <Stack
              sx={{
                height: "100%",
                alignItems: "center",
              }}
              direction="row"
            >
              <Button
                sx={{
                  maxWidth: "max-content",
                  minWidth: "max-content",
                  padding: 0,
                }}
              >
                <Avatar variant="rounded" sx={{ backgroundColor: "#3F8CFE" }}>
                  <VisibilityOutlinedIcon />
                </Avatar>
              </Button>
              {access.CanDelete && (
                <Button>
                  <Avatar variant="rounded" sx={{ backgroundColor: "#FF4C51" }}>
                    <DeleteOutlineOutlinedIcon />
                  </Avatar>
                </Button>
              )}
            </Stack>
          ),
        };
      }
      return col;
    });
  };

  const getRowHeight = (params) => {
    const approvalList = params.model.ApprovalStatus || [];
    return 52 + approvalList.length * 20;
  };

  return (
    <DataGrid
      sx={{ p: 6 }}
      rows={submissions}
      columns={processColumns()}
      initialState={{
        pagination: { paginationModel },
        density: "comfortable"
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
      // getRowHeight={getRowHeight}
    />
  );
}
