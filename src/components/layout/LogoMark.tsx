import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** Placeholder mark — swap for the real brand icon later. */
export function LogoMark({ className = "" }: { className?: string }) {
  return <Sparkles className={cn("h-6 w-6 shrink-0", className)} aria-hidden />;
}
