"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { brand } from "@/config/brand";
import { cta, navigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7DFD2] bg-[#F8F5F0]/90 backdrop-blur-sm">
      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={brand.name}>
          <Image
            src="/brand/logo-wordmark-transparent.png"
            alt={brand.name}
            width={160}
            height={42}
            priority
            className="h-auto w-[150px] md:w-[160px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-[#173E39] transition hover:text-[#2E5E57]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href={cta.secondary.href} variant="ghost">
            {cta.secondary.label}
          </Button>
          <Button href={cta.primary.href}>{cta.primary.label}</Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#D9D1C5] bg-white px-3 py-2 text-sm font-semibold text-[#173E39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173E39] focus-visible:ring-offset-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          Menu
        </button>
      </Container>

      {open ? (
        <div ref={menuRef} className="border-t border-[#E7DFD2] bg-[#F8F5F0] md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl px-2 py-2 text-base font-medium text-[#173E39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173E39]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button href={cta.secondary.href} variant="ghost" className="w-full justify-center">
              {cta.secondary.label}
            </Button>
            <Button href={cta.primary.href} className="w-full justify-center">
              {cta.primary.label}
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
