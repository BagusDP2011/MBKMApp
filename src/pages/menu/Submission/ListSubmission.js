import React from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Box, Stack, Typography } from "@mui/material";

export default function ListSubmission({ menuAccess }) {
  return (
    <React.StrictMode>
      {menuAccess.CanRead ? (
        <Stack>
          <TableSubmission access={menuAccess}/>
        </Stack>
      ) : <Typography variant="h5" sx={{fontWeight:600}}>Sorry you dont have access to view this page</Typography>}
    </React.StrictMode>
  );
}
