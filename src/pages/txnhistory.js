import React, { useState } from 'react';
import TransactionHistory from '../components/transactionhistory';
import { Link } from 'react-router-dom';
import { NetworkProvider } from '../utils/networkcontext';
import { Selectnetwork } from '../components/selectnetwork';


export const TxnHistory = () =>{
    const address = "0x6fB3EeaC8331Af8f01f28d6cab3DD51355F4d608";
    return(
        <div>
            <NetworkProvider>
            {address && <TransactionHistory address={address} />}
            </NetworkProvider>
            <Link to="/main"><button>Main</button></Link>
        </div>
    );
}