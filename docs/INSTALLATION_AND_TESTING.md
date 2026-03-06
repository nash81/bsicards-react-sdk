# BSICARDS React SDK - Installation & Testing Guide

## 📥 Installation Methods

### Method 1: Install from GitHub Repository (PRIMARY)

The SDK is installed directly from the GitHub repository:

```bash
npm install github:nash81/bsicards-react-sdk
```

**Install specific versions:**

```bash
npm install github:nash81/bsicards-react-sdk#main
npm install github:nash81/bsicards-react-sdk#v1.0.0
```

**In package.json:**

```json
{
  "dependencies": {
    "@nash81/bsicards-react-sdk": "github:nash81/bsicards-react-sdk"
  }
}
```

### Method 2: Clone for Development

To clone and develop the SDK locally:

## Prerequisites

- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher (or yarn/pnpm)
- **Git**: For cloning the repository

## Step 1: Clone the Repository (For Development)

```bash
git clone https://github.com/nash81/bsicards-react-sdk.git
cd bsicards-react-sdk
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `typescript` - TypeScript compiler
- `vitest` - Testing framework
- `tsup` - Build tool
- Development dependencies

## Step 3: Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your BSICARDS credentials:

```env
BSICARDS_PUBLIC_KEY=your_actual_public_key_here
BSICARDS_SECRET_KEY=your_actual_secret_key_here
```

## Step 4: Build the SDK

```bash
npm run build
```

This creates:
- `dist/index.js` - ES module build
- `dist/index.cjs` - CommonJS build
- `dist/index.d.ts` - TypeScript definitions

## Step 5: Run Tests

### Run tests once:

```bash
npm run test
```

Expected output:
```
✓ tests/client.test.ts (3)
  ✓ throws when credentials are missing
  ✓ calls visa get all endpoint with required payload
  ✓ implements administrator GET endpoint
  ✓ implements digital 3ds approval endpoint

Test Files  1 passed (1)
     Tests  4 passed (4)
```

### Run tests in watch mode (for development):

```bash
npm run test:watch
```

## Step 6: Type Checking

```bash
npm run lint
```

Ensures all TypeScript files compile without errors.

## Step 7: Test with Example Runner

```bash
npx ts-node examples/runner.ts
```

This runs the example in `examples/runner.ts` which demonstrates:
- Creating a client instance
- Calling `visaGetAllCards()`
- Calling `getWalletBalance()`

Output will show API responses if credentials are valid.

## Project Structure After Install

```
bsicards-react-sdk/
├── node_modules/          # Dependencies (created by npm install)
├── dist/                  # Build output (created by npm run build)
├── src/
│   ├── types.ts          # TypeScript types
│   ├── errors.ts         # Error classes
│   ├── client.ts         # Main client (35 methods)
│   ├── react.tsx         # Provider & hooks
│   └── index.ts          # Public exports
├── tests/
│   └── client.test.ts    # Unit tests (4 test cases)
├── examples/
│   └── runner.ts         # Example usage
├── docs/
│   └── COMPLETE_GUIDE.md # Full documentation
├── .env                  # Your credentials (create from .env.example)
├── .env.example          # Template
├── .gitignore
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── README.md
├── LICENSE
└── CHANGELOG.md
```

## Available NPM Scripts

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run build` | Build the SDK |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Check TypeScript types |
| `npm run prepublishOnly` | Lint → Test → Build (for publishing) |
| `npx ts-node examples/runner.ts` | Run example code |

## Troubleshooting

### "Module not found" error

```bash
# Ensure node_modules is installed
npm install

# Rebuild if needed
npm run build
```

### Tests fail with "fetch is not defined"

The test environment uses Node 18+ which has built-in fetch. If using older Node, install:

```bash
npm install --save-dev node-fetch
```

### TypeScript errors

```bash
# Check current issues
npm run lint

# Fix by re-installing
rm -rf node_modules package-lock.json
npm install
```

### Cannot read environment variables

Ensure `.env` file exists:

```bash
ls -la .env

# Should output something like:
# -rw-r--r--  1 user  group  123 Mar  6 12:00 .env
```

## Integration with React App

### Create a new React app:

```bash
npx create-react-app my-bsicards-app
cd my-bsicards-app
npm install github:nash81/bsicards-react-sdk
```

### Use in your React component:

```tsx
import { BSICardsProvider, useBSICards } from '@nash81/bsicards-react-sdk';

function MyCardComponent() {
  const { visaGetAllCards } = useBSICards();

  const loadCards = async () => {
    const response = await visaGetAllCards('test@bsigroup.tech');
    console.log(response);
  };

  return <button onClick={loadCards}>Load Cards</button>;
}

export default function App() {
  return (
    <BSICardsProvider
      config={{
        publicKey: process.env.REACT_APP_BSICARDS_PUBLIC_KEY,
        secretKey: process.env.REACT_APP_BSICARDS_SECRET_KEY
      }}
    >
      <MyCardComponent />
    </BSICardsProvider>
  );
}
```

## Performance Tips

1. **Memoize client creation**:
   ```tsx
   const client = useMemo(() => new BSICardsClient(config), [config]);
   ```

2. **Use error boundaries**:
   ```tsx
   <ErrorBoundary>
     <CardsList />
   </ErrorBoundary>
   ```

3. **Add loading states**:
   ```tsx
   const [loading, setLoading] = useState(false);
   ```

## Next Steps

1. Read [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md) for full API reference
2. Check [examples/runner.ts](../examples/runner.ts) for usage patterns
3. Review [src/client.ts](../src/client.ts) for implementation details
4. Explore [tests/client.test.ts](../tests/client.test.ts) for test examples

## Support

If you encounter issues:

1. Check that credentials are correct in `.env`
2. Verify Node.js version: `node --version` (should be 16+)
3. Clear and reinstall: `rm -rf node_modules && npm install`
4. Check GitHub issues: https://github.com/nash81/bsicards-react-sdk/issues
5. Email support: cs@bsigroup.tech

