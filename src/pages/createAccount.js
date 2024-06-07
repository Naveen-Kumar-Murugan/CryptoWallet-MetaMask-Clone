import React , {useState} from "react"
import { Link } from "react-router-dom";
import {auth, db} from "../congif";
import Navbar from "../components/navbar";
import { collection,addDoc } from "firebase/firestore";
import { ethers } from 'ethers';

export default function CreateAccount(){
    const [accountName,setAccountName] = useState();
    const [createdAccount, setCreatedAccount] = useState(null);
    const uid = auth.currentUser? auth.currentUser.uid : "";
    const accounts = collection(db, "Users", uid, "wallet accounts");
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
        }
    return(
        <div>
            <Navbar/>
            <h2>name</h2>
            <input 
                name="name"
                type="name"
                placeholder="username"
                value={accountName}
                onChange={handleChange}
            />
            <button onClick={sub}>button</button>
            {createdAccount && (
                    <div className="output">
                        <p><strong>Seed Phrase:</strong> {createdAccount.mnemonic}</p>
                        <p><strong>Address:</strong> {createdAccount.address}</p>
                        <p><strong>Private Key:</strong> {createdAccount.privateKey}</p>
                        <p><strong>Public Key:</strong> {createdAccount.publicKey}</p>
                    </div>
                )}
            <Link to = "/main"><button>Main page</button></Link>
        </div>
    );

}