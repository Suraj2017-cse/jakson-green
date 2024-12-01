import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu, Logout, BoxSearch, Profile2User, SmartCar, Car, Location, Crown } from 'iconsax-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Face Recognition Solution', icon: <Profile2User variant="Bulk" size={18} />, url: '/ayana/main', index: 0 },
  { label: 'ANPR Solution', icon: <SmartCar variant="Bulk" size={18} />, url: '/analytics/details', index: 1 },
  { label: 'Vehicle Entry-Exit Analysis', icon: <Car variant="Bulk" size={18} />, url: '/analytics/details', index: 3 },
  { label: 'Fire & Smoke', icon: <Menu variant="Bulk" size={18} />, url: '/analytics/details', index: 4 },
  { label: 'Intrusion Detection', icon: <BoxSearch variant="Bulk" size={18} />, url: '/analytics/details', index: 5 },
  { label: 'Human Fall', icon: <Menu variant="Bulk" size={18} />, url: '/analytics/details', index: 6 },
  { label: 'Vegetation Detection', icon: <Menu variant="Bulk" size={18} />, url: '/analytics/details', index: 7 },
  { label: 'Crowd Detection', icon: <Crown variant="Bulk" size={18} />, url: '/analytics/details', index: 8 },
  { label: 'Animal & Human Detection', icon: <Menu variant="Bulk" size={18} />, url: '/analytics/details', index: 9 },
  { label: 'Vehicle mapping', icon: <Location variant="Bulk" size={18} />, url: '/analytics/details', index: 10 },
  { label: 'Escalation Matrix', icon: <Location variant="Bulk" size={18} />, url: '/analytics/escalation-matrix', index: 10 },
  { label: 'Logout', icon: <Logout variant="Bulk" size={18} />, url: '/logout', index: 11 },
];

const SideNav = () => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    // Check if there's a saved index in localStorage and set it
    const savedIndex = localStorage.getItem('selectedIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0; // Default to index 0 if none is saved
  });
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location from React Router

  // Update the selectedIndex based on the current URL
  useEffect(() => {
    // Find the menu item that matches the current URL
    const currentItem = menuItems.find(item => item?.url === location?.pathname);
    if (currentItem) {
      setSelectedIndex(currentItem.index);
    }
  }, [location.pathname]); // This will trigger every time the location changes (on navigation)

  
  const handleListItemClick = (event, index, url) => {
    // Set the selectedIndex and save it to localStorage
    setSelectedIndex(index);
    localStorage.setItem('selectedIndex', index); // Save the index to localStorage
    navigate(url); 
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      {menuItems.map(item => (
        <ListItemButton
          key={item.index}
          selected={selectedIndex === item.index}
          onClick={event => handleListItemClick(event, item.index, item.url)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default SideNav;