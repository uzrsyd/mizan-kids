import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Log in | Mizan Kids",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <Card className="bg-white p-6 sm:p-8">
          <div className="mb-6 space-y-3">
            <Badge>Login</Badge>
            <h1 className="text-3xl font-black text-[#173E39]">Welcome back</h1>
          </div>
          <LoginForm />
        </Card>
      </Container>
    </Section>
  );
}
