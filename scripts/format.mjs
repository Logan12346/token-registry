import fs from "fs";

const p = "registry.json";
const doc = JSON.parse(fs.readFileSync(p, "utf8"));

// sort by symbol
doc.tokens.sort((a, b) => a.symbol.localeCompare(b.symbol));

// bump updatedAt
doc.updatedAt = new Date().toISOString();

fs.writeFileSync(p, JSON.stringify(doc, null, 2) + "\n");
console.log("🧹 formatted registry.json");
