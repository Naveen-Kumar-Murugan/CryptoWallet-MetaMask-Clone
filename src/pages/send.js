import React, { useState,useEffect } from "react"
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { networks } from "../utils/networks";
import { collection,getDocs,query } from "firebase/firestore";
import { db } from "../congif";
import {auth} from "../congif";
import { ethers } from "ethers";
import TransactionComponent from "../components/sendtransaction";
import { useNetwork } from "../utils/networkcontext";
import { AddressProvider, useAddress } from "../utils/addresscontext";
import { NetworkProvider } from "../utils/networkcontext";

export default function Send(){
    const [provider, setProvider] = useState(null);
    const { address } = useAddress();
    const [signer, setSigner] = useState(null);
    const {network,setNetwork} = useNetwork();
    const [privatekey,setprivatekey] = useState('');
    const uid = auth.currentUser.uid;
    const val = collection(db, "Users", uid, "wallet accounts");
    const getVal = query(val);

    useEffect(()=> {
        const getDetails = async (e) =>{
        const getValue = await getDocs(getVal);
            // console.log(getValue);
            getValue.forEach((doc) => {
                const data = doc.data();
                if(data.address === address){
                    setprivatekey(data.privateKey);
                }
            });
        }
        getDetails();
    },[]);
    console.log("privatekey =",privatekey);
    console.log("address =>",address);
    useEffect(()=>{
        const sProvider = async()=>{
            //const prov = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/7bdf8cedd4ac4e6c897a21f21dca6ceb");
            const prov = new ethers.JsonRpcProvider(networks[network].rpcUrl);
            setProvider(prov);
        }
        sProvider();
    },[])
    useEffect(() => {
         const initProvider = async (privatekey,provider) => {
        // // const provider = new ethers.JsonRpcProvider(networks[network].rpcUrl);
        // // setProvider(provider);
           // const prov = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/7bdf8cedd4ac4e6c897a21f21dca6ceb");
        // // Connect to the wallet
            //setProvider(prov);
            console.log("priv =>",privatekey);
            const wallet = new ethers.Wallet(privatekey, provider);
            const signer = wallet.connect(provider);
            // console.log("add => ",address);
            // const sign = provider.getSigner(address);
            setSigner(signer)
         };
         if(privatekey){
         initProvider(privatekey,provider);
         }else{
            console.log("empty");
         }
    },[privatekey,provider]);
    console.log("provider =>",signer);
    return (
        <div>
            <NetworkProvider>
                <AddressProvider>
                <Navbar/>
                <h1>send</h1>
                <h1>Send Ethereum Transaction</h1>
                {provider && signer ? (
                    <TransactionComponent provider={provider} signer={signer} network={network} />
                ) : (
                    <p>Loading provider and signer...</p>
                )}
                <div>
                    <Link to="/main"><button>main</button></Link>
                </div>
                </AddressProvider>
            </NetworkProvider>
        </div>
    );
}