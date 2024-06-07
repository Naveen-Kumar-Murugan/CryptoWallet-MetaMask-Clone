import React, { useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import FetchBalance from "../components/fetchbalance";
import { Selectnetwork } from "../components/selectnetwork";
import { NetworkProvider } from "../utils/networkcontext";

export default function Main(){
    return(
        <div>
            <Navbar/>
            <h2>Main</h2>
            <Link to="/createaccount"> Create Account</Link>
            <div></div>
            <Link to="/recoveraccount"> Recover Account</Link>
            <div>
            <NetworkProvider>
                <Selectnetwork />
                <FetchBalance />
            </NetworkProvider>
        </div>
        </div>
    );
}