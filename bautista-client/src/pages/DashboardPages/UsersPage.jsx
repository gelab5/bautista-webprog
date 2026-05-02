import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';

const users = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14, email: 'jon.snow@example.com', role: 'Admin', status: 'Active' },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31, email: 'cersei.l@example.com', role: 'Editor', status: 'Active' },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 31, email: 'jaime.l@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 11, email: 'arya.stark@example.com', role: 'Viewer', status: 'Active' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: null, email: 'dany@example.com', role: 'Admin', status: 'Active' },
  { id: 6, firstName: null, lastName: 'Melisandre', age: 150, email: 'mel@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 7, firstName: 'Ferrara', lastName: 'Clifford', age: 44, email: 'ferrara.c@example.com', role: 'Editor', status: 'Active' },
  { id: 8, firstName: 'Rossini', lastName: 'Frances', age: 36, email: 'rossini.f@example.com', role: 'Viewer', status: 'Active' },
  { id: 9, firstName: 'Harvey', lastName: 'Roxie', age: 65, email: 'harvey.r@example.com', role: 'Viewer', status: 'Inactive' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'avatar',
    headerName: '',
    width: 60,
    sortable: false,
    renderCell: (params) => (
      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
        {params.row.firstName?.[0] ?? params.row.lastName?.[0]}
      </Avatar>
    ),
  },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 80 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'role', headerName: 'Role', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Active' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 160,
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

function UsersPage() {
  const activeCount = users.filter((u) => u.status === 'Active').length;
  const inactiveCount = users.filter((u) => u.status === 'Inactive').length;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      {/* Summary Cards */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">Total Users</Typography>
          <Typography variant="h3" fontWeight="bold">{users.length}</Typography>
        </Paper>
        <Paper elevation={2} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <Typography variant="h6" color="success.main">Active</Typography>
          <Typography variant="h3" fontWeight="bold">{activeCount}</Typography>
        </Paper>
        <Paper elevation={2} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">Inactive</Typography>
          <Typography variant="h3" fontWeight="bold">{inactiveCount}</Typography>
        </Paper>
      </Stack>

      {/* Users Table */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          User List
        </Typography>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>
    </>
  );
}

export default UsersPage;