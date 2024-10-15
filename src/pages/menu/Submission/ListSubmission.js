import React from "react";
import TableSubmission from "../../../components/tables/TableSubmission";
import { Box, Stack, Typography } from "@mui/material";
import DetailSubmission from './DetailSubmission'

export default function ListSubmission({ menuAccess, accessId }) {
  return (
    <React.StrictMode>
      {menuAccess.CanRead ? (
        <Stack>
          <TableSubmission access={menuAccess} accessId={accessId}/>
        </Stack>
      ) : <Typography variant="h5" sx={{fontWeight:600}}>Sorry you dont have access to view this page</Typography>}
      <DetailSubmission/>
    </React.StrictMode>
  );
}
