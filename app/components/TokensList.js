//function that displays 'TokenList' a list of tokens that includes their amount of shares and USD values of tokens
function TokensList({tokens}) {
    return (
        <div>
            <h3 className="text-xl mt-2 mb-4 font-semibold">Tokens:</h3>
            
            {/* List of tokens */}
            <ul>
                {/* go through each token and display name, amount, value in usd */}
                {tokens.map((token, index) => ( 
                    <li key={index}
                        className="bg-gray-500 p-4  m-4 rounded-lg shadow-md flex justify-between items-center">
                        <div className="text-sm font-medium">{token.name}</div>
                        <div className="text-sm">
                        Amount: {token.amount} | ${token.usdValue.toFixed(2)}
            </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TokensList;

