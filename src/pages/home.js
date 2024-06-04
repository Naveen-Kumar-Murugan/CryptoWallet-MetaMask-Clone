import React from "react"
import { Link } from "react-router-dom";
export default function Home(){
    return( 
        <div>
        <h1>hello</h1>
        <ul>
            <li>
                <Link to="signup"><h2>Sign Up</h2></Link>
            </li>
            <li>
                <Link to = "login"><h2>Login</h2></Link>            
            </li>
        </ul>
    </div>
    );
}