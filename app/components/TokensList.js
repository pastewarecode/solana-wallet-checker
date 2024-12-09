//function that displays 'TokenList' a list of tokens that includes their amount of shares and USD values of tokens
function TokensList({tokens}) {
    return (
        <div>
            <h3 className="text-xl mt-2">Tokens:</h3>
            
            {/* List of tokens */}
            <ul>
                {/* go through each token and display name, amount, value in usd */}
                {tokens.map((token, index) => ( 
                    <li key={index}>
                        {token.name}: {token.amount} (${token.usdValue.toFixed(2)})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TokensList;

