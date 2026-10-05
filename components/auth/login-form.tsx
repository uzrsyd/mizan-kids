"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <label className="block text-sm font-medium text-[#173E39]">
        Email
        <input
          type="email"
          className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
          placeholder="parent@example.com"
        />
      </label>

      <label className="block text-sm font-medium text-[#173E39]">
        Password
        <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 pr-14 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold uppercase tracking-[0.12em] text-[#173E39]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </label>

      <div className="flex items-center justify-between gap-3 text-sm">
        <a href="/signup" className="font-semibold text-[#173E39] hover:underline">
          Create account
        </a>
        <button type="button" className="text-[#173E39] hover:underline">
          Forgot password
        </button>
      </div>

      <Button type="submit" className="w-full" disabled>
        Log in
      </Button>

      <p className="text-sm text-[#38514d]">
        This authentication preview is disabled for now. The login flow is ready structurally, but no backend auth is connected yet.
      </p>
    </form>
  );
}
