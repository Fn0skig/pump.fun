import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import bs58 from "bs58";
import { PUMP_URL } from "../config/url";
import { sendAndConfirm } from "./confirm";

/**
 * Sell a token on the Solana blockchain.
 *
 * @param web3Connection - The connection to the Solana blockchain.
 * @param mint - The token address from pump.fun.
 * @param sellerPrivateKey - The seller's wallet private key.
 * @param tokens - amount of tokens to sell
 * @param slippagePercent - The allowed slippage percentage.
 * @param priorityFee - The priority fee in SOL.
 * @returns The transaction signature.
 * @throws If the purchase fails.
 */
async function sellPumpToken(
  web3Connection: Connection,
  mint: string,
  sellerPrivateKey: string,
  tokens: number,
  slippagePercent: number,
  priorityFee: number
) {
  const signerKeyPair = Keypair.fromSecretKey(bs58.decode(sellerPrivateKey));
  console.log("   💸 - Sending sell request to pump.fun...");
  const response = await fetch(PUMP_URL + "/sell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mint: mint,
      sellerPublicKey: signerKeyPair.publicKey,
      tokens: tokens,
      slippagePercent: slippagePercent,
      priorityFee: priorityFee,
    }),
  });

  if (response.status === 200) {
    return sendAndConfirm(
      web3Connection,
      await response.arrayBuffer(),
      signerKeyPair
    );
  } else {
    throw new Error("Failed to sell token: " + response.statusText);
  }
}

export { sellPumpToken };
