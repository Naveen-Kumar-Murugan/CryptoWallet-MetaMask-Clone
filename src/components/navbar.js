import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../congif";
import { onAuthStateChanged } from "firebase/auth";
import { Button, Navbar } from "flowbite-react";
import { useAddress } from "../utils/addresscontext";
import { Selectadress } from "./selectaddress";
import { Selectnetwork } from "./selectnetwork";
import WalletSvg from "../assets/cryptocurrency-wallet.svg"

export default function NavBar(){
    let uid = auth.currentUser.uid;
    onAuthStateChanged(auth, (user)=>{
        if(user){
            uid = auth.currentUser.uid; 
        }
        else{
            uid=" ";
        }
    });
    const [loginfo,setLoginfo] = useState(uid ? "Logout" : "Login");
    const [accntNo,setAccountNo] = useState(uid);
    const navigate = useNavigate();
    console.log(accntNo);
    
    const handleChange = async(e) =>{
        await auth.signOut();
        navigate("/login");
    }
    return(
        <div>
            <Navbar fluid rounded className="pt-3 mt-0 bg-blue-100 shadow-lg">
            <div className="flex w-full">
            <Navbar.Brand href="/main">
                <img src={WalletSvg} className="mr-7 ml-5 sm:h-9 border-4 rounded-full border-white" alt=" " />
            </Navbar.Brand>
            <div className="flex justify-between mr-10 w-full">
            <div className="flex justify-between w-full ">
            <Selectnetwork/>
            <div className="flex items-center">
            <h3 className="text-xl mr-2  underline underline-offset-2 text-cyan-600"><strong>Address: </strong></h3>
            <Selectadress/>
            </div>
            </div>
            <div className="flex md:order-2 ml-4">
            <Button onClick={handleChange} className="rounded-xl border-2 border-white bg-blue-600 hover:bg-blue-800">{loginfo}</Button>
            </div>
            </div>
            </div>
            </Navbar>
        </div>
    );
}