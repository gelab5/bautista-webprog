import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { getUsers, createUser, updateUser } from '../../UserService';

const emptyForm = {
  firstName: '', lastName: '', age: '', email: '',
  username: '', password: '', role: '', gender: '', status: 'Active',
  contactNumber: '',
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

function shortId(id) {
  if (!id) return '';
  return String(id).slice(-6).toUpperCase();
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function UsersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') navigate('/dashboard');
  }, []);

  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  const loadUsers = async () => {
    setLoading(true);
    setApiError('');
    try {
      const { data } = await getUsers();
      const mapped = (data.users || data).map((u, i) => ({
        ...u,
        id: u._id || i + 1,
      }));
      setUsersData(mapped);
    } catch {
      setApiError('Failed to load users. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

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

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  const handleOpen = () => { setForm(emptyForm); setErrors({}); setOpen(true); };
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    try {
      await createUser({ ...form, age: Number(form.age) });
      await loadUsers();
      setOpen(false);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to create user.');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateUser(id, { status: currentStatus === 'Active' ? 'Inactive' : 'Active' });
      await loadUsers();
    } catch {
      setApiError('Failed to update user status.');
    }
  };

  const handleEditOpen = (row) => { setEditForm({ ...row, password: '' }); setEditErrors({}); setEditOpen(true); };
  const handleEditClose = () => setEditOpen(false);
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setEditErrors({ ...editErrors, [e.target.name]: '' });
  };
  const handleEditSubmit = async () => {
    const validationErrors = validate({ ...editForm, password: editForm.password || 'placeholder' });
    delete validationErrors.password;
    if (Object.keys(validationErrors).length > 0) { setEditErrors(validationErrors); return; }
    try {
      await updateUser(editForm._id || editForm.id, { ...editForm, age: Number(editForm.age) });
      await loadUsers();
      setEditOpen(false);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to update user.');
    }
  };

  const headCells = ['ID', 'Full Name', 'Username', 'Age', 'Gender', 'Contact', 'Email', 'Role', 'Status', 'Actions'];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={handleOpen}>+ Add User</Button>
      </Stack>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError('')}>
          {apiError}
        </Alert>
      )}

      {/* Search & Filter */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Search & Filter</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search" placeholder="Search by name, email, or username..."
            variant="outlined" size="small" sx={{ flex: 2 }}
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} label="Role" onChange={(e) => setRoleFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
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

      {/* Table */}
      <Paper elevation={2} sx={{ p: 2, width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" gutterBottom>User List</Typography>
        {loading ? (
          <Alert severity="info">Loading users from database…</Alert>
        ) : (
          <>
            <TableContainer>
              <Table size="small" sx={{ minWidth: 900 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9fafb' }}>
                    {headCells.map((h) => (
                      <TableCell key={h} sx={{ fontWeight: 700, fontSize: 13, color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center" sx={{ py: 4, color: '#9ca3af' }}>
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                      <TableRow key={user._id || user.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                        <TableCell sx={{ fontSize: 13, fontFamily: 'monospace' }}>{shortId(user._id || user.id)}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{user.firstName} {user.lastName}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{user.username}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{user.age}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{capitalize(user.gender)}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{user.contactNumber}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{user.email}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{capitalize(user.role)}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.status || 'Active'}
                            size="small"
                            color={(user.status || 'Active') === 'Active' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleEditOpen(user)}
                              sx={{ fontSize: 11, minWidth: 55 }}
                            >
                              EDIT
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleToggleStatus(user._id || user.id, user.status || 'Active')}
                              sx={{
                                fontSize: 11,
                                minWidth: 75,
                                bgcolor: (user.status || 'Active') === 'Active' ? '#e65c00' : '#2e7d32',
                                '&:hover': {
                                  bgcolor: (user.status || 'Active') === 'Active' ? '#bf4500' : '#1b5e20',
                                },
                              }}
                            >
                              {(user.status || 'Active') === 'Active' ? 'DISABLE' : 'ACTIVATE'}
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </Paper>

      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField label="First Name" name="firstName" fullWidth size="small"
                value={form.firstName} onChange={handleChange}
                error={!!errors.firstName} helperText={errors.firstName} />
              <TextField label="Last Name" name="lastName" fullWidth size="small"
                value={form.lastName} onChange={handleChange}
                error={!!errors.lastName} helperText={errors.lastName} />
            </Stack>
            <TextField label="Email" name="email" fullWidth size="small"
              value={form.email} onChange={handleChange}
              error={!!errors.email} helperText={errors.email} />
            <TextField label="Username" name="username" fullWidth size="small"
              value={form.username} onChange={handleChange}
              error={!!errors.username} helperText={errors.username ?? 'No spaces allowed.'} />
            <TextField label="Password" name="password" type="password" fullWidth size="small"
              value={form.password} onChange={handleChange}
              error={!!errors.password} helperText={errors.password ?? 'At least 8 characters.'} />
            <Stack direction="row" spacing={2}>
              <TextField label="Age" name="age" fullWidth size="small"
                value={form.age} onChange={handleChange}
                error={!!errors.age} helperText={errors.age ?? 'Numbers only.'} />
              <TextField label="Contact Number" name="contactNumber" fullWidth size="small"
                value={form.contactNumber} onChange={handleChange}
                error={!!errors.contactNumber} helperText={errors.contactNumber ?? 'Must be 11 digits.'} />
            </Stack>
            <FormControl size="small" fullWidth error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={form.role} label="Role" onChange={handleChange}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
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
                <TextField label="First Name" name="firstName" fullWidth size="small"
                  value={editForm.firstName ?? ''} onChange={handleEditChange}
                  error={!!editErrors.firstName} helperText={editErrors.firstName} />
                <TextField label="Last Name" name="lastName" fullWidth size="small"
                  value={editForm.lastName ?? ''} onChange={handleEditChange}
                  error={!!editErrors.lastName} helperText={editErrors.lastName} />
              </Stack>
              <TextField label="Email" name="email" fullWidth size="small"
                value={editForm.email ?? ''} onChange={handleEditChange}
                error={!!editErrors.email} helperText={editErrors.email} />
              <TextField label="Username" name="username" fullWidth size="small"
                value={editForm.username ?? ''} onChange={handleEditChange}
                error={!!editErrors.username} helperText={editErrors.username ?? 'No spaces allowed.'} />
              <Stack direction="row" spacing={2}>
                <TextField label="Age" name="age" fullWidth size="small"
                  value={editForm.age ?? ''} onChange={handleEditChange}
                  error={!!editErrors.age} helperText={editErrors.age ?? 'Numbers only.'} />
                <TextField label="Contact Number" name="contactNumber" fullWidth size="small"
                  value={editForm.contactNumber ?? ''} onChange={handleEditChange}
                  error={!!editErrors.contactNumber} helperText={editErrors.contactNumber ?? 'Must be 11 digits.'} />
              </Stack>
              <FormControl size="small" fullWidth error={!!editErrors.role}>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={editForm.role ?? ''} label="Role" onChange={handleEditChange}>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
                {editErrors.role && <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>{editErrors.role}</Typography>}
              </FormControl>
              <FormControl size="small" fullWidth error={!!editErrors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={editForm.gender ?? ''} label="Gender" onChange={handleEditChange}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {editErrors.gender && <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>{editErrors.gender}</Typography>}
              </FormControl>
              <FormControl size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={editForm.status ?? 'Active'} label="Status" onChange={handleEditChange}>
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