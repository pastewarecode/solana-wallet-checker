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
    <div>
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">SolSearch</h1>
        <p className="text-xl mt-2">Find out what's in your Solana wallet.</p>
      </header>
      <main className="p-6">
        {/* wallet input for the submission box */}
        <WalletInput onAddressSubmit={handleAddressSubmit} />
        
        {/* display an error message in red */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </main>
    </div>
  );
}
