import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, Button, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alpha } from '@mui/material/styles';

function createData(id, name, programStudi, dosenWali, statusTU, statusKPS, keterangan) {
  return { id, name, programStudi, dosenWali, statusTU, statusKPS, keterangan };
}

const rows = [
  createData(1, 'Yusti Noviyanti', 'Teknik Informatika', 'Dr. Budi', 'Pending', 'Pending', 'Menunggu persetujuan'),
  createData(2, 'Michael', 'Manajemen', 'Dr. Wati', 'Approved', 'Approved', 'Sudah disetujui'),
  createData(3, 'Ninda Julia', 'Desain Produk', 'Dr. Ahmad', 'Rejected', 'Pending', 'Ditolak TU'),
  createData(4, 'Asep', 'Psikologi', 'Dr. Siti', 'Revisi', 'Pending', 'Menunggu revisi dari TU'),
];

export default function PengajuanMHS() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const [rowToDelete, setRowToDelete] = React.useState(null);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);

  // Handle Modal for Deleting Confirmation
  const handleOpenDeleteModal = (row) => {
    if (row.statusTU !== 'Approved' && row.statusKPS !== 'Approved') {
      setRowToDelete(row); // Set row to delete
      setOpenModalDelete(true); // Open delete confirmation modal
    } else {
      alert('Pengajuan yang sudah disetujui tidak dapat dihapus');
    }
  };

  const handleCloseDeleteModal = () => {
    setRowToDelete(null); // Reset the row to delete
    setOpenModalDelete(false); // Close the modal
  };

  const handleDelete = () => {
    // Simulate deletion by filtering out the row
    const updatedRows = rows.filter((r) => r.id !== rowToDelete.id);
    // Update state with the filtered rows (Simulate state update for this example)
    console.log('Deleted:', rowToDelete);
    handleCloseDeleteModal();
  };

  // Open modal for detail
  const handleOpenModal = (row) => {
    setModalContent(row); // Set the content of the modal based on the clicked row
    setOpenDetailModal(true);        // Open the modal
  };

  const handleCloseModal = () => setOpenDetailModal(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const getStatusButton = (status) => {
    switch (status) {
      case 'Approved':
        return <Button variant="contained" color="success" size="small">Setuju</Button>;
      case 'Rejected':
        return <Button variant="contained" color="error" size="small">Ditolak</Button>;
      case 'Revisi':
        return <Button variant="contained" color="warning" size="small">Revisi</Button>;
      default:
        return <Button variant="contained" color="default" size="small">Pending</Button>;
    }
  };

  return (
    <Box>
      <Paper>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Daftar Pengajuan Mahasiswa
            </Typography>
          )}

          {selected.length > 0 ? (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Nama Lengkap</TableCell>
                <TableCell>Program Studi</TableCell>
                <TableCell>Dosen Wali</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Keterangan</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.programStudi}</TableCell>
                      <TableCell>{row.dosenWali}</TableCell>
                      <TableCell>
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                          <Typography>Status TU: {getStatusButton(row.statusTU)}</Typography>
                          <Typography>Status KPS: {getStatusButton(row.statusKPS)}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.keterangan}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenModal(row)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDeleteModal(row)} disabled={row.statusTU === 'Approved' || row.statusKPS === 'Approved'}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for delete confirmation */}
      <Modal
        open={openModalDelete}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400 }}>
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Konfirmasi Penghapusan
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            Apakah Anda ingin membatalkan pengajuan ini?
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="error" onClick={handleDelete}>
              Ya
            </Button>
            <Button variant="contained" color="primary" onClick={handleCloseDeleteModal}>
              Tidak
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for detail view */}
      <Modal
        open={openDetailModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Detail Pengajuan
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Nama: {modalContent?.name}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            Program Studi: {modalContent?.programStudi}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            Dosen Wali: {modalContent?.dosenWali}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            Status TU: {modalContent?.statusTU}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            Status KPS: {modalContent?.statusKPS}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
