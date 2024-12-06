"use client";
import React from "react";
import { useState } from 'react';

function WalletInput({onAddressSubmit}) {
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); //prevent default browser reload on submit
        onAddressSubmit(address); //calls the component function, using "address" as input
    };


    return (
        <form onSubmit={handleSubmit}>
            {/* creating input field to enter address */}
            <input 
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Wallet Address..."
            />
            {/* button to search */}
            <button type="submit">Search</button>
        </form>
    );
}

//default export because we are only exporting one function
export default WalletInput;