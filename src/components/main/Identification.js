import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Identification = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e9e9e9' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>CameraAA</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.cameraName}</TableCell>
              <TableCell>{row.timeIn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Identification;
