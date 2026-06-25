import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  actionHref,
  actionLabel,
}: {
  eyebrow?: string;
  title: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow ? <p className="text-sm font-bold uppercase text-accent">{eyebrow}</p> : null}
        <h2 className="mt-1 text-2xl font-black text-foreground sm:text-3xl">{title}</h2>
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="rounded-md border border-border px-4 py-2 text-sm font-bold transition hover:border-brand hover:text-brand"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
