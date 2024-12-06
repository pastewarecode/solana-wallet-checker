import React from "react";
import { useState } from 'react';
import WalletInput from "./WalletInput";

//this imports the function that returns 'balanceInSol
import { getSolBalance } from "../services/solanaService";

function Portfolio() {
    //create usestate variables for solana balance, to handle loading, and errors.
    const [solBalance, setSolBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //function to handle the wallet address submission
    const handleAddressSubmit = async (walletAddress) => {
        setLoading(true); //loading is true as it loads
        setError(null); //reset the state of the error variable

        //try and catch because we are using await
        try 
        {
            const balance = await getSolBalance(walletAddress) //fetch balance with their wallet address as the parameter
            setSolBalance(balance) //set the state as 'balance'
        }
        catch (error)
        {
            setError("Failed to retrieve wallet balance. Please try again.") //sets error message if error is caught
        }
        finally 
        {
            setLoading(false) //no longer loading. We update the state of 'setLoading'
        }
    };

    return (
        <div>
            <h1>Solana Portfolio</h1>

            <WalletInput onAddressSubmit={handleAddressSubmit}/> 

            {/* Display loading message */}
            {loading && <p>Loading...</p>}

            {/* Display error message we made above */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Display wallet balance in solana */}
            {<p>Your SOL Balance: {solBalance.toFixed(6)}SOL</p>}
        </div>
    )
}

export default Portfolio;