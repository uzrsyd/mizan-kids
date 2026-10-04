import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function AppPage() {
  return (
    <Section>
      <Container className="max-w-5xl">
        <div className="space-y-4">
          <Badge>Parent app</Badge>
          <h1 className="text-4xl font-black text-[#173E39] sm:text-5xl">Welcome back</h1>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card className="bg-white">
            <p className="text-sm uppercase tracking-[0.16em] text-[#5D6E6A]">Recommended skill</p>
            <h2 className="mt-3 text-2xl font-black text-[#173E39]">Salah confidence</h2>
          </Card>
          <Card className="bg-white">
            <p className="text-sm uppercase tracking-[0.16em] text-[#5D6E6A]">Subjects</p>
            <h2 className="mt-3 text-2xl font-black text-[#173E39]">Coming soon</h2>
          </Card>
          <Card className="bg-white">
            <p className="text-sm uppercase tracking-[0.16em] text-[#5D6E6A]">Progress</p>
            <h2 className="mt-3 text-2xl font-black text-[#173E39]">Coming soon</h2>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
