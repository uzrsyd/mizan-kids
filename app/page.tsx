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
                Core Islamic learning, broken into clear skills that grow with your child.
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
                className="h-full border-[#E7DCC7] bg-[#FFFDFB] shadow-[0_10px_22px_rgba(23,62,57,0.03)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#E8DEC5] bg-white shadow-[0_10px_20px_rgba(23,62,57,0.06)] ${subject.accent}`}>
                    <SubjectIllustration id={subject.id} />
                  </div>
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
              <span className="text-sm uppercase tracking-[0.18em] text-[#E7E8DA]">Example progress</span>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#F5F6F2]">
                    <span>Quran</span>
                    <span className="text-base font-bold">Strong · 82%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/20">
                    <div className="h-2.5 w-[82%] rounded-full bg-[#F4B342]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#F5F6F2]">
                    <span>Salah</span>
                    <span className="text-base font-bold">Keep practicing · 68%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/20">
                    <div className="h-2.5 w-[68%] rounded-full bg-[#6BA9A4]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#F5F6F2]">
                    <span>Akhlaq</span>
                    <span className="text-base font-bold">Excellent · 91%</span>
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
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <path d="M18 18.5c5-3.5 10.5-5.2 14-5.2 6.8 0 12.4 2.2 20 8.5V45c-5.8-5-11.4-7.2-20-7.2-4.2 0-8.8 1.3-14 5.2V18.5Z" className="fill-[#F7F1E7]" stroke="#173E39" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M18 18.5v26.8M32 13.3v31.5M44 21.3v22.4" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M26 27h12M26 35h12" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "arabic":
      return (
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <rect x="15" y="16" width="34" height="32" rx="10" className="fill-[#F9D287]" stroke="#173E39" strokeWidth="2.3" />
          <path d="M22 39c3.8-7 7.8-10.4 18-12" className={`${stroke} fill-none`} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M26 27.5c2.2 0 4.2 1 6.1 3M38 27.5c-2.3 0-4.3 1-6 3" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <text x="32" y="39" textAnchor="middle" fontSize="20" fontWeight="700" fill="#173E39" fontFamily="Noto Naskh Arabic, serif">ا</text>
        </svg>
      );
    case "salah":
      return (
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <path d="M20 25.5h24v17.5H20z" className="fill-[#DDEEEB]" stroke="#173E39" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M18 43h28" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 25.5v-6M40 25.5v-6M18 25.5v-6M46 25.5v-6" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 32.5h16M24 37h10" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M30 18 32 12l2 6" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "aqeedah":
      return (
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <path d="M32 14.5 38 24l11 2-8 8 2 11-11-6-11 6 2-11-8-8 11-2 6-9.5Z" className="fill-[#F7D68A]" stroke="#173E39" strokeWidth="2.3" strokeLinejoin="round" />
          <circle cx="32" cy="31.5" r="5" className="fill-[#FFFDFB]" stroke="#173E39" strokeWidth="2.1" />
          <path d="M32 26.5v10M27 31.5h10" className={`${stroke} fill-none`} strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
    case "duas":
      return (
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <path d="M16 34c0-7.8 7.4-14 16-14s16 6.2 16 14v11H16V34Z" className="fill-[#E7F3F5]" stroke="#173E39" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M22 30c2.5-3.8 5.5-5.8 10-5.8s7.5 2 10 5.8M18 46c4-3.2 8.5-4.8 14-4.8s10 1.6 14 4.8" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M26 22c0-4 2.8-7 6-7s6 3 6 7" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="46" cy="19" r="2.2" className="fill-[#F4B342]" />
        </svg>
      );
    case "prophets":
      return (
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <path d="M17 22h30v22H17z" className="fill-[#FBE7B8]" stroke="#173E39" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M17 28h30M21 34h18M21 40h14" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M25 22V14h14v8" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 47c7-8 12-11 15-20M46 47c-7-8-12-11-15-20" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "seerah":
      return (
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <path d="M14 42c8-12 12-18 18-24 6 6 11 12 18 19v19H14V42Z" className="fill-[#EAF2D6]" stroke="#173E39" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M20 42c7-4 11-7 15-14M34 43c3-3 7-6 11-11" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M32 18c0-3 2-6 6-8" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M44 21c8 2 10 8 10 13" className={`${stroke} fill-none`} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "akhlaq":
      return (
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <path d="M32 18c-8.3 0-13.5 6.4-13.5 12.7 0 9.6 8.1 16.1 13.5 21.3 5.4-5.2 13.5-11.7 13.5-21.3C45.5 24.4 40.3 18 32 18Z" className="fill-[#F4CCBC]" stroke="#173E39" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M25 26c-4.5 1-8 5-8 9.4 0 6.6 5 10.8 15 15.2" className={`${stroke} fill-none`} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M39 26c4.8 1.1 8.4 5.2 8.4 9.6 0 6.6-5 10.8-14.9 15.1" className={`${stroke} fill-none`} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M32 26.5v8.5" className={`${stroke} fill-none`} strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
