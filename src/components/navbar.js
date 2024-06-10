import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../congif";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar(){
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
            <h2>Account No.: {accntNo}</h2>
            <button onClick={handleChange}>{loginfo}</button>
        </div>
    );
}