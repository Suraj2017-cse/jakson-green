// import { useEffect, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { Grid, IconButton, ListItemButton, Menu, Stack, Typography } from '@mui/material';
// import ReactApexChart from 'react-apexcharts';
// import MainCard from 'components/MainCard';
// import { ThemeMode } from 'config';
// import { More } from 'iconsax-react';
// import { Box } from '@mui/system';
// import { ExpandSvg } from 'assets/images/Expand';
// import CustomModal from './Modal';

// // ==============================|| CHART ||============================== //

// const EcommerceDataChart = ({ sx, seriesData }) => {
//   const theme = useTheme();
//   const mode = theme.palette.mode;


//   const areaChartOptions = {
//     chart: {
//       id: 'new-stack-chart',
//       type: 'bar',
//       stacked: true,
//       toolbar: {
//         show: false,
//       },
//     },
//     fill: {
//       opacity: [1, 0.7, 0.4],
//     },
//     grid: {
//       strokeDashArray: 4,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: '80%',
//       },
//     },
//     xaxis: {
//       crosshairs: {
//         width: 1,
//       },
//     },
//     tooltip: {
//       shared: true, // Display values for all series
//       intersect: false, // Show tooltip even if mouse is not directly over the data point
//       custom: ({ series, dataPointIndex, w }) => {
//         // Get the date from the x-axis categories
//         const date = w.config.xaxis.categories[dataPointIndex];
    
//         // Create a structured list of values for Fire, Smoke, and Overgrass
//         const title = [
//           { name: 'Fire', value: series[0][dataPointIndex] },
//           { name: 'Smoke', value: series[1][dataPointIndex] },
//           { name: 'Overgrass', value: series[2][dataPointIndex] },
//         ];
    
//         // Map through the title array to create a div for each category
//         const tooltipContent = title.map(item => {
//           return `<div><strong>${item.name}:</strong> ${item.value || 0}</div>`;
//         }).join(''); // Join the content without commas
    
//         // Return the full tooltip content with date and values
//         return `<div style="padding: 10px; font-size: 14px;">
//                   <strong>${date}</strong><br />
//                   ${tooltipContent}
//                 </div>`;
//       },
//     },
    
//     legend: {
//       show: false,
//     },
//   };
  

//   const { primary, secondary } = theme.palette.text;
//   const line = theme.palette.divider;

//   const [options, setOptions] = useState(areaChartOptions);

//   const formatDate = (dateString) => {
//     const [day, month, year] = dateString.split('.').map((part) => parseInt(part, 10));
//     const date = new Date(year, month - 1, day);
//     return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
//   };

//   useEffect(() => {
//     setOptions((prevState) => ({
//       ...prevState,
//       colors: ['#ed3237', '#f06937', '#3dbf83'],
//       xaxis: {
//         categories: seriesData.map((entry) => entry.date),
//         labels: {
//           style: {
//             colors: Array(seriesData.length).fill(secondary),
//             fontSize: '9px', // Reduced font size

//           },
//           rotate: -45, // Ensure x-axis labels are rotated
//           padding: 9, // Add padding for space
          
//           formatter: (value) => formatDate(value), // Apply custom date format
//         },
//         axisBorder: {
//           show: false,
//           color: line,
//         },
//         axisTicks: {
//           show: false,
//         },
//       },
//       yaxis: {
//         labels: {
//           style: {
//             colors: [secondary],
//           },
//         },
//       },
//       grid: {
//         borderColor: line,
//       },
//       theme: {
//         mode: mode === ThemeMode.DARK ? 'dark' : 'light',
//       },
//     }));
//   }, [mode, primary, secondary, line, theme, seriesData]);

//   return (
//     <Box sx={{ width: '100%', height: 'auto', ...sx }}>
//       <ReactApexChart
//         options={options}
//         series={[
//           { name: 'Fire', data: seriesData.map((entry) => parseInt(entry.fireRecord, 10)) },
//           { name: 'Smoke', data: seriesData.map((entry) => parseInt(entry.smokeRecord, 10)) },
//           { name: 'Overgrass', data: seriesData.map((entry) => parseInt(entry.overgrassRecord, 10)) },
//         ]}
//         type="bar"
//         height="100%"
//       />
//     </Box>
//   );
// };

