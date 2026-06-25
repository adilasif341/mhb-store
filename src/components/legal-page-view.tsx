import Link from "next/link";
import type { LegalPage } from "@/lib/legal";

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/legal" className="text-sm font-bold text-brand">
        Legal pages
      </Link>
      <p className="mt-6 text-sm font-black uppercase text-accent">Last updated: {page.updatedAt}</p>
      <h1 className="mt-2 text-4xl font-black leading-tight">{page.title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted">{page.description}</p>

      <div className="mt-8 grid gap-4">
        {page.sections.map((section) => (
          <section key={section.heading} className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-xl font-black">{section.heading}</h2>
            <div className="mt-3 grid gap-3">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
