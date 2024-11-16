import { Grid } from '@mui/material';
import AnalyticsSaidBar from 'components/analytics/AnalyticsSaidBar';
import React from 'react';

const Analytics = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <AnalyticsSaidBar />
        </Grid>
      </Grid>
    </>
  );
};

export default Analytics;
