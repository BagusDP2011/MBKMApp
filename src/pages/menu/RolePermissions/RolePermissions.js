import React, { Component } from "react";
import { Typography, Box, Stack } from "@mui/material";
import RoleCard from "./RoleCard";
import TableSubmission from "../../../components/tables/TableSubmission";

const RolePermissions = ({ menuAccess, accessId }) => {
  return (
    <Stack>
      <RoleCard />
      <Box sx={{mt:5}}>
        <Typography variant="subtitle1" fontWeight="medium">
          User with their role
        </Typography>
        <TableSubmission access={menuAccess} accessId={accessId} />
      </Box>
    </Stack>
  );
};

export default RolePermissions;
