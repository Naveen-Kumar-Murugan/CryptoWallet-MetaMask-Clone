import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TransactionService } from '../services/transactionservice';
import { useNetwork } from '../utils/networkcontext';
import { useAddress } from '../utils/addresscontext';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const {network,setNetwork} = useNetwork();
    const { address } = useAddress();
    // const [address,setAdress] = useState(temp.address);
    console.log(address);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        TransactionService.getTransactions(address,network).then(response => {
            setTransactions(response.data.result);
            console.log(response.data.result);
        }).catch(error => {
            console.log("This is transaction return error ",{error})
        })
        .finally(() => {
            setLoading(false);
        });
    },[network])
    return (
        <div>
        <h2>Transaction History</h2>
        {/* {loading && <p>Loading...</p>} */}
        {error && <p>{error}</p>}
        <ul>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <li key={tx.hash}>
              <p>Hash: {tx.hash}</p>
              <p>From: {tx.from_address}</p>
              <p>To: {tx.to_address}</p>
              <p>Value: {ethers.formatEther(tx.value)} ETH</p>
              <p>Block Number: {tx.block_number}</p>
              <p><a href={`https://${network}.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">View on Explorer</a></p>
            </li>
          ))
        ) : (
          !loading ? <p>No transactions found.</p> : <p>Loading...</p>
        )}
        </ul>
        </div>
    );
};

export default TransactionHistory;
