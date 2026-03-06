# BSICARDS React SDK

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/nash81/bsicards-react-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17+-61dafb)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A complete TypeScript/React SDK for the **BSICARDS Card Issuance API** with support for:

✅ **MasterCard** (9 methods)
✅ **Visa** (8 methods)
✅ **Digital Wallet** (12 methods)
✅ **Administrator** (6 methods)

## 📚 Documentation

- **[Installation & Testing Guide](docs/INSTALLATION_AND_TESTING.md)** - Step-by-step setup and testing
- **[Complete API Reference](docs/COMPLETE_GUIDE.md)** - Full API documentation with examples
- **[npm Publishing Guide](docs/NPM_PUBLISHING_GUIDE.md)** - How to publish to npm registry
- **[Quick Start](#quick-start)** - Get started in 5 minutes below

## 🚀 Quick Start

### Install from GitHub Repository

```bash
npm install github:nash81/bsicards-react-sdk
```

Or with a specific version/branch:

```bash
npm install github:nash81/bsicards-react-sdk#main
npm install github:nash81/bsicards-react-sdk#v1.0.0
```

### Setup Environment

Create `.env`:

```env
BSICARDS_PUBLIC_KEY=your_public_key
BSICARDS_SECRET_KEY=your_secret_key
```

### Client Usage

```ts
import { BSICardsClient } from "@nash81/bsicards-react-sdk";

const client = new BSICardsClient({
  publicKey: process.env.BSICARDS_PUBLIC_KEY,
  secretKey: process.env.BSICARDS_SECRET_KEY
});

// Create MasterCard
const response = await client.mastercardCreateCard(
  "user@example.com",
  "John Doe",
  "1234"
);

// Get Visa Cards
const visaCards = await client.visaGetAllCards("user@example.com");

// Get Wallet Balance (Admin)
const balance = await client.getWalletBalance();
```

### React Hooks Usage

```tsx
import { BSICardsProvider, useBSICards } from "@nash81/bsicards-react-sdk";
import React from "react";

function CardComponent() {
  const { visaGetAllCards } = useBSICards();
  const [cards, setCards] = React.useState([]);

  const load = async () => {
    const response = await visaGetAllCards("user@example.com");
    setCards(response.data || []);
  };

  return (
    <div>
      <button onClick={load}>Load Visa Cards</button>
      <ul>
        {cards.map((card: any) => (
          <li key={card.cardid}>{card.cardholderName}</li>
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
      <CardComponent />
    </BSICardsProvider>
  );
}
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Type checking
npm run lint

# Build
npm run build

# Run example
npx ts-node examples/runner.ts
```

## 📦 API Categories

### MasterCard Operations
Create, list, get details, transactions, change PIN, freeze/unfreeze, fund cards

### Visa Operations
Create, list, get details, transactions, freeze/unfreeze, fund cards

### Digital Wallet Operations
Create virtual cards, 3DS operations, loyalty points, addon cards, and more

### Administrator Operations
Get wallet balance, deposits, transactions, list all cards by type

## ✨ Features

- ✅ 35+ API methods implemented
- ✅ Full TypeScript support
- ✅ React hooks & provider for easy integration
- ✅ Custom error handling
- ✅ Unit tests with Vitest
- ✅ Built-in async/await support
- ✅ Modern ES modules
- ✅ Production-ready

## 📋 Requirements

- Node.js 16.0.0+
- npm 7.0.0+
- React 17.0.0+ (for React integration)

## 🔗 Links

- **GitHub Repository**: https://github.com/nash81/bsicards-react-sdk
- **API Docs**: https://www.bsigroup.tech
- **Support Email**: cs@bsigroup.tech

## 🚀 Future: npm Registry Publishing

Once published to npm registry, you can install with:
```bash
npm install @nash81/bsicards-react-sdk
```

See [docs/NPM_PUBLISHING_GUIDE.md](docs/NPM_PUBLISHING_GUIDE.md) for publishing to npm.

## 📄 License

MIT - See [LICENSE](LICENSE)

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history

