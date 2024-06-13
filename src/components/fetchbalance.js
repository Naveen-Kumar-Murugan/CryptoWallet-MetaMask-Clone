import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNetwork } from "../utils/networkcontext";
import { networks } from '../utils/networks';
import { useAddress } from '../utils/addresscontext';

const FetchBalance = () => {
    const {  network,setNetwork } = useNetwork();
    const { address,setAddress } = useAddress();
    const [balance, setBalance] = useState(0.0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchBalance = async () => {
            if (!ethers.isAddress(address)) {
                setError('Invalid address');
                setBalance(null);
                return;
            }

            try {
                setLoading(true);
                setError('');
                //ethers.getDefaultProvider();
                const provider = new ethers.JsonRpcProvider(networks[network].rpcUrl);
                const balance = await provider.getBalance(address);
                const balanceInEth = ethers.formatEther(balance);
                setBalance(balanceInEth);
            } catch (err) {
                setError('Failed to fetch balance');
                setBalance(null);
            } finally {
                setLoading(false);
            }
        };

        if (address || network) {
            fetchBalance();
        }
    }, [address,network]);

    return (
        <div className="flex items-center justify-center h-80 bg-cyan-100">
        <div className="p-6 w-72 bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="text-2xl font-bold text-cyan-600">Loading...</div>
          ) : (
            <div>
              <p className="text-4xl font-bold text-cyan-600">Balance</p>
              <p className="mt-2 text-6xl font-bold text-blue-600 overflow-auto">{balance ? balance : 0.0} ETH</p>
            </div>
          )}
        </div>
      </div>
    );
};

export default FetchBalance;