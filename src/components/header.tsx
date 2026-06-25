import Link from "next/link";
import { CartCount } from "@/components/cart-count";

const navItems = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/skin-care", label: "Skin Care" },
  { href: "/collections/hair-care", label: "Hair Care" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-fit flex-col leading-none">
          <span className="text-lg font-black text-brand">MHB Natural</span>
          <span className="text-xs font-medium text-muted">Memoona Health and Beauty</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-muted hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/order-tracking"
            className="hidden rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand sm:inline-flex"
          >
            Track
          </Link>
          <Link
            href="/cart"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand"
          >
            Cart
            <CartCount />
          </Link>
        </div>
      </div>

      <nav className="scrollbar-none flex gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="min-w-fit rounded-md px-3 py-2 text-sm font-semibold text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
