"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <label className="block text-sm font-medium text-[#173E39]">
        Parent first name
        <input
          type="text"
          className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
          placeholder="Your name"
        />
      </label>

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
            placeholder="At least 8 characters"
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

      <label className="block text-sm font-medium text-[#173E39]">
        Confirm password
        <div className="relative mt-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 pr-14 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
            placeholder="Re-enter password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((current) => !current)}
            className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold uppercase tracking-[0.12em] text-[#173E39]"
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </label>

      <Button type="submit" className="w-full" disabled>
        Create account
      </Button>

      <p className="text-sm text-[#38514d]">
        This signup preview is disabled for now. Authentication is not connected yet.
      </p>

      <p className="text-center text-sm text-[#38514d]">
        Already have an account? <a href="/login" className="font-semibold text-[#173E39]">Log in</a>
      </p>
    </form>
  );
}
