import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function SignupPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <Card className="bg-white p-6 sm:p-8">
          <div className="mb-6 space-y-3">
            <Badge>Sign up</Badge>
            <h1 className="text-3xl font-black text-[#173E39]">Create your account</h1>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#173E39]">
              First name
              <input type="text" className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]" placeholder="Your name" />
            </label>
            <label className="block text-sm font-medium text-[#173E39]">
              Email
              <input type="email" className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]" placeholder="parent@example.com" />
            </label>
            <label className="block text-sm font-medium text-[#173E39]">
              Password
              <input type="password" className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]" placeholder="At least 8 characters" />
            </label>
            <Button className="w-full">Create account</Button>
            <p className="text-center text-sm text-[#38514d]">
              Already have an account? <a href="/login" className="font-semibold text-[#173E39]">Log in</a>
            </p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
