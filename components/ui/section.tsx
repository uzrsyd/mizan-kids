import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
};

export function Section({ children, className, as: Component = "section", id }: SectionProps) {
  return (
    <Component id={id} className={cn("py-16 sm:py-20", className)}>
      {children}
    </Component>
  );
}
