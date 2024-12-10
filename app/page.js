"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; //for redirecting to new page
import WalletInput from "./components/WalletInput";

export default function HomePage() {
  const [error, setError] = useState(""); 
  const router = useRouter();

  const handleAddressSubmit = (wallet) => {

    //validate if entered address is correct. This is the format for the address
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(wallet)) {
      setError("Invalid Solana wallet address. Please try again.");
      return;
    }

    setError(""); //clearing errors from before

    //redirects to the portfolio page
    router.push(`/PortfolioPage/${wallet}`); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between" 
    style={{background: "linear-gradient(135deg, #4b0082, #8a2be2, #0000ff)"}}>

      <header className="p-4 bg-gray-800 text-white w-full">
        <h1 className="text-4xl font-bold text-gray-300 font-serif">
            SolSearch
        </h1>
      </header>

      <main className="flex flex-col flex-grow w-full px-4 mt-32 pl-36">
        <h2 className="text-black font-bold text-6xl mb-4">
          Search the Solana <br></br>
          Blockchain in Seconds!
        </h2>

        <div className="w-3/4" style={{width: "70%"}}>
            {/* wallet input for the submission box */}
            <WalletInput onAddressSubmit={handleAddressSubmit}/>
        </div>

        {/* display an error message in red */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </main>
    </div>
  );
}
