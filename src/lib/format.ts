export function formatPrice(value: number) {
  return `Rs. ${Math.round(value).toLocaleString("en-PK")}`;
}

export function formatNumber(value: number) {
  return Math.round(value).toLocaleString("en-PK");
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`)
    .join(" ");
}
