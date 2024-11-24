import React, { useState, useEffect } from 'react';
import { Grid, Card, Button, CircularProgress, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import AnalyticsCard from './AnalyticsCard';  // Assuming AnalyticsCard is another component you're using
import { SearchSvg } from 'assets/images/Expand';  // Assuming you have this asset
import { useLocation } from 'react-router-dom';

const AnalyticsSidebar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state for initial data fetch
  const [error, setError] = useState(null); // Error state
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [objectName, setObjectName] = useState(''); // State for selected object
  const [searching, setSearching] = useState(false); // State to track search action

  const [selectedPage, setSelectedPage] = useState(localStorage.getItem('selectedIndex') || 0); 
  const location = useLocation(); // Get current URL to detect changes in selected page

  // API endpoints for dynamic fetch
  const apiEndpoints = [
    '', // Placeholder for non-searchable solutions
    'https://jakson-cairo.online:8094/api/Employee/GetAnprData',
    'https://jakson-cairo.online:8094/api/Employee/GetAnprVechileDetaildata',
    '',
    'https://jakson-cairo.online:8094/api/Fire/GetFire_Record',
    'https://jakson-cairo.online:8094/api/Fire/GetDetection_Data',
    'https://jakson-cairo.online:8094/api/Fire/Gethumanfall_Data',
    'https://jakson-cairo.online:8094/api/Fire/GetOverGrass_Data', 
    'https://jakson-cairo.online:8094/api/Fire/GetCrowd_Record',
    'https://jakson-cairo.online:8094/api/Fire/AnimalDetection_Data',
    'https://jakson-cairo.online:8094/api/Fire/OverSpeed_Data',
    '',
  ];

  // API search endpoints for dynamic fetch
  const searchApiEndpoints = {
    0: '',
    1: 'https://jakson-cairo.online:8094/api/Employee/GetAnprDataSerch',
    2: 'https://jakson-cairo.online:8094/api/Employee/GetAnprVechileDetaildataserch',
    3: '',
    4: 'https://jakson-cairo.online:8094/api/Fire/GetFire_RecordSerch',
    5: 'https://jakson-cairo.online:8094/api/Fire/GetDetection_Dataserch',
    6: 'https://jakson-cairo.online:8094/api/Fire/Gethumanfall_DataSerch',
    7: 'https://jakson-cairo.online:8094/api/Fire/GetOverGrass_Dataserch',
    8: 'https://jakson-cairo.online:8094/api/Fire/GetCrowd_Recordserch',
    9: 'https://jakson-cairo.online:8094/api/Fire/GetAnimal_DataSerch',
  };

  // Fetch data based on selected index
  const fetchData = async (index, filters = {}) => {
    setLoading(true);
    setError(null);  // Reset error state before new fetch
    const apiEndpoint = index >= 0 && index <= 11 ? apiEndpoints[index] : '';
    const searchEndpoint = searchApiEndpoints[index];
    
    // Determine if search API should be called
    const url = searchEndpoint && Object.keys(filters).length > 0
      ? `${searchEndpoint}?date=${filters?.date}&camera=${filters?.camera}&time=${filters?.time}&objectname=${filters?.objectname}`
      : apiEndpoint;

    try {
      console.log(`Fetching data from: ${url}`);  // Log the URL being fetched

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);

      const text = await response.text();
      let apiData = null;

      try {
        apiData = JSON.parse(text);  // Try parsing the response text into JSON
        console.log("API Response:", apiData); // Log the raw API response
      } catch (jsonError) {
        throw new Error(`Failed to parse response: ${text}`);
      }

      // If the data is empty or null, handle that scenario
      if (!apiData || apiData.length === 0) {
        setData([]);
        setError("No Data Available");
        return;
      }

      // Format the data
      const formattedData = apiData?.map((item, index) => ({
        image: item?.photo || item?.imagedata || 'N/A',
        detection_type: item?.detection_type || item?.name || 'N/A',
        camera_id: item?.camera_id || item?.camera || `Camera ${index + 1}`,
        date: item?.date || 'Unknown Date',
        time: item?.time || 'Unknown Time',
      }));

      setData(formattedData);

    } catch (err) {
      console.error("API Error:", err);
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
      setSearching(false); // Reset searching state after fetch is complete
    }
  };

  // Fetch data on page load and when the selected page changes
  useEffect(() => {
    const selectedIndex = parseInt(localStorage.getItem('selectedIndex')) || 0; // Default to 0 if not found
    setSelectedPage(selectedIndex);
    fetchData(selectedIndex); // Call fetchData with the selected index
  }, [location.pathname]);

  // Handle date change
  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setDate((prevDate) => ({ ...prevDate, [id]: value }));
  };

  // Handle object selection change
  const handleObjectChange = (event) => {
    setObjectName(event.target.value);
  };

  // Handle Search action
  const handleSearch = () => {
    const filters = {
      date: date.startDate,
      camera: date.startTime,
      time: date.endTime,
      objectname: objectName,
    };

    console.log("Filters sent to API:", filters); // Log the filters being sent to the API

    setSearching(true);  // Set searching state to true while search is in progress
    fetchData(selectedPage, filters);  // Trigger the data fetch with selected filters
  };

  // Render loading spinner or error if applicable
  if (loading || searching) {
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
          {/* Filters */}
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

          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SearchSvg />} 
            sx={{ mt: 2 }} 
            onClick={handleSearch} 
            fullWidth 
            disabled={searching}  // Disable button while searching
          >
            Search
          </Button>
        </Card>
      </Grid>

      <Grid item xs={12} md={9}>
        <Card sx={{ padding: 3 }}>
          <Grid container id="cardContainer" spacing={3}>
            {data?.map((record, index) => (
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




// import React, { useState, useEffect } from 'react';
// import { Grid, Card, Button, CircularProgress, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
// import AnalyticsCard from './AnalyticsCard'; // Assuming AnalyticsCard is another component you're using
// import { SearchSvg } from 'assets/images/Expand';  // Assuming you have this asset
// import { useNavigate } from 'react-router-dom';  // Add this import for programmatic navigation

// const AnalyticsSidebar = () => {
//   // State to hold the data from the selected API
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);  // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [date, setDate] = useState({
//     startDate: '',
//     endDate: '',
//     startTime: '',
//     endTime: '',
//   });
//   const [objectName, setObjectName] = useState(''); // State for selected object
//   const [selectedPage, setSelectedPage] = useState(localStorage.getItem('selectedIndex') || 0);

//   const navigate = useNavigate();  // Use navigate for programmatic navigation

//   // API endpoints for dynamic fetch (existing logic)
//   const apiEndpoints = [
//     '', // Placeholder for non-searchable solutions
//     'https://jakson-cairo.online:8094/api/Employee/GetAnprData',
//     'https://jakson-cairo.online:8094/api/Employee/GetAnprVechileDetaildata',
//     '',
//     'https://jakson-cairo.online:8094/api/Fire/GetFire_Record',
//     'https://jakson-cairo.online:8094/api/Fire/GetDetection_Data',
//     'https://jakson-cairo.online:8094/api/Fire/Gethumanfall_Data',
//     'https://jakson-cairo.online:8094/api/Fire/GetOverGrass_Data', 
//     'https://jakson-cairo.online:8094/api/Fire/GetCrowd_Record',
//     'https://jakson-cairo.online:8094/api/Fire/AnimalDetection_Data',
//     'https://jakson-cairo.online:8094/api/Fire/OverSpeed_Data',
//     '',
//   ];

//   // API search endpoints for dynamic fetch
//   const searchApiEndpoints = {
//     0: '',
//     1: 'https://jakson-cairo.online:8094/api/Employee/GetAnprDataSerch',
//     2: 'https://jakson-cairo.online:8094/api/Employee/GetAnprVechileDetaildataserch',
//     3: '',
//     4: 'https://jakson-cairo.online:8094/api/Fire/GetFire_RecordSerch',
//     5: 'https://jakson-cairo.online:8094/api/Fire/GetDetection_Dataserch',
//     6: 'https://jakson-cairo.online:8094/api/Fire/Gethumanfall_DataSerch',
//     7: 'https://jakson-cairo.online:8094/api/Fire/GetOverGrass_Dataserch',
//     8: 'https://jakson-cairo.online:8094/api/Fire/GetCrowd_Recordserch',
//     9: 'https://jakson-cairo.online:8094/api/Fire/GetAnimal_DataSerch',
//   };

//   // Fetch data based on selected index
//   const fetchData = async (index, filters = {}) => {
//     setLoading(true);
//     setError(null);  // Reset error state before new fetch
//     const apiEndpoint = index >= 0 && index <= 11 ? apiEndpoints[index] : '';
//     const searchEndpoint = searchApiEndpoints[index];
    
//     // Determine if search API should be called
//     const url = searchEndpoint && Object.keys(filters).length > 0
//       ? `${searchEndpoint}?date=${filters.date}&camera=${filters.camera}&time=${filters.time}&objectname=${filters.objectname}`
//       : apiEndpoint;

//     try {
//       console.log(`Fetching data from: ${url}`);  // Log the URL being fetched

//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);

//       const text = await response.text();
//       let data = null;

//       try {
//         data = JSON.parse(text);
//       } catch (jsonError) {
//         throw new Error(`Invalid JSON response: ${text}`);
//       }

//       // Log the fetched data for debugging
//       console.log('Fetched Data:', data);

//       // If the data is empty or null, set an empty array and error message
//       if (!data || data.length === 0) {
//         setData([]);
//         setError("No Data Available");
//         return;
//       }

//       // Format the data
//       const formattedData = data?.map((item, index) => ({
//         image: item?.photo || item?.imagedata || 'N/A',
//         detection_type: item?.detection_type || item?.name || 'N/A',
//         camera_id: item?.camera_id || item?.camera || `Camera ${index + 1}`,
//         date: item?.date || 'Unknown Date',
//         time: item?.time || 'Unknown Time',
//       }));

//       setData(formattedData);

//     } catch (err) {
//       console.error("API Error:", err);
//       setError(`Error fetching data: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data on page load and when the selected page changes
//   useEffect(() => {
//     const selectedIndex = parseInt(localStorage.getItem('selectedIndex')) || 0; // Default to 0 if not found
//     setSelectedPage(selectedIndex);
//     fetchData(selectedIndex); // Call fetchData with the selected index
//   }, [selectedPage]);

//   // Handle date change
//   const handleDateChange = (e) => {
//     const { id, value } = e.target;
//     setDate((prevDate) => ({ ...prevDate, [id]: value }));
//   };

//   // Handle object selection change
//   const handleObjectChange = (event) => {
//     setObjectName(event.target.value);
//   };

//   // Handle Search action
//   const handleSearch = () => {
//     const filters = {
//       date: date.startDate,
//       camera: date.startTime,
//       time: date.endTime,
//       objectname: objectName,
//     };

//     // Fetch search results
//     fetchData(selectedPage, filters);

//     // Redirect to another page with the search data
//     navigate('/search-results', {
//       state: {
//         filters: filters,  // You can pass the filters here or any additional state you need
//       },
//     });
//   };

//   // Render loading spinner or error if applicable
//   if (loading) {
//     return (
//       <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
//         <CircularProgress />
//       </Grid>
//     );
//   }

//   if (error) {
//     return (
//       <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
//         <div>{error}</div>
//       </Grid>
//     );
//   }

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} md={3}>
//         <Card sx={{ padding: 2 }}>
//           {/* Filters */}
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="object-name-label">Select Object</InputLabel>
//             <Select
//               labelId="object-name-label"
//               id="objectName"
//               value={objectName}
//               onChange={handleObjectChange}
//               label="Select Object"
//             >
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

//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<SearchSvg />}
//             sx={{ mt: 2 }}
//             onClick={handleSearch}
//             fullWidth
//           >
//             Search
//           </Button>
//         </Card>
//       </Grid>

//       <Grid item xs={12} md={9}>
//         {/* Display your fetched data here */}
//         {data?.length > 0 ? (
//           <AnalyticsCard data={data} />
//         ) : (
//           <div>No results found</div>
//         )}
//       </Grid>
//     </Grid>
//   );
// };

// export default AnalyticsSidebar;
