import type { Metadata } from "next";
import Image from "next/image";

import { faqs, subjectCards } from "@/config/marketing";
import { cta } from "@/config/navigation";
import { EarlyAccessForm } from "@/components/early-access/early-access-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Mizan Kids | Islamic Learning for Children",
};

const learningSteps = [
  {
    title: "Create a learner profile",
    text: "Set your child’s age and start with age-appropriate Islamic practice.",
  },
  {
    title: "Start at the right level",
    text: "Skills are grouped thoughtfully so learning builds naturally over time.",
  },
  {
    title: "Practice short Islamic skills",
    text: "Short, encouraging activities keep kids engaged without overload.",
  },
  {
    title: "See progress and what comes next",
    text: "Parents can see growth, confidence, and the next step in a learning journey.",
  },
];

export default function Home() {
  return (
    <>
      <Section className="bg-[radial-gradient(circle_at_top_left,_rgba(244,179,66,0.14),_transparent_28%),_#F7F1E7] py-12 sm:py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-8">
            <Badge>Early access for December 2026 launch</Badge>
            <div className="space-y-5">
              <h1 className="max-w-xl text-4xl font-black text-[#173E39] sm:text-5xl lg:text-6xl">
                Islamic learning that grows with your child.
              </h1>
              <p className="max-w-xl text-lg text-[#38514d]">
                Ages 4–12 • Short interactive lessons • Progress parents can see
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href={cta.primary.href}>{cta.primary.label}</Button>
              <Button href={cta.secondary.href} variant="secondary">
                {cta.secondary.label}
              </Button>
            </div>

            <div className="flex items-center gap-3 text-sm font-medium text-[#38514d]">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#F4B342]" aria-hidden="true" />
              30 days of full access free for Early Access users
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[32px] border border-[#E3D8C5] bg-white p-4 shadow-[0_18px_55px_rgba(23,62,57,0.08)]">
              <Image
                src="/brand/og-default.png"
                alt="Mizan Kids learning preview"
                width={900}
                height={720}
                className="rounded-[22px]"
                priority
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-2xl border border-[#E3D8C5] bg-[#F8F5F0] px-4 py-3 shadow-[0_12px_35px_rgba(23,62,57,0.08)]">
              <div className="text-xs uppercase tracking-[0.16em] text-[#5D6E6A]">Progress</div>
              <div className="mt-1 flex items-center gap-3">
                <span className="text-2xl font-black text-[#173E39]">42</span>
                <span className="text-sm text-[#38514d]">→ 55 mastery</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="how-it-works" className="bg-[#F5F1EB] py-12 sm:py-16">
        <Container>
          <div className="mb-10 max-w-2xl space-y-4">
            <Badge>How it works</Badge>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">
              A clear path from first lesson to growing confidence.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {learningSteps.map((step, index) => (
              <Card
                key={step.title}
                className="h-full border-[#E7DCC7] bg-[#FFFDFB] shadow-[0_10px_20px_rgba(23,62,57,0.02)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#173E39] text-sm font-bold text-white shadow-[0_10px_25px_rgba(23,62,57,0.15)]">
                    {index + 1}
                  </div>
                  <div className="h-px flex-1 bg-[#E8DEC5]" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#173E39]">{step.title}</h3>
                <p className="text-base text-[#38514d]">{step.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="subjects" className="bg-[#F7F1E7] py-12 sm:py-16">
        <Container>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-4">
              <Badge>Subjects</Badge>
              <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">
                Age-appropriate learning across the essentials of Islamic life.
              </h2>
            </div>
            <Button href="/demo" variant="ghost">
              Try a Free Lesson
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {subjectCards.map((subject) => (
              <Card
                key={subject.id}
                className="group h-full border-[#E7DCC7] bg-[#FFFDFB] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,62,57,0.08)]"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#E8DEC5] bg-[#F8F3EA] shadow-[0_10px_20px_rgba(23,62,57,0.08)]">
                    <SubjectIllustration id={subject.id} />
                  </div>
                  <div className="h-9 w-9 rounded-full border border-[#E7DCC7] bg-[#F7F1E7]" />
                </div>
                <div className="mb-4 text-lg font-black text-[#173E39]">{subject.title}</div>
                <p className="text-base text-[#38514d]">{subject.description}</p>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-[#5D6E6A]">
            More learning areas will be added as Mizan Kids grows.
          </p>
        </Container>
      </Section>

      <Section id="for-parents" className="bg-[#F5F1EB] py-12 sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <Badge>For parents</Badge>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Parents are not left guessing.</h2>
            <p className="text-lg text-[#38514d]">
              Islamic learning can feel scattered. Random videos and disconnected worksheets do not show what a child truly knows or what they are ready to practice next.
            </p>
            <ul className="space-y-3 text-[#38514d]">
              <li>• Clear skill progression and structured learning paths</li>
              <li>• Visible parent progress and mastery insights</li>
              <li>• Encouraging practice without pressure or confusion</li>
            </ul>
          </div>

          <Card className="overflow-hidden border-[#E7DCC7] bg-[#173E39] text-white">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm uppercase tracking-[0.18em] text-[#E7E8DA]">Example progress</span>
                <span className="rounded-full bg-[#F4B342] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#173E39]">
                  Strong
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#F5F6F2]">
                    <span>Quran</span>
                    <span className="text-base font-bold">82%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/20">
                    <div className="h-2.5 w-[82%] rounded-full bg-[#F4B342]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#F5F6F2]">
                    <span>Salah</span>
                    <span className="text-base font-bold">68%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/20">
                    <div className="h-2.5 w-[68%] rounded-full bg-[#6BA9A4]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#F5F6F2]">
                    <span>Akhlaq</span>
                    <span className="text-base font-bold">91%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/20">
                    <div className="h-2.5 w-[91%] rounded-full bg-[#E88C54]" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-[#F7F1E7] py-12 sm:py-16">
        <Container className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[28px] border border-[#E3D8C5] bg-white p-3 shadow-[0_18px_45px_rgba(23,62,57,0.06)]">
            <Image
              src="/brand/og-early-access.png"
              alt="Early Access preview"
              width={900}
              height={720}
              className="rounded-[20px]"
            />
          </div>
          <div className="space-y-6">
            <Badge>Real interactive preview</Badge>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Try a real Mizan Kids lesson.</h2>
            <p className="text-lg text-[#38514d]">
              See how children practice Islamic knowledge through short questions, immediate feedback, and encouraging explanations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="/demo">Try a Free Lesson</Button>
              <Button href="/#early-access" variant="ghost">
                Join Early Access
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="early-access" className="bg-[#F5F1EB] py-12 sm:py-16">
        <Container className="rounded-[32px] border border-[#E3D8C5] bg-[#F8F5F0] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge>Early Access</Badge>
              <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Join Mizan Kids Early Access</h2>
              <div className="rounded-2xl bg-[#F4F0E8] p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-[#5D6E6A]">30 DAYS FREE</p>
                <p className="mt-2 text-xl font-black text-[#173E39]">Launching December 1, 2026</p>
              </div>
              <p className="max-w-xl text-base text-[#38514d]">
                The 30-day benefit begins when eligible families activate after launch. No credit card required today.
              </p>
            </div>

            <EarlyAccessForm />
          </div>
        </Container>
      </Section>

      <Section id="faq" className="bg-[#F7F1E7] py-12 sm:py-16">
        <Container>
          <div className="mb-10 max-w-2xl space-y-4">
            <Badge>FAQ</Badge>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">
              Helpful answers for families looking for a more structured Islamic learning path.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <details
                key={item.question}
                className="group rounded-[22px] border border-[#E7DCC7] bg-white p-4 sm:p-5"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-bold text-[#173E39]">
                  <span>{item.question}</span>
                  <span className="text-2xl font-light text-[#173E39] transition group-open:rotate-45">+</span>
                </summary>
                <p className="pt-4 text-base leading-7 text-[#38514d]">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function SubjectIllustration({ id }: { id: string }) {
  const stroke = "stroke-[#173E39]";

  switch (id) {
    case "quran":
      return (
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <path d="M12 20c5-5 11-7 20-7s15 2 20 7v24c-5 5-11 7-20 7s-15-2-20-7V20Z" className={`${stroke} fill-none`} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 22.5V42c4.4-2.3 8.8-3.4 12-3.4 3.2 0 7.6 1.1 12 3.4V22.5M44 22.5c-4.4 2.3-8.8 3.5-12 3.5s-7.6-1.2-12-3.5" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "arabic":
      return (
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <rect x="14" y="16" width="36" height="32" rx="9" className="fill-[#F9D287]" stroke="#173E39" strokeWidth="2.2" />
          <path d="M24 40c2.9-6.8 7-10.2 16-12M22 28c2.8 0 5.1 1 7.2 3.1M37 28c-2.7 0-4.9 1-6.8 3.2" className={`${stroke} fill-none`} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M32 20v24" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "salah":
      return (
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <rect x="16" y="20" width="32" height="24" rx="6" className="fill-[#E8F5F1]" stroke="#173E39" strokeWidth="2.2" />
          <path d="M22 26h20M22 32h20M22 38h14" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 20V14M40 20V14M18 46h28" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "aqeedah":
      return (
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <path d="M32 14 38 25l12 2-9 9 2 12-11-7-11 7 2-12-9-9 12-2 6-11Z" className="fill-[#F7C979]" stroke="#173E39" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M26 35h12M32 29v12" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "duas":
      return (
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <path d="M14 35c0-8 6-14 18-14s18 6 18 14v9H14v-9Z" className="fill-[#DDEFF0]" stroke="#173E39" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M22 35c3-4 7-6 10-6s7 2 10 6M26 22c0-5 3-8 6-8s6 3 6 8" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20 46c5-3 9-4 12-4s7 1 12 4" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "prophets":
      return (
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <path d="M18 20h28v24H18z" className="fill-[#F9E9BE]" stroke="#173E39" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M22 26h20M22 32h20M22 38h14" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M28 18v-4h8v4" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "seerah":
      return (
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <path d="M16 42c8-10 12-16 16-22 3 4 6 8 12 12v22H16V42Z" className="fill-[#E7F0D8]" stroke="#173E39" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M20 42c7-4 11-7 14-15M32 43c4-3 7-5 10-10" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M40 20c6 3 8 8 8 13" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "akhlaq":
      return (
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <path d="M32 20c-6 0-10 5-10 10 0 7 6 12 10 16 4-4 10-9 10-16 0-5-4-10-10-10Z" className="fill-[#F4C7B4]" stroke="#173E39" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M22 24c-6 1-9 5-9 10 0 6 5 11 13 14" className={`${stroke} fill-none`} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M42 24c6 1 9 5 9 10 0 6-5 11-13 14" className={`${stroke} fill-none`} strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
