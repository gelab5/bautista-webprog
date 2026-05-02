import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
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

const averageAge = (
  rows.reduce((sum, row) => sum + (row.age || 0), 0) /
  rows.filter((row) => row.age !== null).length
).toFixed(1);

function DashboardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Row 1: Stat Cards + Gauges */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        {/* Total Users */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Total Users
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              {rows.length}
            </Typography>
          </CardContent>
        </Card>

        {/* Average Age */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Average Age
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              {averageAge}
            </Typography>
          </CardContent>
        </Card>

        {/* Gauge 1 */}
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">
              Performance
            </Typography>
            <Gauge width={100} height={100} value={50} />
          </CardContent>
        </Card>

        {/* Gauge 2 */}
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">
              Efficiency
            </Typography>
            <Gauge width={100} height={100} value={60} valueMin={10} valueMax={60} />
          </CardContent>
        </Card>
      </Stack>

      {/* Row 2: Bar Chart + Pie Chart */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
        {/* Bar Chart */}
        <Card sx={{ flex: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quarterly Sales
            </Typography>
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Series 1' },
                { data: [51, 6, 49, 30], label: 'Series 2' },
              ]}
              height={250}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
            />
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Distribution
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'Series A' },
                      { id: 1, value: 15, label: 'Series B' },
                      { id: 2, value: 20, label: 'Series C' },
                    ],
                    cx: 100,
                  },
                ]}
                width={350}
                height={250}
                slotProps={{
                  legend: {
                    direction: 'column',
                    position: { vertical: 'middle', horizontal: 'right' },
                    padding: 0,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      {/* Row 3: DataGrid */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Users Overview
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Row 4: Map */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Location Map
          </Typography>
          <Box sx={{ height: 500, width: '100%' }}>
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  National University-Manila <br />
                  551 F Jhocson St, Sampaloc, Manila, 1000 Metro Manila
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardPage;