import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/signup-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Sign up",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <Card className="bg-white p-6 sm:p-8">
          <div className="mb-6 space-y-3">
            <Badge>Sign up</Badge>
            <h1 className="text-3xl font-black text-[#173E39]">Create your account</h1>
          </div>
          <SignupForm />
        </Card>
      </Container>
    </Section>
  );
}
