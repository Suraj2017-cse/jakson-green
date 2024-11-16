import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';
import { HomeSvg } from 'assets/images/Svg';
import { CloseSvg } from 'assets/images/Expand';
import DownloadModal from 'components/main/DownloadModal';

const AnalyticsLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleRedirect = () => {
    navigate('/ayana/main');
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          marginLeft: 0,
          transition: 'width 0.3s, margin 0.3s',
          backgroundColor: '#fff',
          paddingLeft: '20px',
        }}
      >
        <Toolbar sx={{ minHeight: '70px !important' }}>
          <IconButton
            onClick={handleRedirect}
            edge="start"
            color="secondary"
            variant="light"
            size="large"
            sx={{ mr: 2, backgroundColor: '#1688c9', padding: '5px' }}
          >
            <HomeSvg />
          </IconButton>
          <Button onClick={handleOpenModal} sx={{ backgroundColor: '#1688c9', padding: '10px 20px', color: '#fff' }}>
            Download
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: '60px', padding: '30px' }}>
        <Outlet />
      </Box>

      {/* Modal for Download */}
      <Modal open={open} onClose={handleCloseModal} aria-labelledby="download-modal-title" aria-describedby="download-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #1688c9',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            edge="start"
            color="secondary"
            variant="light"
            size="small" 
            sx={{ mr: 2, position: 'absolute', top: '5px', right: '-10px', padding: '2px' }} // Reduce padding
          >
            <CloseSvg height="16px" width="16px" fill="gray" /> {/* Reduce height and width */}
          </IconButton>

          <Typography id="download-modal-title" variant="h5" component="h2" sx={{ marginBottom: '20px' }}>
            Download Report
          </Typography>

          <DownloadModal />
        </Box>
      </Modal>
    </>
  );
};

export default AnalyticsLayout;
