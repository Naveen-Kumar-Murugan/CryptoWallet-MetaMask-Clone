import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TransactionService } from '../services/transactionservice';
import { useNetwork } from '../utils/networkcontext';
import { useAddress } from '../utils/addresscontext';
import TransactionCard from './TransactionCard';
import { Link } from 'react-router-dom';
import GitSvg from "../assets/github.svg";
import LinkSvg from "../assets/linkedin.svg";

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
        // <div>
        // <h2>Transaction History</h2>
        // {/* {loading && <p>Loading...</p>} */}
        // {error && <p>{error}</p>}
        // <ul>
        // {transactions.length > 0 ? (
        //   transactions.map((tx) => (
        //     <li key={tx.hash}>
        //       <p>Hash: {tx.hash}</p>
        //       <p>From: {tx.from_address}</p>
        //       <p>To: {tx.to_address}</p>
        //       <p>Value: {ethers.formatEther(tx.value)} ETH</p>
        //       <p>Block Number: {tx.block_number}</p>
        //       <p><a href={`https://${network}.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">View on Explorer</a></p>
        //     </li>
        //   ))
        // ) : (
        //   !loading ? <p>No transactions found.</p> : <p>Loading...</p>
        // )}
        // </ul>
        // </div>
        <div className="min-h-screen p-6 flex flex-col items-center lg:mx-72 lg:mt-24 mx-10 mt-6 border-1 h-screen shadow-2xl bg-blue-100">
          <div className="w-full">
            <div className='flex justify-between'>
            <h1 className="text-3xl font-bold mb-4">Transaction History</h1>
            <Link to="/main" className='mr-5'><button className='bg-white text-green-500 py-2 px-4 border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white ml-32'>Main</button></Link>
            </div>
            <p className="text-lg mb-4">Here are all the transactions associated with your account.</p>
            <div className="flex p-4 overflow-x-scroll">
              {transactions.length ? (
                transactions.map((tx) => <TransactionCard key={tx.hash} tx={tx} network={network} />)
              ) : (
                <p className="text-center mt-4">No transactions found.</p>
              )}
            </div>
          </div>
        </div>
    );
};

export default TransactionHistory;
