import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(appRoot, "..");
const publicWebDir = path.join(appRoot, "public", "web");
const generatedDir = path.join(appRoot, "src", "generated");
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const ignoredSegments = new Set([
  ".git",
  ".next",
  "node_modules",
  "mhb-store",
]);

function shouldSkip(filePath) {
  const segments = path.relative(workspaceRoot, filePath).split(path.sep);
  return segments.some((segment) => ignoredSegments.has(segment));
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function walkImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (shouldSkip(fullPath)) return [];
    if (entry.isDirectory()) return walkImages(fullPath);
    if (!entry.isFile()) return [];
    return allowedExtensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  });
}

function outputNameFor(filePath, usedNames) {
  const relative = path.relative(workspaceRoot, filePath);
  const parsed = path.parse(relative);
  const folder = parsed.dir ? `${slugify(parsed.dir)}-` : "";
  const stem = slugify(parsed.name) || "image";
  const baseName = `${folder}${stem}`;
  let outputName = `${baseName}.webp`;
  let index = 2;

  while (usedNames.has(outputName)) {
    outputName = `${baseName}-${index}.webp`;
    index += 1;
  }

  usedNames.add(outputName);
  return outputName;
}

fs.mkdirSync(publicWebDir, { recursive: true });
fs.mkdirSync(generatedDir, { recursive: true });

const imageFiles = walkImages(workspaceRoot).sort((a, b) => a.localeCompare(b));
const usedNames = new Set();
const manifest = [];

for (const filePath of imageFiles) {
  const relativePath = path.relative(workspaceRoot, filePath).replaceAll(path.sep, "/");
  const outputName = outputNameFor(filePath, usedNames);
  const outputPath = path.join(publicWebDir, outputName);
  const inputStats = fs.statSync(filePath);

  const image = sharp(filePath, { animated: false }).rotate();
  const metadata = await image.metadata();

  await image
    .resize({
      width: 1400,
      height: 1400,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 78,
      effort: 5,
    })
    .toFile(outputPath);

  const outputStats = fs.statSync(outputPath);

  manifest.push({
    originalRelativePath: relativePath,
    originalName: path.basename(filePath),
    originalStem: slugify(path.parse(filePath).name),
    publicPath: `/web/${outputName}`,
    sourceBytes: inputStats.size,
    webpBytes: outputStats.size,
    width: metadata.width ?? null,
    height: metadata.height ?? null,
  });
}

fs.writeFileSync(path.join(generatedDir, "assets.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const sourceBytes = manifest.reduce((sum, asset) => sum + asset.sourceBytes, 0);
const webpBytes = manifest.reduce((sum, asset) => sum + asset.webpBytes, 0);
const saved = sourceBytes ? Math.round((1 - webpBytes / sourceBytes) * 100) : 0;

console.log(
  `Optimized ${manifest.length} images into public/web (${formatBytes(sourceBytes)} -> ${formatBytes(webpBytes)}, ${saved}% smaller).`,
);

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
