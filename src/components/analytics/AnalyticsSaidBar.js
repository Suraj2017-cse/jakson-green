import React, { useState, useEffect } from 'react';
import { Grid, Card, Button, CircularProgress, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import AnalyticsCard from './AnalyticsCard';  
import { SearchSvg } from 'assets/images/Expand';  

const AnalyticsSidebar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [objectName, setObjectName] = useState(''); 
  const [searching, setSearching] = useState(false); 

  const [selectedPage, setSelectedPage] = useState(localStorage.getItem('selectedIndex') || 0); 

  const [submitted, setSubmitted] = useState(false);


  const [selectedLabel, setSelectedLabel] = useState('');

  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    // Get the label and value from localStorage
    const savedLabel = localStorage.getItem('selectedLabel');
    const savedValue = localStorage.getItem(savedLabel);
    console.warn(savedValue);
    

    // Set the label and value
    setSelectedLabel(savedLabel || ''); // Default to empty if no label exists
    setObjectName(savedValue || ''); // Default to empty if no value exists

    // Set dropdown options based on the label
    if (savedLabel === 'Fire & Smoke' || savedLabel === 'Fire' || savedLabel === 'Smoke') {
      setDropdownOptions(['Fire', 'Smoke', 'All']);
    } else if (savedLabel === 'Vegetation Detection' || savedLabel === 'Grass') {
      setDropdownOptions(['Grass', 'Big Grass', 'Tree']);
    } else if (savedLabel === 'Animal & Human Detection') {
      setDropdownOptions(['Animal', 'Human', 'All']);
    } else if (savedLabel) {
      // For all other labels, display the saved value as an option
      setDropdownOptions([savedLabel]);
    } else {
      // Default case: no specific label selected
      setDropdownOptions(['No options available']);
    }
  }, []);

  
  // API endpoints for dynamic fetch
  const apiEndpoints = [
    '', // Placeholder for non-searchable solutions
    'https://www.jakson-cairo-api.me:4420/api/Employee/GetAnprData',
    '',
    'https://www.jakson-cairo-api.me:4420/api/Employee/GetAnprVechileDetaildata',
    'https://www.jakson-cairo-api.me:4420/api/Fire/GetFire_Record',
    'https://www.jakson-cairo-api.me:4420/api/Fire/GetDetection_Data',
    'https://www.jakson-cairo-api.me:4420/api/Fire/Gethumanfall_Data',
    'https://www.jakson-cairo-api.me:4420/api/Fire/GetOverGrass_Data', 
    'https://www.jakson-cairo-api.me:4420/api/Fire/GetCrowd_Record',
    'https://www.jakson-cairo-api.me:4420/api/Fire/AnimalDetection_Data',
    '',
    'https://www.jakson-cairo-api.me:4420/api/Fire/GetMotorcycleDetectionDataForToday',
    'https://www.jakson-cairo-api.me:4420/api/Fire/OverSpeed_Data',
    '',
  ];

  // API search endpoints for dynamic fetch
  const searchApiEndpoints = {
    0: '',
    1: 'https://www.jakson-cairo-api.me:4420/api/Employee/GetReportByAnprFilter1',
    2: '',
    3: 'https://www.jakson-cairo-api.me:4420/api/Employee/GetAnprVechileDetaildataserch',
    4: 'https://www.jakson-cairo-api.me:4420/api/Fire/GetFire_Record_Report',
    5: 'https://www.jakson-cairo-api.me:4420/api/Fire/GetDetection_Data_Report',
    6: 'https://www.jakson-cairo-api.me:4420/api/Fire/GetHumanfall_Data_Report',
    7: 'https://www.jakson-cairo-api.me:4420/api/Fire/GetOverGrass_Data_Report',
    8: 'https://www.jakson-cairo-api.me:4420/api/Fire/GetCrowd_Record_Report',
    9: 'https://www.jakson-cairo-api.me:4420/api/Fire/AnimalDetection_Data1',
    10: '',
    11: 'https://www.jakson-cairo-api.me:4420/api/Fire/GetMotorcycleDetectionData',
  };


  const handleSearch = () => {
    setSubmitted(true); // Set submitted to show validation errors
  
    if (!date.startDate || !date.startTime || !date.endDate || !date.endTime) {
      console.log("Validation failed: Missing required fields");
      return; // Prevent API call if validation fails
    }
  
    // Combine date and time into datetime format for the API
    const startDateTime = `${date.startDate} ${date.startTime}:00.000`;
    const endDateTime = `${date.endDate} ${date.endTime}:00.000`;
  
    // Map special cases for dropdown values
    const objectTypeMap = {
      "Big Grass": "BigGrass",
      "Human": "person", // Example for earlier requirement
    };
  
    // Resolve object type using the map; if not in the map, use the dropdown value directly
    const resolvedObjectType = objectName !== "All" ? objectTypeMap[objectName] || objectName : null;
  
    // Include `objectType` only for specific detections
    const shouldIncludeObjectType = [4, 9].includes(selectedPage); // Adjust indices for specific detections
  
    const filters = {
      startDateTime,
      endDateTime,
      ...(shouldIncludeObjectType && resolvedObjectType ? { objectType: resolvedObjectType } : {}), // Conditionally add objectType
    };
  
    console.log("Filters sent to API:", filters);
  
    setSearching(true);
    fetchData(selectedPage, filters);
  };
  
  const fetchData = async (index, filters = {}) => {
    setLoading(true);
    setError(null);
  
    const apiEndpoint = index >= 0 && index <= 11 ? apiEndpoints[index] : '';
    const searchEndpoint = searchApiEndpoints[index];
  
    // Build query parameters dynamically
    const queryParams = new URLSearchParams();
    queryParams.append("startDate", filters.startDateTime);
    queryParams.append("endDate", filters.endDateTime);
    if (filters.objectType) {
      queryParams.append("objectType", filters.objectType); // Add only if objectType is provided
    }
  
    const url = searchEndpoint && Object.keys(filters).length > 0
      ? `${searchEndpoint}?${queryParams.toString()}`
      : apiEndpoint;
  
    try {
      console.log(`Fetching data from: ${url}`);
  
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  
      const text = await response.text();
      let apiData = null;
  
      try {
        apiData = JSON.parse(text);
        console.log("API Response:", apiData);
      } catch (jsonError) {
        throw new Error(`Failed to parse response: ${text}`);
      }
  
      if (!apiData || apiData.length === 0) {
        setData([]);
        setError("No Data Available");
        return;
      }
  
      const formattedData = apiData?.map((item, index) => {
        const cameraId = item?.camera_id;
        const camera = item?.camera;
  
        const isDefault = (value) => value?.toLowerCase() === "default";
  
        const resolvedCamera = 
          isDefault(cameraId) ? camera 
          : isDefault(camera) ? cameraId 
          : cameraId || camera || `Camera ${index + 1}`;
  
        return {
          image: item?.photo || item?.imagedata || 'N/A',
          detection_type: item?.detection_type || item?.name || 'N/A',
          camera_id: resolvedCamera,
          date: item?.date || 'Unknown Date',
          time: item?.time || 'Unknown Time',
        };
      });
  
      setData(formattedData);
  
    } catch (err) {
      console.error("API Error:", err);
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };
  
  useEffect(() => {
    const selectedIndex = parseInt(localStorage.getItem('selectedIndex')) || 0; 
    setSelectedPage(selectedIndex);
    fetchData(selectedIndex); 
  }, [location.pathname]);

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setDate((prevDate) => ({ ...prevDate, [id]: value }));
  };

  const handleObjectChange = (event) => {
    setObjectName(event.target.value);

    if (selectedLabel) {
      localStorage.setItem(selectedLabel, event.target.value);
    }

    // localStorage.setItem('selectedObject', event.target.value);
  };

