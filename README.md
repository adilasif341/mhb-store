# MHB Natural Store

Next.js ecommerce storefront and merchant backend for `mhb.com.pk`.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Scripts

```bash
npm run assets:optimize
npm run product-images:fetch
npm run import:data
npm run lint
npm run build
```

- `assets:optimize` converts local workspace images to compressed WebP in `public/web`.
- `product-images:fetch` downloads product image URLs from the catalog CSV and converts them to WebP.
- `import:data` regenerates `src/generated/products.json`, `orders.json`, and `reviews.json`.

## Merchant Backend

Private route:

```txt
/mhbgher22
```

Set production credentials with environment variables:

```bash
MERCHANT_ADMIN_USER=your-user
MERCHANT_ADMIN_PASSWORD=your-strong-password
```

Defaults for local development are listed in `.env.example`.

## Data Safety

Do not commit customer exports, order exports, service-account JSON files, courier credentials, payment credentials, or private keys.

Safe product catalog exports are in `migration/catalog`.

Private local-only exports go in `migration/private`, which is ignored by Git.

## Assets

Optimized WebP assets live in:

```txt
public/web
```

The generated catalog uses local `/web/*.webp` product images so product pages do not depend on old Shopify CDN image URLs.
