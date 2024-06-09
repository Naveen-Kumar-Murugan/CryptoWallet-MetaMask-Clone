import React, { createContext, useContext, useState,useMemo,useEffect } from 'react';

const NetworkContext = createContext();

// Custom hook to use the NetworkContext
export const useNetwork = () => {
    return useContext(NetworkContext);
};

export const NetworkProvider = ({ children }) => {
    const [network, setNetwork] = useState(() => {
        // Get initial state from localStorage or set default
        const savedState = localStorage.getItem('network');
        return savedState ? JSON.parse(savedState) : { network : 'mainnet'};
      });

    useEffect(() => {
        localStorage.setItem('network', JSON.stringify(network));
    }, [network]);

    return (
      <NetworkContext.Provider value={{ network, setNetwork }}>
        {children}
      </NetworkContext.Provider>
    );
  };
    // const [network, setNetwork] = useState('');
  
    // return (
    //   <NetworkContext.Provider value={{ network, setNetwork }}>
    //     {children}
    //   </NetworkContext.Provider>
    // );
  //};