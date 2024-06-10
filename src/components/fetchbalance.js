import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNetwork } from "../utils/networkcontext";
import { networks } from '../utils/networks';
import { useAddress } from '../utils/addresscontext';

const FetchBalance = () => {
    const {  network,setNetwork } = useNetwork();
    const { address,setAddress } = useAddress();
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
        
        const fetchBalance = async () => {
            if (!ethers.isAddress(address)) {
                setError('Invalid address');
                setBalance(null);
                return;
            }

            try {
                setError('');
                //ethers.getDefaultProvider();
                const provider = new ethers.JsonRpcProvider(networks[network].rpcUrl);
                const balance = await provider.getBalance(address);
                const balanceInEth = ethers.formatEther(balance);
                setBalance(balanceInEth);
            } catch (err) {
                setError('Failed to fetch balance');
                setBalance(null);
            }
        };

        if (address) {
            fetchBalance();
        }
    }, [address,network]);

    return (
        <div>
            <h1>Fetch Ethereum Balance</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>
                    Balance: {balance} ETH
                </p>
        </div>
    );
};

export default FetchBalance;