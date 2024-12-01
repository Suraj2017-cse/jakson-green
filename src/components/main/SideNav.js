import { List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Menu, Logout, BoxSearch, Profile2User, SmartCar, Location, Crown } from 'iconsax-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Face Recognition Solution', icon: <Profile2User variant="Bulk" size={18} />, url: '/app/main', index: 0 },
  { label: 'ANPR Solution', icon: <SmartCar variant="Bulk" size={18} />, url: '/analytics/details', index: 1 },
  // { label: 'Vehicle Entry-Exit Analysis', icon: <Car variant="Bulk" size={18} />, url: '/analytics/details', index: 3 },
  { label: 'Fire & Smoke', icon: <Menu variant="Bulk" size={18} />, url: '/analytics/details', index: 4 },
  { label: 'Intrusion Detection', icon: <BoxSearch variant="Bulk" size={18} />, url: '/analytics/details', index: 5 },
  { label: 'Human Fall', icon: <Menu variant="Bulk" size={18} />, url: '/analytics/details', index: 6 },
  { label: 'Vegetation Detection', icon: <Menu variant="Bulk" size={18} />, url: '/analytics/details', index: 7 },
  { label: 'Crowd Detection', icon: <Crown variant="Bulk" size={18} />, url: '/analytics/details', index: 8 },
  { label: 'Animal & Human Detection', icon: <Menu variant="Bulk" size={18} />, url: '/analytics/details', index: 9 },
  // { label: 'Vehicle mapping', icon: <Location variant="Bulk" size={18} />, url: '/analytics/details', index: 10 },
  { label: 'Escalation Matrix', icon: <Location variant="Bulk" size={18} />, url: '/analytics/escalation-matrix', index: 10 },
  { label: 'Other Detection', icon: <Location variant="Bulk" size={18} />, url: '/analytics/details', index: 11 },
  { label: 'Logout', icon: <Logout variant="Bulk" size={18} />, url: '/logout', index: 12 },
];

const SideNav = () => {
  // Initialize selectedIndex with the value from localStorage
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const savedIndex = localStorage.getItem('selectedIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0; // Default to index 0 if none is saved
  });

  // Initialize selectedOption with values from localStorage
  const [selectedOption, setSelectedOption] = useState({
    'Fire & Smoke': localStorage.getItem('FireAndSmoke') || '',
    'Vegetation Detection': localStorage.getItem('VegetationDetection') || '',
    'Animal & Human Detection': localStorage.getItem('AnimalHumanDetection') || ''
  });
  

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location from React Router

  // Update the selectedIndex based on the current URL
  useEffect(() => {
    const currentItem = menuItems.find(item => item?.url === location?.pathname);
    if (currentItem) {
      setSelectedIndex(currentItem.index);
    }
  }, [location.pathname]);

  // Handle List Item click to navigate and save selectedIndex to localStorage
  const handleListItemClick = (event, index, url, label) => {
    // Set the selectedIndex and save it to localStorage
    setSelectedIndex(index);
    localStorage.setItem('selectedIndex', index); // Save index to localStorage

    // Save the label to localStorage (optional, for reference)
    localStorage.setItem('selectedLabel', label);

    // Navigate to the URL
    navigate(url);
  };

  // Handle dropdown selection change and save to localStorage
  const handleDropdownChange = (label, event) => {
    const value = event.target.value;
    setSelectedOption(prev => {
      const updatedOption = { ...prev, [label]: value };
      // Save the new selection to localStorage
      localStorage.setItem(label, value);
      return updatedOption;
    });
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      {menuItems.map(item => (
        <React.Fragment key={item.index}>
          <ListItemButton
            selected={selectedIndex === item.index}
            onClick={event => handleListItemClick(event, item.index, item.url, item.label)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>

          {/* Dropdowns for "Fire & Smoke", "Vegetation Detection", and "Animal & Human Detection" */}
          {item.hasDropdown && (
            <FormControl fullWidth sx={{ paddingLeft: 4 }}>
              <InputLabel id={`${item.label}-dropdown`}>{item.label}</InputLabel>
              <Select
                labelId={`${item.label}-dropdown`}
                value={selectedOption[item.label] || ''}
                onChange={event => handleDropdownChange(item.label, event)}
                label={item.label}
              >
                {item.label === 'Fire & Smoke' && (
                  <>
                    <MenuItem value="Fire">Firecv</MenuItem>
                    <MenuItem value="Smoke">Smoke</MenuItem>
                    <MenuItem value="All">All</MenuItem>
                  </>
                )}

                {item.label === 'Vegetation Detection' && (
                  <>
                    <MenuItem value="Grass">Grass</MenuItem>
                    <MenuItem value="Big Grass">Big Grass</MenuItem>
                    <MenuItem value="Tree">Tree</MenuItem>
                  </>
                )}

                {item.label === 'Animal & Human Detection' && (
                  <>
                    <MenuItem value="Animal">Animal</MenuItem>
                    <MenuItem value="Human">Human</MenuItem>
                    <MenuItem value="All">All</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default SideNav;