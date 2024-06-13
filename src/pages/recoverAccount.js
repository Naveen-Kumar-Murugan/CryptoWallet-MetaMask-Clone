import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { useNetwork } from '../utils/networkcontext';
import NavBar from "../components/navbar";
import { collection,addDoc } from "firebase/firestore";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import AccSvg from "../assets/Create_account.svg";
import GitSvg from "../assets/github.svg";
import LinkSvg from "../assets/linkedin.svg";

const AccountRecovery = () => {
    const [inputValue, setInputValue] = useState('');
    const [recoveredAccount, setRecoveredAccount] = useState(null);
    const [recoverError, setRecoverError] = useState('');
    const {network,setnetwork}= useNetwork();
    const [openModal, setOpenModal] = useState(false);
    const [openAccModal, setOpenAccModal] = useState(false);
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
            setOpenModal(false);
            setOpenAccModal(true);
        } catch (error) {
            setRecoveredAccount(null);
            setRecoverError(error.message);
        }
    };
    function onCloseModal() {
        setOpenModal(false);
      }
    function onCloseAppModal(){
        setOpenAccModal(false);
    }

    const renderAccountDetails = (account) => (
        <div className="output">
            <p><strong>Address:</strong> <a href={`https://${network}.etherscan.io/address/${account.address}`} target="_blank" rel="noopener noreferrer">{account.address}</a></p>
            <p className='mb-3'><strong>Private Key:</strong> {account.privateKey}</p>
            <Button onClick={() => setOpenAccModal(false)}>Okay!!</Button>
        </div>
    );

    return (
        // <div className="card">
        //     <h2>Recover Account</h2>
            // <label htmlFor="inputValue">Seed Phrase or Private Key:</label>
            // <input
            //     type="text"
            //     id="inputValue"
            //     value={inputValue}
            //     onChange={(e) => setInputValue(e.target.value)}
            //     style={{ width: '100%' }}
            // />
        //     <button onClick={recoverAccount}>Recover Account</button>
        //     {recoveredAccount && renderAccountDetails(recoveredAccount)}
        //     {recoverError && (
        //         <p style={{ color: 'red' }}><strong>Error:</strong> {recoverError}</p>
        //     )}
        //     <Link to="/main"><button>Main</button></Link>
        // </div>
        <div className="lg:mx-72 lg:mt-24 mx-10 mt-6 border-1 h-screen shadow-2xl bg-blue-100">
            <NavBar/>
            <div className="lg:flex justify-center items-center bg-cyan-100">
            <div>
            <div class="max-w-sm p-6 lg:mr-16 mr-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Recover your Crypto Account</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Recover your account to have access to multiple networks and tokens, have them exchanged and transactioned!!</p>
            <div className="flex">
            <Button className="bg-cyan-700 mr-5 hover:bg-cyan-950" onClick={() => setOpenModal(true)}>Recover Account</Button>
            <Button className="bg-cyan-700 lg:w-36 hover:bg-cyan-950" href="/main">Return to main</Button>
            </div>
            </div>
            </div>
            <img src={AccSvg} alt="Your SVG" className="w-80"/>
        </div>
        <div className="w-11">
        <Modal className="backdrop-brightness-50 backdrop-blur-sm" show={openAccModal} size="md" onClose={onCloseAppModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Your Recovered account details are:</h3>
            <div>
              <div className="mb-2 block">
                {recoveredAccount && renderAccountDetails(recoveredAccount)}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>
        <Modal className="backdrop-brightness-50 backdrop-blur-sm" show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Recover your Account!!</h3>
            <div>
              <div className="mb-2 block">
              <Label htmlFor="inputValue" value="ASeed Phrase or Private Key: "/>
              </div>
            <TextInput
                type="text"
                id="inputValue"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ width: '100%' }}
            />
            </div>
            <div className="w-full">
              <Button className="bg-cyan-700 hover:bg-cyan-950" onClick={recoverAccount}>Recover Account</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
    );
};

export default AccountRecovery;
