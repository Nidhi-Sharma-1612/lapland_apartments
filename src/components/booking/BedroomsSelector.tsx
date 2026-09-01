"use client";

import { BedDouble, Check, ChevronDown } from "lucide-react";
import { usePopover } from "@/lib/use-popover";
import { cn } from "@/lib/utils";

const OPTIONS = [0, 1, 2, 3, 4];

export function BedroomsSelector({
  value,
  onChange,
  variant = "light",
  className = "",
}: {
  /** 0 means "Any". */
  value: number;
  onChange: (value: number) => void;
  variant?: "light" | "dark";
  className?: string;
}) {
  const { open, setOpen, ref } = usePopover<HTMLDivElement>();
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
        <BedDouble
          className={cn("h-5 w-5 shrink-0", isDark ? "text-white/70" : "text-brand-green")}
          aria-hidden
        />
        <span className={cn("flex-1 truncate", value === 0 && (isDark ? "text-white/60" : "text-zinc-500"))}>
          {value > 0 ? `${value}+ bedroom${value === 1 ? "" : "s"}` : "Bedrooms"}
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
        <div className="absolute left-0 z-50 mt-2 w-56 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-zinc-100 bg-white p-2 text-zinc-900 shadow-2xl">
          {OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-zinc-50"
            >
              <span>{option === 0 ? "Any" : `${option}+ bedroom${option === 1 ? "" : "s"}`}</span>
              {option === value && <Check className="h-4 w-4 shrink-0 text-brand-green" aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
