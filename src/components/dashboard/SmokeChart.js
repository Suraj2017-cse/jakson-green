import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, ListItemButton, Menu, Stack, Typography } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';
// import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import { ThemeMode } from 'config';

// assets
import { More } from 'iconsax-react';
import { ExpandSvg } from 'assets/images/Expand';
import { Box } from '@mui/system';
import CustomModal from './Modal';

// ==============================|| CHART ||============================== //

const ApexPieChart = ({ sx }) => {
  const theme = useTheme();
  // const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const mode = theme.palette.mode;

  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.secondary[200];
  const backColor = theme.palette.background.paper;

  const pieChartOptions = {
    chart: {
      type: 'pie',
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: true,
    },
    labels: ['Fire', 'Smoke', 'Grass', 'No value'],
    legend: {
      show: false,
    },
  };

  const [series] = useState([40, 20, 10, 15]);
  const [options, setOptions] = useState(pieChartOptions);

  useEffect(() => {
    // const primaryMain = theme.palette.primary.main;
    // const primaryLight = theme.palette.primary[200];
    // const secondary = theme.palette.secondary.main;
    // const secondaryLight = theme.palette.secondary[400];
    const secondaryDark = theme.palette.secondary.dark;
    const secondaryDarker = theme.palette.secondary.darker;

    setOptions(prevState => ({
      ...prevState,
      colors: ['#ed3237', '#e58a00', '#3dbf83', 'gray', secondaryDark, secondaryDarker],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
      },
      grid: {
        borderColor: line,
      },
      stroke: {
        colors: [backColor],
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light',
      },
    }));
  }, [mode, primary, line, grey200, backColor, theme]);

  return (
    <div id="chart">
      <Box sx={{ width: '100%', height: 'auto', ...sx }}>
        <ReactApexChart options={options} series={series} type="pie" height="100%" />
      </Box>
    </div>
  );
};

// ==============================|| CHART WIDGETS - PRODUCT OVERVIEW ||============================== //

const SmokeChart = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  return (
    <MainCard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h6">Fire, Smoke, Grass Report</Typography>
            <Box sx={{width: '80px'}}>
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
              <ListItemButton onClick={handleClose}>Today</ListItemButton>
              <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
              <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
            </Menu>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ApexPieChart sx={{ height: '235px' }} />
        </Grid>
        <CustomModal isOpen={modalOpen} onClose={handleCloseModal} title="Fire, Smoke, Grass Report">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Typography variant="h5">Fire, Smoke, Grass Report</Typography>
                <Box>
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
                  <ListItemButton onClick={handleClose}>Today</ListItemButton>
                  <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
                  <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
                </Menu>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <ApexPieChart sx={{ height: '400px' }} />
            </Grid>
          </Grid>
        </CustomModal>
        {/* <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Forms</Typography>
              </Stack>
              <Typography variant="subtitle1">50+</Typography>
            </Stack>
          </MainCard>
        </Grid> */}
        {/* <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Components</Typography>
              </Stack>
              <Typography variant="subtitle1">200+</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={6} md={4}>
          <MainCard content={false}>
            <Stack alignItems="center" sx={{ py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot size={6} componentDiv sx={{ bgcolor: 'secondary.darker' }} />
                <Typography>Pages</Typography>
              </Stack>
              <Typography variant="subtitle1">150+</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Button variant="outlined" fullWidth color="secondary">
              View all
            </Button>
            <Button variant="contained" fullWidth>
              Create new page
            </Button>
          </Stack>
        </Grid> */}
      </Grid>
    </MainCard>
  );
};

export default SmokeChart;





// import { useEffect, useState } from 'react';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Grid, ListItemButton, Menu, Stack, Typography } from '@mui/material';

// // third-party
// import ReactApexChart from 'react-apexcharts';

