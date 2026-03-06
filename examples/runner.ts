import { BSICardsClient } from "../src";

async function main() {
  const client = new BSICardsClient({
    publicKey: process.env.BSICARDS_PUBLIC_KEY,
    secretKey: process.env.BSICARDS_SECRET_KEY
  });

  const email = "test@bsigroup.tech";

  const visaCards = await client.visaGetAllCards(email);
  console.log("Visa get-all-cards response:", visaCards);

  const wallet = await client.getWalletBalance();
  console.log("Wallet response:", wallet);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

