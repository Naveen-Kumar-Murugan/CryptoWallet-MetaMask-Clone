import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../congif";

export default function Navbar(){
    const uid = auth.currentUser? auth.currentUser.uid: "";
    const [loginfo,setLoginfo] = useState(uid ? "Logout" : "Login");
    const [accntNo,setAccountNo] = useState(uid? uid : "");
    const navigate = useNavigate();
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