// // project-imports
// import MainCard from 'components/MainCard';
// // import Dot from 'components/@extended/Dot';
// import IconButton from 'components/@extended/IconButton';
// // import { ThemeMode } from 'config';

// // assets
// import { More } from 'iconsax-react';
// import { ExpandSvg } from 'assets/images/Expand';
// import { Box } from '@mui/system';
// import CustomModal from './Modal';


// const ApexPieChart = ({ sx, data, labels, colors, tooltipData }) => {
//   const theme = useTheme();
//   const line = theme.palette.divider;
//   const backColor = theme.palette.background.paper;

//   const pieChartOptions = {
//     chart: {
//       type: 'pie',
//     },
//     tooltip: {
//       enabled: true,
//       fillSeriesColor: true,
//       y: {
//         formatter: (val, opt) => {
//           // Show the actual value from API instead of the units
//           return `${tooltipData[opt.seriesIndex]} `; // Show value from API response
//         },
//       },
//     },
//     labels: labels,
//     legend: {
//       show: true, // Show the legend for each segment
//     },
//     dataLabels: {
//       enabled: true,
//       formatter: function (val, opt) {
//         return `${tooltipData[opt.seriesIndex]} `; // Show actual value (count) from API
//       },
//     },
//     colors: colors, // Dynamically update the colors based on the available data
//   };

//   const [options, setOptions] = useState(pieChartOptions);

//   useEffect(() => {
//     setOptions((prevState) => ({
//       ...prevState,
//       grid: {
//         borderColor: line,
//       },
//       stroke: {
//         colors: [backColor],
//       },
//       theme: {
//         mode: theme.palette.mode,
//       },
//     }));
//   }, [theme]);

//   return (
//     <div id="chart">
//       <Box sx={{ width: '100%', height: 'auto', ...sx }}>
//         <ReactApexChart options={options} series={data} type="pie" height="100%" />
//       </Box>
//     </div>
//   );
// };

// const SmokeChart = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [data, setData] = useState([0, 0, 0, 0]); // Default values for Fire, Smoke, Grass, Other
//   const [labels, setLabels] = useState([]); // Labels for chart
//   const [colors, setColors] = useState([]); // Colors for chart
//   const [tooltipData, setTooltipData] = useState([]); // Tooltip values (actual values)
//   const [loading, setLoading] = useState(false);
//   const [selectedType, setSelectedType] = useState(1); // 1 for Today, 2 for Weekly, 3 for Monthly

//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleSelectType = (type) => {
//     setSelectedType(type);
//     setAnchorEl(null); // Close the menu when an option is selected
//   };

//   // Fetch data based on selected type (Today, Weekly, Monthly)
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://jakson-cairo.online:8094/api/DashboardSelectedOnDate/NewSiteModuleCountreport?type=${selectedType}`
//       );
//       const result = await response.json();

//       // Ensure proper data is being fetched
//       const fire_record = result[0]?.fire_record ?? 0;
//       const smoke_record = result[0]?.smoke_record ?? 0;
//       const overgrass_record = result[0]?.overgrass_record ?? 0;

//       console.log('API Result:', result); // Log the API result to verify the data

//       const availableData = [];
//       const availableLabels = [];
//       const availableColors = [];
//       const availableTooltipData = [];

//       // Define a minimum threshold for visibility and scaling factor
//       const minThreshold = 1; // Minimum threshold for small values to be visible
//       const scaleFactor = 10; // Scale small values to make them more visible

//       let totalSum = 0;

//       // Add the actual values, applying the scale factor to small values
//       if (fire_record > minThreshold) {
//         availableData.push(fire_record * scaleFactor);
//         availableLabels.push('Fire');
//         availableColors.push('#ed3237'); // Red color for fire
//         availableTooltipData.push(fire_record); // Add actual fire record for tooltip
//         totalSum += fire_record * scaleFactor;
//       }

