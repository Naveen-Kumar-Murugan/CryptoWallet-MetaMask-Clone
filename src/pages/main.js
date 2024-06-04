import React from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default function Main(){
    return(
        <div>
            <Navbar/>
            <h2>Main</h2>
            <Link to="/createaccount"> Create Account</Link>
        </div>
    );
}