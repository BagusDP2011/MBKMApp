import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { getSubmission } from "../../service/Submission.Service";
import { getColumn } from "../../service/Static.Service";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{pb:1, px:1.5}}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" }}}
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

export default function TableSubmission({ access }) {
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
        const breadcrumbData = await getSubmission(2);
        setSubmissions(breadcrumbData);

        const columnData = await getColumn('Submission',2);
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
    return Object.keys(columns.visibility).filter(key => columns.visibility[key]);
  }

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

  return (
      <DataGrid
        sx={{p:6}}
        rows={submissions}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        getRowId={(row) => row.SubmissionID}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        selectionModel={selectedRows}
        slots={{
          toolbar: access.CanPrint ? CustomToolbar : null,
        }}
        slotProps={{ toolbar: { csvOptions: { fields: getExportColumn } } }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={handleColumnVisibilityChange}
        onColumnResize={handleColumnResizeCommitted}
        disableRowSelectionOnClick
      />
  );
}
