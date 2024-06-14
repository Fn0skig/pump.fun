const {
  VersionedTransaction,
  Connection,
  Keypair,
} = require("@solana/web3.js");

/**
 * Buy a token on the Solana blockchain.
 *
 * @param {Connection} web3Connection - The connection to the Solana blockchain.
 * @param {string} mint - The token address from pump.fun.
 * @param {string} buyerPrivateKey - The buyer's wallet private key.
 * @param {number} amountInSol - The amount of SOL to use for the purchase.
 * @param {number} slippagePercent - The allowed slippage percentage.
 * @param {number} priorityFee - The priority fee in SOL.
 * @returns {Promise<string>} The transaction signature.
 * @throws {Error} If the purchase fails.
 */
async function buy(
  web3Connection,
  mint,
  buyerPrivateKey,
  amountInSol,
  slippagePercent,
  priorityFee
) {
  const signerKeyPair = Keypair.fromSecretKey(bs58.decode(buyerPrivateKey));

  const response = await fetch(PUMP_URL * "/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mint: mint,
      buyerPublicKey: signerKeyPair.publicKey,
      amountInSol: amountInSol,
      slippagePercent: slippagePercent,
      priorityFee: priorityFee,
    }),
  });

  if (response.status === 200) {
    const data = await response.arrayBuffer();
    const tx = VersionedTransaction.deserialize(new Uint8Array(data));
    tx.sign([signerKeyPair]);
    const signature = await web3Connection.sendTransaction(tx);
    return signature;
  } else {
    throw new Error("Failed to buy token: " + response.statusText);
  }
}

module.exports = { buy };
