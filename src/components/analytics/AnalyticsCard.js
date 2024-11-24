import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Modal, Box, IconButton } from '@mui/material';
import { CloseSvg } from 'assets/images/Expand';

// Utility function to check if the image is a base64 string
const isBase64Image = (image) => {
  return image && image.startsWith('data:image');
};

// Format the image source for base64
const formatImageSrc = (image) => {
  return isBase64Image(image) ? image : `data:image/png;base64,${image}`;
};

const AnalyticsCard = ({ record }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    
    <Grid item md={12} sm={6} xs={12}>
      <Card sx={{ borderRadius: 2, boxShadow: 'none', textAlign: 'center', border: '1px solid #d5d5d5' }}>
        {/* Image Wrapper */}
        <div className="image-wrapper">
          <CardMedia
            component="img"
            image={formatImageSrc(record?.image)} // Using formatted image source here
            alt="Overgrasss"
            sx={{
              cursor: 'pointer',
              height: 140, // Set a fixed height to maintain consistency
              width: '100%', // Ensure the image takes up full width of the card
              objectFit: 'cover', // Maintain aspect ratio, cover the box
              objectPosition: 'center', // Ensure the image is centered
            }}
            onClick={handleOpen}
          />
        </div>

        {/* Card Content */}
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography variant="h5" className="license-plate bogus">
            {record?.detection_type || record?.name || 'Unknown'}
          </Typography>
          <Typography variant="h5" className="license-plate bogus">
            {record?.camera_id || 'Unknown'}
          </Typography>
          <Typography variant="body2" className="timestamp bogus">
            Date: {record?.date || 'N/A'}
          </Typography>
          <Typography variant="body2" className="time">
            Time: {record?.time || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal for displaying the large image */}
      <Modal open={open} onClose={handleClose} aria-labelledby="image-modal" aria-describedby="image-modal-description">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            position: 'relative',
            background: 'rgba(0, 0, 0, 0.6)', // Dark background behind the image
          }}
        >
          {/* Close Icon */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: '#fff',
              zIndex: 1,
            }}
            aria-label="close"
          >
            <CloseSvg style={{ fill: '#fff' }} />
          </IconButton>

          {/* Large Image */}
          <img
            src={formatImageSrc(record?.image)} // Again, format the image for modal
            alt="Large License Plate"
            style={{
              maxWidth: '90%', // Limit image width to 90% of the screen width
              maxHeight: '90%', // Limit image height to 90% of the screen height
              objectFit: 'contain', // Ensure the entire image fits within the bounds without distortion
            }}
          />
        </Box>
      </Modal>
    </Grid>
  );
};

export default AnalyticsCard;