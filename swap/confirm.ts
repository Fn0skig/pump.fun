import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";

export async function sendAndConfirm(
  web3Connection: Connection,
  data: ArrayBuffer,
  signer: Keypair
) {
  const tx = VersionedTransaction.deserialize(new Uint8Array(data));
  tx.sign([signer]);
  console.log("   ✅ - Transaction Signed");
  const signature = await web3Connection.sendRawTransaction(tx.serialize(), {
    maxRetries: 10,
    skipPreflight: true,
  });
  console.log("   ✅ - Transaction sent to network");

  let tries = 10;
  while (tries >= 0) {
    const status = await web3Connection.getSignatureStatus(signature);
    if (status?.value?.confirmationStatus === "confirmed") {
      console.log(
        "🎉 Transaction Succesfully Confirmed!",
        "\n",
        `https://solscan.io/tx/${signature}`
      );
      return signature;
    }

    console.log("   ⏳ - Waiting for transaction confirmation...");

    // wait 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }
  console.log("   ❌ - Transaction not confirmed.");
  return signature;
}
