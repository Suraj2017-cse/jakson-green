import React from 'react';
import DynamicCard from 'components/dashboard/dashboardCard';
import MonthlyReport from 'components/dashboard/MonthlyReport';
import { Grid } from '@mui/material';
import FireReport from 'components/dashboard/FireReport';
// import Animal from 'components/dashboard/Animal';
import CrowdChart from 'components/dashboard/CrowdChart';
import SmokeChart from 'components/dashboard/SmokeChart';
import GrassChart from 'components/dashboard/GrassChart';
import InvoiceCard from 'components/dashboard/InvoiceCard';

const Dashboard = () => {
 
  return (
    <>
      <DynamicCard />
      <Grid container spacing={3} style={{ marginTop: '30px' }}>
        <Grid item xs={12} md={4}>
          <MonthlyReport />
        </Grid>

        <Grid item xs={12} md={4}>
        <InvoiceCard />
          {/* <Animal /> */}
        </Grid>
        <Grid item xs={12} md={4}>
          <FireReport />
        </Grid>
        <Grid item xs={12} md={4}>
          <SmokeChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <GrassChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <CrowdChart />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
