import React, { useEffect, useState } from "react";
import { networks } from "../utils/networks";
import AddressDropdown from "./dropdown";
import { useNetwork } from "../utils/networkcontext";

export const Selectnetwork = () => {
    const { network, setNetwork } = useNetwork();
    const [selectNetwork,setSelectNetwork] = useState('');
    const tempnetworks = Object.keys(networks);

    useEffect(()=>{
        try{
            setNetwork(selectNetwork);
        }   
        catch(error){
            alert(error);
        }
    });
    console.log("select network = >",network);
    return(
        <div className="w-32">
            <AddressDropdown
                addresses={tempnetworks}
                selectedAddress={selectNetwork}
                onSelectAddress={setSelectNetwork}
            />
        </div>
    );
};