import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography, CardContent } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const totalUsers = rows.length;
const averageAge = (
  rows.reduce((sum, row) => sum + (row.age || 0), 0) /
  rows.filter((row) => row.age !== null).length
).toFixed(1);
const youngestAge = Math.min(...rows.filter((row) => row.age !== null).map((row) => row.age));
const seniorCount = rows.filter((row) => row.age !== null && row.age >= 60).length;

function DashboardPage() {
  const location = useLocation();

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of user statistics, quarterly performance, category breakdown, and completion metrics.
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Summary Cards */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {totalUsers}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Average Age
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {averageAge}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Youngest User
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {youngestAge}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Seniors (60+)
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {seniorCount}
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Bar Chart */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quarterly Sales
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares two series of quarterly sales data across Q1 to Q4.
            </Typography>
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Series 1' },
                { data: [51, 6, 49, 30], label: 'Series 2' },
              ]}
              height={300}
              xAxis={[{
                data: ['Q1', 'Q2', 'Q3', 'Q4'],
                scaleType: 'band',
                label: 'Quarters',
              }]}
            />
          </CardContent>
        </Card>

        {/* Pie Chart + Gauges Row */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          {/* Pie Chart */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category Breakdown
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Distribution of data across the three main series categories.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[{
                    data: [
                      { id: 0, value: 10, label: 'Series A' },
                      { id: 1, value: 15, label: 'Series B' },
                      { id: 2, value: 20, label: 'Series C' },
                    ],
                    cx: 100,
                  }]}
                  slotProps={{
                    legend: {
                      position: { vertical: 'middle', horizontal: 'right' },
                      direction: 'column',
                      padding: 0,
                      itemMarkWidth: 12,
                      itemMarkHeight: 12,
                      markGap: 6,
                      itemGap: 10,
                    },
                  }}
                  width={380}
                  height={220}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Gauges */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Gauges
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Current performance indicators based on the latest available metrics.
              </Typography>
              <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Gauge width={150} height={150} value={58} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Overall
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Gauge width={150} height={150} value={58} valueMin={10} valueMax={60} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Adjusted
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* DataGrid */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Users Overview
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Complete list of users with editable fields for first name, last name, and age.
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default DashboardPage;