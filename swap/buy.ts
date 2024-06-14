import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import bs58 from "bs58";
import { PUMP_URL } from "../config/url";

/**
 * Buy a token on the Solana blockchain.
 *
 * @param web3Connection - The connection to the Solana blockchain.
 * @param mint - The token address from pump.fun.
 * @param buyerPrivateKey - The buyer's wallet private key.
 * @param amountInSol - The amount of SOL to use for the purchase.
 * @param slippagePercent - The allowed slippage percentage.
 * @param priorityFee - The priority fee in SOL.
 * @returns The transaction signature.
 * @throws If the purchase fails.
 */
async function buyPumpToken(
  web3Connection: Connection,
  mint: string,
  buyerPrivateKey: string,
  amountInSol: string,
  slippagePercent: number,
  priorityFee: number
) {
  const signerKeyPair = Keypair.fromSecretKey(bs58.decode(buyerPrivateKey));

  const response = await fetch(PUMP_URL + "/buy", {
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

export { buyPumpToken };