//       if (smoke_record > minThreshold) {
//         availableData.push(smoke_record * scaleFactor);
//         availableLabels.push('Smoke');
//         availableColors.push('#e58a00'); // Orange color for smoke
//         availableTooltipData.push(smoke_record); // Add actual smoke record for tooltip
//         totalSum += smoke_record * scaleFactor;
//       }

//       if (overgrass_record > minThreshold) {
//         availableData.push(overgrass_record);
//         availableLabels.push('Grass');
//         availableColors.push('#3dbf83'); // Green color for grass
//         availableTooltipData.push(overgrass_record); // Add actual grass record for tooltip
//         totalSum += overgrass_record;
//       }

//       // If no data is found, create a "No Value" entry
//       if (availableData.length === 0) {
//         availableData.push(100); // Default to 100% if no data is available
//         availableLabels.push('No Value');
//         availableColors.push('#cccccc'); // Grey for "No Value"
//         availableTooltipData.push(0); // No value for tooltip
//       }

//       // Normalize the data so it sums up to 100%
//       if (totalSum > 0) {
//         availableData.forEach((value, index) => {
//           availableData[index] = (value / totalSum) * 100; // Normalize each value to make the total 100%
//         });
//       }

//       setData(availableData);
//       setLabels(availableLabels);
//       setColors(availableColors);
//       setTooltipData(availableTooltipData); // Set tooltip data for each segment
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setData([0, 0, 0, 0]); // Fallback to zero data in case of an error
//       setLabels(['No Value']);
//       setColors(['#cccccc']); // Grey color for No Value
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data whenever selectedType changes
//   useEffect(() => {
//     fetchData();
//   }, [selectedType]);

//   return (
//     <MainCard>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
//             <Typography variant="h6">Fire, Smoke, Grass Report</Typography>
//             <Box>
//               <IconButton
//                 color="secondary"
//                 onClick={handleOpenModal}
//                 sx={{ ml: 0 }}
//               >
//                 <ExpandSvg />
//               </IconButton>
//               <IconButton
//                 color="secondary"
//                 onClick={handleClick}
//               >
//                 <More style={{ transform: 'rotate(90deg)' }} />
//               </IconButton>
//             </Box>
//             <Menu
//               id="wallet-menu"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               MenuListProps={{
//                 'aria-labelledby': 'wallet-button',
//                 sx: { p: 1.25, minWidth: 150 },
//               }}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'right',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//             >
//               <ListItemButton onClick={() => handleSelectType(1)}>Today</ListItemButton>
//               <ListItemButton onClick={() => handleSelectType(2)}>Weekly</ListItemButton>
//               <ListItemButton onClick={() => handleSelectType(3)}>Monthly</ListItemButton>
//             </Menu>
//           </Stack>
//         </Grid>
//         <Grid item xs={12}>
//           {loading ? (
//             <Typography>Loading...</Typography> // Display loading message
//           ) : (
//             <ApexPieChart sx={{ height: '235px' }} data={data} labels={labels} colors={colors} tooltipData={tooltipData} />
//           )}
//         </Grid>
//         <CustomModal isOpen={modalOpen} onClose={handleCloseModal} title="Fire, Smoke, Grass Report">
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
//                 <Typography variant="h5">Fire, Smoke, Grass Report</Typography>
//                 <Box>
//                   <IconButton color="secondary" onClick={handleClick}>
//                     <More style={{ transform: 'rotate(90deg)' }} />
//                   </IconButton>
//                 </Box>
//               </Stack>
//             </Grid>
//             <Grid item xs={12}>
//               {loading ? (
//                 <Typography>Loading...</Typography> // Display loading message in modal
//               ) : (
//                 <ApexPieChart sx={{ height: '400px' }} data={data} labels={labels} colors={colors} tooltipData={tooltipData} />
//               )}
//             </Grid>
//           </Grid>
//         </CustomModal>
//       </Grid>
//     </MainCard>
//   );
// };

// export default SmokeChart;