// // ==============================|| CHART WIDGETS - FIRE REPORT ||============================== //

// const FireReport = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [modalAnchorEl, setModalAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const modalOpen = Boolean(modalAnchorEl);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [series, setSeries] = useState([]);
//   const [modalSeries, setModalSeries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalLoading, setModalLoading] = useState(true);

//   const fetchSeriesData = async (type, updateModal = false) => {
//     const setter = updateModal ? setModalSeries : setSeries;
//     const setLoadingState = updateModal ? setModalLoading : setLoading;

//     setLoadingState(true);
//     try {
//       const response = await fetch(`https://jakson-cairo.online:8094/api/Fire/NatureDataReport?type=${type}`);
//       const data = await response.json();

//       setter(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoadingState(false);
//     }
//   };

//   useEffect(() => {
//     fetchSeriesData(1); // Default: Fetch "Today" data
//     fetchSeriesData(1, true); // Default modal data
//   }, []);

//   const handleTodayData = () => fetchSeriesData(1);
//   const handleWeeklyData = () => fetchSeriesData(2);
//   const handleMonthlyData = () => fetchSeriesData(3);

//   const handleTodayModalData = () => fetchSeriesData(1, true);
//   const handleWeeklyModalData = () => fetchSeriesData(2, true);
//   const handleMonthlyModalData = () => fetchSeriesData(3, true);

//   const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
//   const handleModalMenuClick = (event) => setModalAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const handleModalMenuClose = () => setModalAnchorEl(null);

//   const handleOpenModal = () => setModalVisible(true);
//   const handleCloseModal = () => setModalVisible(false);

//   return (
//     <MainCard>
//       <Grid container spacing={1}>
//         <Grid item xs={12}>
//           <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
//             <Typography variant="h6">Fire, Smoke, Vegetation Report</Typography>
//             <Box sx={{ width: '80px' }}>
//               <IconButton color="secondary" onClick={handleOpenModal}>
//                 <ExpandSvg />
//               </IconButton>
//               <IconButton color="secondary" onClick={handleMenuClick}>
//                 <More style={{ transform: 'rotate(90deg)' }} />
//               </IconButton>
//             </Box>
//             <Menu
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleMenuClose}
//               MenuListProps={{
//                 sx: { p: 1.25, minWidth: 150 },
//               }}
//             >
//               <ListItemButton onClick={() => { handleTodayData(); handleMenuClose(); }}>Today</ListItemButton>
//               <ListItemButton onClick={() => { handleWeeklyData(); handleMenuClose(); }}>Weekly</ListItemButton>
//               <ListItemButton onClick={() => { handleMonthlyData(); handleMenuClose(); }}>Monthly</ListItemButton>
//             </Menu>
//           </Stack>
//         </Grid>
//         <Grid item xs={12}>
//           {loading ? (
//             <Typography>Loading...</Typography>
//           ) : (
//             <EcommerceDataChart sx={{ height: '250px' }} seriesData={series} />
//           )}
//         </Grid>
//       </Grid>

