import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const productCsv = path.join(appRoot, "migration", "catalog", "products_export_1.csv");
const publicWebDir = path.join(appRoot, "public", "web");
const outputDir = path.join(appRoot, "src", "generated");
const manifestPath = path.join(outputDir, "remote-assets.json");

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  if (value.length || row.length) {
    row.push(value);
    rows.push(row);
  }

  const [headers = [], ...records] = rows;
  return records
    .filter((record) => record.some((field) => field.trim()))
    .map((record) =>
      Object.fromEntries(headers.map((header, index) => [header.trim(), record[index]?.trim() ?? ""])),
    );
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function remoteStemFromUrl(value) {
  const url = new URL(value);
  return slugify(path.parse(decodeURIComponent(path.basename(url.pathname))).name) || "product-image";
}

function shortHash(value) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 8);
}

fs.mkdirSync(publicWebDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

const rows = parseCsv(fs.readFileSync(productCsv, "utf8").replace(/^\uFEFF/, ""));
const urls = [
  ...new Set(
    rows
      .flatMap((row) => [row["Image Src"], row["Variant Image"]])
      .filter((value) => value?.startsWith("http")),
  ),
];

const manifest = [];
const failures = [];

for (const remoteUrl of urls) {
  const originalStem = remoteStemFromUrl(remoteUrl);
  const outputName = `product-${originalStem}-${shortHash(remoteUrl)}.webp`;
  const outputPath = path.join(publicWebDir, outputName);

  try {
    if (!fs.existsSync(outputPath)) {
      const response = await fetch(remoteUrl, {
        signal: AbortSignal.timeout(20000),
        headers: {
          "User-Agent": "MHB asset migration",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const sourceBuffer = Buffer.from(await response.arrayBuffer());

      await sharp(sourceBuffer, { animated: false })
        .rotate()
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
    }

    const stats = fs.statSync(outputPath);
    manifest.push({
      remoteUrl,
      originalName: path.basename(new URL(remoteUrl).pathname),
      originalStem,
      publicPath: `/web/${outputName}`,
      webpBytes: stats.size,
    });
  } catch (error) {
    failures.push({
      remoteUrl,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Fetched ${manifest.length}/${urls.length} remote product images into public/web.`);
if (failures.length) {
  console.log(`Failed ${failures.length} images. First failures:`);
  console.log(JSON.stringify(failures.slice(0, 10), null, 2));
}
