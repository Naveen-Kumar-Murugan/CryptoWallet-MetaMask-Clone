import React, { useState } from 'react';
import TransactionHistory from '../components/transactionhistory';
import { Link } from 'react-router-dom';
import { NetworkProvider } from '../utils/networkcontext';
import { useAddress } from '../utils/addresscontext';
import { AddressProvider } from '../utils/addresscontext';


export const TxnHistory = () =>{
    
    // const address = "0x6fB3EeaC8331Af8f01f28d6cab3DD51355F4d608";
    // console.log(address);
    return(
        <div>
            <AddressProvider>
            <NetworkProvider>
            <TransactionHistory/>
            </NetworkProvider>
            </AddressProvider>
            <Link to="/main"><button>Main</button></Link>
        </div>
    );
}