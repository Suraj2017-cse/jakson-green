// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import EmployeeCard from 'components/main/EmployeeCard';
// import { CloseSvg, CrowdSvg } from 'assets/images/Expand';
// import DynamicTable from 'components/main/DynamicTable';
// import { Box } from '@mui/system';
// import Identification from 'components/main/Identification';
// import DownloadReport from 'components/main/DownloadReport';

// const Main = () => {
//   const [open, setOpen] = useState(false); // State to control modal open/close

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const sampleData = [
//     {
//       sNo: 1,
//       photo: '/images/photo1.jpg',
//       name: 'John Doe',
//       userId: 'JD123',
//       gender: 'Male',
//     },
//     {
//       sNo: 2,
//       photo: '/images/photo2.jpg',
//       name: 'Jane Smith',
//       userId: 'JS456',
//       gender: 'Female',
//     },
//     {
//       sNo: 3,
//       photo: '/images/photo3.jpg',
//       name: 'Alice Johnson',
//       userId: 'AJ789',
//       gender: 'Female',
//     },
//   ];

//   const Data = [
//     { userId: '123', name: 'John Doe', camera: 'Cam 1', time: '10:00 AM' },
//     { userId: '456', name: 'Jane Smith', camera: 'Cam 2', time: '11:30 AM' },
//   ];

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6} md={4} onClick={handleOpen}>
//               <EmployeeCard title="Employees" count={103} backgroundColor="#1688c9" icon={<CrowdSvg />} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <EmployeeCard title="Present" count={15} backgroundColor="#5cb85c" />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <EmployeeCard title="Absent" count={15} backgroundColor="#ff0000" />
//             </Grid>
//           </Grid>
//           <Box sx={{ marginTop: '30px' }}>
//             <Typography variant="h4" gutterBottom>
//               Facial Recognition & Analytics
//             </Typography>
//             <DynamicTable data={sampleData} />
//           </Box>
//           <Grid container spacing={3} sx={{ marginTop: '30px' }}>
//             <Grid item xs={12} sm={12} md={6}>
//               <Card sx={{ maxWidth: '100%', height: '100%', textAlign: 'center', padding: 1, backgroundColor: 'white' }}>
//                 <CardContent sx={{ textAlign: 'left' }}>
//                   <Typography variant="h4" gutterBottom>
//                     Facial Recognition & Analytics
//                   </Typography>
//                   <Identification data={Data} />
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={12} md={6}>
//               <Card sx={{ maxWidth: '100%', textAlign: 'center', padding: 1, backgroundColor: 'white' }}>
//                 <CardContent sx={{ textAlign: 'left' }}>
//                   <Typography variant="h4" gutterBottom>
//                     Download Reports
//                   </Typography>
//                   <DownloadReport />
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Modal for displaying employee list */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//         <DialogTitle sx={{ fontSize: '20px', paddingBottom: '0px' }}>All Registered Employees List</DialogTitle>
//         <Box onClick={handleClose} sx={{ position: 'absolute', right: '10px', top: '10px' }}>
//           <CloseSvg width="20px" height="20px" />
//         </Box>
//         <DialogContent>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Serial No</TableCell>
//                 <TableCell>Photo</TableCell>
//                 <TableCell>User ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Gender</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {sampleData.map(employee => (
//                 <TableRow key={employee.sNo}>
//                   <TableCell>{employee.sNo}</TableCell>
//                   <TableCell>
//                     <img src={employee.photo} alt={employee.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//                   </TableCell>
//                   <TableCell>{employee.userId}</TableCell>
//                   <TableCell>{employee.name}</TableCell>
//                   <TableCell>{employee.gender}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default Main;


import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import EmployeeCard from 'components/main/EmployeeCard';
import { CloseSvg, CrowdSvg } from 'assets/images/Expand';
import DynamicTable from 'components/main/DynamicTable';
import { Box } from '@mui/system';
import Identification from 'components/main/Identification';
import DownloadReport from 'components/main/DownloadReport';
import axios from 'axios';

