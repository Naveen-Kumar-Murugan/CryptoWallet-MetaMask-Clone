import React, { useState,useEffect } from "react"
import NavBar from "../components/navbar";
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
import GitSvg from "../assets/github.svg";
import LinkSvg from "../assets/linkedin.svg";

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
            const prov = new ethers.JsonRpcProvider(networks[network].rpcUrl);
            setProvider(prov);
        }
        sProvider();
    },[])
    useEffect(() => {
         const initProvider = async (privatekey,provider) => {
            console.log("priv =>",privatekey);
            const wallet = new ethers.Wallet(privatekey, provider);
            const signer = wallet.connect(provider);
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
                <div className="lg:mx-72 lg:mt-24 mx-10 mt-6 border-1 h-screen shadow-2xl">
                {provider && signer ? (
                    <TransactionComponent provider={provider} signer={signer} network={network} />
                ) : (
                    <p>Loading provider and signer...</p>
                )}
                </div>
                </AddressProvider>
            </NetworkProvider>
        </div>
    );
}