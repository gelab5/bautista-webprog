import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

function ReportsPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        {/* Bar Chart */}
        <Paper elevation={2} sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Quarterly Sales
          </Typography>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1' },
              { data: [51, 6, 49, 30], label: 'Series 2' },
            ]}
            height={250}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          />
        </Paper>

        {/* Pie Chart */}
        <Paper elevation={2} sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Category Breakdown
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 35, label: 'Category A' },
                  { id: 1, value: 45, label: 'Category B' },
                  { id: 2, value: 20, label: 'Category C' },
                ],
              },
            ]}
            height={250}
          />
        </Paper>
      </Stack>

      {/* Line Chart */}
      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Trends
        </Typography>
        <LineChart
          series={[
            { data: [10, 25, 18, 40, 35, 55, 48, 60, 52, 70, 65, 80], label: 'Users' },
            { data: [5, 15, 10, 30, 25, 40, 35, 50, 42, 60, 55, 70], label: 'Reports' },
          ]}
          height={300}
          xAxis={[{
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            scaleType: 'point',
          }]}
        />
      </Paper>

      {/* Summary Cards */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper elevation={2} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">Total Reports</Typography>
          <Typography variant="h3" fontWeight="bold">128</Typography>
          <Typography variant="body2" color="text.secondary">+12% from last month</Typography>
        </Paper>
        <Paper elevation={2} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">Active Users</Typography>
          <Typography variant="h3" fontWeight="bold">64</Typography>
          <Typography variant="body2" color="text.secondary">+5% from last month</Typography>
        </Paper>
        <Paper elevation={2} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">Avg. Session</Typography>
          <Typography variant="h3" fontWeight="bold">4.2m</Typography>
          <Typography variant="body2" color="text.secondary">-2% from last month</Typography>
        </Paper>
        <Paper elevation={2} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">Satisfaction</Typography>
          <Typography variant="h3" fontWeight="bold">92%</Typography>
          <Typography variant="body2" color="text.secondary">+3% from last month</Typography>
        </Paper>
      </Stack>
    </>
  );
}

export default ReportsPage;