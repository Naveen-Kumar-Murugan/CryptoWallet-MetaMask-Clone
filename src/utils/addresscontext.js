import React, { createContext, useContext, useState,useMemo,useEffect } from 'react';

const AddressContext = createContext();

// Custom hook to use the NetworkContext
export const useAddress = () => {
    return useContext(AddressContext);
};

export const AddressProvider = ({ children }) => {
    const [address, setAddress] = useState(() => {
        // Get initial state from localStorage or set default
        const savedState = localStorage.getItem('address');
        return savedState ? JSON.parse(savedState) : { address : '0x6fB3EeaC8331Af8f01f28d6cab3DD51355F4d608'};
      });

    useEffect(() => {
        localStorage.setItem('address', JSON.stringify(address));
    }, [address]);

    return (
      <AddressContext.Provider value={{ address, setAddress }}>
        {children}
      </AddressContext.Provider>
    );
  };