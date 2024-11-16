import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
// import { CloseSvg } from 'assets/images/Expand';

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        <Box sx={{ width: '90%', height: 'auto', backgroundColor: 'white', position: 'relative', borderRadius: '8px' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '97%',
            }}
          >
            {/* <Typography variant="h5" sx={{ mr: 2, textAlign: 'left' }}>
              {title}
            </Typography> */}
            {/* <IconButton onClick={onClose} sx={{ color: 'black', position: 'absolute', right: '0', top: '0' }}>
              <CloseSvg />
            </IconButton> */}
          </Box>
          <Box sx={{ padding: '16px' }}>{children}</Box>
          <Button
            onClick={onClose}
            sx={{
              padding: '10px 20px',
              display: 'block',
              background: 'red',
              fontSize: '16px',
              color: 'white',
              margin: '20px 20px 20px auto',
            }}
          >
            <Typography variant="h5">Close</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
