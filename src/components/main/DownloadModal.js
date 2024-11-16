import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';

const DownloadModal = () => {
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [objectName, setObjectName] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleDownload = () => {
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
      date.endTime || 'undefined'
    }</span></p>
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
              <tr>
                <td>1</td>
                <td>Default</td>
                <td>Service_cam</td>
                <td>uncleaned</td>
                <td>05/11/2024</td>
                <td>N/A</td>
                <td><img src="https://via.placeholder.com/100" alt="Sample" width="50" height="50" /></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Default</td>
                <td>Service_cam</td>
                <td>uncleaned</td>
                <td>05/11/2024</td>
                <td>N/A</td>
                <td><img src="https://via.placeholder.com/100" alt="Sample" width="50" height="50" /></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Default</td>
                <td>Service_cam</td>
                <td>uncleaned</td>
                <td>05/11/2024</td>
                <td>N/A</td>
                <td><img src="https://via.placeholder.com/100" alt="Sample" width="50" height="50" /></td>
              </tr>
              
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
      setLoading(false);
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
            {loading ? (
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
