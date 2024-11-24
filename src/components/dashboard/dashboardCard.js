import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { Absent, Crowd, Employee, Fire, Grass, Intrusion, Present, Smoke, Vehicle } from 'assets/images';   
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';

const DynamicCard = () => {
  const [cardData, setCardData] = useState([
    { primary: 'Employee', secondary: 'Loading...', iconPrimary: Employee, color: '#1688c9', route: '/ayana/main', index: 0 },
    { primary: 'Present', secondary: 'Loading...', iconPrimary: Present, color: '#3dbf83', route: '/ayana/main', index: 0 },
    { primary: 'Absent', secondary: 'Loading...', iconPrimary: Absent, color: '#ed3237', route: '/ayana/main', index: 0 },
    { primary: 'Fire', secondary: 'Loading...', iconPrimary: Fire, color: '#2d969b', route: '/analytics/details', index: 4  },
    { primary: 'Smoke', secondary: 'Loading...', iconPrimary: Smoke, color: '#a5236e', route: '/analytics/details', index : 4 },
    { primary: 'Grass', secondary: 'Loading...', iconPrimary: Grass, color: '#e1007d', route: '/analytics/details', index : 7 },
    { primary: 'Intrusion', secondary: 'Loading...', iconPrimary: Intrusion, color: '#f06937', route: '/analytics/details', index: 5 },
    { primary: 'Crowd', secondary: 'Loading...', iconPrimary: Crowd, color: '#3c5a82', route: '/analytics/details', index: 8 },
    { primary: 'Vehicle', secondary: 'Loading...', iconPrimary: Vehicle, color: '#E1007D', route: '/analytics/details', index: 1 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data (same as your current implementation)
        const employeeResponse = await axios.get('https://jakson-cairo.online:8094/api/Employee/GetUserInfoData');
        const totalEmployees = employeeResponse.data.length;

        const presentResponse = await axios.get('https://jakson-cairo.online:8094/api/Employee/GetReportRecog');
        const uniquePresentUsers = presentResponse.data.reduce((uniqueUsers, item) => {
          if (!uniqueUsers.some(user => user.UserID === item.userID)) {
            uniqueUsers.push({ UserID: item.userID, Time: item.recDateTime.substring(10, 19) });
          }
          return uniqueUsers;
        }, []);
        const presentCount = uniquePresentUsers.length;
        const absentCount = totalEmployees - presentCount;

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


  // code start by Suraj
  const [selectedIndex, setSelectedIndex] = useState(() => {
    // Check if there's a saved index in localStorage and set it
    const savedIndex = localStorage.getItem('selectedIndex');
    console.log(savedIndex);
    
    return savedIndex ? parseInt(savedIndex, 10) : 0; // Default to index 0 if none is saved
  });
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location from React Router

  // Update the selectedIndex based on the current URL
  useEffect(() => {
    // Find the menu item that matches the current URL
    const currentItem = cardData.find(item => item?.url === location?.pathname);
    if (currentItem) {
      setSelectedIndex(currentItem.index);
    }
    console.log(currentItem);
    
  }, [location.pathname]); // This will trigger every time the location changes (on navigation)

  
  const handleListItemClick = (event, index, url) => {
    // Set the selectedIndex and save it to localStorage
    setSelectedIndex(index);
    localStorage.setItem('selectedIndex', index); // Save the index to localStorage
    navigate(url); 
    // console.log(url);
    
  };
  // code end by Suraj

  return (
    <Grid container spacing={3}>
      {cardData.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2.4} key={index}>
          {/* Wrap each card with Link */}
          <Link to={item.route}
          key={item.index}
          selected={selectedIndex === item.index}
          onClick={event => handleListItemClick(event, item.index, item.url)}
           style={{textDecoration: 'none'}}>
            <HoverSocialCard
              primary={item.primary}
              secondary={item.secondary}
              iconPrimary={item.iconPrimary}
              color={item.color}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicCard;
