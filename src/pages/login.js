import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"
import { Link,useNavigate } from "react-router-dom";
import { auth } from "../congif";

export default function Login(){
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    const submitButton = async(e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            console.log("User Logged In Succesfully");
            navigate("/main");
        }
        catch(error){
            alert(error);
        }
    }
    return( 
        <div>
        <h1>Login</h1>
        <form>
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button type="submit" onClick={submitButton}>
            Submit
          </button>
        </form>
        <Link to ="/signup"><h2>Sign Up</h2></Link>
        </div>
    );
}