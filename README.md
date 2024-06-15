# pump.fun

pump.fun api wrapper

## Installation

```bash
npm install pump.fun
```

## How to use

```typescript
import { buyPumpToken, sellPumpToken, getTokenBalance } from "pump.fun";
import { Connection } from "@solana/web3.js";
const connection = new Connection("https://api.mainnet-beta.solana.com");

const signature = await buyPumpToken(
  connection,
  "pump_fun_token_address", // Pump.fun token address,
  "your_solana_private_key", // Your solana wallet private key
  0.01, // Amount of solana to spend
  25, // Slippage percent (25%)
  0.0001 // Priority fee
);
console.log(signature);

const amount = await getTokenBalance(
  connection,
  "pump_fun_token_address", // Pump.fun token address,
  "your_solana_wallet_public_address" // Your solana wallet public address
);
console.log(amount);

const signature = await sellPumpToken(
  connection,
  "pump_fun_token_address", // Pump.fun token address,
  "your_solana_private_key", // Your solana wallet private key
  amount, // Amount of pump.fun token to sell
  25, // Slippage percent (25%)
  0.0001 // Priority fee
);
```

**It's that simple!**

In the background the library will handle all the necessary steps to buy and sell pump.fun tokens. and utalizing the [pumpdata.fun](https://github.com/Fn0skig/api.pump.fun) rest api to create the transaction data.

### Features 🎉

- Buy/sell with your own rpc and wallet 💸
- Get token balance 📊

- Managed wallet buy/sell - in progress
- Wallet creation api - in progress
- Token creating api - in progress

## **FEES**

We take **0.45%** fee for each transaction (cheapest on the market), if your building something for the public we are always open to discuss pricing

## **GET IN TOUCH**

[telegram](https://t.me/+GzHpjFuw1iVhMWZk)
