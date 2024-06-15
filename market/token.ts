import { Connection, PublicKey } from "@solana/web3.js";

export async function getTokenBalance(
  connection: Connection,
  publicKey: string,
  mint: string
) {
  const info = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(publicKey),
    {
      mint: new PublicKey(mint),
    }
  );
  if (!info.value) {
    return null;
  }
  const data = info.value[0].account.data;

  const decimals = data.parsed.info.tokenAmount.decimals;
  const tokenAmount = data.parsed.info.tokenAmount.amount;

  return tokenAmount / 10 ** decimals;
}
