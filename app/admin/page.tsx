import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Card className="bg-white p-8 sm:p-10">
          <div className="space-y-4">
            <Badge>Development shell</Badge>
            <h1 className="text-4xl font-black text-[#173E39] sm:text-5xl">Admin area</h1>
            <p className="text-lg text-[#38514d]">
              This route is intentionally a development-only shell. It is not protected and no admin backend is connected in this milestone.
            </p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
