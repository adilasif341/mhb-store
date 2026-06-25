import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase text-accent">404</p>
      <h1 className="mt-2 text-4xl font-black">Page not found</h1>
      <p className="mt-3 text-muted">This page is not available in the new MHB store.</p>
      <Link
        href="/shop"
        className="mt-6 inline-flex rounded-md bg-brand px-5 py-3 text-sm font-bold text-white"
      >
        Go to shop
      </Link>
    </div>
  );
}
