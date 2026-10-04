import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-[#E6DDCF] bg-white p-5 shadow-[0_12px_35px_rgba(23,62,57,0.05)] sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
