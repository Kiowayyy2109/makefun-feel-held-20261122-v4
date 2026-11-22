import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "You tell it the long way, and she does not look at the clock. The cup in front of you has gone cold and neither of you minds. When your voice runs out, the quiet that follows is not empty; it is hers, holding the shape of what you said until you are ready for the rest.";

function validateEntry(text: string): number {
  const points = [...text].length;
  if (points < 1 || points > 280) {
    throw new Error(`entry must be 1-280 Unicode code points, got ${points}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  return points;
}

const codePoints = validateEntry(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== TEXT) {
  throw new Error("entry.txt does not match the entry text byte-for-byte");
}
