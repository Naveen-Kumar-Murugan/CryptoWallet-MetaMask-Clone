import React , {useState} from "react"
import { Link } from "react-router-dom";
import {auth, db} from "../congif";
import NavBar from "../components/navbar";
import { collection,addDoc } from "firebase/firestore";
import { ethers } from 'ethers';
import { Button, Label, Modal, TextInput } from "flowbite-react";
import AccSvg from "../assets/Create_account.svg";
import GitSvg from "../assets/github.svg";
import LinkSvg from "../assets/linkedin.svg";

export default function CreateAccount(){
    const [accountName,setAccountName] = useState();
    const [createdAccount, setCreatedAccount] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openAccModal, setOpenAccModal] = useState(false);
    const uid = auth.currentUser? auth.currentUser.uid : "";
    const accounts = collection(db, "Users", uid, "wallet accounts");

    function onCloseModal() {
        setOpenModal(false);
      }
    function onCloseAppModal(){
        setOpenAccModal(false);
    }
    const handleChange = (e) => {
        setAccountName(e.target.value);
      };
      const sub = async (e) => {
        e.preventDefault(e); // no reload for the page
        const wallet = ethers.Wallet.createRandom();
        const publicKey = wallet.publicKey;
        const account = {
            mnemonic: wallet.mnemonic.phrase,
            address: wallet.address,
            privateKey: wallet.privateKey,
            publicKey: publicKey,
        };
        setCreatedAccount(account);
        const docRef = await addDoc(accounts, {
            accountName: accountName,
            address: account.address,
            mnemonic: account.mnemonic,
            privateKey: account.privateKey,
            publicKey: publicKey,
          });
          console.log("Document written with ID: ", docRef.id);
          setOpenModal(false);
          setOpenAccModal(true);
        }
    return(
        <div className="lg:mx-72 lg:mt-24 mx-10 mt-6 border-1 h-screen shadow-2xl bg-blue-100">
            <NavBar/>
            <div className="lg:flex justify-center items-center bg-cyan-100">
            <div>
            <div class="max-w-sm p-6 lg:mr-16 mr-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create your Crypto Account</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Create your account to have access to multiple networks and tokens, have them exchanged and transactioned!!</p>
            <div className="flex">
            <Button className="bg-cyan-700 mr-5 hover:bg-cyan-950" onClick={() => setOpenModal(true)}>Create Account</Button>
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Your Created account details are:</h3>
            <div>
              <div className="mb-2 block">
              {createdAccount && <div className="output">
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><strong>Seed Phrase:</strong> {createdAccount.mnemonic}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><strong>Address:</strong> {createdAccount.address}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><strong>Private Key:</strong> {createdAccount.privateKey}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"><strong>Public Key:</strong> {createdAccount.publicKey}</p>
                        <br></br>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words"> Hey there!! Congrats on creating an account, keep these details secured as these details are <strong>very important and to be kept encrypted.</strong> </p>
                </div>}
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create a Crypto Wallet!!</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Account name" />
              </div>
                <TextInput
                    name="name"
                    type="name"
                    placeholder="username"
                    value={accountName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="w-full">
              <Button className="bg-cyan-700 hover:bg-cyan-950" onClick={sub}>Create Account</Button>
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
}