import React, { useEffect, useState } from 'react';
import { Grid, Card, Select, MenuItem, TextField, Button, InputLabel, FormControl } from '@mui/material';
import { SearchSvg } from 'assets/images/Expand';
// import solar from '../../assets/images/solar.jpg';
// import { Box } from '@mui/system';
// import MatrixCard from 'components/analytics/MatrixCard';
import MatrixCardGrid from 'components/analytics/MatrixCard';
const EscalationMatrix = () => {
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [objectName, setObjectName] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTime = today.toTimeString().split(' ')[0].slice(0, 5);

    setDate({
      startDate: formattedDate,
      endDate: formattedDate,
      startTime: formattedTime,
      endTime: formattedTime,
    });
  }, []);

  const handleDateChange = e => {
    const { id, value } = e.target;
    setDate(prevDate => ({ ...prevDate, [id]: value }));
  };

  const handleObjectChange = event => {
    setObjectName(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Card sx={{ padding: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="object-name-label">Select Object</InputLabel>
            <Select labelId="object-name-label" id="objectName" value={objectName} onChange={handleObjectChange} label="Select Object">
              <MenuItem value="">Select Object</MenuItem>
              <MenuItem value="grass">Grass</MenuItem>
              <MenuItem value="one">One</MenuItem>
              <MenuItem value="two">Two</MenuItem>
              <MenuItem value="three">Three</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Start Date"
            type="date"
            id="startDate"
            value={date.startDate}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Start Time"
            type="time"
            id="startTime"
            value={date.startTime}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="End Date"
            type="date"
            id="endDate"
            value={date.endDate}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="End Time"
            type="time"
            id="endTime"
            value={date.endTime}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Button variant="contained" color="primary" startIcon={<SearchSvg />} sx={{ mt: 2 }} fullWidth>
            Search
          </Button>
        </Card>
      </Grid>

      <Grid item xs={12} md={9}>
        <Card sx={{ padding: '50px 30px 30px 50px' }}>
          <Grid container spacing={3}>
            <MatrixCardGrid />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EscalationMatrix;
