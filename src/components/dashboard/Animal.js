// import { Grid, IconButton, MenuItem, Select, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
// import {  DocumentDownload } from 'iconsax-react';
// import { useTheme } from '@mui/material/styles';
// import { useState } from 'react';
import { Box, Stack } from '@mui/system';
import IncomeAreaChart from './IncomeChart';
import MainCard from 'components/MainCard';
import { Grid, IconButton, ListItemButton, Menu, Typography } from '@mui/material';
import { More } from 'iconsax-react';
import { useState } from 'react';
import { ExpandSvg } from 'assets/images/Expand';
import CustomModal from './Modal';

const Animal = () => {
  // const theme = useTheme();
  // const [slot, setSlot] = useState('week');
  // const [quantity, setQuantity] = useState('By volume');

  // const handleQuantity = e => {
  //   setQuantity(e.target.value);
  // };

  // const handleChange = (event, newAlignment) => {
  //   if (newAlignment) setSlot(newAlignment);
  // };
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
    <>
      <MainCard>
        <Grid container>
          <Grid item xs={12} sm={12}>
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
                <ListItemButton onClick={handleClose}>Today</ListItemButton>
                <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
                <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
              </Menu>
            </Stack>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-end' }} sx={{ mr: 2 }}>
              <ToggleButtonGroup exclusive onChange={handleChange} value={slot}>
                <ToggleButton disabled={slot === 'week'} value="week" sx={{ px: 2, py: 0.5 }}>
                  Week
                </ToggleButton>
                <ToggleButton disabled={slot === 'month'} value="month" sx={{ px: 2, py: 0.5 }}>
                  Month
                </ToggleButton>
              </ToggleButtonGroup>
              <Select value={quantity} onChange={handleQuantity} size="small">
                <MenuItem value="By volume">By Volume</MenuItem>
                <MenuItem value="By margin">By Margin</MenuItem>
                <MenuItem value="By sales">By Sales</MenuItem>
              </Select>
              <IconButton
                sx={{
                  border: `1px solid ${theme.palette.secondary[400]}`,
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <DocumentDownload style={{ color: theme.palette.secondary.darker }} />
              </IconButton>
            </Stack>
          </Grid> */}
        </Grid>
        <Box sx={{ pt: 1 }}>
          <IncomeAreaChart sx={{ minHeight: '250px' }}/>
        </Box>
        
        <CustomModal isOpen={modalOpen} onClose={handleCloseModal} title="Vehicle Analytics">
          <IncomeAreaChart sx={{  minHeight: '450px' }} />
        </CustomModal>
      </MainCard>
    </>
  );
};

export default Animal;
