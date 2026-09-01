"use client";

import { useState } from "react";

export function ReadMoreText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p
        className={`mt-2 text-sm leading-6 text-zinc-500 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 text-sm font-semibold text-zinc-900 underline underline-offset-4"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </>
  );
}
