import React, { createContext, useContext, useState } from 'react';

const NetworkContext = createContext();

// Custom hook to use the NetworkContext
export const useNetwork = () => {
    return useContext(NetworkContext);
};

export const NetworkProvider = ({ children }) => {
    const [network, setNetwork] = useState('mainnet');
  
    return (
      <NetworkContext.Provider value={{ network, setNetwork }}>
        {children}
      </NetworkContext.Provider>
    );
  };