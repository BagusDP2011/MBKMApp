import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  FormGroup,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const permissions = [
  "User Management",
  "Content Management",
  "Disputes Management",
  "Database Management",
  "Financial Management",
  "Reporting",
  "API Control",
  "Repository Management",
  "Payroll"
];

export default function EditRoleModal({ open, handleClose }) {
  const [roleName, setRoleName] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [permissionChecks, setPermissionChecks] = useState(
    permissions.reduce((acc, permission) => {
      acc[permission] = { read: false, write: false, create: false };
      console.log(acc)
      return acc;
    }, {})
  );

  const handlePermissionChange = (permission, type) => {
    setPermissionChecks((prev) => ({
      ...prev,
      [permission]: {
        ...prev[permission],
        [type]: !prev[permission][type],
      },
    }));
  };

  const handleSelectAll = () => {
    const newStatus = !allChecked;
    setAllChecked(newStatus);
    setPermissionChecks((prev) =>
      Object.keys(prev).reduce((acc, permission) => {
        acc[permission] = { read: newStatus, write: newStatus, create: newStatus };
        return acc;
      }, {})
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Role</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Set Role Permissions</Typography>

        <TextField
          label="Role Name"
          variant="outlined"
          fullWidth
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          sx={{ my: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={allChecked}
              onChange={handleSelectAll}
            />
          }
          label="Select All"
        />

        <Box sx={{ mt: 2 }}>
          {permissions.map((permission) => (
            <Grid container spacing={1} alignItems="center" key={permission}>
              <Grid item xs={3}>
                <Typography>{permission}</Typography>
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissionChecks[permission].read}
                      onChange={() => handlePermissionChange(permission, 'read')}
                    />
                  }
                  label="Read"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissionChecks[permission].write}
                      onChange={() => handlePermissionChange(permission, 'write')}
                    />
                  }
                  label="Write"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissionChecks[permission].create}
                      onChange={() => handlePermissionChange(permission, 'create')}
                    />
                  }
                  label="Create"
                />
              </Grid>
            </Grid>
          ))}
        </Box>

        <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
