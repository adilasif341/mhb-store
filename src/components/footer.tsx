import Link from "next/link";
import { categories, siteConfig } from "@/lib/catalog";
import { toSlug } from "@/lib/format";
import { legalPages } from "@/lib/legal";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div>
          <p className="text-xl font-black">MHB Natural</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Skincare and hair care built around everyday Pakistani routines.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase">Shop</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            {categories.map((category) => (
              <Link key={category} href={`/collections/${toSlug(category)}`} className="hover:text-white">
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase">Help</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <Link href="/order-tracking" className="hover:text-white">
              Order tracking
            </Link>
            <Link href="/cart" className="hover:text-white">
              Cart
            </Link>
            <Link href="/checkout" className="hover:text-white">
              Checkout
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase">Legal</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <Link href="/legal" className="hover:text-white">
              All policies
            </Link>
            {legalPages.map((page) => (
              <Link key={page.slug} href={`/${page.slug}`} className="hover:text-white">
                {page.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <a href={siteConfig.whatsapp} className="hover:text-white">
              WhatsApp support
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
            <span>{siteConfig.legalName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
