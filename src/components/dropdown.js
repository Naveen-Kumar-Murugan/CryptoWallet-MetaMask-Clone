import React from 'react';

const AddressDropdown = ({ addresses, selectedAddress, onSelectAddress }) => {
    return (
        <div>
            <label htmlFor="address-dropdown">Select Address:</label>
            <select
                id="address-dropdown"
                value={selectedAddress}
                onChange={(e) => onSelectAddress(e.target.value)}
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
