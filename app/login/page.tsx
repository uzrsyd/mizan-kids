import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function LoginPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <Card className="bg-white p-6 sm:p-8">
          <div className="mb-6 space-y-3">
            <Badge>Login</Badge>
            <h1 className="text-3xl font-black text-[#173E39]">Welcome back</h1>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#173E39]">
              Email
              <input type="email" className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]" placeholder="parent@example.com" />
            </label>
            <label className="block text-sm font-medium text-[#173E39]">
              Password
              <input type="password" className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]" placeholder="••••••••" />
            </label>
            <Button className="w-full">Log in</Button>
            <p className="text-center text-sm text-[#38514d]">
              Need an account? <a href="/signup" className="font-semibold text-[#173E39]">Sign up</a>
            </p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
