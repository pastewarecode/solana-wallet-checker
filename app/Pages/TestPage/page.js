"use client";
import React, { useState } from "react";
import WalletInput from "../../components/WalletInput";
import Portfolio from "../../components/Portfolio";

export default function TestPage() {
  const [walletAddress, setWalletAddress] = useState(""); // To store user-entered wallet address.

  // Function to update the wallet address when submitted.
  const handleAddressSubmit = (address) => {
    setWalletAddress(address);
  };

  return (
    <div>
      <h1>Test Page</h1>
      <p>Enter a Solana wallet address below to view its portfolio.</p>
      
      {/* Wallet Input Component */}
      <WalletInput onAddressSubmit={handleAddressSubmit} />
      
      {/* Display the Portfolio only when a wallet address is entered */}
      {walletAddress && <Portfolio walletAddress={walletAddress} />}
    </div>
  );
}
