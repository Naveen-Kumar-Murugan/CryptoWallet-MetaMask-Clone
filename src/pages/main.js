import React, { useState } from "react";
import NavBar from "../components/navbar";
import { Link } from "react-router-dom";
import FetchBalance from "../components/fetchbalance";
import { Selectnetwork } from "../components/selectnetwork";
import { NetworkProvider } from "../utils/networkcontext";
import { AddressProvider } from "../utils/addresscontext";
import { Selectadress } from "../components/selectaddress";
import TabSvg from "../assets/Wallet_Image.svg"
import GitSvg from "../assets/github.svg";
import LinkSvg from "../assets/linkedin.svg";


export default function Main(){
    const [activeTab, setActiveTab] = useState('accounts');
    const handleNavigation = (url) => {
        window.location.href = url;
    };
    return(
        <div>
            <AddressProvider>
            <NetworkProvider>
            <div className="lg:mx-72 lg:mt-24 mx-10 mt-6 border-1 h-fit shadow-2xl">
                <NavBar/>
                <div className="block items-center content-center place-items-center">
                <FetchBalance />
                </div>
                <div className="w-full">
                </div>
                <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
                {/* Tabs Header */}
                <div className="w-full bg-white shadow-md flex justify-evenly">
                    <button
                    className={`py-4 px-6 text-lg font-medium w-96 ${
                        activeTab === 'accounts' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('accounts')}
                    >
                    Accounts
                    </button>
                    <button
                    className={`py-4 px-6 text-lg font-medium w-96 ${
                        activeTab === 'transactions' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('transactions')}
                    >
                    Transactions
                    </button>
                </div>

                {/* Content Box */}
                <div className="max-w-6xl w-full bg-white shadow-md flex overflow-hidden">
                    <div className="w-1/2 p-8">
                    {activeTab === 'accounts' && (
                        <div>
                        <h2 className="text-3xl font-bold mb-3">Manage Your Accounts</h2>
                        <p className="text-lg mb-2 leading-snug">Your secure place to manage and protect your cryptocurrencies.</p>
                        <p className="text-gray-600">Start fresh by creating a new account to securely manage your cryptocurrencies,  <strong>Or</strong></p>
                        <p className="text-gray-600 mb-3">Easily recover your existing account using your seed phrase or private key.</p>
                        <div className="flex">
                        <Link to="/createaccount" className="w-full"><button className="flex items-center w-full h-10 bg-cyan-600 text-white py-2 px-3 rounded-lg mb-2 hover:bg-cyan-800">
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Create Account
                            </button></Link>
                        </div>
                        <div>
                        <Link to="/recoveraccount" className="w-full"><button className="flex items-center w-full h-10 bg-cyan-600 text-white px-4 rounded-lg hover:bg-cyan-800">
                            <svg
                                className="w-6 h-6 mr-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l-7 7-7-7"></path>
                            </svg>
                            Recover Account
                            </button></Link>
                        </div>
                        </div>
                    )}

                    {activeTab === 'transactions' && (
                        <div>
                        <h2 className="text-3xl font-bold mb-3">Your Transactions</h2>
                        <p className="text-lg mb-2 leading-snug">Easily send and track your cryptocurrency transactions.</p>
                        <p className="text-gray-600">Send cryptocurrency to another wallet address quickly and securely,  <strong>Or</strong></p>
                        <p className="text-gray-600 mb-3">View the history of all your transactions in a detailed manner.</p>
                        <div className="mb-2">
                            <Link to="/send" className="w-full"><button className="flex items-center w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-800">
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8"></path>
                            </svg>
                            Send Transaction
                            </button></Link>
                        </div>
                        <div>
                        <Link to="/txnhistory" className="w-full"><button className="flex items-center w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-800">
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Transaction History
                            </button></Link>
                        </div>
                        </div>
                    )}
                    </div>

                    <div className="w-1/2 p-8 bg-blue-100 flex items-center justify-center">
                    <img src={TabSvg} alt="Crypto Wallet" className="w-full h-auto" />
                    </div>
                </div>
                <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36 mt-12">
                    <span class="font-semibold text-gray-400 uppercase">SOCIALS</span>
                    <div class="flex flex-wrap justify-evenly items-center mt-2 text-gray-500 sm:justify-between">
                        <a href="https://github.com/Naveen-Kumar-Murugan" class=" mr-36 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                            <img src={GitSvg} className="h-52"/>                        
                        </a>
                        <a href="https://www.linkedin.com/in/naveen-kumar-murugan-4bb973255/" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                            <img src={LinkSvg} className="h-12"/>                
                        </a> 
                    </div>
                </div> 
                </div>
                </div>
                </NetworkProvider>
                </AddressProvider>
        </div>
    );
}