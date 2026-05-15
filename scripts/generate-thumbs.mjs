import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_ROOT = path.resolve("src/assets/gallery");
const TARGET_ROOT = path.resolve("src/assets/gallery-thumbs");
const MAX_WIDTH = 640;
const QUALITY = 70;
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (!SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

async function generateThumbnail(sourcePath) {
  const relativePath = path.relative(SOURCE_ROOT, sourcePath);
  const targetPath = path.join(TARGET_ROOT, relativePath).replace(/\.[^.]+$/, ".webp");

  await mkdir(path.dirname(targetPath), { recursive: true });

  await sharp(sourcePath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(targetPath);

  return targetPath;
}

async function main() {
  const sourceImages = await walk(SOURCE_ROOT);

  if (sourceImages.length === 0) {
    console.log("No source images found under src/assets/gallery");
    return;
  }

  let completed = 0;
  for (const sourcePath of sourceImages) {
    const targetPath = await generateThumbnail(sourcePath);
    completed += 1;
    console.log(`[${completed}/${sourceImages.length}] ${path.relative(process.cwd(), targetPath)}`);
  }

  console.log(`Generated ${completed} thumbnails in src/assets/gallery-thumbs`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
