import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
// import { CloseSvg } from 'assets/images/Expand';

const DownloadModal = () => {

// Utility function to check if the image is a base64 string
const isBase64Image = (image) => {
  return image && image.startsWith('data:image');
};

// Format the image source for base64
const formatImageSrc = (image) => {
  return isBase64Image(image) ? image : `data:image/png;base64,${image}`;
};
  // const [date, setDate] = useState({
  //   startDate: '',
  //   endDate: '',
  //   startTime: '',
  //   endTime: '',
  // });
  // const [objectName, setObjectName] = useState('');
  // const [loading, setLoading] = useState(false);

  // suraj
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for initial data fetch
  // const [error, setError] = useState(null); // Error state
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [objectName, setObjectName] = useState(''); // State for selected object
  const [searching, setSearching] = useState(false); // State to track search action

  const [selectedPage, setSelectedPage] = useState(localStorage.getItem('selectedIndex') || 0); 
  // const location = useLocation(); // Get current URL to detect changes in selected page

  // API endpoints for dynamic fetch
  const apiEndpoints = [
    '', // Placeholder for non-searchable solutions
    'https://jakson-cairo.online:8094/api/Employee/GetAnprData',
    '',
    'https://jakson-cairo.online:8094/api/Employee/GetAnprVechileDetaildata',
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

  console.log(`DownloadModal Data: ${data}`);
  // console.log(`DownloadModal apiData: ${apiData}`);

  
  // Fetch data based on selected index
  const fetchData = async (index, filters = {}) => {
    setLoading(true);
    // setError(null); // Reset error state before new fetch
    const apiEndpoint = index >= 0 && index <= 11 ? apiEndpoints[index] : '';
    const searchEndpoint = searchApiEndpoints[index];
    console.log(searchEndpoint);
    console.log(apiEndpoint);
    
    
    
    // Determine if search API should be called
    const url = searchEndpoint && Object.keys(filters).length > 0
      ? `${searchEndpoint}?date=${filters?.date}&camera=${filters?.camera}&time=${filters?.time}&objectname=${filters?.objectname}`
      : apiEndpoint;

    try {
      // console.log(`Fetching data from: ${url}`);  // Log the URL being fetched

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
        // setError("No Data Available");
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
      // setError(`Error fetching data: ${err.message}`);
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

    // setSearching(true);  // Set searching state to true while search is in progress
    fetchData(selectedPage, filters);  // Trigger the data fetch with selected filters
  };
  // suraj

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

  // const handleDateChange = e => {
  //   const { id, value } = e.target;
  //   setDate(prevDate => ({ ...prevDate, [id]: value }));
  // };

  // const handleObjectChange = event => {
  //   setObjectName(event.target.value);
  // };



  const handleDownload = () => {
    handleSearch();
    setLoading(true);
   
     // Construct the HTML content for the report
    const content = `
      <html>
        <head>
          <title>Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { text-align: center; margin-top: 20px; }
            p span{display: block; text-align: left; margin-bottom: 15px;}
            .report-details { text-align: center; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            table, th, td { border: 1px solid black; }
            th, td { padding: 8px; text-align: center; }
            th { background-color: #009966 !important; color: white !important; }
            /* Ensure table prints in color */
            @media print {
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <h2>Jakson Green - Report</h2>
          <div class="report-details">
            <p><span>From: ${date.startDate || 'N/A'} ${date.startTime || 'undefined'}</span>  <span>To: ${date.endDate || 'N/A'} ${
    date.endTime || 'undefined'}
      </span></p>
          </div>
          <table>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Camera Location</th>
                <th>Camera</th>
                <th>Object Name</th>
                <th>Date</th>
                <th>Time Type</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
                ${data?.map((item, index) => `
                <tr key="${index}">
                  <td>${index + 1}</td>
                  <td>${item.camera_id}</td>
                  <td>${item.detection_type}</td>
                  <td>COOK</td>
                  <td>${item.date}</td>
                  <td>N/A</td>
                  <td><img src="${formatImageSrc(item?.image)}" alt="Sample" width="50" height="50" /></td>
                </tr>
              `).join('')}       
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Open a new window for printing
    const printWindow = window.open(
      '',
      '_blank',
      'titlebar=no,menubar=no,toolbar=no,scrollbars=no,resizable=yes,top=100,left=100,width=1200,height=600',
    );

    printWindow.document.write(content);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
      setLoading(true);
    };
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
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

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            style={{
              marginTop: '20px',
              background: '#3f78ff',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              padding: '10px 25px',
              borderRadius: '8px',
            }}
            disabled={loading}
          >
            {loading || searching ? (
              <>
                <CircularProgress size={24} style={{ marginRight: '10px' }} />
                Downloading...
              </>
            ) : (
              'Download Report'
            )}
          </Button>

        </Grid>
      </Grid>
    </div>
  );
};

export default DownloadModal;
