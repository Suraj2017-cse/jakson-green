import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CrowdSvg } from 'assets/images/Expand';
import styles from './main.module.css';

const EmployeeCard = ({ title = 'Employee', count = 103, backgroundColor = '#1688c9', icon = <CrowdSvg /> }) => {
  return (
    <Card className={styles.EmployeeCard} sx={{ maxWidth: '100%', textAlign: 'center', padding:1, backgroundColor }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, textAlign: 'left', color: '#fff' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 1,
            borderRadius: '50%',
            backgroundColor: '#ffffff4f',
            height: '75px',
            width: '75px',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="h2">{count}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
