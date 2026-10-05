import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Parent app",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Card className="bg-white p-8 sm:p-10">
          <div className="space-y-5 text-center">
            <Badge>Parent app</Badge>
            <h1 className="text-4xl font-black text-[#173E39] sm:text-5xl">Let’s create your first learner profile.</h1>
            <p className="text-lg text-[#38514d]">
              This area is a future parent dashboard shell. No child profiles or saved progress are active in this preview.
            </p>
            <div className="flex justify-center">
              <Button href="/demo">Try a Free Lesson</Button>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
