"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ageOptions = ["4–5", "6–7", "8–9", "10–12"];
const interestOptions = [
  "Quran",
  "Arabic",
  "Salah",
  "Islamic Studies",
  "Duas",
  "Seerah",
  "Akhlaq / Character",
  "Prophets",
];
const acquisitionOptions = [
  "Instagram",
  "Facebook",
  "TikTok",
  "Google",
  "Friend or family",
  "Other",
];

export function EarlyAccessForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [childCount, setChildCount] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const childAges = Array.from({ length: childCount }, (_, index) => index + 1);

  function toggleInterest(option: string) {
    setSelectedInterests((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const numberOfChildren = Number(formData.get("numberOfChildren") || 1);
    const childAgeRanges = childAges.map((index) => String(formData.get(`childAge_${index}`) || ""));
    const acquisitionSource = String(formData.get("acquisitionSource") || "");

    const payload = {
      firstName,
      email,
      numberOfChildren,
      childAgeRanges,
      learningInterests: selectedInterests,
      acquisitionSource,
    };

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(result.message || "You’re on the Mizan Kids Early Access list.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <Card className="bg-white p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-[#173E39]">
            Parent first name
            <input
              name="firstName"
              required
              className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]"
              placeholder="Your name"
            />
          </label>
          <label className="block text-sm font-medium text-[#173E39]">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]"
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
              onChange={(event) => setChildCount(Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>

          <div className="space-y-2">
            <p className="text-sm font-medium text-[#173E39]">Child age ranges</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {childAges.map((index) => (
                <label key={index} className="block text-xs font-medium text-[#173E39]">
                  Child {index} age
                  <select
                    name={`childAge_${index}`}
                    defaultValue={ageOptions[0]}
                    className="mt-1 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-3 py-2.5 outline-none focus:border-[#173E39]"
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
            name="acquisitionSource"
            className="mt-2 w-full rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] px-4 py-3 outline-none focus:border-[#173E39]"
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

        <div className="rounded-2xl bg-[#F7F1E7] p-3 text-sm text-[#38514d]">
          By joining Early Access, you’ll receive emails about your Mizan Kids Early Access spot, launch, and availability.
          <div className="mt-2 font-semibold text-[#173E39]">No credit card required.</div>
        </div>

        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Join Early Access"}
        </Button>

        {message ? (
          <p className={status === "error" ? "text-sm text-[#8C3D31]" : "text-sm text-[#173E39]"}>{message}</p>
        ) : null}
      </form>
    </Card>
  );
}
