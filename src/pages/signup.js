import React , {useState} from "react"
import { Link,useNavigate } from "react-router-dom";
import {auth} from "../congif";
import { createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";

export default function SignUp(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
    const [user,setUser] = useState();
    const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

      onAuthStateChanged(auth, (curretuser)=>{
       setUser(curretuser); 
      });

      const submitButton = async (event) =>{
        event.preventDefault();
        try{
            const user = await createUserWithEmailAndPassword(auth,formData.email,formData.password);
            navigate('/main');
        }
        catch(error){
            alert(error);
        }
      };
    
      return (
        <div>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" onClick={submitButton}>
            Submit
          </button>
        </form>
        <Link to="/login"><h2>Login</h2></Link>
        </div>
      );
}