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
                className="w-full p-4 border border-gray-300 rounded-md"
                style={{ height: "8vh", fontSize: "1.25rem" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter wallet address..."
            />
            {/* button to search */}
            <button
                type="submit"
                className="mt-4 px-6 py-2 rounded-md bg-gray-200 text-black hover:bg-gray-300 border border-black"
                style={{ fontSize: "1.25rem" }}
                >
                Search
            </button>
        </form>
    );
}

//default export because we are only exporting one function
export default WalletInput;