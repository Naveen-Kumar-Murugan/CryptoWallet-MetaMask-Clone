import React, { useState, useEffect } from 'react';
import { Dropdown } from "flowbite-react";

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
      {/* <label htmlFor="address-dropdown">Select Address:</label> */}
      <select
        id="address-dropdown"
        value={dropdownValue}
        className="block w-full text-base text-white hover:cursor-pointer bg-cyan-600 hover:bg-cyan-800 border-white border-2 rounded-2xl focus:border-0 shadow-sm text-ellipsis stroke-current"
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
