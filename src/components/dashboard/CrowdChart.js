import { useEffect, useState } from 'react';
import { Grid, ListItemButton, Menu, Stack, Typography, Box, CircularProgress } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { More } from 'iconsax-react';
import { ExpandSvg } from 'assets/images/Expand';
import CustomModal from './Modal';

// Default chart options
const pieChartOptions = {
  chart: {
    type: 'donut',
    height: 320,
  },
  labels: [], // Labels to be dynamically set
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
      },
    },
  },
};

const ApexDonutChart = ({ sx, series, options }) => (
  <div id="chart">
    <Box sx={{ width: '100%', height: 'auto', ...sx }}>
      <ReactApexChart options={options} series={series} type="donut" height="100%" />
    </Box>
  </div>
);

const CrowdChart = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [chartData, setChartData] = useState([0, 0]); // Default to two segments: Crowd, Intrusion
  const [chartOptions, setChartOptions] = useState(pieChartOptions);
  const [selectedType, setSelectedType] = useState(1); // Default to 'Today'
  const [loading, setLoading] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setAnchorEl(null); // Close the menu when an option is selected
  };

  // Fetch data whenever selectedType changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch(
          `https://jakson-cairo.online:8094/api/DashboardSelectedOnDate/NewSiteModuleCountreport?type=${selectedType}`
        );
        const result = await response.json();

        // Extract relevant data from the API response
        const { crowd_record, detection_data } = result[0] || {};

        // Ensure the result has valid data
        const availableData = [];
        const availableLabels = [];
        const availableColors = [];

        // If crowd_record > 0, add it to the chart data and assign color
        if (crowd_record > 0) {
          availableData.push(crowd_record);
          availableLabels.push('Crowd');
          availableColors.push('#28a745'); // Green color for Crowd
        }
        
        // If detection_data > 0, add it to the chart data and assign color
        if (detection_data > 0) {
          availableData.push(detection_data);
          availableLabels.push('Intrusion');
          availableColors.push('#dc3545'); // Red color for Intrusion
        }

        // If no data is found, set it to "No Value"
        if (availableData.length === 0) {
          setChartData([100]); // Only show "No Value"
          setChartOptions((prevState) => ({
            ...prevState,
            labels: ['No Value'], // Update chart labels
            colors: ['#cccccc'], // Grey color for No Value
          }));
        } else {
          setChartData(availableData); // Set the actual data
          setChartOptions((prevState) => ({
            ...prevState,
            labels: availableLabels, // Dynamically set labels
            colors: availableColors, // Dynamically set colors for Crowd and Intrusion
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error case (set default values)
        setChartData([100]);
        setChartOptions((prevState) => ({
          ...prevState,
          labels: ['No Value'], // Update chart labels
          colors: ['#cccccc'], // Grey color for No Value
        }));
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [selectedType]);

  return (
    <MainCard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h6">Crowd, Intrusion Report</Typography>
            <Box>
              <IconButton color="secondary" onClick={handleOpenModal}>
                <ExpandSvg />
              </IconButton>
              <IconButton color="secondary" onClick={handleClick}>
                <More style={{ transform: 'rotate(90deg)' }} />
              </IconButton>
            </Box>
            <Menu
              id="wallet-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'wallet-button',
                sx: { p: 1.25, minWidth: 150 },
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <ListItemButton onClick={() => handleSelectType(1)}>Today</ListItemButton>
              <ListItemButton onClick={() => handleSelectType(2)}>Weekly</ListItemButton>
              <ListItemButton onClick={() => handleSelectType(3)}>Monthly</ListItemButton>
            </Menu>
          </Stack>
        </Grid>

        {/* Render Donut Chart */}
        <Grid item xs={12}>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <ApexDonutChart sx={{ height: '235px' }} series={chartData} options={chartOptions} />
          )}
        </Grid>

        <CustomModal isOpen={modalOpen} onClose={handleCloseModal} title="Crowd, Intrusion Report">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Typography variant="h5">Crowd, Intrusion Report</Typography>
                <Box>
                  <IconButton color="secondary" onClick={handleClick}>
                    <More style={{ transform: 'rotate(90deg)' }} />
                  </IconButton>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <ApexDonutChart sx={{ height: '400px' }} series={chartData} options={chartOptions} />
              )}
            </Grid>
          </Grid>
        </CustomModal>
      </Grid>
    </MainCard>
  );
};

export default CrowdChart;
