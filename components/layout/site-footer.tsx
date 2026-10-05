import Link from "next/link";

import { brand } from "@/config/brand";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E7DFD2] bg-[#F5F1EB]">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xl font-bold text-[#173E39]">{brand.name}</p>
          <p className="max-w-md text-sm text-[#3B4E4A]">
            Structured Islamic learning for Muslim children that grows with them — one skill, one habit, and one joyful step at a time.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-[#3B4E4A] sm:flex-row sm:gap-8">
          <Link href="/privacy" className="transition hover:text-[#173E39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173E39] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1EB]">Privacy</Link>
          <Link href="/terms" className="transition hover:text-[#173E39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173E39] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1EB]">Terms</Link>
          <a
            href={`mailto:${brand.email}`}
            className="transition hover:text-[#173E39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173E39] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1EB]"
          >
            {brand.email}
          </a>
        </div>
      </Container>

      <div className="border-t border-[#E7DFD2] bg-[#F5F1EB]">
        <Container className="py-4 text-center text-sm text-[#3B4E4A]">
          © 2026 Mizan Kids
        </Container>
      </div>
    </footer>
  );
}
