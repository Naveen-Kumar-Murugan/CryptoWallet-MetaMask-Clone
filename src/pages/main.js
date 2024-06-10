import React, { useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import FetchBalance from "../components/fetchbalance";
import { Selectnetwork } from "../components/selectnetwork";
import { NetworkProvider } from "../utils/networkcontext";
import { AddressProvider } from "../utils/addresscontext";
import { Selectadress } from "../components/selectaddress";

export default function Main(){
    const handleNavigation = (url) => {
        window.location.href = url;
    };
    return(
        <div>
            <Navbar/>
            <h2>Main</h2>
            <Link to="/createaccount"> Create Account</Link>
            <div></div>
            <Link to="/recoveraccount"> Recover Account</Link>
            <div>
            <AddressProvider>
            <NetworkProvider>
                <Selectnetwork />
                <Selectadress />
                <FetchBalance />
                <Link to="/txnhistory"><button>Transaction history</button></Link>
                <button onClick={() => handleNavigation('/send')}>Send Transaction</button>
            </NetworkProvider>
            </AddressProvider>
            </div>
        
        </div>
    );
}