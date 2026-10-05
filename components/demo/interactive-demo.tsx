"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type QuestionType = "tap-rank" | "multiple-choice" | "matching";

type Question = {
  id: string;
  prompt: string;
  type: QuestionType;
  options?: string[];
  correct: string | string[];
  explanation: string;
};

type Lesson = {
  id: string;
  title: string;
  age: string;
  summary: string;
  questions: Question[];
};

const lessons: Lesson[] = [
  {
    id: "salah-basics",
    title: "Salah Basics",
    age: "Ages 5–8",
    summary: "Learn the five daily prayers and basic prayer concepts.",
    questions: [
      {
        id: "salah-order",
        prompt: "Put the five daily prayers in order.",
        type: "tap-rank",
        options: ["Maghrib", "Fajr", "Isha", "Dhuhr", "Asr"],
        correct: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
        explanation: "Fajr comes first, followed by Dhuhr, Asr, Maghrib, and Isha.",
      },
      {
        id: "salah-count",
        prompt: "How many obligatory prayers do Muslims pray each day?",
        type: "multiple-choice",
        options: ["3", "4", "5", "6"],
        correct: "5",
        explanation: "Muslims pray five obligatory prayers each day.",
      },
      {
        id: "salah-after-dhuhr",
        prompt: "Which prayer comes after Dhuhr?",
        type: "multiple-choice",
        options: ["Fajr", "Asr", "Maghrib", "Isha"],
        correct: "Asr",
        explanation: "After Dhuhr comes Asr, which is the next prayer in the daily sequence.",
      },
      {
        id: "salah-first",
        prompt: "Which prayer is first in the daily prayer order?",
        type: "multiple-choice",
        options: ["Fajr", "Dhuhr", "Maghrib", "Isha"],
        correct: "Fajr",
        explanation: "Fajr is the first obligatory prayer of the day.",
      },
      {
        id: "salah-after-maghrib",
        prompt: "Which prayer comes after Maghrib?",
        type: "multiple-choice",
        options: ["Asr", "Dhuhr", "Isha", "Fajr"],
        correct: "Isha",
        explanation: "Isha follows Maghrib in the daily prayer sequence.",
      },
    ],
  },
  {
    id: "arabic-letters",
    title: "Arabic Letters",
    age: "Ages 4–7",
    summary: "Recognize and match beginner Arabic letters.",
    questions: [
      {
        id: "alif",
        prompt: "Which letter is Alif?",
        type: "multiple-choice",
        options: ["ا", "ب", "ت", "م"],
        correct: "ا",
        explanation: "The letter ا is Alif.",
      },
      {
        id: "letter-b",
        prompt: "Find the letter ب.",
        type: "matching",
        options: ["د", "ب", "ت", "ا"],
        correct: "ب",
        explanation: "The correct letter is ب, which is the letter Ba.",
      },
      {
        id: "match-ta",
        prompt: "Which letter matches this one?",
        type: "multiple-choice",
        options: ["ب", "ت", "ا", "م"],
        correct: "ت",
        explanation: "This letter is ت, which is the letter Ta.",
      },
      {
        id: "sequence-letters",
        prompt: "Which letter comes next? ا → ب → ?",
        type: "multiple-choice",
        options: ["ت", "م", "ن", "د"],
        correct: "ت",
        explanation: "After ا and ب, the next beginner letter is ت.",
      },
      {
        id: "arabic-match",
        prompt: "Match the letters correctly.",
        type: "matching",
        options: ["ب", "ت", "ا"],
        correct: "ب",
        explanation: "This beginner matching practice helps with recognizing the letters you just saw.",
      },
    ],
  },
  {
    id: "good-character",
    title: "Good Character",
    age: "Ages 6–10",
    summary: "Practice Islamic manners through everyday situations.",
    questions: [
      {
        id: "broken-toy",
        prompt: "You accidentally break your sibling’s toy. What should you do?",
        type: "multiple-choice",
        options: ["Hide it", "Blame someone else", "Tell the truth and try to make it right", "Walk away"],
        correct: "Tell the truth and try to make it right",
        explanation: "Honesty and making things right are the kindest and most responsible choice.",
      },
      {
        id: "new-kid",
        prompt: "Someone new is sitting alone. What is a kind thing to do?",
        type: "multiple-choice",
        options: ["Ignore them", "Ask them to help you", "Invite them to join you", "Leave the room"],
        correct: "Invite them to join you",
        explanation: "Including someone and making them feel welcome is a beautiful act of kindness.",
      },
      {
        id: "shoes",
        prompt: "Your parent asks you to put your shoes away. What is the best response?",
        type: "multiple-choice",
        options: ["Delay and complain", "Do it right away and respectfully", "Argue", "Forget about it"],
        correct: "Do it right away and respectfully",
        explanation: "Listening and acting quickly shows respect and responsibility.",
      },
      {
        id: "borrowed-item",
        prompt: "You borrowed something from a friend. What should you do when you are finished?",
        type: "multiple-choice",
        options: ["Keep it", "Return it carefully", "Take a break", "Hide it"],
        correct: "Return it carefully",
        explanation: "Returning borrowed items with care shows trustworthiness and respect.",
      },
      {
        id: "thanks",
        prompt: "Someone helps you. What is a good response?",
        type: "multiple-choice",
        options: ["Ignore them", "Say nothing", "Thank them", "Run away"],
        correct: "Thank them",
        explanation: "Saying thank you is a simple, kind way to show gratitude.",
      },
    ],
  },
];

