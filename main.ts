// "The World Today" — Wednesday 25 November 2026.
// make.fun bounty: "Sum up 25 November's world news in one image".
//
// The judged picture is entry.png, checked in next to this file. When the
// grader runs this program, it drops an exact copy of that picture into the
// output folder the grader names. Nothing is drawn or fetched at run time:
// the program just copies bytes that already exist in the repository, so
// two runs always produce the same file.

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";

const picturePath = fileURLToPath(new URL("./entry.png", import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = `${outDir}/entry.png`;

if (!existsSync(picturePath)) {
  throw new Error(`entry.png not found beside main.ts: ${picturePath}`);
}

const bytes = readFileSync(picturePath);
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, bytes);

const written = statSync(outPath).size;
if (written !== bytes.length) {
  throw new Error(`short write: ${written} of ${bytes.length} bytes`);
}

console.log(`wrote ${written} bytes to ${outPath}`);
console.log(`sha256 ${createHash("sha256").update(bytes).digest("hex")}`);
