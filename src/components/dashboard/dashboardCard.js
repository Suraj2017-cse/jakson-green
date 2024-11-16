

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { Absent, Crowd, Employee, Fire, Grass, Intrusion, Present, Smoke, Vehicle } from 'assets/images';   
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';

const DynamicCard = () => {
  const [cardData, setCardData] = useState([
    { primary: 'Employee', secondary: 'Loading...', iconPrimary: Employee, color: '#1688c9' },
    { primary: 'Present', secondary: 'Loading...', iconPrimary: Present, color: '#3dbf83' },
    { primary: 'Absent', secondary: 'Loading...', iconPrimary: Absent, color: '#ed3237' },
    { primary: 'Fire', secondary: 'Loading...', iconPrimary: Fire, color: '#2d969b' },
    { primary: 'Smoke', secondary: 'Loading...', iconPrimary: Smoke, color: '#a5236e' },
    { primary: 'Grass', secondary: 'Loading...', iconPrimary: Grass, color: '#e1007d' },
    { primary: 'Intrusion', secondary: 'Loading...', iconPrimary: Intrusion, color: '#f06937' },
    { primary: 'Crowd', secondary: 'Loading...', iconPrimary: Crowd, color: '#3c5a82' },
    { primary: 'Vehicle', secondary: 'Loading...', iconPrimary: Vehicle, color: '#E1007D' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First API call for total employees
        const employeeResponse = await axios.get('https://jakson-cairo.online:8094/api/Employee/GetUserInfoData');
        const totalEmployees = employeeResponse.data.length;

        // Second API call for present employees
        const presentResponse = await axios.get('https://jakson-cairo.online:8094/api/Employee/GetReportRecog');
        const uniquePresentUsers = presentResponse.data.reduce((uniqueUsers, item) => {
          if (!uniqueUsers.some(user => user.UserID === item.userID)) {
            uniqueUsers.push({ UserID: item.userID, Time: item.recDateTime.substring(10, 19) });
          }
          return uniqueUsers;
        }, []);
        
        const presentCount = uniquePresentUsers.length;
        const absentCount = totalEmployees - presentCount;

        // Third API call for various module counts
        // const currentDate = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
        const today = new Date();
        const currentDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
        const moduleCountResponse = await axios.get(`https://jakson-cairo.online:8094/api/DashboardSelectedOnDate/NewSiteModuleCount?todaydate=${currentDate}`);
        const moduleData = moduleCountResponse.data[0];
        
        const { lpr, fire_record: fireRecord, smoke_record: smokeRecord, crowd_record: crowdRecord, overgrass_record: overgrassRecord, detection_data: detectionData } = moduleData;

        // Update card data with values from all APIs
        setCardData(prevData =>
          prevData.map(item => {
            switch (item.primary) {
              case 'Employee':
                return { ...item, secondary: totalEmployees };
              case 'Present':
                return { ...item, secondary: presentCount };
              case 'Absent':
                return { ...item, secondary: absentCount };
              case 'Fire':
                return { ...item, secondary: fireRecord };
              case 'Smoke':
                return { ...item, secondary: smokeRecord };
              case 'Grass':
                return { ...item, secondary: overgrassRecord };
              case 'Intrusion':
                return { ...item, secondary: detectionData };
              case 'Crowd':
                return { ...item, secondary: crowdRecord };
              case 'Vehicle':
                return { ...item, secondary: lpr };
              default:
                return item;
            }
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {cardData.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2.4} key={index}>
          <HoverSocialCard
            primary={item.primary}
            secondary={item.secondary}
            iconPrimary={item.iconPrimary}
            color={item.color}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicCard;

