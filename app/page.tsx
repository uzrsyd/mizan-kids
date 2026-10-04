import Image from "next/image";

import { faqs, subjectCards } from "@/config/marketing";
import { cta } from "@/config/navigation";
import { EarlyAccessForm } from "@/components/early-access/early-access-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const learningSteps = [
  { title: "Create a learning profile", text: "Set your child’s age and start with age-appropriate Islamic practice." },
  { title: "Find the right starting point", text: "Skills are grouped thoughtfully so learning builds naturally over time." },
  { title: "Practice short lessons", text: "Short, encouraging activities keep kids engaged without overload." },
  { title: "Build progress over time", text: "Parents can see growth, confidence, and what comes next." },
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
                Structured, interactive practice across Quran, Salah, Arabic, Seerah and more — with progress parents can actually see.
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
              Learning that feels structured, warm, and measurable.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {learningSteps.map((step, index) => (
              <Card key={step.title} className="h-full border-[#E7DCC7] bg-[#FFFDFB]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#173E39] text-sm font-bold text-white shadow-[0_10px_25px_rgba(23,62,57,0.15)]">
                  {index + 1}
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
            <Button href="/demo" variant="ghost">Try a Free Lesson</Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {subjectCards.map((subject) => (
              <Card key={subject.id} className="group h-full border-[#E7DCC7] bg-[#FFFDFB] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,62,57,0.08)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black ${subject.accent}`}>
                    {subject.title.slice(0, 1)}
                  </div>
                  <div className="h-10 w-10 rounded-full border border-[#E7DCC7] bg-[#F7F1E7]" />
                </div>
                <div className="mb-4 text-lg font-black text-[#173E39]">{subject.title}</div>
                <p className="text-base text-[#38514d]">{subject.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="for-parents" className="bg-[#F5F1EB] py-12 sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <Badge>For parents</Badge>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">
              Parents are not left guessing.
            </h2>
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.18em] text-[#E7E8DA]">Example progress</span>
                <span className="rounded-full bg-[#F4B342] px-2.5 py-1 text-xs font-bold text-[#173E39]">Strong</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#F5F6F2]">
                    <span>Quran</span>
                    <span>82%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/20">
                    <div className="h-2.5 w-[82%] rounded-full bg-[#F4B342]" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#F5F6F2]">
                    <span>Salah</span>
                    <span>68%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/20">
                    <div className="h-2.5 w-[68%] rounded-full bg-[#6BA9A4]" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#F5F6F2]">
                    <span>Akhlaq</span>
                    <span>91%</span>
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
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">
              A small taste of the Mizan Kids learning loop.
            </h2>
            <p className="text-lg text-[#38514d]">
              Children learn through short, encouraging skills and immediate feedback. Each lesson is designed to build confidence, meaning, and real progression.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="/demo">Try a Free Lesson</Button>
              <Button href="/#early-access" variant="ghost">Join Early Access</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="early-access" className="bg-[#F5F1EB] py-12 sm:py-16">
        <Container className="rounded-[32px] border border-[#E3D8C5] bg-[#F8F5F0] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge>Early Access</Badge>
              <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">
                Join Mizan Kids Early Access
              </h2>
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

          <div className="grid gap-5 lg:grid-cols-2">
            {faqs.map((item) => (
              <Card key={item.question} className="h-full">
                <h3 className="mb-3 text-lg font-bold text-[#173E39]">{item.question}</h3>
                <p className="text-base text-[#38514d]">{item.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
