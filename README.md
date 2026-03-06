# BSICARDS React SDK

React/TypeScript SDK for BSICARDS API with complete support for:
- MasterCard
- Visa
- Digital Wallet
- Administrator

## Install

```bash
npm install @nash81/bsicards-react-sdk
```

## Quick Start (Client)

```ts
import { BSICardsClient } from "@nash81/bsicards-react-sdk";

const client = new BSICardsClient({
  publicKey: process.env.BSICARDS_PUBLIC_KEY,
  secretKey: process.env.BSICARDS_SECRET_KEY
});

const res = await client.visaGetAllCards("test@bsigroup.tech");
console.log(res);
```

## Quick Start (React Hook)

```tsx
import { BSICardsProvider, useBSICards } from "@nash81/bsicards-react-sdk";

function VisaCards() {
  const { visaGetAllCards } = useBSICards();

  const load = async () => {
    const response = await visaGetAllCards("test@bsigroup.tech");
    console.log(response);
  };

  return <button onClick={load}>Load Visa Cards</button>;
}

export default function App() {
  return (
    <BSICardsProvider
      config={{
        publicKey: process.env.REACT_APP_BSICARDS_PUBLIC_KEY,
        secretKey: process.env.REACT_APP_BSICARDS_SECRET_KEY
      }}
    >
      <VisaCards />
    </BSICardsProvider>
  );
}
```

## API Coverage

### MasterCard
- `mastercardCreateCard`
- `mastercardGetAllCards`
- `mastercardGetPendingCards`
- `mastercardGetCard`
- `mastercardGetTransactions`
- `mastercardChangePin`
- `mastercardFreezeCard`
- `mastercardUnfreezeCard`
- `mastercardFundCard`

### Visa
- `visaCreateCard`
- `visaGetAllCards`
- `visaGetPendingCards`
- `visaGetCard`
- `visaGetTransactions`
- `visaFreezeCard`
- `visaUnfreezeCard`
- `visaFundCard`

### Digital Wallet
- `digitalCreateVirtualCard`
- `digitalGetAllCards`
- `digitalGetCard`
- `digitalFundCard`
- `digitalFreezeCard`
- `digitalUnfreezeCard`
- `digitalCheck3DS`
- `digitalApprove3DS`
- `digitalTerminateCard`
- `digitalCreateAddonCard`
- `digitalGetLoyaltyPoints`
- `digitalRedeemPoints`

### Administrator
- `getWalletBalance`
- `getDeposits`
- `getTransactions`
- `getAllVisaCards`
- `getAllMastercards`
- `getAllDigitalCards`

## Dev

```bash
npm install
npm run test
npm run build
```

## Notes

- Base URL is fixed to `https://cards.bsigroup.tech/api/` by default.
- Auth headers: `publickey` and `secretkey`.
- This SDK mirrors the current PHP SDK endpoint map in `D:\BSI\SDK\PHP\src\BSICardsClient.php`.

## License

MIT

