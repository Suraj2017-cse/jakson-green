// import React, { useEffect, useState } from 'react';
// import { Grid, Card, Select, MenuItem, TextField, Button, InputLabel, FormControl } from '@mui/material';
// import { SearchSvg } from 'assets/images/Expand';
// import AnalyticsCard from './AnalyticsCard';
// import solar from '../../assets/images/solar.jpg';
// const AnalyticsSidebar = () => {
//   const [date, setDate] = useState({
//     startDate: '',
//     endDate: '',
//     startTime: '',
//     endTime: '',
//   });
//   const [objectName, setObjectName] = useState('');

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     const formattedTime = today.toTimeString().split(' ')[0].slice(0, 5);

//     setDate({
//       startDate: formattedDate,
//       endDate: formattedDate,
//       startTime: formattedTime,
//       endTime: formattedTime,
//     });
//   }, []);

//   const handleDateChange = e => {
//     const { id, value } = e.target;
//     setDate(prevDate => ({ ...prevDate, [id]: value }));
//   };

//   const handleObjectChange = event => {
//     setObjectName(event.target.value);
//   };

//   const records = [
//     { image: solar, camera_id: 'Camera 1', date: '2024-11-12', time: '10:00 AM' },
//     { image: solar, camera_id: 'Camera 2', date: '2024-11-12', time: '11:00 AM' },
//     { image: solar, camera_id: 'Camera 3', date: '2024-11-12', time: '11:00 AM' },
//     { image: solar, camera_id: 'Camera 1', date: '2024-11-12', time: '10:00 AM' },
//     { image: solar, camera_id: 'Camera 2', date: '2024-11-12', time: '11:00 AM' },
//     { image: solar, camera_id: 'Camera 3', date: '2024-11-12', time: '11:00 AM' },
//   ];

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} md={3}>
//         <Card sx={{ padding: 2 }}>
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="object-name-label">Select Object</InputLabel>
//             <Select labelId="object-name-label" id="objectName" value={objectName} onChange={handleObjectChange} label="Select Object">
//               <MenuItem value="">Select Object</MenuItem>
//               <MenuItem value="grass">Grass</MenuItem>
//               <MenuItem value="one">One</MenuItem>
//               <MenuItem value="two">Two</MenuItem>
//               <MenuItem value="three">Three</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             label="Start Date"
//             type="date"
//             id="startDate"
//             value={date.startDate}
//             onChange={handleDateChange}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             label="Start Time"
//             type="time"
//             id="startTime"
//             value={date.startTime}
//             onChange={handleDateChange}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             label="End Date"
//             type="date"
//             id="endDate"
//             value={date.endDate}
//             onChange={handleDateChange}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             label="End Time"
//             type="time"
//             id="endTime"
//             value={date.endTime}
//             onChange={handleDateChange}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />

//           <Button variant="contained" color="primary" startIcon={<SearchSvg />} sx={{ mt: 2 }} fullWidth>
//             Search
//           </Button>
//         </Card>
//       </Grid>

//       <Grid item xs={12} md={9}>
//         <Card sx={{ padding: 3 }}>
//           <Grid container id="cardContainer" spacing={3}>
//             {records.map((record, index) => (
//               <AnalyticsCard key={index} record={record} />
//             ))}
//           </Grid>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default AnalyticsSidebar;



import React, { useState, useEffect } from 'react';
import { Grid, Card, Button, CircularProgress, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import AnalyticsCard from './AnalyticsCard';
import { SearchSvg } from 'assets/images/Expand';

const AnalyticsSidebar = () => {
  // State to hold the data from all APIs
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null); // Error state
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [objectName, setObjectName] = useState(''); // State for selected object

  // API endpoints
  const apiEndpoints = [
    'https://jakson-cairo.online:8094/api/Fire/GetOverGrass_Data',
    'https://jakson-cairo.online:8094/api/Fire/GetDetection_Data',
    'https://jakson-cairo.online:8094/api/Fire/GetCrowd_Record',
  ];

  // Function to fetch data from multiple APIs
  const fetchData = async () => {
    setLoading(true);
    setError(null);  // Reset error state before new fetch

    try {
      const responses = await Promise.all(apiEndpoints.map(endpoint => fetch(endpoint)));
      const data = await Promise.all(responses.map(res => res.json()));  // Convert all responses to JSON

      // Flatten and standardize data into a unified format
      const formattedData = data?.flat()?.map((item, index) => ({
        image: item?.photo || 'N/A',  
        detection_type: item?.detection_type || 'N/A',
        camera_id: item?.camera_id || `Camera ${index + 1}`,
        date: item?.date || 'Unknown Date',
        time: item?.time || 'Unknown Time',
      }));

      setData(formattedData);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle changes for date inputs
  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setDate((prevDate) => ({ ...prevDate, [id]: value }));
  };

  // Handle changes for selected object
  const handleObjectChange = (event) => {
    setObjectName(event.target.value);
  };

  // Render loading spinner or error if applicable
  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <div>{error}</div>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Card sx={{ padding: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="object-name-label">Select Object</InputLabel>
            <Select
              labelId="object-name-label"
              id="objectName"
              value={objectName}
              onChange={handleObjectChange}
              label="Select Object"
            >
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
        <Card sx={{ padding: 3 }}>
          <Grid container id="cardContainer" spacing={3}>
            
            {data.map((record, index) => (

              <Grid item key={index} xs={12} sm={6} md={4}>
               
                <AnalyticsCard key={index} record={record} />
              </Grid>

            ))}

          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsSidebar;
