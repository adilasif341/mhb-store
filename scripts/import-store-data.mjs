import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(appRoot, "..");
const outputDir = path.join(appRoot, "src", "generated");

const productCsv = firstExistingFile([
  path.join(appRoot, "migration", "catalog", "products_export_1.csv"),
  path.join(workspaceRoot, "data", "products_export_1.csv"),
]);
const orderCsv = firstExistingFile(
  [
    path.join(appRoot, "migration", "private", "data", "orders_export_1.csv"),
    path.join(workspaceRoot, "data", "orders_export_1.csv"),
  ],
  false,
);
const reviewDir = firstExistingDirectory(
  [
    path.join(appRoot, "migration", "private", "review"),
    path.join(workspaceRoot, "review"),
  ],
  false,
);
const assetsJson = path.join(outputDir, "assets.json");
const remoteAssetsJson = path.join(outputDir, "remote-assets.json");

function firstExistingFile(paths, required = true) {
  const filePath = paths.find((candidate) => fs.existsSync(candidate));
  if (!filePath && required) {
    throw new Error(`Missing required source file. Tried: ${paths.join(", ")}`);
  }
  return filePath ?? "";
}

function firstExistingDirectory(paths, required = true) {
  const directoryPath = paths.find((candidate) => fs.existsSync(candidate));
  if (!directoryPath && required) {
    throw new Error(`Missing required source directory. Tried: ${paths.join(", ")}`);
  }
  return directoryPath ?? "";
}

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
      if (char === "\r" && next === "\n") {
        index += 1;
      }
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
    .filter((record) => record.some((field) => field.trim().length))
    .map((record) =>
      Object.fromEntries(
        headers.map((header, index) => [header.trim(), record[index]?.trim() ?? ""]),
      ),
    );
}

