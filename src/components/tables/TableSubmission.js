import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box} from "@mui/material";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
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

export default function TableSubmission() {
  const [submissions, setSubmissions] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState();
  const [columns, setColumns] = React.useState([]);

  const handleColumnVisibilityChange = (newModel) => {
    console.log(
      "Kolom yang terlihat:",
      Object.keys(newModel).filter((key) => newModel[key])
    );
    console.log(
      "Kolom yang tersembunyi:",
      Object.keys(newModel).filter((key) => !newModel[key])
    );
    setColumnVisibilityModel(newModel);
  };

  useEffect(() => {
    async function getBreadcrumb() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/pending-submission/2"
        );
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    }
    async function getColumn() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/column/Submission/2"
        );
        const data = await response.json();
        setColumns(data.column);
        setColumnVisibilityModel(data.visibility);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    }
    getBreadcrumb();
    getColumn();
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

  const handleSelectionChange = (newSelectionModel) => {
    console.log("Selected Rows:", newSelectionModel);
    setSelectedRows(newSelectionModel);
  };

  return (
    <Paper sx={{ maxHeight: "100vh" }}>
      <DataGrid
        rows={submissions}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        getRowId={(row) => row.SubmissionID}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) =>
          handleSelectionChange(newSelectionModel)
        }
        selectionModel={selectedRows}
        slots={{
          toolbar: CustomToolbar,
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={handleColumnVisibilityChange}
        onColumnResize={handleColumnResizeCommitted}
      />
    </Paper>
  );
}
