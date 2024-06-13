import React, { useEffect, useState } from "react";
import AddressDropdown from "./dropdown";
import { collection,getDocs,query } from "firebase/firestore";
import { db } from "../congif";
import {auth} from "../congif";
import { useAddress } from "../utils/addresscontext";

export const Selectadress = () => {
    const { address, setAddress } = useAddress();
    const [selectAddress,setSelectAddress] = useState('');
    
    const uid = auth.currentUser.uid;
    const val = collection(db, "Users", uid, "wallet accounts");
    const getVal = query(val);

    const [identity,setidentity] = useState([]);

    useEffect(()=> {
        const getDetails = async (e) =>{
        const getValue = await getDocs(getVal);
            // console.log(getValue);
            getValue.forEach((doc) => {
                const data = doc.data();
                setidentity(identity => [
                    ...identity,data.address
                ]);
            });
        }
        getDetails();
    },[]);

    useEffect(()=>{
        try{
            setAddress(selectAddress);
        }   
        catch(error){
            alert(error);
        }
    });
    return(
        <div className="w-44">
            <AddressDropdown
                addresses={identity}
                selectedAddress={selectAddress}
                onSelectAddress={setSelectAddress}
            />
        </div>
    );
};