//       <CustomModal isOpen={modalVisible} onClose={handleCloseModal} title="Fire, Smoke, Vegetation Report">
//         <Grid container spacing={1}>
//           <Grid item xs={12}>
//             <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
//               <Typography variant="h5">Fire, Smoke, Vegetation Report</Typography>
//               <Box>
//                 <IconButton color="secondary" onClick={handleModalMenuClick}>
//                   <More style={{ transform: 'rotate(90deg)' }} />
//                 </IconButton>
//                 <Menu
//                   anchorEl={modalAnchorEl}
//                   open={modalOpen}
//                   onClose={handleModalMenuClose}
//                   MenuListProps={{
//                     sx: { p: 1.25, minWidth: 150 },
//                   }}
//                 >
//                   <ListItemButton onClick={() => { handleTodayModalData(); handleModalMenuClose(); }}>Today</ListItemButton>
//                   <ListItemButton onClick={() => { handleWeeklyModalData(); handleModalMenuClose(); }}>Weekly</ListItemButton>
//                   <ListItemButton onClick={() => { handleMonthlyModalData(); handleModalMenuClose(); }}>Monthly</ListItemButton>
//                 </Menu>
//               </Box>
//             </Stack>
//           </Grid>
//           <Grid item xs={12}>
//             {modalLoading ? (
//               <Typography>Loading...</Typography>
//             ) : (
//               <EcommerceDataChart sx={{ height: '400px' }} seriesData={modalSeries} />
//             )}
//           </Grid>
//         </Grid>
//       </CustomModal>
//     </MainCard>
//   );
// };

// export default FireReport;




import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, IconButton, ListItemButton, Menu, Stack, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import { More } from 'iconsax-react';
import { Box } from '@mui/system';
import { ExpandSvg } from 'assets/images/Expand';
import CustomModal from './Modal';

// ==============================|| CHART ||============================== //
const EcommerceDataChart = ({ sx, seriesData, chartType }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // Dynamically set column width based on chartType (Today, Weekly, Monthly)
  const getColumnWidth = (chartType) => {
    if (chartType === 'Today') {
      return '20%'; // Narrower bars for Today data
    } else {
      return '80%'; // Wider bars for Weekly and Monthly
    }
  };

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
      opacity: [1, 0.7, 0.4],
    },
    grid: {
      strokeDashArray: 4,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: getColumnWidth(chartType), // Set column width based on chartType
      },
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    tooltip: {
      shared: true, // Display values for all series
      intersect: false, // Show tooltip even if mouse is not directly over the data point
      custom: ({ series, dataPointIndex, w }) => {
        // Get the date from the x-axis categories and format it
        const date = formatDate(w.config.xaxis.categories[dataPointIndex]);

        // Create a structured list of values for Fire, Smoke, and Overgrass
        const title = [
          { name: 'Fire', value: series[0][dataPointIndex] },
          { name: 'Smoke', value: series[1][dataPointIndex] },
          { name: 'Overgrass', value: series[2][dataPointIndex] },
        ];

        // Map through the title array to create a div for each category
        const tooltipContent = title.map(item => {
          return `<div><strong>${item.name}:</strong> ${item.value || 0}</div>`;
        }).join(''); // Join the content without commas

        // Return the full tooltip content with the formatted date and values
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

  const formatDate = (dateString) => {
    // const [day, month, year] = dateString?.split('.')?.map((part) => parseInt(part, 10));
    const [day, month, year] = (dateString ?? '').split('.').map((part) => parseInt(part, 10));

    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#ed3237', '#f06937', '#00ff00'],
      xaxis: {
        categories: seriesData.map((entry) => entry.date),
        labels: {
          style: {
            colors: Array(seriesData.length).fill(secondary),
            fontSize: '9px', // Reduced font size
          },
          rotate: -45, // Ensure x-axis labels are rotated
          padding: 9, // Add padding for space
          formatter: (value) => formatDate(value), // Apply custom date format
        },
        axisBorder: {
          show: false,
          color: line,
        },
        axisTicks: {
          show: false,
        },
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
        mode: mode === ThemeMode.DARK ? 'dark' : 'light',
      },
    }));
  }, [mode, primary, secondary, line, theme, seriesData]);

  return (
    <Box sx={{ width: '100%', height: 'auto', ...sx }}>
      <ReactApexChart
        options={options}
        series={[
          { name: 'Fire', data: seriesData.map((entry) => parseInt(entry.fireRecord, 10)) },
          { name: 'Smoke', data: seriesData.map((entry) => parseInt(entry.smokeRecord, 10)) },
          { name: 'Overgrass', data: seriesData.map((entry) => parseInt(entry.overgrassRecord, 10)) },
        ]}
        type="bar"
        height="100%"
      />
    </Box>
  );
};


