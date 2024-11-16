import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Modal, Box, IconButton } from '@mui/material';
import solar from '../../assets/images/solar.jpg';
import { CloseSvg } from 'assets/images/Expand';

// Sample records
const records = [
  { image: solar, camera_id: 'Camera 1', date: '2024-11-12', time: '10:00 AM', category: 'bigGrass' },
  { image: solar, camera_id: 'Camera 2', date: '2024-11-12', time: '11:00 AM', category: 'fire' },
  { image: solar, camera_id: 'Camera 2', date: '2024-11-12', time: '11:00 AM', category: 'smoke' },
  { image: solar, camera_id: 'Camera 1', date: '2024-11-12', time: '10:00 AM', category: 'fire' },
  { image: solar, camera_id: 'Camera 2', date: '2024-11-12', time: '11:00 AM', category: 'smoke' },
  { image: solar, camera_id: 'Camera 2', date: '2024-11-12', time: '11:00 AM', category: 'smoke' },
];

// MatrixCard component for rendering individual cards
const MatrixCard = ({ record }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid item xs={12}>
      <Card sx={{ borderRadius: 2, boxShadow: 'none', textAlign: 'center', border: '1px solid #d5d5d5' }}>
        <div className="image-wrapper">
          <CardMedia
            component="img"
            image={record.image || solar}
            alt="License Plate"
            sx={{ cursor: 'pointer', height: 140 }}
            onClick={handleOpen}
          />
        </div>
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography variant="h5" className="license-plate bogus">
            {record.camera_id || 'Unknown'}
          </Typography>
          <Typography variant="body2" className="timestamp bogus">
            Date: {record.date || 'N/A'}
          </Typography>
          <Typography variant="body2" className="time">
            Time: {record.time || 'N/A'}
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
            background: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Close Icon */}
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 16, right: 16, background: '#fff', zIndex: 1 }} aria-label="close">
            <CloseSvg style={{ fill: '#fff' }} />
          </IconButton>
          <img src={record.image || solar} alt="Large License Plate" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        </Box>
      </Modal>
    </Grid>
  );
};

// Main component to render columns based on categories
const MatrixCardGrid = () => {
  const categories = {
    bigGrass: records.filter((record) => record.category === 'bigGrass'),
    fire: records.filter((record) => record.category === 'fire'),
    smoke: records.filter((record) => record.category === 'smoke'),
  };

  return (
    <Grid container spacing={2}>
      {Object.keys(categories).map((category) => (
        <Grid item md={4} sm={6} xs={12} key={category}>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, textTransform: 'capitalize' }}>
            {category === 'bigGrass' ? 'Big Grass' : category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
          <Grid container spacing={2}>
            {categories[category].map((record, index) => (
              <MatrixCard key={index} record={record} />
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default MatrixCardGrid;
