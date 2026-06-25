import { categories, concerns, ingredients } from "@/lib/catalog";
import { toSlug } from "@/lib/format";

export function ShopFilters({
  defaults,
}: {
  defaults: {
    q?: string;
    category?: string;
    concern?: string;
    ingredient?: string;
    sort?: string;
  };
}) {
  return (
    <form className="grid gap-3 rounded-lg border border-border bg-surface p-4 md:grid-cols-5" action="/shop">
      <input
        name="q"
        defaultValue={defaults.q}
        placeholder="Search products"
        className="min-h-11 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-brand md:col-span-2"
      />
      <select
        name="category"
        defaultValue={defaults.category}
        className="min-h-11 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-brand"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={toSlug(category)}>
            {category}
          </option>
        ))}
      </select>
      <select
        name="concern"
        defaultValue={defaults.concern}
        className="min-h-11 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-brand"
      >
        <option value="">All concerns</option>
        {concerns.map((concern) => (
          <option key={concern} value={toSlug(concern)}>
            {concern}
          </option>
        ))}
      </select>
      <select
        name="ingredient"
        defaultValue={defaults.ingredient}
        className="min-h-11 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-brand"
      >
        <option value="">All ingredients</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient} value={toSlug(ingredient)}>
            {ingredient}
          </option>
        ))}
      </select>
      <select
        name="sort"
        defaultValue={defaults.sort || "featured"}
        className="min-h-11 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-brand"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price low to high</option>
        <option value="price-desc">Price high to low</option>
        <option value="stock">Stock</option>
      </select>
      <button
        type="submit"
        className="min-h-11 rounded-md bg-brand px-4 text-sm font-bold text-white transition hover:bg-brand-strong md:col-span-5"
      >
        Apply filters
      </button>
    </form>
  );
}