function normalizeCorrect(question: Question): string[] {
  return Array.isArray(question.correct) ? question.correct : [question.correct];
}

const DEMO_STORAGE_KEY = "mizan-kids-demo-progress-v1";

export function InteractiveDemo() {
  const [view, setView] = useState<"landing" | "lesson" | "summary" | "all-complete">("landing");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = window.sessionStorage.getItem(DEMO_STORAGE_KEY);
      if (!saved) return [];

      const parsed = JSON.parse(saved) as { completedLessons?: string[] };
      return Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [];
    } catch {
      return [];
    }
  });
  const [lessonScores, setLessonScores] = useState<Record<string, number>>(() => {
    if (typeof window === "undefined") return {};

    try {
      const saved = window.sessionStorage.getItem(DEMO_STORAGE_KEY);
      if (!saved) return {};

      const parsed = JSON.parse(saved) as { lessonScores?: Record<string, number> };
      return parsed.lessonScores ?? {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify({ completedLessons, lessonScores }));
  }, [completedLessons, lessonScores]);

  const activeLesson = lessons[lessonIndex];
  const activeQuestion = activeLesson.questions[questionIndex];
  const isLastQuestion = questionIndex === activeLesson.questions.length - 1;
  const questionReady =
    activeQuestion.type === "tap-rank"
      ? selectedOrder.length === normalizeCorrect(activeQuestion).length
      : Boolean(selectedChoice);
  const progressSegments = Array.from({ length: activeLesson.questions.length }, (_, index) => {
    if (index < questionIndex) return true;
    if (index === questionIndex && submitted) return true;
    return false;
  });

  function resetQuestionState() {
    setSelectedChoice(null);
    setSelectedOrder([]);
    setSubmitted(false);
    setFeedback(null);
    setExplanation(null);
    setIsAnswerCorrect(null);
  }

  function clearOrder() {
    setSelectedOrder([]);
  }

  function startLesson(index: number) {
    setLessonIndex(index);
    setQuestionIndex(0);
    setCorrectCount(0);
    resetQuestionState();
    setView("lesson");
  }

  function submitAnswer() {
    const correctValues = normalizeCorrect(activeQuestion);
    const correct =
      activeQuestion.type === "tap-rank"
        ? JSON.stringify(selectedOrder) === JSON.stringify(correctValues)
        : selectedChoice === activeQuestion.correct;

    setIsAnswerCorrect(correct);

    if (correct) {
      setFeedback("You got it!");
      setCorrectCount((count) => count + 1);
    } else {
      setFeedback("Almost! Let’s try that once more.");
    }

    setExplanation(activeQuestion.explanation);
    setSubmitted(true);
  }

  function advanceQuestion() {
    if (isLastQuestion) {
      const nextScores = { ...lessonScores, [activeLesson.id]: correctCount };
      const nextCompleted = Array.from(new Set([...completedLessons, activeLesson.id]));
      setLessonScores(nextScores);
      setCompletedLessons(nextCompleted);

      if (nextCompleted.length >= lessons.length) {
        setView("all-complete");
      } else {
        setView("summary");
      }
      return;
    }

    setQuestionIndex((index) => index + 1);
    resetQuestionState();
  }

  function handleBackToLessons() {
    setView("landing");
    setQuestionIndex(0);
    setSelectedChoice(null);
    setSelectedOrder([]);
    setSubmitted(false);
    setFeedback(null);
    setExplanation(null);
    setIsAnswerCorrect(null);
  }

  function renderLessonIllustration(lessonId: string) {
    const base = "h-16 w-full rounded-[20px] border border-[#E7DCC7] bg-[#F7F1E7] p-3";

    switch (lessonId) {
      case "salah-basics":
        return (
          <div className={`${base} flex items-center justify-center`}>
            <svg viewBox="0 0 120 80" className="h-16 w-full max-w-[140px]" aria-hidden="true">
              <path d="M28 49h64V23H28z" fill="#DDEEEB" stroke="#173E39" strokeWidth="3" rx="8" />
              <path d="M26 49h68" stroke="#173E39" strokeWidth="3" strokeLinecap="round" />
              <path d="M32 23V14M88 23V14M26 23V14M94 23V14" stroke="#173E39" strokeWidth="3" strokeLinecap="round" />
              <path d="M38 37h44M38 44h24" stroke="#173E39" strokeWidth="3" strokeLinecap="round" />
              <path d="M60 14l4-8 4 8" fill="none" stroke="#173E39" strokeWidth="3" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case "arabic-letters":
        return (
          <div className={`${base} flex items-center justify-center`}>
            <svg viewBox="0 0 120 80" className="h-16 w-full max-w-[140px]" aria-hidden="true">
              <rect x="22" y="20" width="76" height="34" rx="12" fill="#DDEFF6" stroke="#173E39" strokeWidth="3" />
              <text x="60" y="47" textAnchor="middle" fontSize="26" fontWeight="700" fill="#173E39" fontFamily="serif">أ ب ت</text>
            </svg>
          </div>
        );
      case "good-character":
        return (
          <div className={`${base} flex items-center justify-center`}>
            <svg viewBox="0 0 120 80" className="h-16 w-full max-w-[140px]" aria-hidden="true">
              <path d="M60 18c-9.6 0-17.5 7.7-17.5 17.3C42.5 46.2 50.8 54 60 62c9.2-8 17.5-15.8 17.5-26.7C77.5 25.7 69.6 18 60 18Z" fill="#F7D8A5" stroke="#173E39" strokeWidth="3" strokeLinejoin="round" />
              <path d="M42 30c-7 2-11 7-11 13 0 9 8 14 29 21" fill="none" stroke="#173E39" strokeWidth="3" strokeLinecap="round" />
              <path d="M78 30c7 2 11 7 11 13 0 9-8 14-29 21" fill="none" stroke="#173E39" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  }

  function renderQuestion() {
    if (activeQuestion.type === "tap-rank") {
      return (
        <div className="space-y-4">
          <div className="mx-auto grid max-w-[700px] gap-3">
            {activeQuestion.options?.map((option) => {
              const selectedIndex = selectedOrder.indexOf(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (submitted) return;
                    const nextOrder = selectedOrder.includes(option)
                      ? selectedOrder.filter((item) => item !== option)
                      : [...selectedOrder, option];
                    setSelectedOrder(nextOrder);
                  }}
                  className={`relative min-h-[72px] rounded-2xl border px-4 py-3 text-left text-lg font-bold transition ${
                    selectedIndex >= 0
                      ? "border-[#173E39] bg-[#EAF4F2] text-[#173E39] shadow-[0_12px_25px_rgba(23,62,57,0.08)]"
                      : "border-[#D8D0C1] bg-[#F8F5F0] text-[#173E39] hover:border-[#173E39] hover:bg-[#F2F7F5]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span>{option}</span>
                    {selectedIndex >= 0 ? (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173E39] text-sm font-black text-white">
                        {selectedIndex + 1}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeQuestion.type === "matching") {
      return (
        <div className="mx-auto grid max-w-[700px] gap-3 sm:grid-cols-2">
          {activeQuestion.options?.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (submitted) return;
                setSelectedChoice(option);
              }}
              className={`min-h-[82px] rounded-2xl border px-4 py-3 text-center text-3xl font-black transition ${
                selectedChoice === option
                  ? "border-[#173E39] bg-[#EAF4F2] text-[#173E39] shadow-[0_12px_25px_rgba(23,62,57,0.08)]"
                  : "border-[#D8D0C1] bg-[#F8F5F0] text-[#173E39] hover:border-[#173E39]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="mx-auto grid max-w-[700px] gap-3">
        {activeQuestion.options?.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              if (submitted) return;
              setSelectedChoice(option);
            }}
            className={`rounded-2xl border px-4 py-4 text-left text-base font-medium leading-6 transition ${
              selectedChoice === option
                ? "border-[#173E39] bg-[#EAF4F2] text-[#173E39] shadow-[0_12px_25px_rgba(23,62,57,0.08)]"
                : "border-[#D8D0C1] bg-[#F8F5F0] text-[#173E39] hover:border-[#173E39]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  if (view === "landing") {
    return (
      <Card className="bg-white p-6 sm:p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.18em] text-[#5D6E6A]">Try Mizan Kids</p>
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Choose one of three short sample lessons.</h2>
            <p className="text-base text-[#38514d]">No account or payment required.</p>
          </div>

          <div className="rounded-2xl border border-[#E7DCC7] bg-[#F7F1E7] p-4 text-sm text-[#173E39]">
            <div className="flex items-center gap-3 font-medium">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#173E39]" />
                {completedLessons.length} of {lessons.length} lessons completed
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {lessons.map((lesson, index) => {
              const completed = completedLessons.includes(lesson.id);
              return (
                <div key={lesson.id} className="flex h-full flex-col rounded-[24px] border border-[#E7DCC7] bg-[#FFFDFB] p-5 shadow-[0_10px_22px_rgba(23,62,57,0.03)]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#5D6E6A]">Lesson {index + 1}</p>
                    {completed ? (
                      <span className="rounded-full bg-[#EAF4F2] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#173E39]">Completed</span>
                    ) : null}
                  </div>

                  <div className="mb-4">{renderLessonIllustration(lesson.id)}</div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-[#173E39]">{lesson.title}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5D6E6A]">
                      <span>{lesson.age}</span>
                      <span>•</span>
                      <span>5 quick questions</span>
                      <span>•</span>
                      <span>About 3 min</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#38514d]">{lesson.summary}</p>
                  </div>

                  <Button type="button" className="mt-6 w-full" onClick={() => startLesson(index)}>
                    {completed ? "Review Lesson" : "Start Lesson"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    );
  }

  if (view === "summary") {
    const scoreOutOfFive = lessonScores[activeLesson.id] ?? correctCount;

    return (
      <Card className="bg-white p-6 sm:p-8">
        <div className="space-y-5">
          <div className="inline-flex rounded-full bg-[#EAF4F2] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#173E39]">
            MashaAllah!
          </div>
          <h2 className="text-3xl font-black text-[#173E39]">{activeLesson.title} complete</h2>
          <p className="text-lg text-[#38514d]">
            You answered {scoreOutOfFive} of {activeLesson.questions.length} correctly.
          </p>
          <div className="rounded-2xl bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            <p className="font-semibold text-[#173E39]">You practiced:</p>
            <ul className="mt-2 space-y-2">
              <li>✓ {activeLesson.title}</li>
              <li>✓ Daily prayer names</li>
              <li>✓ Prayer order</li>
              <li>✓ Basic Salah knowledge</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={() => setView("landing")}>Try Another Lesson</Button>
            <Button type="button" href="/#early-access" variant="secondary">Join Early Access</Button>
          </div>
        </div>
      </Card>
    );
  }

  if (view === "all-complete") {
    return (
      <Card className="bg-white p-6 sm:p-8">
        <div className="space-y-5">
          <div className="inline-flex rounded-full bg-[#EAF4F2] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#173E39]">
            You explored Mizan Kids!
          </div>
          <h2 className="text-3xl font-black text-[#173E39]">All three sample lessons are complete.</h2>
          <div className="space-y-2 text-base text-[#38514d]">
            <p>✓ Salah Basics</p>
            <p>✓ Arabic Letters</p>
            <p>✓ Good Character</p>
          </div>

          <div className="rounded-2xl bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            <p className="font-semibold text-[#173E39]">Want more structured Islamic learning for your child?</p>
            <p className="mt-2">Join Early Access — Get 30 Days Free</p>
            <p className="mt-1">Launching December 1, 2026</p>
            <p className="mt-1">No credit card required</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={() => setView("landing")}>Review Lessons</Button>
            <Button type="button" href="/#early-access" variant="secondary">Join Early Access</Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white p-6 sm:p-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5D6E6A]">
          <span>{activeLesson.title}</span>
          <span>Question {questionIndex + 1} of {activeLesson.questions.length}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {activeLesson.questions.map((_, index) => (
              <span
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  progressSegments[index] ? "bg-[#173E39]" : index === questionIndex ? "bg-[#D9D1C5]" : "bg-[#EEE7DD]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl font-black leading-tight text-[#173E39]">{activeQuestion.prompt}</h3>
          {activeQuestion.type === "tap-rank" ? (
            <p className="text-base text-[#38514d]">Tap each prayer starting with the first.</p>
          ) : null}
        </div>

        {renderQuestion()}

        {submitted ? (
          <div className="rounded-2xl border border-[#D8D0C1] bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            <p className="text-lg font-black text-[#173E39]">{feedback}</p>
            <p className="mt-2 leading-6">{explanation}</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          {!submitted ? (
            <Button type="button" onClick={submitAnswer} disabled={!questionReady} className="w-full sm:w-auto">
              Check My Answer
            </Button>
          ) : isAnswerCorrect ? (
            <Button type="button" onClick={advanceQuestion} className="w-full sm:w-auto">
              {isLastQuestion ? "See results" : "Next Question"}
            </Button>
          ) : (
            <Button type="button" onClick={() => resetQuestionState()} className="w-full sm:w-auto">
              Try Again
            </Button>
          )}

          {activeQuestion.type === "tap-rank" ? (
            <Button type="button" variant="ghost" onClick={clearOrder} disabled={selectedOrder.length === 0} className="w-full sm:w-auto">
              Clear Order
            </Button>
          ) : null}

          <Button type="button" variant="ghost" onClick={handleBackToLessons} className="w-full sm:w-auto">
            ← Back to Lessons
          </Button>
        </div>
      </div>
    </Card>
  );
}
