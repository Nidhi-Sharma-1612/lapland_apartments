import type { ReactNode } from "react";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-zinc-200 py-8 last:border-b-0">
      <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-6 text-zinc-500 sm:leading-7">
        {children}
      </div>
    </section>
  );
}
