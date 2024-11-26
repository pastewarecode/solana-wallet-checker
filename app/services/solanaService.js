import { Connection, PublicKey } from "@solana/web3.js";

//establishing a connection to the solana blockchain.
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

//gets wallet balance in lamports and converts to SOL.
//we can then convert to usd, cad, etc for further usage
export const getSolBalance = async (walletAddress) => { 

    //variable publicKey is an address of new PublicKey object from solana/web3.js
    const publicKey = new PublicKey(walletAddress);

    try
    {
        //uses 'connection' to get balance of wallet in lamports, identified by publicKey
        const balanceInLamports = await connection.getBalance(publicKey);
    }
    catch(error)
    {
        console.error("Error fetching balance: ", error);
        throw error;
    }

    //divides lampots by 1 billion to get value in SOL
    const balanceInSol = balanceInLamports/1000000000;
    return balanceInSol;
}