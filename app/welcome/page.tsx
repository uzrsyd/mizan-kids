import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Welcome | Mizan Kids",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WelcomePage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Card className="bg-white p-8 sm:p-10">
          <div className="space-y-6 text-center">
            <Badge>You’re on the list</Badge>
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-[#173E39] sm:text-5xl">You’re on the list!</h1>
              <p className="text-xl text-[#38514d]">Thanks for joining Mizan Kids Early Access.</p>
            </div>

            <div className="rounded-[24px] bg-[#F7F1E7] p-5 text-left">
              <p className="text-sm uppercase tracking-[0.18em] text-[#5D6E6A]">Launching December 1, 2026</p>
              <div className="mt-4 space-y-3 text-base text-[#173E39]">
                <p>✓ 30 days of full access free</p>
                <p>✓ No credit card required today</p>
                <p>✓ Your free period begins when you activate</p>
              </div>
            </div>

            <p className="text-base text-[#38514d]">We’ll email you when Mizan Kids is ready.</p>

            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              <Button href="/demo">Try a Free Lesson</Button>
              <Button href="/" variant="ghost">Back to Home</Button>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
