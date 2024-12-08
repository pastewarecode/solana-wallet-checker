import axios from "axios"; //using coingecko api to fetch real-time prices of tokens

//declare the api url as a variable 
const CoinGecko_Base_URL = "https://api.coingecko.com/api/v3/simple/price"

//function #1 fetch price of single token in USD.
export const getTokenPrice = async (tokenId) => {
    try 
    {
        //response = get the token price by tokenId
        const response = await axios.get(`${CoinGecko_Base_URL}?ids=${tokenId}&vs_currencies=usd`);

        return response.data[tokenId]?.usd || 0;
    } 
    catch (error) 
    {
        console.error(`Error fetching price for ${tokenId}:`, error);
        throw error;
    }
};

//function #2 fetch price for multiple tokens in USD
export const getMultipleTokenPrice = async (tokenIds) => {
    try
    {
        const ids = tokenIds.join(",");

        const response = await axios.get(`${CoinGecko_Base_URL}?ids=${ids}&vs_currencies=usd`);

        return tokenIds.reduce((prices, id) => {
          prices[id] = response.data[id]?.usd || 0;
          return prices;
        }, {});
    }
    catch (error)
    {
        console.error("Error fetching token prices:", error);
        throw error;
    }
};