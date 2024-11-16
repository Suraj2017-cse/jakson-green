import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Typography, CssBaseline, Box, useMediaQuery } from '@mui/material';
import { HambergerMenu } from 'iconsax-react';
import SideNav from 'components/main/SideNav';
import Logo from 'components/logo';
import { Outlet } from 'react-router';

const drawerWidth = 300;

const SideLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', padding: '0px' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? '100%' : drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
          marginLeft: isMobile ? 0 : drawerOpen ? `${drawerWidth}px` : 0,
          transition: 'width 0.3s, margin 0.3s',
          backgroundColor: '#fff',
          height: '50px',
          padding: '0px',
        }}
      >
        <Toolbar sx={{ minHeight: '50px !important' }}>
          <IconButton edge="start" color="secondary" variant="light" size="large" onClick={toggleDrawer} aria-label="menu" sx={{ mr: 2 }}>
            <HambergerMenu />
          </IconButton>
          <Typography variant="h5" color="#1688c9" noWrap>
            Jakson Green
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: drawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : 0,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', paddingTop: '10px', marginBottom: '20px' }}>
          <Logo isIcon={!drawerOpen} sx={{ width: drawerOpen ? 'auto' : 52, height: 'auto' }} />
        </Box>
        <Box sx={{ paddingLeft: '20px' }}>
          <SideNav />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: drawerOpen && !isMobile ? `calc(100% - ${drawerWidth}px)` : '100%',
          transition: 'width 0.3s',
        }}
      >
        <Toolbar />
        {/* <Main /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default SideLayout;
