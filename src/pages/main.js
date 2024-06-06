import React, { useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import {auth} from "../congif";
import { collection,getDocs,query } from "firebase/firestore";
import { db } from "../congif";
import Dropdown from "../components/dropdown";

export default function Main(){
    const [identity,setidentity] = useState([])

    const uid = auth.currentUser.uid;
    const val = collection(db, "Users", uid, "wallet accounts");
    const getVal = query(val);
    const handleChange = async (e) =>{
        
        
        const getValue = await getDocs(getVal);
        getValue.forEach((doc) => {
            const data = doc.data();
            setidentity([
                ...identity,data.publicKey
            ]);
        });
    }

    const handleSelect = (selectedValue) => {
        console.log('Selected value:', selectedValue);
    };
    return(
        <div>
            <Navbar/>
            <h2>Main</h2>
            <Link to="/createaccount"> Create Account</Link>
            <div></div>
            <Link to="/recoveraccount"> Recover Account</Link>

            <div>
            <button onClick={handleChange}>Click Me</button>
            </div>
            <div>
            <h1>My Dropdown App</h1>
            <Dropdown options={identity} onSelect={handleSelect} />
        </div>
        </div>
    );
}