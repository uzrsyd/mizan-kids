import type { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBookQuran,
  faHandsPraying,
  faHeart,
  faMosque,
  faRoute,
  faStarAndCrescent,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

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

const trustItems = [
  {
    title: "REVIEWED BEFORE PUBLICATION",
    text: "Lessons go through content and Islamic review before they are released.",
  },
  {
    title: "SOURCE-BACKED LEARNING",
    text: "Quran, authentic Hadith, and other reliable Islamic references are used where relevant.",
  },
  {
    title: "EXTRA CARE WITH SENSITIVE TOPICS",
    text: "Fiqh differences, Aqeedah, Seerah, Hadith, and other sensitive material receive additional review before publication.",
  },
  {
    title: "NO ADS",
    text: "Children learn in a focused environment without advertising or distracting feeds.",
  },
  {
    title: "PARENT-MANAGED",
    text: "Children learn through learner profiles under a parent or guardian account. No child email required.",
  },
];

export default function Home() {
  return (
    <>
      <Section className="bg-[radial-gradient(circle_at_top_left,_rgba(244,179,66,0.14),_transparent_28%),_#F7F1E7] py-12 sm:py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="space-y-7">
            <Badge>Early access for December 2026 launch</Badge>

            <div className="space-y-5">
              <h1 className="max-w-xl text-4xl font-black text-[#173E39] sm:text-5xl lg:text-6xl">
                Islamic learning that grows with your child.
              </h1>

              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-3">
                {[
                  "Ages 4–12",
                  "Short interactive lessons",
                  "Progress parents can see",
                ].map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-2 rounded-full border border-[#E3D8C5] bg-white/70 px-3 py-2 text-sm font-semibold text-[#173E39]"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF4F2] text-[11px] text-[#173E39]">✓</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm italic text-[#4D6662]">
                Source-backed Islamic learning · No ads · Parent-managed
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
                className="h-full border-[#E7DCC7] bg-[#FFFDFB] shadow-[0_10px_22px_rgba(23,62,57,0.03)] transition-colors duration-150 hover:border-[#D7C9A9]"
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

          <div className="mt-8 text-center">
            <p className="text-xl font-black text-[#173E39]">
              A growing curriculum across the essentials of Islamic learning.
            </p>
            <p className="mt-3 text-base text-[#4D6662]">
              Clear learning objectives, reviewed content, and source references where appropriate.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F5F1EB] py-12 sm:py-16">
        <Container>
          <div className="mb-8 space-y-3 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D6E6A]">Built with care</p>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">
              Islamic learning parents can trust.
            </h2>
            <p className="mx-auto max-w-3xl text-base text-[#38514d]">
              Mizan Kids is being built to make Islamic learning clear, age-appropriate, and grounded in reliable sources — while giving parents confidence in what their children are learning.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-[#E7DCC7] bg-white p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#5D6E6A]">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-[#38514d]">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="for-parents" className="bg-[#F7F1E7] py-12 sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <Badge>For parents</Badge>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Parents are not left guessing.</h2>
            <p className="text-lg text-[#38514d]">
              Islamic learning can feel scattered. Random videos and disconnected worksheets do not show what a child truly knows or what they are ready to practice next.
            </p>
            <p className="text-base text-[#38514d]">
              See not only what your child is learning, but where that learning comes from.
            </p>
            <ul className="space-y-3 text-[#38514d]">
              <li>• Clear skill progression and structured learning paths</li>
              <li>• Visible parent progress and mastery insights</li>
              <li>• Encouraging practice without pressure or confusion</li>
            </ul>
          </div>

          <Card className="overflow-hidden border-[#E7DCC7] bg-[#F7F1E7] text-[#173E39]">
            <div className="space-y-5">
              <span className="text-sm uppercase tracking-[0.18em] text-[#38514d]">EXAMPLE PROGRESS</span>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#173E39]">
                    <span>Quran</span>
                    <span className="text-base font-bold text-[#173E39]">Strong · 82%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#E6DCC9]">
                    <div className="h-2.5 w-[82%] rounded-full bg-[#F4B342]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#173E39]">
                    <span>Salah</span>
                    <span className="text-base font-bold text-[#173E39]">Keep practicing · 68%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#E6DCC9]">
                    <div className="h-2.5 w-[68%] rounded-full bg-[#6BA9A4]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#173E39]">
                    <span>Akhlaq</span>
                    <span className="text-base font-bold text-[#173E39]">Excellent · 91%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#E6DCC9]">
                    <div className="h-2.5 w-[91%] rounded-full bg-[#E88C54]" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-[#F5F1EB] py-12 sm:py-16">
        <Container className="rounded-[30px] border border-[#E3D8C5] bg-[#F8F5F0] p-6 sm:p-8">
          <div className="mb-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D6E6A]">SIMPLE FAMILY PRICING</p>
            <h2 className="mt-2 text-3xl font-black text-[#173E39] sm:text-4xl">One membership for your whole family.</h2>
            <p className="mt-3 text-base text-[#38514d]">$9.99 / month or $79.99 / year • All children in your household included.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button href="/pricing">See Pricing</Button>
            <Button href="/#early-access" variant="ghost">Join Early Access</Button>
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
  const iconMap: Record<string, IconDefinition> = {
    quran: faBookQuran,
    salah: faMosque,
    aqeedah: faStarAndCrescent,
    duas: faHandsPraying,
    prophets: faBookOpen,
    seerah: faRoute,
    akhlaq: faHeart,
  };

  if (id === "arabic") {
    return (
      <span
        aria-label="Arabic learning"
        className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[9px] bg-[#E8F0EA] text-[30px] font-black leading-[1] text-[#173E39]"
        style={{ fontFamily: '"Noto Naskh Arabic", "Segoe UI", serif' }}
      >
        ب
      </span>
    );
  }

  const icon = iconMap[id];
  if (!icon) return null;

  return <FontAwesomeIcon icon={icon} className="h-6 w-6 text-[#173E39]" aria-hidden="true" />;
}
