import React , {useState} from "react"
import { Link } from "react-router-dom";
import {auth, db} from "../congif";
import Navbar from "../components/navbar";
import { collection,addDoc } from "firebase/firestore";

export default function CreateAccount(){
    const [accountName,setAccountName] = useState();
    const [privateKey,setPrivateKey] = useState(1);
    const [publicKey,setPublicKey] = useState(1);
    const uid = auth.currentUser? auth.currentUser.uid : "";
    const accounts = collection(db, "Users", uid, "wallet accounts");
    const handleChange = (e) => {
        setAccountName(e.target.value);
        setPrivateKey(num => num+1);
        setPublicKey(num => num+1);
      };
      const sub = async (e) => {
        e.preventDefault(e); // no reload for the page
        const docRef = await addDoc(accounts, {
            accountName: accountName,
            privateKey: privateKey,
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
        </div>
    );

}