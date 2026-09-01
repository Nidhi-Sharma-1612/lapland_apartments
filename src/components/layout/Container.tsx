import { cn } from "@/lib/utils";

export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "div" | "section" | "header";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-7xl px-5 xl:px-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
