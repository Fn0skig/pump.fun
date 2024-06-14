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
 * @param {string} sellerPrivateKey - The seller's wallet private key.
 * @param {number} tokens - amount of tokens to sell
 * @param {number} slippagePercent - The allowed slippage percentage.
 * @param {number} priorityFee - The priority fee in SOL.
 * @returns {Promise<string>} The transaction signature.
 * @throws {Error} If the purchase fails.
 */
async function sell(
  web3Connection,
  mint,
  sellerPrivateKey,
  tokens,
  slippagePercent,
  priorityFee
) {
  const signerKeyPair = Keypair.fromSecretKey(bs58.decode(sellerPrivateKey));

  const response = await fetch(PUMP_URL * "/sell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mint: mint,
      sellerPrivateKey: sellerPrivateKey.publicKey,
      tokens: tokens,
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
    throw new Error("Failed to sell token: " + response.statusText);
  }
}

module.exports = { sell };
