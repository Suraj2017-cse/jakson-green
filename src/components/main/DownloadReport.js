import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Grid, Modal, Box } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const DownloadReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);

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
      setOpenPreview(true); // Open the preview modal
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Some error occurred while fetching the report data.');
    } finally {
      setLoading(false);
    }
  };

  // Function to generate and download the PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set document title
    doc.setFontSize(18);
    doc.text('Jakson Green - Report', 20, 20);

    // Add the date range to the PDF
    doc.setFontSize(12);
    doc.text(`From: ${startDate} To: ${endDate}`, 20, 30);

    // Table headers
    const headers = ['S.No', 'Photo', 'Name', 'User ID', 'In-Time', 'Out-Time', 'Duration', 'Date', 'Emp Type'];

    // Adding Table data
    const body = reportData.map((item) => [
      item.sNo,
      '', // We'll handle image rendering separately (leave blank for now)
      item.empName,
      item.userID,
      item.timeIn,
      item.timeOut,
      item.duration,
      item.recDateTime,
      item.empType,
    ]);

    // Adding the table using autoTable plugin
    let yOffset = 40;
    doc.autoTable({
      head: [headers],
      body: body,
      startY: yOffset,
      theme: 'grid',
      columnStyles: {
        1: { cellWidth: 30, cellHeight: 50 }, // Photo column
      },
      bodyStyles: {
        valign: 'middle',
        halign: 'center',
      },
    });

    // Add images to PDF: Convert the base64 image to a Blob and add it properly
    reportData.forEach((item, index) => {
      const base64Image = item.photo; // Base64 string (PNG format)
      const x = 20;
      const y = yOffset + 10 + (index + 1) * 20; // Position each image

      // Add the image to the PDF (specify 'PNG' format)
      doc.addImage(base64Image, 'PNG', x, y, 30, 30); // Use PNG as input format, as we have a base64 PNG string
    });

    // Trigger the PDF download
    doc.save('employee_report.pdf');

    // Close the preview modal
    setOpenPreview(false);
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
        onClick={fetchReportData}
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
            Loading...
          </>
        ) : (
          'Download Report'
        )}
      </Button>

      {/* Modal for Preview */}
      <Modal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        aria-labelledby="preview-modal-title"
        aria-describedby="preview-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
          }}
        >
          {/* Title with Date Range */}
          <h2 id="preview-modal-title" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Jakson Green - Report
          </h2>
          <p style={{ textAlign: 'center', fontSize: '16px' }}>
              From:<strong> {startDate}</strong> To:<strong> {endDate}</strong>
          </p>

          {/* Table Preview */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'green' }}>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>S.No</th>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>Photo</th>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>Name</th>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>User ID</th>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>In-Time</th>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>Out-Time</th>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>Duration</th>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>Date</th>
                <th style={{ border: '1px solid #ddd', color: '#fff', padding: '8px', textAlign: 'center' }}>Emp Type</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.sNo}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    <img src={item.photo} alt="Employee" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.empName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.userID}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.timeIn}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.timeOut}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.duration}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.recDateTime}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.empType}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Close and Save as PDF Buttons */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenPreview(false)} // Close modal
            style={{
              marginTop: '20px',
              background: '#f44336',
              color: 'white',
              padding: '10px 25px',
              borderRadius: '8px',
              marginRight: '10px',
            }}
          >
            Close
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={generatePDF}
            style={{
              marginTop: '20px',
              background: '#3f78ff',
              color: 'white',
              padding: '10px 25px',
              borderRadius: '8px',
            }}
          >
            Save as PDF
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DownloadReport;
