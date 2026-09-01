"use client";

import { Check, ChevronDown, MapPin } from "lucide-react";
import { LOCATIONS } from "@/lib/locations";
import { usePopover } from "@/lib/use-popover";
import { cn } from "@/lib/utils";

export function LocationSelector({
  value,
  onChange,
  variant = "light",
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  variant?: "light" | "dark";
  className?: string;
}) {
  const { open, setOpen, ref } = usePopover<HTMLDivElement>();
  const selected = LOCATIONS.find((l) => l.value === value) ?? LOCATIONS[0];
  const isDark = variant === "dark";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-left text-base font-medium",
          isDark
            ? "border border-white/15 bg-white/5 text-white"
            : "bg-[#F6F7F9] text-zinc-900",
        )}
      >
        <MapPin
          className={cn("h-5 w-5 shrink-0", isDark ? "text-white/70" : "text-brand-green")}
          aria-hidden
        />
        <span className="flex-1 truncate">{selected.label}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform",
            open && "rotate-180",
            isDark ? "text-white/50" : "text-zinc-400",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-72 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-zinc-100 bg-white p-2 text-zinc-900 shadow-2xl">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.value || "any"}
              type="button"
              onClick={() => {
                onChange(loc.value);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-50"
            >
              <span>
                <span className="block text-sm font-semibold text-zinc-900">
                  {loc.label}
                </span>
                <span className="block text-xs text-zinc-500">{loc.description}</span>
              </span>
              {loc.value === value && (
                <Check className="h-4 w-4 shrink-0 text-brand-green" aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
