// DummyDrawer.js
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const SecondDrawer = () => {
  return (
    <Box
      sx={{
        width: 240, // Set the drawer width
        p: 2,
        height: '100vh',
        bgcolor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h6">Dummy Drawer</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="textSecondary">
        This is a placeholder drawer with dummy content.
      </Typography>
    </Box>
  );
};

export default SecondDrawer;
