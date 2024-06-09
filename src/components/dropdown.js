import React, { useState, useEffect } from 'react';

const AddressDropdown = ({ addresses, selectedAddress, onSelectAddress }) => {
  const [dropdownValue, setDropdownValue] = useState(() => {
    // Initialize dropdown value from local storage or selectedAddress prop
    const savedState = localStorage.getItem('selectedAddress');
    return savedState ? savedState : { selectedAddress : '' };
  });

  // Update local storage and dropdown value when selectedAddress changes
  useEffect(() => {
    localStorage.setItem('selectedAddress', selectedAddress);
    setDropdownValue(selectedAddress);
  }, [selectedAddress]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setDropdownValue(newValue);
    onSelectAddress(newValue);
  };

  return (
    <div>
      <label htmlFor="address-dropdown">Select Address:</label>
      <select
        id="address-dropdown"
        value={dropdownValue}
        onChange={handleChange}
      >
        {addresses.map((address) => (
          <option key={address} value={address}>
            {address}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressDropdown;
