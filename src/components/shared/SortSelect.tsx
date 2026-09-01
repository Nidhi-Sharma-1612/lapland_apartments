"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
import { usePopover } from "@/lib/use-popover";
import { cn } from "@/lib/utils";

export type SortOption = { value: string; label: string };

export function SortSelect({
  basePath,
  options,
  paramName = "sort",
  icon: Icon = ArrowUpDown,
}: {
  basePath: string;
  options: SortOption[];
  paramName?: string;
  icon?: typeof ArrowUpDown;
}) {
  return (
    <Suspense fallback={<div className="h-12.5 w-48 animate-pulse rounded-lg bg-zinc-100" />}>
      <SortSelectInner
        basePath={basePath}
        options={options}
        paramName={paramName}
        icon={Icon}
      />
    </Suspense>
  );
}

function SortSelectInner({
  basePath,
  options,
  paramName,
  icon: Icon,
}: {
  basePath: string;
  options: SortOption[];
  paramName: string;
  icon: typeof ArrowUpDown;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open, setOpen, ref } = usePopover<HTMLDivElement>();

  const current = searchParams.get(paramName) ?? "";
  const selected = options.find((o) => o.value === current) ?? options[0];

  function selectValue(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(paramName, value);
    else params.delete(paramName);
    // Changing sort/filter re-ranks results, so any existing pagination
    // position is no longer meaningful — back to page 1.
    params.delete("page");
    router.push(`${basePath}?${params.toString()}`);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300"
      >
        <Icon className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
        <span className="whitespace-nowrap">{selected.label}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-zinc-400 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-56 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-zinc-100 bg-white p-2 shadow-2xl">
          {options.map((option) => (
            <button
              key={option.value || "recommended"}
              type="button"
              onClick={() => selectValue(option.value)}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              {option.label}
              {option.value === selected.value && (
                <Check className="h-4 w-4 shrink-0 text-brand-green" aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
