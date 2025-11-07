# 🪙 Nova Chain Token Registry

A community-maintained registry of all verified **TokenX-v1** assets on the Nova blockchain.

This repository contains a single [`registry.json`](./registry.json) file listing **every token** on Nova Mainnet and Testnet. Wallets, explorers, and DEX frontends can use this file to display token names, logos, and metadata consistently.

---

## 📘 Structure

token-registry/
├─ registry.json ← single file containing all tokens
├─ registry.schema.json ← validation schema
├─ images/ ← optional logos (PNG/SVG)
├─ scripts/ ← validation + formatting tools
└─ .github/workflows/ ← automated CI checks

yaml
Copy code

---

## ⚙️ Schema Overview

Each entry in `registry.json` looks like this:

```json
{
  "symbol": "LOG",
  "name": "LOG Coin",
  "decimals": 9,
  "mint_authority": "nova1xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "logo": "https://raw.githubusercontent.com/nova-chain/token-registry/main/images/LOG.png",
  "uri": "https://docs.nova-chain.org/tokens/LOG",
  "extensions": {
    "description": "Governance/backing token for Nova.",
    "website": "https://nova-chain.org",
    "twitter": "https://x.com/novachain"
  }
}
🧱 Registry Fields
Field	Type	Description
symbol	string	Unique ticker (A-Z, 0-9, _, max 16 chars).
name	string	Full token name.
decimals	integer	Decimal precision (0–18).
mint_authority	string	Nova address that created or controls the token.
logo	string (URL)	Optional PNG/SVG logo.
uri	string (URL)	Optional external metadata or docs link.
extensions	object	Optional social or descriptive fields (website, twitter, discord, description).

🧩 Validation Rules
Each token symbol must be unique.

mint_authority must be a valid nova1... address.

URLs must be valid https:// links.

decimals, symbol, and mint_authority cannot be changed after approval.

Automated validation runs on every pull request using registry.schema.json.

🔄 How to Submit a Token
Fork this repo.

Edit registry.json:
Add your token object inside the "tokens" array (keep alphabetical order by symbol).

(Optional) Add a logo to /images/ and reference its URL.

Commit and open a Pull Request.

CI will automatically check schema and duplicates.

Maintainers verify your token on-chain before merging.

Example PR snippet
json
Copy code
{
  "symbol": "NOVA",
  "name": "Nova Coin",
  "decimals": 9,
  "mint_authority": "nova1abcd1234...",
  "logo": "https://raw.githubusercontent.com/nova-chain/token-registry/main/images/NOVA.png"
}
🌐 How Wallets / Apps Use It
Wallets and explorers can fetch the live registry at:

arduino
Copy code
https://raw.githubusercontent.com/nova-chain/token-registry/main/registry.json
or via GitHub Pages (if enabled):

arduino
Copy code
https://nova-chain.github.io/token-registry/registry.json
Example client snippet:

ts
Copy code
async function loadRegistry() {
  const res = await fetch("https://nova-chain.github.io/token-registry/registry.json", { cache: "no-cache" });
  const { tokens } = await res.json();
  const map = {};
  for (const t of tokens) map[t.symbol] = t;
  return map;
}
🛡️ Governance & Safety
All PRs require review from Nova maintainers.

CI checks ensure schema validity and alphabetical ordering.

Immutability: decimals and mint_authority cannot be modified after approval.

Logo policy: must be under 200 KB, safe for all audiences, PNG/SVG preferred.

Mainnet vs Testnet: tokens for test environments must set "chain": "nova-testnet".

🧰 Developer Tools
Run locally:

bash
Copy code
npm install ajv ajv-formats
node scripts/validate.mjs
node scripts/format.mjs
🪩 License
MIT License © 2025 Nova Chain Contributors
Logos and trademarks belong to their respective owners.

💡 Inspired by Solana-Labs’ token-list, re-imagined for Nova’s TokenX-v1 architecture.
