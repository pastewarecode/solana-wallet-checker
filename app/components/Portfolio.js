"use client";
import React, { useState, useEffect } from "react";
import { getSolBalance, getSPLTokenBalances, getTokenName } from "../services/solanaService"; //get wallet balances of all tokens
import { getMultipleTokenPrice } from "../services/priceService"; //get live prices of tokens
import TokensList from "./TokensList"; //get list of tokens

function Portfolio({walletAddress}) {

    const [solBalance, setSolBalance] = useState(null); //stores solana balance
    const [tokens, setTokens] = useState([]); //stores list of tokens with their shares and values in USD
    const [totalValue, setTotalValue] = useState(0);  //stores the total value of wallet

    useEffect (() => {
        //grabs and returns portfolio
        const fetchPortfolio = async() => {
            try
            {
                const sol = await getSolBalance(walletAddress); //grab solana balance
                const splTokens = await getSPLTokenBalances(walletAddress); //grab other tokens
                const tokenIds = ["solana", ...splTokens.map((t) => t.tokenAddress)]; //grab token addresses
                const prices = await getMultipleTokenPrice(tokenIds); //grab live prices of tokens

                
                
                //returns name, address, amount, value, of spl tokens
                const tokensWithValues = await Promise.all(
                    splTokens.map( async(token) => {    //map through tokens
    
                        try
                        {
                        //name = metadata returned by getTokenName() using the tokenAddress as parameter for identification
                        const tokenName = await getTokenName(token.tokenAddress)
                            return {
                                //object token name: is 'tokenName' and also falls back to token.tokenAddress
                                name: tokenName,
                                //amount of tokens
                                amount: token.amount, 
                                //value of 'x' amount of tokens in USD by using the live price of the token multiplied by shares
                                usdValue: token.amount * (prices[token.tokenAddress] || 0), 
                            }
                        }
                        catch(error)
                        {
                            console.log("Error getting token name:", error);
                            return {
                                name: token.tokenAddress, //fallback to token address if name fetch fails
                                amount: token.amount,
                                usdValue: token.amount * (prices[token.tokenAddress] || 0),
                            };
                        }
                    }));
                        

                //calculate value of their solBalance and set their sol and other tokens in state (solBalance & tokens)
                const solBalanceValue = sol * prices.solana; //calculation
                
                setSolBalance(sol); //set sol balance in state
                setTokens([{ name: "Solana (SOL)", amount: sol, usdValue: solBalanceValue },  //sets name, amount, value, for solana in wallet
                    ...tokensWithValues]); //sets name, amount, value for every other token


                //calculate and set total value of portfolio in state (totalValue)
                //portfolioTotal uses reduce() to iterate through token.usdValue and gather the values in the parameter 'sum'
                const portfolioTotal = solBalanceValue + tokensWithValues.reduce((sum, token) => sum + token.usdValue, 0); 
                setTotalValue(portfolioTotal); 
                
            }
            catch (error)
            {
                console.error("Error fetching portfolio information:", error); 
            }
        };

        //useEffect will re-render and call the function 'fetchPortfolio()' everytime the '[walletAddress]' value changes
        fetchPortfolio();

    }, [walletAddress]); 


    return(
        <div>
            <h1 className="text-xl p-2 mt-4">Account Details:</h1>
            <p>Account Value: ${totalValue.toFixed(2)}USD</p>

            {/* Display the TokensList component */}
            <TokensList tokens={tokens}></TokensList> 
        </div>
    )
}

export default Portfolio;