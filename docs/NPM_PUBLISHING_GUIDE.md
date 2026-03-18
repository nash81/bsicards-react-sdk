# 📦 React SDK - NPM Publishing Guide

## Current Status

The React SDK exists on GitHub but is **NOT yet published to npm**.

```
Current: npm install github:nash81/bsicards-react-sdk  ✅ Works
Desired: npm install @nash81/bsicards-react-sdk        ⏳ Need to publish
```

---

## Step-by-Step: Publish to npm

### Step 1: Create npm Account (If You Don't Have One)

```bash
npm adduser
```

**You'll be prompted for:**
- Username: `nash81`
- Password: (your npm password)
- Email: `cs@bsigroup.tech`

**Verify you can login:**
```bash
npm whoami
# Should output: nash81
```

---

### Step 2: Verify package.json is Correct

**Location:** `D:\BSI\SDK\React\package.json`

**Current content should be:**
```json
{
  "name": "@nash81/bsicards-react-sdk",
  "version": "1.1.0",
  "description": "React SDK for BSICARDS Card Issuance API",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/nash81/bsicards-react-sdk.git"
  },
  "homepage": "https://github.com/nash81/bsicards-react-sdk",
  "author": "BSI Group <cs@bsigroup.tech>",
  "license": "MIT"
}
```

---

### Step 3: Build the Package

```bash
cd D:\BSI\SDK\React
npm install
npm run build
```

**This creates:**
```
dist/
├── index.js           # ESM module
├── index.cjs          # CommonJS
└── index.d.ts         # TypeScript definitions
```

**Verify build succeeded:**
```bash
ls dist/
# Should show: index.js, index.cjs, index.d.ts
```

---

### Step 4: Test Locally Before Publishing

```bash
# Create a test directory
mkdir test-install
cd test-install
npm init -y

# Install from local build
npm install ../bsicards-react-sdk

# Verify it imports correctly
node -e "const bsi = require('bsicards-react-sdk'); console.log('Success!')"
```

---

### Step 5: Publish to npm

```bash
cd D:\BSI\SDK\React
npm publish --access public
```

**Expected output:**
```
> @nash81/bsicards-react-sdk@1.1.0
> npm publish

npm notice 📦  @nash81/bsicards-react-sdk@1.1.0
npm notice === Tarball Contents ===
npm notice 714B  package.json
...
npm notice === Dist Files ===
npm notice 12.5kB  dist/index.js
npm notice 10.2kB  dist/index.cjs
npm notice 5.3kB   dist/index.d.ts
npm notice 📤 Uploaded to https://registry.npmjs.org/
npm notice visit https://www.npmjs.com/package/@nash81/bsicards-react-sdk to see the package
```

---

### Step 6: Verify Publication

```bash
# Check npm package info
npm info @nash81/bsicards-react-sdk

# Should output:
# @nash81/bsicards-react-sdk@1.1.0 | MIT | deps: 0 | versions 1
# https://www.npmjs.com/package/@nash81/bsicards-react-sdk
```

**Or visit:** https://www.npmjs.com/package/@nash81/bsicards-react-sdk

---

### Step 7: Test Installation from npm

```bash
# Create a new test directory
mkdir test-npm-install
cd test-npm-install
npm init -y

# Now this should work!
npm install @nash81/bsicards-react-sdk

# Verify
ls node_modules/@nash81/bsicards-react-sdk/
```

---

## 🎯 After Publishing

### Update Documentation

Update the main README to show npm installation:

**README.md should say:**
```markdown
## Installation

```bash
npm install @nash81/bsicards-react-sdk
```
```

### Create a GitHub Release

```bash
cd D:\BSI\SDK\React
git tag -a v1.1.0 -m "Version 1.1.0 - Digital Visa Wallet release"
git push origin v1.1.0
```

### Announce the Release

- Add to GitHub releases page
- Update documentation
- Notify users

---

## 🔄 Future Updates

### To Release Version 1.0.1

```bash
# Update version in package.json
# Change: "version": "1.0.1"

npm run build
npm publish --access public
git tag -a v1.0.1 -m "Version 1.0.1 - Bug fixes"
git push origin v1.0.1
```

---

## 📊 What npm Does

When you publish to npm:

```
Your Local Code (D:\BSI\SDK\React)
         ↓
npm publish
         ↓
npm Registry (registry.npmjs.org)
         ↓
Users: npm install @nash81/bsicards-react-sdk
         ↓
User's node_modules/@nash81/bsicards-react-sdk
```

---

## ✅ Checklist for npm Publishing

- [ ] npm account created (`npm whoami` returns `nash81`)
- [ ] package.json has correct name: `@nash81/bsicards-react-sdk`
- [ ] package.json has `"publishConfig": { "access": "public" }`
- [ ] `npm run build` completes without errors
- [ ] `dist/` folder contains index.js, index.cjs, index.d.ts
- [ ] Local test install works
- [ ] `npm publish --access public` succeeds
- [ ] Package visible on npmjs.com
- [ ] `npm install @nash81/bsicards-react-sdk` works
- [ ] Documentation updated with npm install command
- [ ] GitHub release tag created

---

## 🚀 One-Command Summary

```bash
cd D:\BSI\SDK\React
npm install                    # Install dependencies
npm run build                  # Build the package
npm publish --access public    # Publish to npm
```

After this, anyone can run:
```bash
npm install @nash81/bsicards-react-sdk
```

---

## 🔗 Links

- **npm Package:** https://www.npmjs.com/package/@nash81/bsicards-react-sdk (after publishing)
- **GitHub Repo:** https://github.com/nash81/bsicards-react-sdk
- **npm Docs:** https://docs.npmjs.com/cli/publish

---

## ⚠️ Important Notes

1. **Public vs Private**
   - Publishing is PUBLIC (anyone can see it)
   - Use `--access public` flag for scoped packages
   - Cannot undo a public publish

2. **Version Numbers**
   - Follow semantic versioning (1.0.0, 1.0.1, 1.1.0, 2.0.0)
   - npm prevents re-publishing same version
   - Each new publish needs version bump

3. **Build Files**
   - Always run `npm run build` before publishing
   - Never publish without dist/ folder
   - dist/ folder should be in .gitignore (not in git)

---

## 🎊 After Publishing

Once published to npm, developers can:

```bash
# Install latest version
npm install @nash81/bsicards-react-sdk

# Install specific version
npm install @nash81/bsicards-react-sdk@1.1.0

# Save in package.json
npm install --save @nash81/bsicards-react-sdk

# Use in projects
import { BSICardsClient } from '@nash81/bsicards-react-sdk';
```

---

**Ready to publish? Run the one-command summary above! 🚀**

