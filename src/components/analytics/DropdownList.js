import { useState, useEffect } from 'react';

// Configuration mapping labels to dropdown options
const dropdownOptionsMap = {
  'Fire & Smoke': ['Fire', 'Smoke', 'All'],
  'Vegetation Detection': ['Grass', 'Big Grass', 'Tree'],
  'Animal & Human Detection': ['Animal', 'Human', 'All'],
  'ANPR Solution': ['Option 1', 'Option 2', 'All'], // Add specific options if required
};

const useDropdownOptions = () => {
  const [dropdownOptions, setDropdownOptions] = useState(['No options available']);

  useEffect(() => {
    const savedLabel = localStorage.getItem('selectedLabel');
    const savedValue = localStorage.getItem('selectedValue');

    // Use the map to get options, or default to the saved value or fallback
    const options = dropdownOptionsMap[savedLabel] || [savedValue || 'No options available'];
    setDropdownOptions(options);
  }, []);

  return dropdownOptions;
};

export default useDropdownOptions;
