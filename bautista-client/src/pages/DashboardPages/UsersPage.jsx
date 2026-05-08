import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DataGrid } from '@mui/x-data-grid';

const initialUsers = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14, email: 'jon.snow@example.com', username: 'jonsnow', role: 'Admin', gender: 'male', status: 'Active' },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31, email: 'cersei.l@example.com', username: 'cerseilan', role: 'Editor', gender: 'female', status: 'Active' },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 31, email: 'jaime.l@example.com', username: 'jaimelan', role: 'Editor', gender: 'male', status: 'Inactive' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 11, email: 'arya.stark@example.com', username: 'aryastark', role: 'Viewer', gender: 'female', status: 'Active' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: null, email: 'dany@example.com', username: 'daenerys', role: 'Admin', gender: 'female', status: 'Active' },
  { id: 6, firstName: null, lastName: 'Melisandre', age: 150, email: 'mel@example.com', username: 'melisandre', role: 'Viewer', gender: 'female', status: 'Inactive' },
  { id: 7, firstName: 'Ferrara', lastName: 'Clifford', age: 44, email: 'ferrara.c@example.com', username: 'ferrarac', role: 'Editor', gender: 'male', status: 'Active' },
  { id: 8, firstName: 'Rossini', lastName: 'Frances', age: 36, email: 'rossini.f@example.com', username: 'rossinif', role: 'Viewer', gender: 'male', status: 'Active' },
  { id: 9, firstName: 'Harvey', lastName: 'Roxie', age: 65, email: 'harvey.r@example.com', username: 'harveyr', role: 'Viewer', gender: 'male', status: 'Inactive' },
];

function validate(editForm) {
  const errors = {};
  if (!editForm.firstName) errors.firstName = 'First name is required.';
  if (!editForm.lastName) errors.lastName = 'Last name is required.';
  if (!editForm.email) errors.email = 'Email is required.';
  if (!editForm.role) errors.role = 'Role is required.';
  if (!editForm.gender) errors.gender = 'Gender is required.';

  if (!editForm.username) {
    errors.username = 'Username is required.';
  } else if (/\s/.test(editForm.username)) {
    errors.username = 'Username must not contain spaces.';
  }

  if (!editForm.age && editForm.age !== 0) {
    errors.age = 'Age is required.';
  } else if (!/^\d+$/.test(String(editForm.age))) {
    errors.age = 'Age must be a number only.';
  }

  if (!editForm.contactNumber) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!/^\d{11}$/.test(editForm.contactNumber)) {
    errors.contactNumber = 'Contact number must be exactly 11 digits.';
  }

  return errors;
}

function UsersPage() {
  const [usersData, setUsersData] = useState(initialUsers);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  const handleToggleStatus = (id) => {
    setUsersData((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  const handleEditOpen = (row) => { setEditForm({ ...row, password: '' }); setEditErrors({}); setEditOpen(true); };
  const handleEditClose = () => setEditOpen(false);
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setEditErrors({ ...editErrors, [e.target.name]: '' });
  };
  const handleEditSubmit = () => {
    const validationErrors = validate(editForm);
    if (Object.keys(validationErrors).length > 0) { setEditErrors(validationErrors); return; }
    setUsersData((prev) =>
      prev.map((user) => (user.id === editForm.id ? { ...editForm, age: Number(editForm.age) } : user))
    );
    setEditOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'avatar', headerName: '', width: 50, sortable: false,
      renderCell: (params) => (
        <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main', fontSize: 13 }}>
          {params.row.firstName?.[0] ?? params.row.lastName?.[0]}
        </Avatar>
      ),
    },
    { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 100 },
    { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 100 },
    { field: 'age', headerName: 'Age', type: 'number', width: 60 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 150 },
    { field: 'username', headerName: 'Username', flex: 1, minWidth: 100 },
    { field: 'role', headerName: 'Role', width: 80 },
    { field: 'gender', headerName: 'Gender', width: 80 },
    {
      field: 'status', headerName: 'Status', width: 90,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEditOpen(params.row)}
            sx={{ minWidth: 55, fontSize: 11 }}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleToggleStatus(params.row.id)}
            sx={{
              minWidth: 85,
              fontSize: 11,
              bgcolor: params.row.status === 'Active' ? '#e65c00' : '#2e7d32',
              '&:hover': {
                bgcolor: params.row.status === 'Active' ? '#bf4500' : '#1b5e20',
              },
            }}
          >
            {params.row.status === 'Active' ? 'DISABLE' : 'ACTIVATE'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor all registered users, their roles, and account statuses.
        </Typography>
      </Box>

      {/* Users Table */}
      <Paper elevation={2} sx={{ p: 2, width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" gutterBottom>User List</Typography>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={usersData}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editForm && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="First Name" name="firstName" fullWidth size="small"
                  value={editForm.firstName ?? ''} onChange={handleEditChange}
                  error={!!editErrors.firstName} helperText={editErrors.firstName}
                />
                <TextField
                  label="Last Name" name="lastName" fullWidth size="small"
                  value={editForm.lastName ?? ''} onChange={handleEditChange}
                  error={!!editErrors.lastName} helperText={editErrors.lastName}
                />
              </Stack>
              <TextField
                label="Email" name="email" fullWidth size="small"
                value={editForm.email ?? ''} onChange={handleEditChange}
                error={!!editErrors.email} helperText={editErrors.email}
              />
              <TextField
                label="Username" name="username" fullWidth size="small"
                value={editForm.username ?? ''} onChange={handleEditChange}
                error={!!editErrors.username} helperText={editErrors.username ?? 'No spaces allowed.'}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Age" name="age" fullWidth size="small"
                  value={editForm.age ?? ''} onChange={handleEditChange}
                  error={!!editErrors.age} helperText={editErrors.age ?? 'Numbers only.'}
                />
                <TextField
                  label="Contact Number" name="contactNumber" fullWidth size="small"
                  value={editForm.contactNumber ?? ''} onChange={handleEditChange}
                  error={!!editErrors.contactNumber} helperText={editErrors.contactNumber ?? 'Must be 11 digits.'}
                />
              </Stack>
              <FormControl size="small" fullWidth error={!!editErrors.role}>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={editForm.role} label="Role" onChange={handleEditChange}>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                </Select>
                {editErrors.role && <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>{editErrors.role}</Typography>}
              </FormControl>
              <FormControl size="small" fullWidth error={!!editErrors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={editForm.gender} label="Gender" onChange={handleEditChange}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {editErrors.gender && <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>{editErrors.gender}</Typography>}
              </FormControl>
              <FormControl size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={editForm.status} label="Status" onChange={handleEditChange}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;