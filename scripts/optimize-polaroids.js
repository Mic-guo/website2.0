/**
 * One-shot optimizer for polaroid images.
 *
 * Reads every IMG_*.jpeg in public/images and writes a downscaled WebP next
 * to it (IMG_*.webp). The originals are left untouched so you can re-run
 * the script later with different sizing if needed.
 *
 * Usage: `node scripts/optimize-polaroids.js`
 */
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const IMAGES_DIR = join(__dirname, "..", "public", "images");

// Polaroids end up rendered at a few hundred px tall at most, so 800 px on the
// long edge is plenty and keeps file sizes tiny.
const MAX_EDGE = 800;
const QUALITY = 78;

async function optimizeOne(filePath) {
  const { dir, name } = parse(filePath);
  const outPath = join(dir, `${name}.webp`);

  const before = (await stat(filePath)).size;
  await sharp(filePath)
    .rotate() // respect EXIF orientation so portraits stay portrait
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toFile(outPath);
  const after = (await stat(outPath)).size;

  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  console.log(
    `${name}.jpeg ${kb(before).padStart(8)}  →  ${name}.webp ${kb(after).padStart(8)}  (${(
      (1 - after / before) *
      100
    ).toFixed(1)}% smaller)`
  );

  return { before, after };
}

async function main() {
  const entries = await readdir(IMAGES_DIR);
  const jpegs = entries
    .filter((f) => /^IMG_\d+\.jpe?g$/i.test(f))
    .sort((a, b) => {
      const na = Number(a.match(/\d+/)[0]);
      const nb = Number(b.match(/\d+/)[0]);
      return na - nb;
    });

  if (jpegs.length === 0) {
    console.warn(`No IMG_*.jpeg files found in ${IMAGES_DIR}`);
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  for (const file of jpegs) {
    const { before, after } = await optimizeOne(join(IMAGES_DIR, file));
    totalBefore += before;
    totalAfter += after;
  }

  const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
  console.log(
    `\nDone. ${jpegs.length} images: ${mb(totalBefore)} → ${mb(totalAfter)} (${(
      (1 - totalAfter / totalBefore) *
      100
    ).toFixed(1)}% smaller).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
