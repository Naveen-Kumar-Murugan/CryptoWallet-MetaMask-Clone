import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AddressDropdown from './dropdown';
import { collection,getDocs,query } from "firebase/firestore";
import { db } from "../congif";
import {auth} from "../congif";
import { useNetwork } from "../utils/networkcontext";
import { networks } from '../utils/networks';

const FetchBalance = () => {
    const { network, setNetwork } = useNetwork()
    const [selectedAddress, setSelectedAddress] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    const [identity,setidentity] = useState([])

    const uid = auth.currentUser.uid;
    const val = collection(db, "Users", uid, "wallet accounts");
    const getVal = query(val);

    useEffect(()=> {
        const getDetails = async (e) =>{
        const getValue = await getDocs(getVal);
            // console.log(getValue);
            getValue.forEach((doc) => {
                const data = doc.data();
                setidentity(identity => [
                    ...identity,data.address
                ]);
                // const last = identity.length;
                // console.log(identity[last-1]);
                // console.log(data);
            });
        }
        getDetails();
    },[]);
    

    useEffect(() => {
        const fetchBalance = async () => {
            if (!ethers.isAddress(selectedAddress)) {
                setError('Invalid address');
                setBalance(null);
                return;
            }

            try {
                setError('');
                //ethers.getDefaultProvider();
                const provider = new ethers.JsonRpcProvider(networks[network].rpcUrl);
                const balance = await provider.getBalance(selectedAddress);
                const balanceInEth = ethers.formatEther(balance);
                setBalance(balanceInEth);
            } catch (err) {
                setError('Failed to fetch balance');
                setBalance(null);
            }
        };

        if (selectedAddress) {
            fetchBalance();
        }
    }, [selectedAddress,network]);

    return (
        <div>
            <h1>Fetch Ethereum Balance</h1>
            <AddressDropdown
                addresses={identity}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {balance && (
                <p>
                    Balance: {balance} ETH
                </p>
            )}
        </div>
    );
};

export default FetchBalance;