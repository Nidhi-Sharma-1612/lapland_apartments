"use client";

import { ChevronDown, Minus, Plus, Users } from "lucide-react";
import { usePopover } from "@/lib/use-popover";
import { cn } from "@/lib/utils";

export type GuestCounts = { adults: number; children: number };

export function GuestsSelector({
  value,
  onChange,
  variant = "light",
  className = "",
  maxGuests = 16,
}: {
  value: GuestCounts;
  onChange: (value: GuestCounts) => void;
  variant?: "light" | "dark";
  className?: string;
  maxGuests?: number;
}) {
  const { open, setOpen, ref } = usePopover<HTMLDivElement>();
  const total = value.adults + value.children;
  const isDark = variant === "dark";

  function update(key: keyof GuestCounts, delta: number) {
    const min = key === "adults" ? 1 : 0;
    const nextValue = Math.max(min, value[key] + delta);
    const next = { ...value, [key]: nextValue };
    if (next.adults + next.children > maxGuests) return;
    onChange(next);
  }

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
        <Users
          className={cn("h-5 w-5 shrink-0", isDark ? "text-white/70" : "text-brand-green")}
          aria-hidden
        />
        <span className={cn("flex-1 truncate", total === 0 && (isDark ? "text-white/60" : "text-zinc-500"))}>
          {total > 0 ? `${total} ${total === 1 ? "guest" : "guests"}` : "Guests"}
        </span>
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
        <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-zinc-100 bg-white p-5 text-zinc-900 shadow-2xl">
          <GuestRow
            label="Adults"
            description="Ages 13 or above"
            count={value.adults}
            onDecrement={() => update("adults", -1)}
            onIncrement={() => update("adults", 1)}
            canDecrement={value.adults > 1}
            canIncrement={total < maxGuests}
          />
          <GuestRow
            label="Children"
            description="Ages 2–12"
            count={value.children}
            onDecrement={() => update("children", -1)}
            onIncrement={() => update("children", 1)}
            canDecrement={value.children > 0}
            canIncrement={total < maxGuests}
          />
          {maxGuests < 16 && (
            <p className="mt-1 text-xs text-zinc-400">Max {maxGuests} guests for this apartment.</p>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-lg bg-brand-green py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

function GuestRow({
  label,
  description,
  count,
  onDecrement,
  onIncrement,
  canDecrement,
  canIncrement,
}: {
  label: string;
  description: string;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
  canDecrement: boolean;
  canIncrement: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 py-3 last:border-b-0">
      <div>
        <p className="text-sm font-semibold text-zinc-900">{label}</p>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={!canDecrement}
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:border-brand-green hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-300 disabled:hover:text-zinc-600 sm:h-8 sm:w-8"
        >
          <Minus className="h-3.5 w-3.5" aria-hidden />
        </button>
        <span className="w-4 text-center text-sm font-medium">{count}</span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={!canIncrement}
          aria-label={`Increase ${label.toLowerCase()}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:border-brand-green hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-300 disabled:hover:text-zinc-600 sm:h-8 sm:w-8"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
