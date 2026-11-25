// One Line, One Laugh — make.fun entry
// Writes a single funny line (1-200 characters) to /output/entry.txt.
// Deterministic: the same line every run, no randomness, no network.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My bank account and I are in an open relationship: it sees other people, I never see it at all.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line must be 1-200 characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }

  mkdirSync(OUT_DIR, { recursive: true });
  // Clear stale files inside /output, but never remove /output itself.
  for (const name of readdirSync(OUT_DIR)) {
    rmSync(join(OUT_DIR, name), { recursive: true, force: true });
  }
  writeFileSync(OUT_FILE, LINE, "utf8");
  console.log(`wrote ${chars} characters to ${OUT_FILE}`);
}

main();
