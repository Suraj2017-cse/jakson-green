import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, IconButton, ListItemButton, Menu, Stack, Typography, Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import { More } from 'iconsax-react';
import { ExpandSvg } from 'assets/images/Expand';
import CustomModal from './Modal';

// Helper function to get the abbreviated month name (e.g., 'Jan', 'Feb', etc.)
const getMonthAbbreviation = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

// ==============================|| GRASS CHART ||============================== //

const GrassChart = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalAnchorEl, setModalAnchorEl] = useState(null);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    series: [],
  });
  const open = Boolean(anchorEl);
  const modalOpen = Boolean(modalAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClick = (event) => {
    setModalAnchorEl(event.currentTarget);
  };

  const handleModalClose = () => {
    setModalAnchorEl(null);
  };

  const handleOpenModal = () => {
    setModalOpenState(true);
  };

  const handleCloseModal = () => {
    setModalOpenState(false);
  };

  // Fetch chart data based on selected time range (type)
  const fetchChartData = (type) => {
    const apiUrl = `https://jakson-cairo.online:8094/api/Fire/VehicleDataType?type=${type}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(apiData => {
        const columnLabels = [];
        const vehicleCounts = [];

        apiData.forEach(item => {
          // Parse the date string (format: 'DD/MM/YYYY')
          const [day, month] = item.date.split('/'); // Split date into day, month, and year
          const monthAbbreviation = getMonthAbbreviation(parseInt(month, 10) - 1); // Get the month abbreviation (0-based index)
          columnLabels.push(`${monthAbbreviation} ${day}`); // Format as 'Nov 1', 'Nov 2', etc.
          vehicleCounts.push(parseInt(item.vehicleCount, 10)); // Ensure it's an integer
        });

        setChartData({
          labels: columnLabels,  // Labels like 'Nov 1', 'Nov 2', ...
          series: [
            { name: 'Vehicle Count', data: vehicleCounts },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data from the API:', error);
      });
  };

  useEffect(() => {
    // Default to "Weekly" when the component mounts
    fetchChartData(2);
  }, []);

  const handleTimeRangeChange = (type) => {
    fetchChartData(type);  // Fetch the data based on the selected type
    handleClose();          // Close the outside menu
    handleModalClose();     // Close the modal menu
  };

  // Chart options configuration for ReactApexChart
  const areaChartOptions = {
    chart: {
      id: 'vehicle-count-chart',
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 4,
    },
    xaxis: {
      categories: chartData.labels,  // Labels like 'Nov 1', 'Nov 2', ...
      labels: {
        style: {
          colors: chartData.labels.map(() => theme.palette.text.secondary),
          fontSize: '9px', // Adjust font size
        },
        rotate: -45,  // Rotate labels for better readability
        padding: 10,   // Add padding to create space
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [theme.palette.text.secondary],
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ series, dataPointIndex }) => {
        // Get x-axis label (e.g., 'Nov 1')
        const xValue = chartData.labels[dataPointIndex];  // Access the formatted date from chartData.labels
  
        // Access the vehicle count for the corresponding data point
        const value = series[0][dataPointIndex];
  
        // Return the tooltip content with the formatted date
        return `<div style="padding: 10px; font-size: 14px;">
                  <strong>${xValue}</strong><br />
                  Vehicle Count: ${value || 0}
                </div>`;
      },
    },
    theme: {
      mode: mode === 'dark' ? 'dark' : 'light',
    },
    stroke: {
      width: 1,  // Make the line thinner (default is 2, lower value for thinner line)
      curve: 'smooth',  // Optional: smooth out the curve of the line
    },
  };

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h6">Vehicle Analytics</Typography>
            <Box>
              <IconButton
                color="secondary"
                id="wallet-button"
                aria-controls={open ? 'wallet-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenModal}
                sx={{ ml: 0 }}
              >
                <ExpandSvg />
              </IconButton>

              <IconButton
                color="secondary"
                id="wallet-button"
                aria-controls={open ? 'wallet-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <ListItemButton onClick={() => handleTimeRangeChange(1)}>Today</ListItemButton>
              <ListItemButton onClick={() => handleTimeRangeChange(2)}>Weekly</ListItemButton>
              <ListItemButton onClick={() => handleTimeRangeChange(3)}>Monthly</ListItemButton>
            </Menu>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ReactApexChart options={areaChartOptions} series={chartData.series} type="line" height="250px" />
        </Grid>
      </Grid>

      {/* Modal for Full Width Graph */}
      <CustomModal isOpen={modalOpenState} onClose={handleCloseModal} title="Vehicle Analytics Report">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography variant="h6">Vehicle Analytics</Typography>
              <Box>
                <IconButton
                  color="secondary"
                  id="wallet-button-modal"
                  aria-controls={modalOpen ? 'modal-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={modalOpen ? 'true' : undefined}
                  onClick={handleModalClick}
                >
                  <More style={{ transform: 'rotate(90deg)' }} />
                </IconButton>
              </Box>
              <Menu
                id="modal-menu"
                anchorEl={modalAnchorEl}
                open={modalOpen}
                onClose={handleModalClose}
                MenuListProps={{
                  'aria-labelledby': 'wallet-button-modal',
                  sx: { p: 1.25, minWidth: 150 },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <ListItemButton onClick={() => handleTimeRangeChange(1)}>Today</ListItemButton>
                <ListItemButton onClick={() => handleTimeRangeChange(2)}>Weekly</ListItemButton>
                <ListItemButton onClick={() => handleTimeRangeChange(3)}>Monthly</ListItemButton>
              </Menu>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <ReactApexChart options={areaChartOptions} series={chartData.series} type="line" height="400px" />
          </Grid>
        </Grid>
      </CustomModal>
    </MainCard>
  );
};

export default GrassChart;
