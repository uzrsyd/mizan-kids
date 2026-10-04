import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="space-y-4 rounded-[28px] border border-[#E3D8C5] bg-white p-8 sm:p-10">
          <Badge>Privacy</Badge>
          <h1 className="text-4xl font-black text-[#173E39]">Privacy Policy</h1>
          <p className="text-[#38514d]">
            Mizan Kids is committed to collecting only the information needed to operate the product and improve the learning experience for families.
          </p>
          <p className="text-[#38514d]">
            This page is a temporary public-facing placeholder while legal review is completed before launch.
          </p>
        </div>
      </Container>
    </Section>
  );
}
