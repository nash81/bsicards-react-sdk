# BSICARDS React SDK - Complete Documentation

A TypeScript/React SDK for the BSICARDS Card Issuance API with full support for MasterCard, Visa, Digital Wallet, and Administrator operations.

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Install from npm (when published)

```bash
npm install @nash81/bsicards-react-sdk
```

### Or install from GitHub (development)

```bash
npm install github:nash81/bsicards-react-sdk
```

## Configuration

Create a `.env` file in your React project:

```env
REACT_APP_BSICARDS_PUBLIC_KEY=your_public_key
REACT_APP_BSICARDS_SECRET_KEY=your_secret_key
```

## Usage

### Option 1: Direct Client Usage

```typescript
import { BSICardsClient } from '@nash81/bsicards-react-sdk';

const client = new BSICardsClient({
  publicKey: process.env.REACT_APP_BSICARDS_PUBLIC_KEY,
  secretKey: process.env.REACT_APP_BSICARDS_SECRET_KEY
});

async function getVisaCards() {
  const response = await client.visaGetAllCards('user@example.com');
  console.log(response);
}
```

### Option 2: React Provider + Hooks (Recommended)

```tsx
import React from 'react';
import { BSICardsProvider, useBSICards } from '@nash81/bsicards-react-sdk';

function CardsList() {
  const { visaGetAllCards } = useBSICards();

  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await visaGetAllCards('user@example.com');
      setCards(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={loadCards} disabled={loading}>
        {loading ? 'Loading...' : 'Load Visa Cards'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cards.map((card: any) => (
          <li key={card.cardid}>{card.cardholderName} - {card.balance}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <BSICardsProvider
      config={{
        publicKey: process.env.REACT_APP_BSICARDS_PUBLIC_KEY,
        secretKey: process.env.REACT_APP_BSICARDS_SECRET_KEY
      }}
    >
      <CardsList />
    </BSICardsProvider>
  );
}
```

## API Reference

### MasterCard Operations

```typescript
// Create a new MasterCard
await client.mastercardCreateCard('user@example.com', 'John Doe', '1234');

// Get all MasterCards
await client.mastercardGetAllCards('user@example.com');

// Get pending MasterCards
await client.mastercardGetPendingCards('user@example.com');

// Get card details
await client.mastercardGetCard('user@example.com', 'card-id');

// Get card transactions
await client.mastercardGetTransactions('user@example.com', 'card-id');

// Change PIN
await client.mastercardChangePin('user@example.com', 'card-id', '5678');

// Freeze/Unfreeze card
await client.mastercardFreezeCard('user@example.com', 'card-id');
await client.mastercardUnfreezeCard('user@example.com', 'card-id');

// Fund card (minimum $10.00)
await client.mastercardFundCard('user@example.com', 'card-id', '50.00');
```

### Visa Card Operations

```typescript
// Create a Visa card
await client.visaCreateCard(
  'user@example.com',
  'John Doe',
  'ID123456',
  'https://example.com/id.jpg',
  'https://example.com/photo.jpg',
  '1990-01-15'
);

// Get all Visa cards
await client.visaGetAllCards('user@example.com');

// Get pending Visa cards
await client.visaGetPendingCards('user@example.com');

// Get card details
await client.visaGetCard('user@example.com', 'card-id');

// Get card transactions
await client.visaGetTransactions('user@example.com', 'card-id');

// Freeze/Unfreeze
await client.visaFreezeCard('user@example.com', 'card-id');
await client.visaUnfreezeCard('user@example.com', 'card-id');

// Fund card
await client.visaFundCard('user@example.com', 'card-id', '100.00');
```

### Digital Wallet Operations

