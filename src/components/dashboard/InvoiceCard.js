import React, { useState, useEffect } from 'react';
import CustomModal from './Modal';
import { Grid, IconButton, ListItemButton, Menu, Typography } from '@mui/material';
import { More } from 'iconsax-react';
import { ExpandSvg } from 'assets/images/Expand';
import { Box, Stack } from '@mui/system';
import MainCard from 'components/MainCard';
import ReactApexChart from 'react-apexcharts';

// Helper function to get the abbreviated month name (e.g., 'Jan', 'Feb', etc.)
const getMonthAbbreviation = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

const InvoiceCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], series: [] });
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Helper function to fetch data from the API based on type (1 = Today, 2 = Weekly, 3 = Monthly)
  const fetchChartData = (type) => {
    const apiUrl = `https://jakson-cairo.online:8094/api/Fire/InterferenceDataReport?type=${type}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(apiData => {
        const labels = [];
        const birdData = [];
        const animalData = [];
        const personData = [];

        apiData.forEach(item => {
          const [date] = item.date.split(' '); // Only extract the date part (MM/DD/YYYY)
          const [month, day] = date.split('/'); // Split the date into month, day, year
          const monthAbbreviation = getMonthAbbreviation(parseInt(month, 10) - 1); // Get the month abbreviation (0-based index)
          labels.push(`${monthAbbreviation} ${day}`); // Format as 'Nov 1', 'Nov 2', etc.
          birdData.push(parseInt(item.birdCount || 0, 10)); // Replace with actual data field names
          animalData.push(parseInt(item.animalCount || 0, 10)); // Replace with actual data field names
          personData.push(parseInt(item.personCount || 0, 10)); // Replace with actual data field names
        });

        setChartData({
          labels,
          series: [
            { name: 'Bird Report', type: 'column', data: birdData },
            { name: 'Animal Report', type: 'line', data: animalData },
            { name: 'Person Report', type: 'line', data: personData },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data from the API:', error);
      });
  };

  useEffect(() => {
    fetchChartData(2); // Default to "Today" data when the component mounts
  }, []);

  const handleTimeRangeChange = (type) => {
    fetchChartData(type); // Fetch data based on selected range without closing the modal
    handleClose(); // Close the menu (but do not close the modal)
  };

  const areaChartOptions = {
    chart: {
      id: 'interference-report-chart',
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
      categories: chartData.labels,
      labels: {
        style: {
          fontSize: '9px',
          colors: chartData.labels.map(() => '#9E9E9E'),
        },
        rotate: -45,
        padding: 10,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#9E9E9E'],
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ series, dataPointIndex }) => {
        // const xValue = w?.config?.xaxis?.categories[dataPointIndex]; // Get x-axis label (e.g., 'Nov 1')
        const xValue = chartData.labels[dataPointIndex];  // Access the formatted date from chartData.labels
        const birdValue = series[0][dataPointIndex];
        const animalValue = series[1][dataPointIndex];
        const personValue = series[2][dataPointIndex];

        return `<div style="padding: 10px; font-size: 14px;">
                  <strong>${xValue}</strong><br />
                  Bird Report: ${birdValue || 0}<br />
                  Animal Report: ${animalValue || 0}<br />
                  Person Report: ${personValue || 0}
                </div>`;
      },
    },
    theme: {
      mode: 'light',
    },
    stroke: {
      width: 1,
      curve: 'smooth',
    },
  };

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h6">Bird, Animal, Person Report</Typography>
            <Box>
              <IconButton
                color="secondary"
                aria-controls={open ? 'wallet-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenModal} // Opens the modal when clicked
              >
                <ExpandSvg />
              </IconButton>
              <IconButton
                color="secondary"
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
      <CustomModal isOpen={modalOpen} onClose={handleCloseModal} title="Bird, Animal, Person Report">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography variant="h5">Bird, Animal, Person Report</Typography>
              <Box>
                <IconButton
                  color="secondary"
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
            <ReactApexChart options={areaChartOptions} series={chartData.series} type="line" height="400px" />
          </Grid>
        </Grid>
      </CustomModal>
    </MainCard>
  );
};

export default InvoiceCard;
