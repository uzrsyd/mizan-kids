import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <Card className="bg-white p-8 text-center sm:p-10">
          <div className="space-y-6">
            <div className="inline-flex rounded-full bg-[#EAF4F2] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#173E39]">
              404
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-[#173E39] sm:text-5xl">Looks like this lesson wandered off.</h1>
              <p className="text-lg text-[#38514d]">We couldn’t find this page.</p>
            </div>
            <div className="flex justify-center">
              <Button href="/">Back to Mizan Kids</Button>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