return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sx={{ position: 'sticky', top: 0, height: '100vh', backgroundColor: '#fff' }}>
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
              {dropdownOptions.length === 1 && dropdownOptions[0] === 'No options available' ? (
                <MenuItem disabled>{dropdownOptions[0]}</MenuItem>
              ) : (
                dropdownOptions.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              )}
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
            error={!date.startDate && submitted}
            helperText={!date.startDate && submitted ? "Start Date is required" : ""}
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
            error={!date.startTime && submitted}
            helperText={!date.startTime && submitted ? "Start Time is required" : ""}
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
            error={!date.endDate && submitted}
            helperText={!date.endDate && submitted ? "End Date is required" : ""}
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
            error={!date.endTime && submitted}
            helperText={!date.endTime && submitted ? "End Time is required" : ""}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchSvg />}
            sx={{ mt: 2 }}
            onClick={handleSearch}
            fullWidth
            disabled={searching}
          >
            Search
          </Button>
        </Card>
      </Grid>

      <Grid item xs={12} md={9}>
        <Card sx={{ padding: 3 }}>
          <Grid container id="cardContainer" spacing={3}>
            {loading || searching ? (
              <Grid item xs={12} container justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : error ? (
              <Grid item xs={12}>
                <div>{error}</div>
              </Grid>
            ) : data?.length > 0 ? (
              data?.map((record, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <AnalyticsCard key={index} record={record} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <div>No results found</div>
              </Grid>
            )}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsSidebar;
