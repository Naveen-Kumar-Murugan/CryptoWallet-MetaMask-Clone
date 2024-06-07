import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const AccountRecovery = () => {
    const [inputValue, setInputValue] = useState('');
    const [recoveredAccount, setRecoveredAccount] = useState(null);
    const [recoverError, setRecoverError] = useState('');

    const recoverAccount = () => {
        try {
            let wallet;
            if (!inputValue.startsWith('0x')) {
                wallet = ethers.Wallet.fromMnemonic(inputValue);
            } else if (inputValue.length === 66 && inputValue.startsWith('0x')) {
                wallet = new ethers.Wallet(inputValue);
            } else {
                throw new Error('Invalid input. Please enter a valid mnemonic or private key.');
            }
            const account = {
                address: wallet.address,
                privateKey: wallet.privateKey,
            };
            setRecoveredAccount(account);
            setRecoverError('');
        } catch (error) {
            setRecoveredAccount(null);
            setRecoverError(error.message);
        }
    };

    const renderAccountDetails = (account) => (
        <div className="output">
            <p><strong>Address:</strong> <a href={`https://sepolia.etherscan.io/address/${account.address}`} target="_blank" rel="noopener noreferrer">{account.address}</a></p>
            <p><strong>Private Key:</strong> {account.privateKey}</p>
        </div>
    );

    return (
        <div className="card">
            <h2>Recover Account</h2>
            <label htmlFor="inputValue">Seed Phrase or Private Key:</label>
            <input
                type="text"
                id="inputValue"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ width: '100%' }}
            />
            <button onClick={recoverAccount}>Recover Account</button>
            {recoveredAccount && renderAccountDetails(recoveredAccount)}
            {recoverError && (
                <p style={{ color: 'red' }}><strong>Error:</strong> {recoverError}</p>
            )}
            <Link to="/main"><button>Main</button></Link>
        </div>
    );
};

export default AccountRecovery;
