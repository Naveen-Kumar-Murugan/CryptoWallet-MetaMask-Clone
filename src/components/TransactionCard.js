// src/components/TransactionCard.js

import React from 'react';
import { ethers } from 'ethers';

const TransactionCard = ({ tx,network }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mx-2 w-2/4">
      <p className="text-xl font-semibold">Transaction Details</p>
      <p className="text-base mt-2 break-words"><span className="font-bold">Hash:</span> {tx.hash}</p>
      <p className="text-base mt-1 break-words"><span className="font-bold">From:</span> {tx.from_address}</p>
      <p className="text-base mt-1 break-words"><span className="font-bold">To:</span> {tx.to_address}</p>
      <p className="text-base mt-1 break-words"><span className="font-bold">Value:</span> {ethers.formatEther(tx.value)} ETH</p>
      <p className="text-base mt-1 break-words"><span className="font-bold">Block Number:</span> {tx.block_number}</p>
      <p><a href={`https://${network}.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className='text-xl mt-1 text-cyan-600'><strong>View on Explorer</strong></a></p>
    </div>
  );
};

export default TransactionCard;
