import React, { useState, useEffect } from "react";
import { getSolBalance, getSPLTokenBalances } from "../services/solanaService"; //get wallet balances of all tokens
import { getMultipleTokenPrice } from "../services/priceService"; //get live prices of tokens
import TokenList from "./TokensList"; //get list of tokens

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
                const tokenIds = ["solana", ...splTokens.map((t) => t.tokenAddress)]; //grab token names
                const prices = await getMultipleTokenPrices(tokenIds); //grab live prices of tokens

                //returns name, amount, value, of spl tokens
                const tokensWithValues = splTokens.map((token) => ({
                    //returns name as the token CA
                    name: token.tokenAddress, 
                    //amount of tokens
                    amount: token.amount, 
                    //value of 'x' amount of tokens in USD by using the live price of the token multiplied by shares
                    usdValue: token.amount * (prices[token.tokenAddress] || 0), 
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
            <h1>Portfolio:</h1>
            <p>Account Value: ${portfolioTotal.toFixed(2)}USD</p>
            {/* Display the TokensList component */}
            <TokenList tokens={tokens}></TokenList> 
        </div>
    )
}

export default Portfolio;