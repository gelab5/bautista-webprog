import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
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

const emptyForm = {
  firstName: '', lastName: '', age: '', email: '',
  username: '', password: '', role: '', gender: '', status: 'Active',
};

function validate(form) {
  const errors = {};
  if (!form.firstName) errors.firstName = 'First name is required.';
  if (!form.lastName) errors.lastName = 'Last name is required.';
  if (!form.email) errors.email = 'Email is required.';
  if (!form.role) errors.role = 'Role is required.';
  if (!form.gender) errors.gender = 'Gender is required.';

  if (!form.username) {
    errors.username = 'Username is required.';
  } else if (/\s/.test(form.username)) {
    errors.username = 'Username must not contain spaces.';
  }

  if (!form.password) {
    errors.password = 'Password is required.';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!form.age && form.age !== 0) {
    errors.age = 'Age is required.';
  } else if (!/^\d+$/.test(String(form.age))) {
    errors.age = 'Age must be a number only.';
  }

  if (!form.contactNumber) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!/^\d{11}$/.test(form.contactNumber)) {
    errors.contactNumber = 'Contact number must be exactly 11 digits.';
  }

  return errors;
}

function UsersPage() {
  const [usersData, setUsersData] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        search === '' ||
        user.firstName?.toLowerCase().includes(searchLower) ||
        user.lastName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.username?.toLowerCase().includes(searchLower);
      const matchesRole = roleFilter === '' || user.role === roleFilter;
      const matchesGender = genderFilter === '' || user.gender === genderFilter;
      const matchesStatus = statusFilter === '' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [usersData, search, roleFilter, genderFilter, statusFilter]);

  const handleOpen = () => { setForm(emptyForm); setErrors({}); setOpen(true); };
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const handleSubmit = () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    const newUser = { ...form, id: usersData.length + 1, age: Number(form.age) };
    setUsersData([...usersData, newUser]);
    setOpen(false);
  };

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
    const validationErrors = validate({ ...editForm, password: editForm.password || 'placeholder' });
    delete validationErrors.password;
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
      {/* Header + Add Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={handleOpen}>+ Add User</Button>
      </Stack>

      {/* Search & Filter */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Search & Filter</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search"
            placeholder="Search by name, email, or username..."
            variant="outlined"
            size="small"
            sx={{ flex: 2 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} label="Role" onChange={(e) => setRoleFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Gender</InputLabel>
            <Select value={genderFilter} label="Gender" onChange={(e) => setGenderFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {/* Users Table */}
      <Paper elevation={2} sx={{ p: 2, width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" gutterBottom>User List</Typography>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={filteredUsers}
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

      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="First Name" name="firstName" fullWidth size="small"
                value={form.firstName} onChange={handleChange}
                error={!!errors.firstName} helperText={errors.firstName}
              />
              <TextField
                label="Last Name" name="lastName" fullWidth size="small"
                value={form.lastName} onChange={handleChange}
                error={!!errors.lastName} helperText={errors.lastName}
              />
            </Stack>
            <TextField
              label="Email" name="email" fullWidth size="small"
              value={form.email} onChange={handleChange}
              error={!!errors.email} helperText={errors.email}
            />
            <TextField
              label="Username" name="username" fullWidth size="small"
              value={form.username} onChange={handleChange}
              error={!!errors.username} helperText={errors.username ?? 'No spaces allowed.'}
            />
            <TextField
              label="Password" name="password" type="password" fullWidth size="small"
              value={form.password} onChange={handleChange}
              error={!!errors.password} helperText={errors.password ?? 'At least 8 characters.'}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Age" name="age" fullWidth size="small"
                value={form.age} onChange={handleChange}
                error={!!errors.age} helperText={errors.age ?? 'Numbers only.'}
              />
              <TextField
                label="Contact Number" name="contactNumber" fullWidth size="small"
                value={form.contactNumber} onChange={handleChange}
                error={!!errors.contactNumber} helperText={errors.contactNumber ?? 'Must be 11 digits.'}
              />
            </Stack>
            <FormControl size="small" fullWidth error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={form.role} label="Role" onChange={handleChange}>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </Select>
              {errors.role && <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>{errors.role}</Typography>}
            </FormControl>
            <FormControl size="small" fullWidth error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={form.gender} label="Gender" onChange={handleChange}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {errors.gender && <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>{errors.gender}</Typography>}
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={form.status} label="Status" onChange={handleChange}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Add User</Button>
        </DialogActions>
      </Dialog>

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