import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="space-y-4 rounded-[28px] border border-[#E3D8C5] bg-white p-8 sm:p-10">
          <Badge>Terms</Badge>
          <h1 className="text-4xl font-black text-[#173E39]">Terms of use</h1>
          <p className="text-[#38514d]">
            These terms are a temporary public-facing placeholder while legal review is completed before public launch.
          </p>
        </div>
      </Container>
    </Section>
  );
}
