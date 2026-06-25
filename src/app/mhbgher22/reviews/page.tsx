import type { Metadata } from "next";
import { MerchantShell } from "@/components/merchant-shell";
import { allReviews } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Merchant Reviews",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerchantReviewsPage() {
  const reviews = allReviews.filter((review) => review.content).slice(0, 80);

  return (
    <MerchantShell>
      <div className="grid gap-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-black">{review.author}</p>
                <p className="text-sm text-muted">{review.sourceProduct}</p>
              </div>
              <span className="rounded-md bg-accent-soft px-2 py-1 text-sm font-black text-brand">
                {review.rating}/5
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{review.content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">
                Approve
              </button>
              <button className="rounded-md border border-border px-4 py-2 text-sm font-bold text-muted">
                Hide
              </button>
            </div>
          </article>
        ))}
      </div>
    </MerchantShell>
  );
}
