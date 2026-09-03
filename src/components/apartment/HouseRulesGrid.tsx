"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/lib/use-is-mobile";
import { cn } from "@/lib/utils";

const MOBILE_COLLAPSED_COUNT = 3;

export function HouseRulesGrid({
  rules,
}: {
  rules: { title: string; description: string }[];
}) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  const hasMore = rules.length > MOBILE_COLLAPSED_COUNT;
  const visibleRules =
    isMobile && !expanded ? rules.slice(0, MOBILE_COLLAPSED_COUNT) : rules;

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
        {visibleRules.map((rule) => (
          <div key={rule.title} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
            <div>
              <h3 className="font-semibold text-zinc-900">{rule.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isMobile && hasMore && (
        <div className="mt-6 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300"
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              aria-hidden
            />
          </button>
        </div>
      )}
    </div>
  );
}