```typescript
// Create virtual card
await client.digitalCreateVirtualCard({
  useremail: 'user@example.com',
  firstname: 'John',
  lastname: 'Doe',
  dob: '1990-01-15',
  address1: '128 City Road',
  postalcode: 'EC1V 2NX',
  city: 'London',
  country: 'GB',
  state: 'England',
  countrycode: '44',
  phone: '2071234567'
});

// Get all virtual cards
await client.digitalGetAllCards('user@example.com');

// Get card details
await client.digitalGetCard('user@example.com', 'card-id');

// Fund card
await client.digitalFundCard('user@example.com', 'card-id', '75.00');

// Freeze/Unfreeze
await client.digitalFreezeCard('user@example.com', 'card-id');
await client.digitalUnfreezeCard('user@example.com', 'card-id');

// 3DS Operations
await client.digitalCheck3DS('user@example.com');
await client.digitalApprove3DS('user@example.com', 'card-id', 'event-id');

// Card Management
await client.digitalTerminateCard('user@example.com', 'card-id');
await client.digitalCreateAddonCard('user@example.com', 'card-id');

// Loyalty Points
await client.digitalGetLoyaltyPoints('user@example.com', 'card-id');
await client.digitalRedeemPoints('user@example.com', 'card-id');
```

### Administrator Operations

```typescript
// Get wallet balance
const balance = await client.getWalletBalance();

// Get deposits
const deposits = await client.getDeposits();

// Get all transactions
const transactions = await client.getTransactions();

// Get all card types
const visaCards = await client.getAllVisaCards();
const mastercards = await client.getAllMastercards();
const digitalCards = await client.getAllDigitalCards();
```

## Error Handling

```typescript
import { BSICardsError, BSICardsValidationError } from '@nash81/bsicards-react-sdk';

try {
  await client.visaGetAllCards('user@example.com');
} catch (error) {
  if (error instanceof BSICardsValidationError) {
    console.error('Validation error:', error.message);
  } else if (error instanceof BSICardsError) {
    console.error('API error:', error.message, error.code);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Response Format

All API responses follow this format:

```typescript
interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data?: T;
}
```

Example:
```typescript
{
  "code": 200,
  "status": "success",
  "message": "Operation completed",
  "data": { /* response data */ }
}
```

## Development

### Clone and setup

```bash
git clone https://github.com/nash81/bsicards-react-sdk.git
cd bsicards-react-sdk
npm install
```

### Run tests

```bash
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
```

### Type checking

```bash
npm run lint
```

### Build

```bash
npm run build
```

### Example runner

```bash
# Create .env with your credentials
cp .env.example .env
# Edit .env with your public and secret keys

# Run example
npx ts-node examples/runner.ts
```

## Environment Variables

For development/testing:

```env
BSICARDS_PUBLIC_KEY=your_public_key
BSICARDS_SECRET_KEY=your_secret_key
```

For React applications:

```env
REACT_APP_BSICARDS_PUBLIC_KEY=your_public_key
REACT_APP_BSICARDS_SECRET_KEY=your_secret_key
```

## File Structure

```
src/
├── types.ts           # TypeScript interfaces
├── errors.ts          # Custom error classes
├── client.ts          # Main BSICardsClient
├── react.tsx          # React provider and hooks
└── index.ts           # Public exports

tests/
├── client.test.ts     # Unit tests

examples/
└── runner.ts          # Example usage

package.json           # NPM metadata
tsconfig.json          # TypeScript configuration
vitest.config.ts       # Test configuration
```

## Features

✅ **All 4 API Categories Implemented**
- MasterCard (9 methods)
- Visa (8 methods)
- Digital Wallet (12 methods)
- Administrator (6 methods)

✅ **Modern JavaScript**
- TypeScript for type safety
- Async/await syntax
- ES modules

✅ **React Integration**
- Context-based provider
- Custom hooks
- Easy integration with functional components

✅ **Error Handling**
- Custom error types
- Detailed error messages
- Code references

✅ **Testing**
- Vitest test suite
- Mock fetch support
- Test examples included

## Base URL

The SDK uses a fixed base URL:
```
https://cards.bsigroup.tech/api/
```

All requests are authenticated with `publickey` and `secretkey` headers.

## Limitations

- Node.js 16+ required
- React 17+ for React integration
- No offline support
- Real-time only (no caching by default)

## Support

- Email: cs@bsigroup.tech
- Website: https://www.bsigroup.tech
- GitHub: https://github.com/nash81/bsicards-react-sdk
- Issues: https://github.com/nash81/bsicards-react-sdk/issues

## License

MIT - See LICENSE file

## Changelog

See CHANGELOG.md for version history.

