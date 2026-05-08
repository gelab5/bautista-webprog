import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';

const ReportsPage = () => {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Report analytics overview showing generated reports, category breakdown, and current completion performance.
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Monthly Report Output - Bar Chart */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how many were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: [18, 24, 20, 27], label: 'Generated' },
                { data: [12, 19, 17, 23], label: 'Completed' },
              ]}
              height={300}
              xAxis={[{
                data: ['January', 'February', 'March', 'April'],
                scaleType: 'band',
                label: 'Months',
              }]}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          {/* Pie Chart — legend moved to left to avoid overlay */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Category Share
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This chart shows the distribution of report requests by category for the current reporting period.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[{
                    data: [
                      { id: 0, value: 14, label: 'Sales' },
                      { id: 1, value: 10, label: 'Users' },
                      { id: 2, value: 8, label: 'Inventory' },
                      { id: 3, value: 6, label: 'Finance' },
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

          {/* Gauge */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
              </Typography>
              <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gauge width={180} height={180} value={78} />
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReportsPage;