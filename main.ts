import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Letter for Your Day.
// The letter is Z, standing for "zero sleep" (zonked): a day — and the
// night before it — with no sleep at all, spent building until dawn.
// Z is the sharp pick: a concrete fact about the day, not a vague mood.
const LETTER = "Z";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (!/^[A-Z]$/.test(LETTER)) {
  console.error("letter must be exactly one A-Z character");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LETTER, "utf8");

// Read it back: the gate demands exactly one A-Z character, nothing else.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LETTER) {
  console.error("verification failed: entry.txt does not hold exactly the letter");
  process.exit(1);
}
