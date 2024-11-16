import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, IconButton, ListItemButton, Menu, Stack, Typography, Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import { More } from 'iconsax-react';
import { ExpandSvg } from 'assets/images/Expand';
import CustomModal from './Modal';

// ==============================|| CHART ||============================== //

const EcommerceDataChart = ({ sx, data }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    fill: {
      opacity: [1, 0.7, 0.4, 0.3],
    },
    grid: {
      strokeDashArray: 4,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
      },
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
      labels: {
        style: {
          colors: data.labels.map(() => theme.palette.text.secondary),
          fontSize: '20px', // Reduced font size
        },
        rotate: 45, // Rotate x-axis labels by 45 degrees
        padding: 20, // Add padding to create a gap between the labels and the axis
      },
    },
    tooltip: {
      shared: true, // Display values for all series
      intersect: false, // Show tooltip even if mouse is not directly over the data point
      custom: ({ series, dataPointIndex, w }) => {
        // Create a tooltip content structure that shows the date and series values
        const date = w.config.xaxis.categories[dataPointIndex]; // Get the date from x-axis categories
        const title = [
          { name: 'Jakson', value: series[0][dataPointIndex] },
          { name: 'Customer Representative', value: series[1][dataPointIndex] },
          { name: 'Security', value: series[2][dataPointIndex] },
        ];
    
        const tooltipContent = title.map(item => {
          return `<div>${item.name}: ${item.value || 0}</div>`;
        }).join('');
    
        return `<div style="padding: 10px; font-size: 14px;">
                  <strong>${date}</strong><br />
                  ${tooltipContent}
                </div>`;
      },
    },
    
    legend: {
      show: false,
    },
  };
  

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions(prevState => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary.light, theme.palette.primary[200], theme.palette.warning.light],
      xaxis: {
        categories: data.labels,
        labels: {
          style: {
            colors: data.labels.map(() => secondary),
            fontSize: '10px', // Reduced font size
          },
          rotate: -45, // Ensure x-axis labels are rotated
          padding: 10, // Add padding for space
        },
        axisBorder: {
          show: false,
          color: line,
        },
        axisTicks: {
          show: false,
        },
        tickAmount: data.labels.length - 1,
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      theme: {
        mode: mode === 'dark' ? 'dark' : 'light',
      },
    }));
  }, [mode, primary, secondary, line, theme, data.labels]);

  return (
    <Box sx={{ width: '100%', height: 'auto', ...sx }}>
      <ReactApexChart options={options} series={data.series} type="bar" height="100%" />
    </Box>
  );
};

// ==============================|| MONTHLY REPORT COMPONENT ||============================== //

const MonthlyReport = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [modalAnchorEl, setModalAnchorEl] = useState(null);  // For the modal menu
  const modalOpen = Boolean(modalAnchorEl);  // Manage modal menu open state
  const [modalOpenState, setModalOpenState] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    series: [],
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClick = event => {
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

  const fetchChartData = (type) => {
    const apiUrl = `https://jakson-cairo.online:8094/api/Employee/GetVendorReport?type=${type}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(apiData => {
        const columnLabels = [];
        const dataA = [];
        const dataB = [];
        const dataC = [];

        apiData.forEach(item => {
          columnLabels.push(item.date);
          dataA.push(parseInt(item.a));
          dataB.push(parseInt(item.b));
          dataC.push(parseInt(item.c));
        });

        setChartData({
          labels: columnLabels,
          series: [
            { name: 'Jakson', data: dataA },
            { name: 'Customer Representative', data: dataB },
            { name: 'Security', data: dataC },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data from the API:', error);
      });
  };

  useEffect(() => {
    // Default to "Monthly" when the component mounts
    fetchChartData(2);
  }, []);

  const handleTimeRangeChange = (type) => {
    fetchChartData(type);  // Fetch the data based on the selected type
    handleClose();          // Close the outside menu
    handleModalClose();     // Close the modal menu
    
  };

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h6">Attendance Report</Typography>
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
          <EcommerceDataChart sx={{ height: '250px' }} data={chartData} />
        </Grid>
      </Grid>

      {/* Modal for Full Width Graph */}
      <CustomModal isOpen={modalOpenState} onClose={handleCloseModal} title="Customer Representative Report">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography variant="h6">Attendance Report</Typography>
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
            <EcommerceDataChart sx={{ height: '400px' }} data={chartData} />
          </Grid>
        </Grid>
      </CustomModal>
    </MainCard>
  );
};

export default MonthlyReport;
