import { Connection, PublicKey } from "@solana/web3.js";
import { getParsedTokenAccountsByOwner } from "@solana/spl-token";

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

//Fetch SPL token balances depending on the unique wallet
export const getSPLTokenBalances = async (walletAddress) => {

    //variable publicKey is an address of new PublicKey object from solana/web3.js
    const publicKey = new PublicKey(walletAddress);

    try 
    {   //filters the searches for ONLY accounts managed by solana
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") //address of Solana Token Program
        });
    
    //returns 
    return tokenAccounts.value.map((account) => {
        //parse the account data so we can get information on tokens
        const info = account.account.data.parsed.info; 

        return {
            //returns the mint address AKA unique address for token.
          tokenAddress: info.mint, 

          //parsing the token amount as a number
          amount: parseFloat(info.tokenAmount.uiAmountString), 

          //returns how many decimals the token uses 
          decimals: info.tokenAmount.decimals, 
        };
      });
    }
    catch(error)
    {
        console.error("Error fetching SPL token balances: ", error); 
        throw error;
    }
}