import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "4rem",
  borderRadius: 2,
};

const EditMenuAccessModal = ({ open, handleClose, menuAccess }) => {
  const [roleName, setRoleName] = useState("Editor");
  const [permissions, setPermissions] = useState(menuAccess);

  useEffect(() => {
    setPermissions(menuAccess);
  }, [menuAccess]);

  const handlePermissionChange = (menuAccessID, type) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.MenuAccessID === menuAccessID
          ? { ...permission, [type]: !permission[type] }
          : permission
      )
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ position: "relative" }}>
          <Typography variant="h6" align="center">Edit Menu Access</Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }} align="center">
            Set Role Permissions
          </Typography>

          <TextField
            label="Role Name"
            variant="outlined"
            fullWidth
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            sx={{ my: 2 }}
          />
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: -30, right: -30 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {permissions.map((permission) => (
                <TableRow
                  key={permission.MenuAccessID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ py:'0.5rem' }}>
                    {permission.Title}
                  </TableCell>
                  <TableCell align="right" sx={{ py:'0.5rem' }}>
                    {/* Read */}
                    <FormControlLabel
                      sx={{ p: 0 }}
                      control={
                        <Checkbox
                          checked={permission.CanRead}
                          onChange={() =>
                            handlePermissionChange(
                              permission.MenuAccessID,
                              "CanRead"
                            )
                          }
                        />
                      }
                      label={<Typography fontSize="1rem">Read</Typography>}
                    />
                    {/* Add */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permission.CanAdd}
                          onChange={() =>
                            handlePermissionChange(
                              permission.MenuAccessID,
                              "CanAdd"
                            )
                          }
                        />
                      }
                      label={<Typography fontSize="1rem">Add</Typography>}
                    />
                    {/* Edit */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permission.CanEdit}
                          onChange={() =>
                            handlePermissionChange(
                              permission.MenuAccessID,
                              "CanEdit"
                            )
                          }
                        />
                      }
                      label={<Typography fontSize="1rem">Edit</Typography>}
                    />

                    {/* Delete */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permission.CanDelete}
                          onChange={() =>
                            handlePermissionChange(
                              permission.MenuAccessID,
                              "CanDelete"
                            )
                          }
                        />
                      }
                      label={<Typography fontSize="1rem">Delete</Typography>}
                    />
                    {/* Print */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permission.CanPrint}
                          onChange={() =>
                            handlePermissionChange(
                              permission.MenuAccessID,
                              "CanPrint"
                            )
                          }
                        />
                      }
                      label={<Typography fontSize="1rem">Print</Typography>}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" sx={{ textTransform:'none' }} onClick={handleClose}>
            Save
          </Button>
          <Button variant="outlined" color="primary" sx={{ textTransform:'none' }} onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditMenuAccessModal;
