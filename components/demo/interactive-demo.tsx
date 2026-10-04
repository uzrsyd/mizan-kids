"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Question = {
  prompt: string;
  steps?: string[];
  options?: string[];
  correct: string | string[];
  explanation: string;
};

const questions: Question[] = [
  {
    prompt: "Put the steps of wudu in order.",
    steps: ["Make intention", "Wash your face", "Wash your arms", "Wipe your head", "Wash your feet"],
    correct: ["Make intention", "Wash your face", "Wash your arms", "Wipe your head", "Wash your feet"],
    explanation:
      "Wudu begins with intention and then follows the correct order of washing the face, arms, wiping the head, and then the feet.",
  },
  {
    prompt: "Which dua is most appropriate to say before eating?",
    options: ["Bismillah", "Alhamdulillah", "SubhanAllah", "Astaghfirullah"],
    correct: "Bismillah",
    explanation: "Before eating, it is common to say Bismillah as we begin with Allah’s name.",
  },
  {
    prompt: "Choose the correct way to begin a salah session.",
    options: ["Start with Tasbih", "Begin with takbir and intention", "Skip the opening", "Start with a story"],
    correct: "Begin with takbir and intention",
    explanation: "Salah begins with the intention and the takbir of Allahu Akbar before prayer starts.",
  },
];

export function InteractiveDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sequence, setSequence] = useState<string[]>(() => questions[0].steps ?? []);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const progress = ((currentIndex + (submitted ? 1 : 0)) / total) * 100;

  const reorderedSteps = useMemo(() => [...sequence], [sequence]);

  const reorderStep = (index: number, direction: number) => {
    if (currentQuestion.prompt.includes("Put the steps")) {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= reorderedSteps.length) return;
      const nextSteps = [...reorderedSteps];
      [nextSteps[index], nextSteps[nextIndex]] = [nextSteps[nextIndex], nextSteps[index]];
      setSequence(nextSteps);
    }
  };

  const handleSubmit = () => {
    const isCorrect =
      currentQuestion.prompt.includes("Put the steps")
        ? JSON.stringify(sequence) === JSON.stringify(currentQuestion.correct)
        : selectedOption === currentQuestion.correct;

    if (isCorrect) {
      setScore((count) => count + 1);
      setFeedback("Nice work! That’s correct.");
    } else {
      setFeedback("Not quite — let’s look at it together.");
    }

    setExplanation(currentQuestion.explanation);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex === total - 1) {
      setCompleted(true);
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    const nextQuestion = questions[nextIndex];
    setSequence(Array.isArray(nextQuestion.correct) ? nextQuestion.correct : nextQuestion.steps ?? []);
    setSelectedOption(null);
    setSubmitted(false);
    setFeedback(null);
    setExplanation(null);
  };

  const resetDemo = () => {
    setCurrentIndex(0);
    setSequence(questions[0].steps ?? []);
    setSelectedOption(null);
    setSubmitted(false);
    setFeedback(null);
    setExplanation(null);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <Card className="bg-white p-6 sm:p-8">
        <div className="space-y-5 text-left">
          <div className="inline-flex rounded-full bg-[#EAF4F2] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#173E39]">
            You did it!
          </div>
          <h2 className="text-3xl font-black text-[#173E39]">You finished the demo.</h2>
          <p className="text-lg text-[#38514d]">
            You scored {score} out of {total}. Want the full Mizan Kids experience?
          </p>
          <div className="rounded-2xl bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            Join Early Access and get 30 days free.
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/#early-access">Join Early Access</Button>
            <Button href="/" variant="ghost">Back home</Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white p-6 sm:p-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#5D6E6A]">
          <span>Skill {currentIndex + 1}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2.5 rounded-full bg-[#EEE7DD]">
          <div className="h-2.5 rounded-full bg-[#173E39]" style={{ width: `${progress}%` }} />
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-[#5D6E6A]">Question {currentIndex + 1}</p>
          <h3 className="text-2xl font-black text-[#173E39]">{currentQuestion.prompt}</h3>
        </div>

        {currentQuestion.prompt.includes("Put the steps") ? (
          <div className="space-y-3">
            {reorderedSteps.map((step, index) => (
              <div key={`${step}-${index}`} className="flex items-center gap-3 rounded-2xl border border-[#D8D0C1] bg-[#F8F5F0] p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173E39] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="flex-1 text-base font-medium text-[#173E39]">{step}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-[#D8D0C1] px-2 py-1 text-xs font-bold text-[#173E39] hover:border-[#173E39]"
                    onClick={() => reorderStep(index, -1)}
                    aria-label={`Move ${step} up`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-[#D8D0C1] px-2 py-1 text-xs font-bold text-[#173E39] hover:border-[#173E39]"
                    onClick={() => reorderStep(index, 1)}
                    aria-label={`Move ${step} down`}
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedOption(option)}
                className={`rounded-2xl border px-4 py-3 text-left text-base font-medium transition ${
                  selectedOption === option
                    ? "border-[#173E39] bg-[#EAF4F2] text-[#173E39]"
                    : "border-[#D8D0C1] bg-[#F8F5F0] text-[#173E39] hover:border-[#173E39]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {submitted ? (
          <div className="rounded-2xl border border-[#D8D0C1] bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            <p className="text-base font-semibold text-[#173E39]">{feedback}</p>
            <p className="mt-2">{explanation}</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          {!submitted ? (
            <Button type="button" onClick={handleSubmit} className="w-full sm:w-auto">
              Check answer
            </Button>
          ) : (
            <Button type="button" onClick={handleNext} className="w-full sm:w-auto">
              {currentIndex === total - 1 ? "See results" : "Next question"}
            </Button>
          )}
          <Button type="button" variant="ghost" onClick={resetDemo} className="w-full sm:w-auto">
            Restart demo
          </Button>
        </div>
      </div>
    </Card>
  );
}
