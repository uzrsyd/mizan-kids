"use client";

import { useState } from "react";

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
    age: "5–8",
    summary: "Learn the five daily prayers and basic prayer concepts.",
    questions: [
      {
        id: "salah-order",
        prompt: "Tap the five daily prayers from first to last.",
        type: "tap-rank",
        options: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
        correct: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
        explanation: "The daily prayer order is Fajr, Dhuhr, Asr, Maghrib, and Isha.",
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
    age: "4–7",
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
        prompt: "Which letter comes next? \n ا → ب → ?",
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
    age: "6–10",
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

export function InteractiveDemo() {
  const [view, setView] = useState<"landing" | "lesson" | "summary" | "all-complete">("landing");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lessonScores, setLessonScores] = useState<Record<string, number>>({});

  const activeLesson = lessons[lessonIndex];
  const activeQuestion = activeLesson.questions[questionIndex];
  const isLastQuestion = questionIndex === activeLesson.questions.length - 1;
  const progress = ((questionIndex + 1) / activeLesson.questions.length) * 100;
  const questionReady =
    activeQuestion.type === "tap-rank"
      ? selectedOrder.length === normalizeCorrect(activeQuestion).length
      : Boolean(selectedChoice);

  function resetQuestionState() {
    setSelectedChoice(null);
    setSelectedOrder([]);
    setSubmitted(false);
    setFeedback(null);
    setExplanation(null);
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
    const isCorrect =
      activeQuestion.type === "tap-rank"
        ? JSON.stringify(selectedOrder) === JSON.stringify(correctValues)
        : selectedChoice === activeQuestion.correct;

    if (isCorrect) {
      setFeedback("Nice work! You got it.");
      setCorrectCount((count) => count + 1);
    } else {
      setFeedback("Almost there! Let’s look at it together.");
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

  function handleLessonRestart() {
    resetQuestionState();
    setQuestionIndex(0);
    setCorrectCount(0);
    setSubmitted(false);
    setFeedback(null);
    setExplanation(null);
  }

  function handleBackToLessons() {
    setView("landing");
    setQuestionIndex(0);
    setSelectedChoice(null);
    setSelectedOrder([]);
    setSubmitted(false);
    setFeedback(null);
    setExplanation(null);
  }

  function renderQuestion() {
    if (activeQuestion.type === "tap-rank") {
      return (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {activeQuestion.options?.map((option) => {
              const selectedIndex = selectedOrder.indexOf(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (submitted) return;
                    if (selectedOrder.includes(option)) return;
                    setSelectedOrder((current) => [...current, option]);
                  }}
                  className={`relative min-h-[64px] rounded-2xl border px-4 py-3 text-left text-base font-semibold transition ${
                    selectedIndex >= 0
                      ? "border-[#173E39] bg-[#EAF4F2] text-[#173E39]"
                      : "border-[#D8D0C1] bg-[#F8F5F0] text-[#173E39] hover:border-[#173E39]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span>{option}</span>
                    {selectedIndex >= 0 ? <span className="rounded-full bg-[#173E39] px-2 py-1 text-xs text-white">{selectedIndex + 1}</span> : null}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSelectedOrder((current) => current.slice(0, -1))}
              className="w-full sm:w-auto"
            >
              Undo Last
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSelectedOrder([])}
              className="w-full sm:w-auto"
            >
              Start Over
            </Button>
          </div>
        </div>
      );
    }

    if (activeQuestion.type === "matching") {
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {activeQuestion.options?.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (submitted) return;
                setSelectedChoice(option);
              }}
              className={`min-h-[72px] rounded-2xl border px-4 py-3 text-center text-2xl font-black transition ${
                selectedChoice === option
                  ? "border-[#173E39] bg-[#EAF4F2] text-[#173E39]"
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
      <div className="grid gap-3 sm:grid-cols-2">
        {activeQuestion.options?.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              if (submitted) return;
              setSelectedChoice(option);
            }}
            className={`rounded-2xl border px-4 py-3 text-left text-base font-medium transition ${
              selectedChoice === option
                ? "border-[#173E39] bg-[#EAF4F2] text-[#173E39]"
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
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Explore three short sample lessons.</h2>
            <p className="text-base text-[#38514d]">No account required. No payment required.</p>
          </div>

          <div className="rounded-2xl border border-[#D8D0C1] bg-[#F7F1E7] p-4 text-sm font-medium text-[#173E39]">
            {completedLessons.length} of {lessons.length} sample lessons completed
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="rounded-[24px] border border-[#E7DCC7] bg-[#FFFDFB] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#5D6E6A]">Lesson {index + 1}</p>
                  {completedLessons.includes(lesson.id) ? (
                    <span className="rounded-full bg-[#EAF4F2] px-2 py-1 text-xs font-bold text-[#173E39]">Completed</span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-black text-[#173E39]">{lesson.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[#5D6E6A]">{lesson.age}</p>
                <p className="mt-4 text-sm text-[#38514d]">{lesson.summary}</p>
                <div className="mt-4 rounded-full bg-[#F4F0E8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#173E39]">
                  5 questions
                </div>
                <Button type="button" className="mt-6 w-full" onClick={() => startLesson(index)}>
                  Start Lesson
                </Button>
              </div>
            ))}
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
          <h2 className="text-3xl font-black text-[#173E39]">Lesson complete</h2>
          <p className="text-lg text-[#38514d]">
            You scored {scoreOutOfFive} of {activeLesson.questions.length} correct.
          </p>
          <div className="rounded-2xl bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            You practiced: ✓ {activeLesson.title}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={() => setView("landing")}>Try Another Lesson</Button>
            <Button type="button" href="/#early-access" variant="ghost">Join Early Access</Button>
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
          <h2 className="text-3xl font-black text-[#173E39]">You completed all three sample lessons.</h2>
          <div className="space-y-2 text-base text-[#38514d]">
            <p>✓ Salah Basics</p>
            <p>✓ Arabic Letters</p>
            <p>✓ Good Character</p>
          </div>

          <div className="rounded-2xl bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            <p className="font-semibold text-[#173E39]">Join Early Access</p>
            <p className="mt-1">Get 30 Days Free</p>
            <p className="mt-1">Launching December 1, 2026</p>
            <p className="mt-1">No credit card required</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={() => setView("landing")}>Restart Sample Lessons</Button>
            <Button type="button" href="/#early-access" variant="ghost">Join Early Access</Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white p-6 sm:p-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#5D6E6A]">
          <span>{activeLesson.title}</span>
          <span>Lesson {lessonIndex + 1} of {lessons.length}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#5D6E6A]">
            <span>Question {questionIndex + 1}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2.5 rounded-full bg-[#EEE7DD]">
            <div className="h-2.5 rounded-full bg-[#173E39]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-[#5D6E6A]">{activeQuestion.type === "tap-rank" ? "Tap to rank" : "Question"}</p>
          <h3 className="text-2xl font-black text-[#173E39]">{activeQuestion.prompt}</h3>
        </div>

        {renderQuestion()}

        {submitted ? (
          <div className="rounded-2xl border border-[#D8D0C1] bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            <p className="text-base font-semibold text-[#173E39]">{feedback}</p>
            <p className="mt-2">{explanation}</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          {!submitted ? (
            <Button
              type="button"
              onClick={submitAnswer}
              disabled={!questionReady}
              className="w-full sm:w-auto"
            >
              Check My Answer
            </Button>
          ) : (
            <Button type="button" onClick={advanceQuestion} className="w-full sm:w-auto">
              {isLastQuestion ? "See results" : "Continue"}
            </Button>
          )}

          <Button type="button" variant="ghost" onClick={handleLessonRestart} className="w-full sm:w-auto">
            Restart Lesson
          </Button>
          <Button type="button" variant="ghost" onClick={handleBackToLessons} className="w-full sm:w-auto">
            Back to Lessons
          </Button>
        </div>
      </div>
    </Card>
  );
}
