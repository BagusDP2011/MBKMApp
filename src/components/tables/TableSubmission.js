import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export data' },
        }}
      />
    </GridToolbarContainer>
  );
}

const columns = [
  { field: "SubmissionID", headerName: "ID", width:40},
  { field: "StudentID", headerName: "NIM", width: 110},
  { field: "ProdiName", headerName: "Prodi", width: 150},
  { field: "SubmissionDate", headerName: "Submit Date", width: 130},
  { field: "ProgramType", headerName: "Program Type", width: 180},
  { field: "Title", headerName: "Title", width: 200},
  { field: "InstitutionName", headerName: "Institution Name", width: 150},
  { field: "Position", headerName: "Position", width: 130},
  { field: "ApprovalStatus", headerName: "Status", width: 180},
]

const paginationModel = { page: 0, pageSize: 5 };

export default function TableSubmission() {
  const [submissions, setSubmissions] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  useEffect(() => {
    async function getBreadcrumb() {
      try {
        const response = await fetch("http://localhost:3001/api/submission");
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } 
    }
    getBreadcrumb();
  }, []);


  const handleSelectionChange = (newSelectionModel) => {
    console.log('Selected Rows:', newSelectionModel);
    setSelectedRows(newSelectionModel);
  };

  return (
    <Paper sx={{ height: 400}}>
      <DataGrid
        rows={submissions}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        getRowId={(row) => row.SubmissionID}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
        selectionModel={selectedRows}  
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </Paper>
  );
}
