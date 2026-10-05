"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const pricingFaq = [
  {
    question: "IS THE PRICE PER CHILD OR PER FAMILY?",
    answer: "Mizan Kids Family is one membership for your household. You do not pay separately for each child.",
  },
  {
    question: "CAN EACH CHILD HAVE THEIR OWN PROFILE?",
    answer: "Yes. Each child can have their own learner profile, progress, and learning path under the parent or guardian account.",
  },
  {
    question: "HOW DOES THE EARLY ACCESS 30-DAY FREE PERIOD WORK?",
    answer: "Join Early Access before launch and you’ll be eligible for 30 days of full access free. Your 30 days begin when you activate your Early Access benefit after launch.",
  },
  {
    question: "DO I NEED A CREDIT CARD TO JOIN EARLY ACCESS?",
    answer: "No. No payment information is required to join Early Access.",
  },
  {
    question: "WILL I AUTOMATICALLY BE CHARGED AFTER MY 30 FREE DAYS?",
    answer: "No. Your Early Access period will not automatically become a paid membership unless you explicitly choose a plan and authorize payment.",
  },
  {
    question: "WHAT HAPPENS AFTER MY FREE PERIOD?",
    answer: "You can choose Mizan Kids Family for $9.99 per month or $79.99 per year. If you don’t choose a paid plan, you won’t be charged.",
  },
  {
    question: "CAN I CHOOSE MONTHLY OR ANNUAL BILLING?",
    answer: "Yes. Mizan Kids Family is available for $9.99 per month or $79.99 per year.",
  },
  {
    question: "CAN I CANCEL?",
    answer: "Yes. Once paid memberships launch, you’ll be able to cancel future renewal of your membership.",
  },
  {
    question: "ARE THERE ADS?",
    answer: "No. Mizan Kids does not rely on advertising to fund the learning experience.",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <>
      <Section className="bg-[#F7F1E7] py-12 sm:py-16 lg:py-20">
        <Container className="max-w-5xl">
          <div className="mb-8 text-center">
            <Badge>SIMPLE FAMILY PRICING</Badge>
            <h1 className="mt-5 text-4xl font-black text-[#173E39] sm:text-5xl">
              One membership for your whole family.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#38514d]">
              Give every child in your household access to structured Islamic learning — without paying separately for each child.
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-full border border-[#D8D0C1] bg-white p-1">
              {[
                { key: "monthly", label: "Monthly" },
                { key: "annual", label: "Annual" },
              ].map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setBilling(option.key as "monthly" | "annual")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    billing === option.key ? "bg-[#173E39] text-white" : "text-[#173E39]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <Card className="mx-auto max-w-2xl border-[#E7DCC7] bg-[#FFFDFB] p-6 sm:p-8">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D6E6A]">Mizan Kids Family</p>
              <h2 className="mt-3 text-3xl font-black text-[#173E39]">Everything your family needs for structured Islamic learning.</h2>
            </div>

            <div className="mt-8 text-center">
              {billing === "monthly" ? (
                <>
                  <div className="text-5xl font-black text-[#173E39]">$9.99</div>
                  <p className="mt-2 text-base text-[#38514d]">per month</p>
                </>
              ) : (
                <>
                  <div className="text-5xl font-black text-[#173E39]">$79.99</div>
                  <p className="mt-2 text-base text-[#38514d]">per year</p>
                  <p className="mt-3 text-base font-semibold text-[#173E39]">$6.67/month</p>
                  <span className="mt-2 inline-flex rounded-full bg-[#EAF4F2] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#173E39]">
                    Save 33%
                  </span>
                </>
              )}
            </div>

            <ul className="mt-8 space-y-3 text-left text-[#38514d]">
              {[
                "Full Mizan Kids curriculum",
                "All children in your household",
                "Individual learner profiles",
                "Age-appropriate learning paths",
                "Interactive lessons and practice",
                "Parent progress tracking",
                "Recommendations for what to practice next",
                "Source-backed Islamic lessons",
                "Reviewed Islamic content",
                "A growing Islamic curriculum",
                "No ads",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF4F2] text-[11px] text-[#173E39]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[22px] border border-[#E7DCC7] bg-[#F7F1E7] p-4 text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D6E6A]">EARLY ACCESS</p>
              <p className="mt-2 text-xl font-black text-[#173E39]">Get 30 days of full access free when you activate after launch.</p>
              <p className="mt-3 text-sm text-[#38514d]">No credit card required today.</p>
              <p className="text-sm text-[#38514d]">No automatic charge after your free access.</p>
              <p className="mt-2 text-sm text-[#38514d]">Launching December 1, 2026.</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button href="/#early-access">Join Early Access</Button>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-[#F5F1EB] py-10">
        <Container>
          <div className="grid gap-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#173E39] sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["ONE FAMILY MEMBERSHIP", "No per-child surcharge"],
              ["NO ADS", "Learning stays focused"],
              ["NO AUTOMATIC CHARGE", "Early Access never silently becomes a paid membership"],
              ["SOURCE-BACKED LEARNING", "Islamic content built around reliable references"],
              ["PARENT-FOCUSED", "Progress stays visible and clear"],
            ].map(([headline, copy]) => (
              <div key={headline} className="rounded-2xl border border-[#E7DCC7] bg-white p-3">
                <p>{headline}</p>
                <p className="mt-2 text-[10px] normal-case tracking-[0.08em] text-[#38514d]">{copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F7F1E7] py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D6E6A]">WHY THE MEMBERSHIP EXISTS</p>
            <h2 className="mt-3 text-3xl font-black text-[#173E39] sm:text-4xl">Built for learning, not attention.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[#38514d]">
              Mizan Kids isn’t designed around advertising, endless scrolling, or keeping children online for as long as possible. Your membership supports a growing Islamic curriculum, interactive practice, progress tracking, content review, and new learning experiences for Muslim families.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F5F1EB] py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="mb-8 space-y-3 text-center">
            <Badge>Pricing FAQ</Badge>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Questions families ask before they join.</h2>
          </div>

          <div className="space-y-4">
            {pricingFaq.map((item) => (
              <div key={item.question} className="rounded-[22px] border border-[#E7DCC7] bg-white p-4">
                <p className="text-base font-black text-[#173E39]">{item.question}</p>
                <p className="mt-2 text-base text-[#38514d]">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F7F1E7] py-12 sm:py-16">
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Start with 30 days free.</h2>
          <p className="mt-4 text-lg text-[#38514d]">
            Join Early Access today and we’ll let you know when it’s time to activate your free access.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/#early-access">Join Early Access</Button>
          </div>
          <p className="mt-4 text-sm text-[#38514d]">Launching December 1, 2026 · No credit card required · No automatic charge</p>
        </Container>
      </Section>
    </>
  );
}
