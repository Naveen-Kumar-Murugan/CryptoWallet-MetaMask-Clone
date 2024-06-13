import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import GitSvg from "../assets/github.svg";
import LinkSvg from "../assets/linkedin.svg";

const TransactionComponent = ({ provider, signer ,network }) => {
  //const {network,setNetwork} = useNetwork();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [balance, setBalance] = useState('0');
  const [gasPrice, setGasPrice] = useState('0');
  const [estimatedGas, setEstimatedGas] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBalanceAndGas = async () => {
      try {
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        console.log("provider in here => ",provider);
        const gasPrice = (await provider.getFeeData()).gasPrice

        setBalance(ethers.formatEther(balance));
        setGasPrice(ethers.formatUnits(gasPrice, 'gwei'));
      } catch (error) {
        console.error('Error fetching balance or gas price:', error);
      }
    };

    fetchBalanceAndGas();
  }, [provider, signer, gasPrice, balance]);

  useEffect(() => {
    const calculateMaxAmount = async () => {
      if (!toAddress) return;
      
      try {
        const gasEstimate = await signer.estimateGas({
          to: toAddress,
          value: ethers.parseUnits(amount || '0', 'ether'),
        });

        setEstimatedGas(ethers.formatUnits(gasEstimate, 'gwei'));

        const totalGasFee = gasEstimate.mul((await provider.getFeeData()).gasPrice);
        const balanceInWei = ethers.parseUnits(balance, 'ether');
      } catch (error) {
        console.error('Error estimating gas:', error);
      }
    };

    calculateMaxAmount();
  }, [toAddress, amount, balance, provider, signer]);

  const handleSendTransaction = async () => {
    if (!toAddress || !amount) {
      alert('Please enter both the address and the amount.');
      return;
    }
    try {
      const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseUnits(amount, 'ether'),
      });

      setTransactionHash(tx.hash);
    } catch (error) {
      console.error('Transaction Error:', error);
      alert('Transaction failed. Check console for details.');
    }
  };
  console.log("updated balance =>",signer);
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-8 flex flex-col items-start">
        <h1 className="text-3xl font-bold mb-4">Send Cryptocurrency</h1>
        <p className="text-lg mb-4">Securely send your cryptocurrency to another wallet address.</p>
        <div className="mb-4">
          <p className="text-xl">Balance: {balance} ETH</p>
          <p className="text-xl">Gas Price: {gasPrice} Gwei</p>
          {estimatedGas && <p className='text-xl'>Estimated Gas: {estimatedGas} Gwei</p>}
        </div>
        <input
          type="text"
          className="border rounded-lg w-full p-2 mb-4"
          placeholder="Recipient Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          type="text"
          className="border rounded-lg w-full p-2 mb-4"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className='flex'>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 mr-96"
          onClick={handleSendTransaction}>
          Send Transaction
        </button>
        <Link to="/main"><button 
        className="bg-white text-green-500 py-2 px-4 border-2 border-green-500 rounded-lg mt-4 hover:bg-green-500 hover:text-white ml-32">
          Main
        </button></Link>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Transaction Completed</h2>
            <p className="text-lg">Transaction Hash:</p>
            <p className="text-blue-500 break-all">{transactionHash}</p>
            <a
            href={`https://${network}.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            >
            View on Etherscan
            </a>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
    </div>
  );
};

export default TransactionComponent;
