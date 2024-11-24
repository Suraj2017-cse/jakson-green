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
