"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

export function CollapsibleSection({
  id,
  title,
  defaultOpen = true,
  children,
}: {
  id?: string;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div id={id} className="scroll-mt-24 border-b border-zinc-200 py-8 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="text-2xl font-semibold text-zinc-900">{title}</h2>
        <ChevronUp
          className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform ${
            open ? "" : "rotate-180"
          }`}
          aria-hidden
        />
      </button>

      {open && <div className="mt-6">{children}</div>}
    </div>
  );
}
