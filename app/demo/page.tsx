import type { Metadata } from "next";

import { InteractiveDemo } from "@/components/demo/interactive-demo";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Try a Free Lesson",
};

export default function DemoPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="mb-8 space-y-4">
          <Badge>Interactive demo</Badge>
          <h1 className="text-4xl font-black text-[#173E39] sm:text-5xl">
            Try a Free Lesson
          </h1>
          <p className="max-w-2xl text-lg text-[#38514d]">
            No account. No payment. Just a short sample lesson to show how Mizan Kids helps children learn with structure, encouragement, and progress.
          </p>
        </div>

        <InteractiveDemo />
      </Container>
    </Section>
  );
}
