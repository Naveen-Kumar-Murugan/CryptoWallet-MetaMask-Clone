import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TransactionComponent = ({ provider, signer ,network }) => {
  //const {network,setNetwork} = useNetwork();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [balance, setBalance] = useState('0');
  const [gasPrice, setGasPrice] = useState('0');
  const [estimatedGas, setEstimatedGas] = useState(null);

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
  }, [toAddress, amount, balance, provider, signer,]);

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
      <h2>Send Transaction</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSendTransaction}>Send</button>

      {transactionHash && (
        <div>
          <p>Transaction Hash: {transactionHash}</p>
          <a
            href={`https://${network}.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}

      <div>
        <p>Balance: {balance} ETH</p>
        <p>Gas Price: {gasPrice} Gwei</p>
        {estimatedGas && <p>Estimated Gas: {estimatedGas} Gwei</p>}
      </div>
    </div>
  );
};

export default TransactionComponent;
