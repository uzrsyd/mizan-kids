import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#D9D1C5] bg-[#F8F5F0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#173E39]",
        className,
      )}
    >
      {children}
    </span>
  );
}