// ==============================|| CHART WIDGETS - FIRE REPORT ||============================== //

const FireReport = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalAnchorEl, setModalAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const modalOpen = Boolean(modalAnchorEl);
  const [modalVisible, setModalVisible] = useState(false);
  const [series, setSeries] = useState([]);
  const [modalSeries, setModalSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(true);
  const [chartType, setChartType] = useState('Today'); // New state to track the selected chart type

  const fetchSeriesData = async (type, updateModal = false) => {
    const setter = updateModal ? setModalSeries : setSeries;
    const setLoadingState = updateModal ? setModalLoading : setLoading;

    setLoadingState(true);
    try {
      const response = await fetch(`https://jakson-cairo-api.me:4420/api/Fire/NatureDataReport?type=${type}`);
      const data = await response.json();

      setter(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchSeriesData(1); // Default: Fetch "Today" data
    fetchSeriesData(1, true); // Default modal data
  }, []);

  const handleTodayData = () => {
    setChartType('Today'); // Set chart type to 'Today'
    fetchSeriesData(1);
  };
  const handleWeeklyData = () => {
    setChartType('Weekly'); // Set chart type to 'Weekly'
    fetchSeriesData(2);
  };
  const handleMonthlyData = () => {
    setChartType('Monthly'); // Set chart type to 'Monthly'
    fetchSeriesData(3);
  };

  const handleTodayModalData = () => fetchSeriesData(1, true);
  const handleWeeklyModalData = () => fetchSeriesData(2, true);
  const handleMonthlyModalData = () => fetchSeriesData(3, true);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleModalMenuClick = (event) => setModalAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleModalMenuClose = () => setModalAnchorEl(null);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h6">Fire, Smoke, Vegetation Report</Typography>
            <Box sx={{ width: '80px' }}>
              <IconButton color="secondary" onClick={handleOpenModal}>
                <ExpandSvg />
              </IconButton>
              <IconButton color="secondary" onClick={handleMenuClick}>
                <More style={{ transform: 'rotate(90deg)' }} />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                sx: { p: 1.25, minWidth: 150 },
              }}
            >
              <ListItemButton onClick={() => { handleTodayData(); handleMenuClose(); }}>Today</ListItemButton>
              <ListItemButton onClick={() => { handleWeeklyData(); handleMenuClose(); }}>Weekly</ListItemButton>
              <ListItemButton onClick={() => { handleMonthlyData(); handleMenuClose(); }}>Monthly</ListItemButton>
            </Menu>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <EcommerceDataChart sx={{ height: '250px' }} seriesData={series} chartType={chartType} /> // Pass chartType here
          )}
        </Grid>
      </Grid>

      <CustomModal isOpen={modalVisible} onClose={handleCloseModal} title="Fire, Smoke, Vegetation Report">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography variant="h5">Fire, Smoke, Vegetation Report</Typography>
              <Box>
                <IconButton color="secondary" onClick={handleModalMenuClick}>
                  <More style={{ transform: 'rotate(90deg)' }} />
                </IconButton>
                <Menu
                  anchorEl={modalAnchorEl}
                  open={modalOpen}
                  onClose={handleModalMenuClose}
                  MenuListProps={{
                    sx: { p: 1.25, minWidth: 150 },
                  }}
                >
                  <ListItemButton onClick={() => { handleTodayModalData(); handleModalMenuClose(); }}>Today</ListItemButton>
                  <ListItemButton onClick={() => { handleWeeklyModalData(); handleModalMenuClose(); }}>Weekly</ListItemButton>
                  <ListItemButton onClick={() => { handleMonthlyModalData(); handleModalMenuClose(); }}>Monthly</ListItemButton>
                </Menu>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {modalLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <EcommerceDataChart sx={{ height: '400px' }} seriesData={modalSeries} chartType={chartType} /> // Pass chartType here as well
            )}
          </Grid>
        </Grid>
      </CustomModal>
    </MainCard>
  );
};

export default FireReport;