const Main = () => {
  const [open, setOpen] = useState(false); // State to control modal open/close
  const [employeeData, setEmployeeData] = useState({ total: 0, present: 0, absent: 0 });
  const [sampleData, setSampleData] = useState([]); // State for sample data
  const [modalEmployeeData, setModalEmployeeData] = useState([]); // State for employee data in modal

  const handleOpen = () => {
    setOpen(true);
    fetchEmployeeDataForModal(); // Fetch data when modal opens
  };

  const handleClose = () => setOpen(false);

  // Function to fetch employee data for the modal with the new API
  const fetchEmployeeDataForModal = async () => {
    try {
      const response = await axios.get('https://jakson-cairo.online:8094/api/Employee/GetAllUserInfoData');
      setModalEmployeeData(response.data); // Update modal data state with the fetched data
    } catch (error) {
      console.error('Error fetching employee data for modal:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching employee data for other sections
        const employeeResponse = await axios.get('https://jakson-cairo.online:8094/api/Employee/GetUserInfoData');
        const totalEmployees = employeeResponse.data.length;

        // Fetching recognition data
        const presentResponse = await axios.get('https://jakson-cairo.online:8094/api/Employee/GetReportRecog');

        // Convert base64 images to JPEG URLs
        const convertBase64ToJpeg = (base64String) => {
          const byteCharacters = atob(base64String);
          const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          return URL.createObjectURL(blob);
        };

        // Updating `sampleData` based on response
        const updatedSampleData = presentResponse.data.map((item, index) => ({
          sNo: index + 1, // Serial number
          photo: item.photo ? convertBase64ToJpeg(item.photo) : '/images/default.jpg', // Convert base64 to JPEG or use default photo
          name: item.empName || 'N/A', // Employee name
          userId: item.userID || 'N/A',
          timeIn: item.timeIn || 'N/A',
          timeOut: item.timeOut || 'N/A',
          duration: item.duration || '--',
          date: item.recDateTime || 'N/A',
          frequency: item.frequency || 'N/A',
          gender: 'N/A', // Gender not provided in response
          cameraName: item.cameraName || 'N/A', // Camera Name from API
        }));

        // Counting unique employees recognized
        const uniquePresentUsers = presentResponse.data.filter((item, index, self) =>
          index === self.findIndex(t => t.empName === item.empName)
        );
        const presentCount = uniquePresentUsers.length;
        const absentCount = totalEmployees - presentCount;

        // Updating state
        setEmployeeData({ total: totalEmployees, present: presentCount, absent: absentCount });
        setSampleData(updatedSampleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Map gender from mGender ("0" -> "Male", "1" -> "Female")
  const mapGender = (gender) => {
    return gender === '0' ? 'Male' : gender === '1' ? 'Female' : 'N/A';
  };

  // Convert the base64 photo from the new API to JPEG
  const convertBase64ToJpeg = (base64String) => {
    if (!base64String) return '/images/default.jpg'; // Return default if no photo

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} onClick={handleOpen}>
              <EmployeeCard
                title="Employees"
                count={employeeData.total}
                backgroundColor="#1688c9"
                icon={<CrowdSvg />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeCard
                title="Present"
                count={employeeData.present}
                backgroundColor="#5cb85c"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeCard
                title="Absent"
                count={employeeData.absent}
                backgroundColor="#ff0000"
              />
            </Grid>
          </Grid>

          <Box sx={{ marginTop: '30px' }}>
            <Typography variant="h4" gutterBottom>
              Facial Recognition & Analytics
            </Typography>
            <DynamicTable data={sampleData} />
          </Box>

          <Grid container spacing={3} sx={{ marginTop: '30px' }}>
            <Grid item xs={12} sm={12} md={6}>
              <Card sx={{ maxWidth: '100%', height: '100%', textAlign: 'center', padding: 1, backgroundColor: 'white' }}>
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography variant="h4" gutterBottom>
                    Identification
                  </Typography>
                  <Identification data={sampleData} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Card sx={{ maxWidth: '100%', textAlign: 'center', padding: 1, backgroundColor: 'white' }}>
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography variant="h4" gutterBottom>
                    Download Reports
                  </Typography>
                  <DownloadReport />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Modal for displaying employee list */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontSize: '20px', paddingBottom: '0px' }}>All Registered Employees List</DialogTitle>
        <Box onClick={handleClose} sx={{ position: 'absolute', right: '10px', top: '10px' }}>
          <CloseSvg width="20px" height="20px" />
        </Box>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial No</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modalEmployeeData.map((employee, index) => (
                <TableRow key={employee.userID}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {/* Convert base64 to JPEG for the modal photo */}
                    <img
                      src={employee.webPhoto ? convertBase64ToJpeg(employee.webPhoto) : '/images/default.jpg'}
                      alt={employee.mName}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell>{employee.userID}</TableCell>
                  <TableCell>{employee.mName}</TableCell>
                  <TableCell>{mapGender(employee.mGender)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Main;
