import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Grid } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const DownloadReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);

  // Function to convert base64 string to Blob
  const base64ToBlob = (base64Str) => {
    const byteCharacters = atob(base64Str.split(',')[1]); // Remove data:image/png;base64,
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'image/jpeg' }); // Convert to JPEG
  };

  // Function to fetch report data from the API
  const fetchReportData = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    setLoading(true);

    const URL = `https://jakson-cairo.online:8094/api/Employee/GetReportByFilter?filterType=NoExit&startdate=${startDate}&enddate=${endDate}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

      const updatedData = data.map((item, index) => ({
        sNo: index + 1,
        photo: `data:image/png;base64,${item.photo}`, // Base64 image
        empName: item.empName,
        userID: item.userID,
        timeIn: item.timeIn,
        timeOut: item.timeOut,
        duration: item.duration,
        recDateTime: item.recDateTime.substring(0, 10), // Extract date only
        empType: item.empType,
      }));

      setReportData(updatedData); // Store the report data in state
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Some error occurred while fetching the report data.');
    } finally {
      setLoading(false);
    }
  };

  // Function to generate PDF and trigger download
  const handleDownload = () => {
    fetchReportData().then(() => {
      if (reportData.length > 0) {
        const doc = new jsPDF();
        
        // Set document title
        doc.setFontSize(18);
        doc.text('Employee Report', 20, 20);

        // Table headers
        const headers = ['S.No', 'Photo', 'Name', 'User ID', 'In-Time', 'Out-Time', 'Duration', 'Date', 'Emp Type'];

        // Adding Table data
        const body = reportData.map((item) => [
          item.sNo,
          item.photo, // This will need to be handled for images
          item.empName,
          item.userID,
          item.timeIn,
          item.timeOut,
          item.duration,
          item.recDateTime,
          item.empType,
        ]);

        // Adding the table using autoTable plugin
        let yOffset = 30;
        doc.autoTable({
          head: [headers],
          body: body,
          startY: yOffset,
          theme: 'grid',
          columnStyles: {
            1: { cellWidth: 30, cellHeight: 30 }, // Photo column
          },
          bodyStyles: {
            valign: 'middle',
            halign: 'center',
          },
        });

        // Add image to PDF: Convert the base64 image to a Blob and add it
        reportData.forEach((item, index) => {
          const blob = base64ToBlob(item.photo); // Convert base64 to Blob (JPEG)
          const img = URL.createObjectURL(blob); // Create a URL for the image blob
          const x = 20;
          const y = yOffset + 10 + (index + 1) * 20; // Position each image

          // Add image to PDF (this could be done within the table but we're doing it separately)
          doc.addImage(img, 'JPEG', x, y, 30, 30); // Add image at position x, y
        });

        // Save the generated PDF
        doc.save('employee_report.pdf');
      } else {
        alert('No data to generate report');
      }
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
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
    </div>
  );
};

export default DownloadReport;
