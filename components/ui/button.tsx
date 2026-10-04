import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  href,
  className,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const baseClassName =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173E39] focus-visible:ring-offset-2 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60";

  const variantClassName =
    variant === "primary"
      ? "bg-[#173E39] text-white hover:bg-[#234F48] active:bg-[#112c2a]"
      : variant === "secondary"
        ? "bg-[#F4B342] text-[#173E39] hover:bg-[#E3A52E] active:bg-[#D79D28]"
        : "border border-[#D9D1C5] bg-white text-[#173E39] hover:bg-[#F7F3EE] active:bg-[#F1E9E0]";

  const classes = cn(baseClassName, variantClassName, className);

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
