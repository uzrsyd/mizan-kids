"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  childAgeOptions as ageOptions,
  learningInterestOptions as interestOptions,
  maxChildren,
  referralSourceOptions as acquisitionOptions,
} from "@/features/early-access/options";

const childCountOptions = Array.from({ length: maxChildren }, (_, index) => index + 1);

export function EarlyAccessForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const [childCount, setChildCount] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [ageByChild, setAgeByChild] = useState<Record<number, string>>({ 1: ageOptions[0] });

  const utmValues = useMemo(() => {
    if (typeof window === "undefined") {
      return {} as Record<string, string>;
    }

    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_content: params.get("utm_content") ?? "",
      utm_term: params.get("utm_term") ?? "",
      referrer_url: document.referrer || "",
      landing_path: window.location.pathname,
    };
  }, []);

  const childAges = Array.from({ length: childCount }, (_, index) => index + 1);

  function toggleInterest(option: string) {
    setSelectedInterests((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  }

  function handleChildCountChange(nextCount: number) {
    setChildCount(nextCount);
    setAgeByChild((current) => {
      const next: Record<number, string> = {};
      for (let index = 1; index <= nextCount; index += 1) {
        next[index] = current[index] ?? ageOptions[0];
      }
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const parentFirstName = String(formData.get("parentFirstName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const referralSource = String(formData.get("referralSource") || "").trim();
    const honeypot = String(formData.get("website") || "").trim();

    if (honeypot) {
      setStatus("error");
      setMessage("Request rejected.");
      return;
    }

    if (!parentFirstName) {
      setStatus("error");
      setMessage("Please add your first name.");
      return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (childAges.some((index) => !ageByChild[index])) {
      setStatus("error");
      setMessage("Please select an age range for each child.");
      return;
    }

    if (selectedInterests.length === 0) {
      setStatus("error");
      setMessage("Please choose at least one learning interest.");
      return;
    }

    const payload = {
      parentFirstName,
      email,
      numberOfChildren: childCount,
      childAgeRanges: childAges.map((index) => ageByChild[index]),
      learningInterests: selectedInterests,
      referralSource: referralSource || undefined,
      utm_source: utmValues.utm_source || undefined,
      utm_medium: utmValues.utm_medium || undefined,
      utm_campaign: utmValues.utm_campaign || undefined,
      utm_content: utmValues.utm_content || undefined,
      utm_term: utmValues.utm_term || undefined,
      referrer_url: utmValues.referrer_url || undefined,
      landing_path: utmValues.landing_path || undefined,
    };

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({ status: "server_error", message: "Something went wrong. Please try again." }));

      if (result.status === "success") {
        setStatus("success");
        router.push("/welcome?status=success");
        return;
      }

      if (result.status === "already_registered") {
        setStatus("error");
        setMessage(result.message || "You’re already on the Mizan Kids Early Access list.");
        router.push("/welcome?status=already_registered");
        return;
      }

      setStatus("error");
      setMessage(result.message || "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <Card className="bg-white p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-[#173E39]">
            Parent first name
            <input
              name="parentFirstName"
              className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
              placeholder="Your name"
            />
          </label>
          <label className="block text-sm font-medium text-[#173E39]">
            Email
            <input
              name="email"
              type="email"
              className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
              placeholder="parent@example.com"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-[#173E39]">
            Number of children
            <select
              name="numberOfChildren"
              value={childCount}
              onChange={(event) => handleChildCountChange(Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
            >
              {childCountOptions.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-3">
            <p className="text-sm font-medium text-[#173E39]">{childCount === 1 ? "Child’s age" : "Children’s ages"}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {childAges.map((index) => (
                <label key={index} className="block text-xs font-medium text-[#173E39]">
                  {childCount === 1 ? null : `Child ${index}`}
                  <select
                    name={`childAge_${index}`}
                    value={ageByChild[index] ?? ageOptions[0]}
                    onChange={(event) =>
                      setAgeByChild((current) => ({
                        ...current,
                        [index]: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-3 py-2.5 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
                  >
                    {ageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-[#173E39]">Primary learning interests</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {interestOptions.map((option) => {
              const checked = selectedInterests.includes(option);
              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center justify-between gap-2 rounded-2xl border px-3 py-2.5 text-sm font-medium transition ${
                    checked ? "border-[#173E39] bg-[#EAF4F2] text-[#173E39]" : "border-[#D8D0C1] bg-[#F8F5F0] text-[#173E39]"
                  }`}
                >
                  <span>{option}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleInterest(option)}
                    className="h-4 w-4 accent-[#173E39]"
                  />
                </label>
              );
            })}
          </div>
        </div>

        <label className="block text-sm font-medium text-[#173E39]">
          How did you hear about Mizan Kids?
          <select
            name="referralSource"
            className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none transition focus:border-[#173E39] focus:ring-2 focus:ring-[#173E39]/10"
            defaultValue=""
          >
            <option value="">Choose one</option>
            {acquisitionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="rounded-2xl bg-[#F7F1E7] p-3 text-sm text-[#38514d]">
          By joining Early Access, you’ll receive emails about your Mizan Kids Early Access spot, launch, and availability.
          <div className="mt-2 font-semibold text-[#173E39]">No credit card required.</div>
        </div>

        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Join Early Access"}
        </Button>

        {message ? (
          <p aria-live="polite" className={status === "error" ? "text-sm text-[#8C3D31]" : "text-sm text-[#173E39]"}>
            {message}
          </p>
        ) : null}
      </form>
    </Card>
  );
}
