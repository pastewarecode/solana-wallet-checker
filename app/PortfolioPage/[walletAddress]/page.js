"use client"
import React, { useState } from "react";
import { useParams, useRouter } from 'next/navigation'; //gets the URL so we can assign it as walletAddress and use it
import Portfolio from "../../components/Portfolio"; 

export default function PortfolioPage() {

  const { walletAddress } = useParams(); //gets the wallet address from the URL and we use it for the portfolio page.
  const [newWallet, setWallet] = useState(walletAddress); //hold wallet address
  const [error, setError] = useState(""); //stores error message
  const routeHome = useRouter();  //to re-route back to homepage with logo
  const router = useRouter(); //routes to new portfolio page


  const handleReturnHome = () => {
    //redirects to home on click
    routeHome.push('/');
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault(); //prevents default form submission

    //validate the format for Solana wallet addresses
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(newWallet)) {
      setError("Invalid Solana wallet address. Please try again.");
      return;
    }

    setError(""); //clear the previous error

    router.push(`/PortfolioPage/${newWallet}`); // navigate to the new portfolio page with the new wallet address
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-between" 
        style={{background: "linear-gradient(135deg, #4b0082, #8a2be2, #0000ff)"}}>

      <header className="p-4 bg-gray-800 text-white w-full flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-300 font-serif" onClick={handleReturnHome}>
          SolSearch
        </h1>

        {/* search bar inside of header */}
        <form onSubmit={handleAddressSubmit} className="flex ml-auto">
          <input
            type="text"
            value={newWallet}
            onChange={(e) => setWallet(e.target.value)} //sets new value typed in as the walletAddress
            className="p-2 border border-gray-300 rounded-md mr-2 w-64 text-black placeholder-gray-400"
            placeholder="Search another wallet..."
          />
          <button 
            type="submit" 
            className="bg-gray-200 px-4 py-2 rounded-md text-black hover:bg-gray-300 border border-black"
            >
              Search
          </button>
        </form>
      </header>

      <main className="p-6">
        {/* displays portfolio component using the address from the URL as 'walletAddress' */}
        <Portfolio walletAddress={walletAddress} />

        {/* display an error message in red */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </main>
    </div>
  );
}