function readCsv(filePath) {
  return parseCsv(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

function toNumber(value, fallback = 0) {
  const parsed = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function unique(values) {
  return [...new Set(values.filter(Boolean).map((value) => String(value).trim()).filter(Boolean))];
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);
}

function loadAssetFile(filePath) {
  if (!fs.existsSync(filePath)) return [];

  const assets = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return Array.isArray(assets) ? assets : [];
}

const localAssets = [...loadAssetFile(assetsJson), ...loadAssetFile(remoteAssetsJson)];
const assetsByStem = new Map(localAssets.map((asset) => [asset.originalStem, asset]));
const assetsByRemoteUrl = new Map(
  localAssets
    .filter((asset) => asset.remoteUrl)
    .map((asset) => [asset.remoteUrl, asset]),
);

function remoteStemFromUrl(value) {
  if (!value) return "";

  try {
    const url = new URL(value);
    return slugify(path.parse(decodeURIComponent(path.basename(url.pathname))).name);
  } catch {
    return slugify(path.parse(String(value)).name);
  }
}

function tokenSet(value) {
  const stopWords = new Set([
    "mhb",
    "natural",
    "for",
    "with",
    "and",
    "the",
    "free",
    "face",
    "hair",
    "ml",
    "gm",
    "g",
    "of",
    "a",
    "to",
    "in",
  ]);

  return new Set(
    slugify(value)
      .split("-")
      .filter((token) => token.length > 1 && !stopWords.has(token) && !/^\d+$/.test(token)),
  );
}

function resolveImage(imageUrl, context) {
  if (!localAssets.length) return imageUrl || "";

  const remoteUrlMatch = assetsByRemoteUrl.get(imageUrl);
  if (remoteUrlMatch) return remoteUrlMatch.publicPath;

  const remoteStem = remoteStemFromUrl(imageUrl);
  const exactMatch = assetsByStem.get(remoteStem);
  if (exactMatch) return exactMatch.publicPath;

  if (remoteStem.length > 5) {
    const partialMatch = localAssets.find(
      (asset) =>
        asset.originalStem.includes(remoteStem) ||
        remoteStem.includes(asset.originalStem),
    );
    if (partialMatch) return partialMatch.publicPath;
  }

  const best = bestAssetForContext(context);
  return best?.publicPath || imageUrl || "";
}

function bestAssetForContext(context) {
  const productTokens = tokenSet(context);
  if (!productTokens.size) return null;

  let best = null;
  let bestScore = 0;

  for (const asset of localAssets) {
    const assetText = `${asset.originalStem} ${asset.originalRelativePath}`.toLowerCase();
    let score = 0;

    for (const token of productTokens) {
      if (assetText.includes(token)) score += 1;
    }

    if (score > bestScore) {
      best = asset;
      bestScore = score;
    }
  }

  return bestScore >= 2 ? best : null;
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function inferCategory(text) {
  const lower = text.toLowerCase();
  if (/(bundle|kit|promo|journey box|pack of)/.test(lower)) return "Bundles";
  if (/(feminine|intimate|sanitary)/.test(lower)) return "Personal Care";
  if (/(tea|detox)/.test(lower)) return "Wellness";
  if (/(shampoo|conditioner|hair|scalp|argan|onion|dandruff)/.test(lower)) return "Hair Care";
  if (/(serum|cleanser|toner|moistur|face|retinol|vitamin c|rose|shea|scrub|spf|cream)/.test(lower)) {
    return "Skin Care";
  }
  return "Skin Care";
}

function inferConcerns(text) {
  const lower = text.toLowerCase();
  const rules = [
    ["Hair Fall", /(hair fall|hairfall|growth|dht|breakage)/],
    ["Dry & Damaged Hair", /(dry|damaged|keratin|conditioning|frizz)/],
    ["Dandruff", /(dandruff|itchy|scalp)/],
    ["Brightening", /(bright|glow|vitamin c|pigmentation|dark spot)/],
    ["Hydration", /(moistur|hydrate|hyaluronic|shea|rose)/],
    ["Anti Aging", /(anti-aging|anti aging|wrinkle|retinol|aging)/],
    ["Cleansing", /(cleanser|face wash|shampoo|scrub|detox)/],
    ["Sun Protection", /(spf|sunblock|sunscreen)/],
    ["Intimate Care", /(feminine|intimate|sanitary)/],
  ];

  return rules.filter(([, regex]) => regex.test(lower)).map(([label]) => label);
}

function inferIngredients(text) {
  const lower = text.toLowerCase();
  const rules = [
    ["Vitamin C", /vitamin c/],
    ["Argan Oil", /argan/],
    ["Shea Butter", /shea/],
    ["Red Onion", /red onion|onion/],
    ["Apple Cider Vinegar", /apple cider|vinegar/],
    ["Rose", /rose/],
    ["Hyaluronic Acid", /hyaluronic/],
    ["Retinol", /retinol/],
    ["Keratin", /keratin/],
    ["Niacinamide", /niacinamide|vitamin b3/],
    ["Taramira", /taramira/],
    ["Black Seed", /black seed/],
  ];

  return rules.filter(([, regex]) => regex.test(lower)).map(([label]) => label);
}

function buildProducts() {
  const rows = readCsv(productCsv);
  const groups = new Map();

  for (const row of rows) {
    const handle = row.Handle || slugify(row.Title || row["Variant SKU"] || "product");
    if (!groups.has(handle)) groups.set(handle, []);
    groups.get(handle).push(row);
  }

  return [...groups.entries()]
    .map(([handle, productRows], index) => {
      const titled = productRows.find((row) => row.Title) ?? productRows[0];
      const title = titled.Title || handle.replace(/-/g, " ");
      const body = stripHtml(titled["Body (HTML)"]);
      const tags = unique(productRows.flatMap((row) => (row.Tags || "").split(",")));
      const imageContext = [title, handle, body, tags.join(" ")].join(" ");
      const sourceImages = unique(productRows.map((row) => row["Image Src"]));
      const localImages = unique(sourceImages.map((image) => resolveImage(image, imageContext)));
      const images = localImages.length ? localImages : sourceImages;
      const prices = productRows
        .map((row) => toNumber(row["Variant Price"], NaN))
        .filter((price) => Number.isFinite(price) && price > 0);
      const compareAtPrices = productRows
        .map((row) => toNumber(row["Variant Compare At Price"], NaN))
        .filter((price) => Number.isFinite(price) && price > 0);
      const variants = productRows
        .filter((row) => row["Variant Price"] || row["Variant SKU"] || row["Option1 Value"])
        .map((row, variantIndex) => ({
          id: `${handle}-${variantIndex + 1}`,
          sku: row["Variant SKU"] || "",
          option: row["Option1 Value"] || row["Option2 Value"] || row["Option3 Value"] || "Default",
          price: toNumber(row["Variant Price"]),
          compareAtPrice: toNumber(row["Variant Compare At Price"]),
          stock: toNumber(row["Variant Inventory Qty"]),
          image:
            resolveImage(row["Variant Image"] || row["Image Src"], imageContext) ||
            images[0] ||
            "",
        }))
        .filter((variant) => variant.price > 0 || variant.sku || variant.stock > 0);
      const productType = titled.Type || "";
      const googleCategory = titled["Product Category"] || "";
      const searchText = [title, body, tags.join(" "), productType, googleCategory].join(" ");
      const category = inferCategory([title, productType, googleCategory].join(" "));
      const price = prices.length ? Math.min(...prices) : 0;
      const compareAtPrice = compareAtPrices.length ? Math.max(...compareAtPrices) : 0;
      const stock = productRows.reduce((sum, row) => sum + toNumber(row["Variant Inventory Qty"]), 0);
      const status = (titled.Status || productRows.find((row) => row.Status)?.Status || "draft").toLowerCase();
      const published = productRows.some((row) => row.Published.toLowerCase() === "true") && status === "active";
      const description =
        body ||
        `${title} by MHB Natural. Made for Pakistani skincare and haircare routines with practical daily-use value.`;

      return {
        id: `prod_${String(index + 1).padStart(3, "0")}`,
        handle,
        slug: slugify(handle || title),
        title,
        vendor: titled.Vendor || "MHB Natural",
        category,
        productType,
        googleCategory,
        tags,
        status,
        published,
        price,
        compareAtPrice,
        stock,
        images,
        imageAlt: titled["Image Alt Text"] || title,
        description,
        seoTitle: titled["SEO Title"] || `${title} in Pakistan | MHB Natural`,
        seoDescription:
          titled["SEO Description"] ||
          `${title} with nationwide delivery in Pakistan. Shop original MHB Natural skincare and haircare at mhb.com.pk.`,
        concerns: inferConcerns(searchText),
        ingredients: inferIngredients(searchText),
        variants,
      };
    })
    .sort((a, b) => {
      if (a.published !== b.published) return a.published ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
}

function buildOrders() {
  if (!orderCsv) return [];

  const rows = readCsv(orderCsv);
  const groups = new Map();

  for (const row of rows) {
    const orderName = row.Name || [...groups.keys()].at(-1) || `#${groups.size + 1}`;
    if (!groups.has(orderName)) groups.set(orderName, []);
    groups.get(orderName).push(row);
  }

  return [...groups.entries()].map(([name, orderRows]) => {
    const head = orderRows.find((row) => row.Total || row.Email || row["Created at"]) ?? orderRows[0];
    return {
      id: head.Id || name.replace("#", "ord_"),
      name,
      email: "",
      phone: "",
      financialStatus: head["Financial Status"] || "pending",
      fulfillmentStatus: head["Fulfillment Status"] || "unfulfilled",
      total: toNumber(head.Total),
      subtotal: toNumber(head.Subtotal),
      shipping: toNumber(head.Shipping),
      currency: head.Currency || "PKR",
      createdAt: head["Created at"] || "",
      city: head["Shipping City"] || head["Billing City"] || "",
      province: head["Shipping Province"] || head["Billing Province"] || "",
      paymentMethod: head["Payment Method"] || "Cash on Delivery",
      customer: `Customer ${name}`,
      items: orderRows
        .filter((row) => row["Lineitem name"])
        .map((row) => ({
          title: row["Lineitem name"],
          sku: row["Lineitem sku"] || "",
          quantity: toNumber(row["Lineitem quantity"], 1),
          price: toNumber(row["Lineitem price"]),
        })),
      notes: "",
    };
  });
}

function buildReviews(products) {
  if (!reviewDir || !fs.existsSync(reviewDir)) return [];

  const reviewFiles = fs
    .readdirSync(reviewDir)
    .filter((fileName) => fileName.toLowerCase().endsWith(".csv"));

  const productTerms = products.map((product) => ({
    slug: product.slug,
    title: product.title.toLowerCase(),
    tags: product.tags.join(" ").toLowerCase(),
  }));

  return reviewFiles.flatMap((fileName) => {
    const source = fileName.replace(/\.csv$/i, "");
    const sourceSlug = slugify(source);
    const match = productTerms.find(
      (product) =>
        product.title.includes(source.toLowerCase()) ||
        source
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean)
          .every((term) => product.title.includes(term) || product.tags.includes(term)),
    );

    return readCsv(path.join(reviewDir, fileName)).map((row, index) => ({
      id: `${sourceSlug}-${index + 1}`,
      productSlug: match?.slug || "",
      sourceProduct: source,
      rating: Math.max(1, Math.min(5, toNumber(row.review_score, 5))),
      content: row.review_content || "",
      author: row.display_name || "Verified customer",
      date: row.date || "",
      media: row.media || "",
    }));
  });
}

fs.mkdirSync(outputDir, { recursive: true });
const products = buildProducts();
const orders = buildOrders();
const reviews = buildReviews(products);

fs.writeFileSync(path.join(outputDir, "products.json"), `${JSON.stringify(products, null, 2)}\n`);
fs.writeFileSync(path.join(outputDir, "orders.json"), `${JSON.stringify(orders, null, 2)}\n`);
fs.writeFileSync(path.join(outputDir, "reviews.json"), `${JSON.stringify(reviews, null, 2)}\n`);

console.log(`Imported ${products.length} products, ${orders.length} orders, and ${reviews.length} reviews.`);
