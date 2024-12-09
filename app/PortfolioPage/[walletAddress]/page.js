"use client"
import React from 'react';
import { useParams } from 'next/navigation'; //gets the URL so we can assign it as walletAddress and use it
import Portfolio from "../../components/Portfolio"; 

export default function PortfolioPage() {

  //gets the wallet address from the URL and we use it for the portfolio page.
  const { walletAddress } = useParams();

  return (
    <div>
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">SolSearch</h1>
      </header>
      <main className="p-6">
        <Portfolio walletAddress={walletAddress} />
      </main>
    </div>
  );
}
