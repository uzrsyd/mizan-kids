"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMosque, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { SourcesLessonNotes } from "@/components/demo/sources-lesson-notes";
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
  sourceNote?: {
    sourceType?: string;
    sourceReference?: string;
    sourceDisplayText?: string;
    lessonNote?: string;
    reviewStatus?: string;
    madhhabSensitivity?: string;
  };
};

type Lesson = {
  id: string;
  title: string;
  age: string;
  summary: string;
  questions: Question[];
};

type LessonGroup = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  lessons: Lesson[];
};

const successPhrases = ["Nice work!", "Great job!", "You got it!", "Excellent thinking!", "MashaAllah — well done!"];

const lessonGroups: LessonGroup[] = [
  {
    id: "early-learners",
    title: "EARLY LEARNERS",
    subtitle: "Ages 4–5",
    description: "Big ideas, simple questions, encouraging practice.",
    lessons: [
      {
        id: "arabic-letters",
        title: "Arabic Letters",
        age: "Ages 4–5",
        summary: "Recognize the first Arabic letters and build early confidence.",
        questions: [
          {
            id: "alif",
            prompt: "Which letter is Alif?",
            type: "multiple-choice",
            options: ["ا", "ب", "ت", "م"],
            correct: "ا",
            explanation: "Alif is the first letter of the Arabic alphabet.",
            sourceNote: {
              lessonNote: "Alif (ا) is the first letter of the Arabic alphabet.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "baa",
            prompt: "Which letter is Baa?",
            type: "multiple-choice",
            options: ["ب", "ت", "ا", "ج"],
            correct: "ب",
            explanation: "Baa is the letter ب.",
            sourceNote: {
              lessonNote: "Baa (ب) is the second letter of the Arabic alphabet.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "taa",
            prompt: "Which letter is Taa?",
            type: "multiple-choice",
            options: ["ت", "ب", "ا", "ث"],
            correct: "ت",
            explanation: "Taa is the letter ت.",
            sourceNote: {
              lessonNote: "Taa (ت) is the third letter of the Arabic alphabet.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "next-after-taa",
            prompt: "Which letter comes after Taa?",
            type: "multiple-choice",
            options: ["ب", "ث", "أ", "ج"],
            correct: "ث",
            explanation: "After Taa comes Thaa, which is the letter ث.",
            sourceNote: {
              lessonNote: "After Taa comes Thaa (ث), the next letter in the early alphabet sequence.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "arabic-order",
            prompt: "Put the first five Arabic letters in order.",
            type: "tap-rank",
            options: ["ج", "ب", "ث", "ا", "ت"],
            correct: ["ا", "ب", "ت", "ث", "ج"],
            explanation: "The first five letters in order are Alif, Baa, Taa, Thaa, and Jeem.",
            sourceNote: {
              lessonNote: "The first five letters of the Arabic alphabet are commonly introduced as Alif, Baa, Taa, Thaa, and Jeem.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
        ],
      },
      {
        id: "salah-basics",
        title: "Salah Basics",
        age: "Ages 4–5",
        summary: "Learn the five daily prayers and how they fit into the day.",
        questions: [
          {
            id: "morning-prayer",
            prompt: "Which prayer is prayed in the morning?",
            type: "multiple-choice",
            options: ["Asr", "Fajr", "Isha", "Maghrib"],
            correct: "Fajr",
            explanation: "Fajr is the morning prayer.",
            sourceNote: {
              lessonNote: "Fajr is a morning prayer in the daily sequence of Salah.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "daily-prayers-count",
            prompt: "How many obligatory prayers do Muslims pray each day?",
            type: "multiple-choice",
            options: ["3", "4", "5", "6"],
            correct: "5",
            explanation: "Muslims pray five obligatory prayers each day.",
            sourceNote: {
              lessonNote: "Muslims pray five obligatory daily prayers, in order across the day.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "after-dhuhr",
            prompt: "Which prayer comes after Dhuhr?",
            type: "multiple-choice",
            options: ["Fajr", "Asr", "Maghrib", "Isha"],
            correct: "Asr",
            explanation: "After Dhuhr comes Asr.",
            sourceNote: {
              lessonNote: "The daily prayer sequence continues from Dhuhr to Asr.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "after-maghrib",
            prompt: "Which prayer comes after Maghrib?",
            type: "multiple-choice",
            options: ["Asr", "Dhuhr", "Isha", "Fajr"],
            correct: "Isha",
            explanation: "Isha comes after Maghrib.",
            sourceNote: {
              lessonNote: "Following Maghrib, the next obligatory prayer is Isha.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "salah-order",
            prompt: "Put the five daily prayers in order from morning to night.",
            type: "tap-rank",
            options: ["Maghrib", "Fajr", "Isha", "Dhuhr", "Asr"],
            correct: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
            explanation: "The daily prayer order is Fajr, Dhuhr, Asr, Maghrib, and Isha.",
            sourceNote: {
              lessonNote: "The five daily prayers are practiced in a consistent sequence across the day.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
        ],
      },
      {
        id: "good-character",
        title: "Good Character",
        age: "Ages 4–5",
        summary: "Practice manners and kind choices in everyday moments.",
        questions: [
          {
            id: "crayons",
            prompt: "A friend drops crayons. What is the kind thing to do?",
            type: "multiple-choice",
            options: ["Ignore them", "Help pick them up", "Run away", "Take one for yourself"],
            correct: "Help pick them up",
            explanation: "Helping someone pick up what they dropped is a kind and caring action.",
            sourceNote: {
              lessonNote: "Kindness often shows up in small everyday actions like helping someone pick up what they dropped.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "gift",
            prompt: "Someone gives you a gift. What should you do?",
            type: "multiple-choice",
            options: ["Say nothing", "Thank them", "Hide it", "Complain"],
            correct: "Thank them",
            explanation: "Thanking someone is a respectful and grateful response.",
            sourceNote: {
              lessonNote: "Saying thank you is a simple way to show appreciation and good manners.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "spill",
            prompt: "You accidentally spill juice. What should you do?",
            type: "multiple-choice",
            options: ["Lie about it", "Tell the truth and help clean up", "Leave it", "Blame a friend"],
            correct: "Tell the truth and help clean up",
            explanation: "Honesty and helping clean up shows responsibility and care.",
            sourceNote: {
              lessonNote: "Being honest and helping fix a mistake is a strong character habit.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "turn-taking",
            prompt: "Your sibling is speaking. What should you do?",
            type: "multiple-choice",
            options: ["Interrupt", "Listen and wait your turn", "Leave the room", "Yell"],
            correct: "Listen and wait your turn",
            explanation: "Listening and waiting your turn shows patience and respect.",
            sourceNote: {
              lessonNote: "Waiting your turn and listening shows patience and respect in family life.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "borrowed-toy",
            prompt: "You borrow a toy from a friend. What should you do when you are done?",
            type: "multiple-choice",
            options: ["Keep it", "Give it back carefully", "Throw it away", "Hide it"],
            correct: "Give it back carefully",
            explanation: "Returning a borrowed toy carefully shows trustworthiness and respect.",
            sourceNote: {
              lessonNote: "Returning borrowed items carefully is a respectful and trustworthy action.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "growing-learners",
    title: "GROWING LEARNERS",
    subtitle: "Ages 8–9",
    description: "Go deeper with Islamic knowledge, history, and understanding.",
    lessons: [
      {
        id: "seerah-journey",
        title: "Seerah Journey",
        age: "Ages 8–9",
        summary: "Explore key moments in the life and character of Prophet Muhammad ﷺ.",
        questions: [
          {
            id: "birth-city",
            prompt: "What city was Prophet Muhammad ﷺ born in?",
            type: "multiple-choice",
            options: ["Madinah", "Makkah", "Jerusalem", "Taif"],
            correct: "Makkah",
            explanation: "Prophet Muhammad ﷺ was born in Makkah.",
            sourceNote: {
              lessonNote: "The Prophet Muhammad ﷺ was born in Makkah and grew up there before the early years of his prophethood.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
          {
            id: "first-revelation-place",
            prompt: "Where did the first revelation begin?",
            type: "multiple-choice",
            options: ["Masjid al-Haram", "Cave Hira", "Madinah", "Mount Uhud"],
            correct: "Cave Hira",
            explanation: "The first revelation began in Cave Hira.",
            sourceNote: {
              lessonNote: "The first revelation began in Cave Hira, where the Prophet Muhammad ﷺ received the first verses of the Quran.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
          {
            id: "angel-jibril",
            prompt: "Which angel brought the first revelation?",
            type: "multiple-choice",
            options: ["Israfil", "Jibril", "Mikail", "Izra'il"],
            correct: "Jibril",
            explanation: "Jibril brought the first revelation to Prophet Muhammad ﷺ.",
            sourceNote: {
              lessonNote: "The angel Jibril brought the first revelation to the Prophet Muhammad ﷺ.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
          {
            id: "meaning-hijrah",
            prompt: "What does Hijrah mean?",
            type: "multiple-choice",
            options: ["A journey of worship", "Migration from Makkah to Madinah", "A special prayer", "A victory celebration"],
            correct: "Migration from Makkah to Madinah",
            explanation: "Hijrah means the migration from Makkah to Madinah.",
            sourceNote: {
              lessonNote: "Hijrah refers to the migration from Makkah to Madinah, a major turning point in Islamic history.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
          {
            id: "seerah-sequence",
            prompt: "Put these key Seerah events in order.",
            type: "tap-rank",
            options: ["Birth in Makkah", "First revelation", "Hijrah to Madinah", "Farewell pilgrimage"],
            correct: ["Birth in Makkah", "First revelation", "Hijrah to Madinah", "Farewell pilgrimage"],
            explanation: "The key sequence is birth in Makkah, first revelation, Hijrah, and the Farewell pilgrimage.",
            sourceNote: {
              lessonNote: "These milestones are commonly discussed in Seerah study as key steps in the life of Prophet Muhammad ﷺ.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
        ],
      },
      {
        id: "prophets-lessons",
        title: "Prophets & Lessons",
        age: "Ages 8–9",
        summary: "Learn from the stories, lessons, and examples of the Prophets.",
        questions: [
          {
            id: "nuh",
            prompt: "Which Prophet built the Ark?",
            type: "multiple-choice",
            options: ["Musa", "Nuh", "Yusuf", "Ibrahim"],
            correct: "Nuh",
            explanation: "Nuh built the Ark.",
            sourceNote: {
              lessonNote: "Prophet Nuh is remembered for building the Ark in obedience to Allah.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
          {
            id: "yunus",
            prompt: "Which Prophet was swallowed by a great fish?",
            type: "multiple-choice",
            options: ["Yunus", "Musa", "Yusuf", "Ibrahim"],
            correct: "Yunus",
            explanation: "Yunus was swallowed by a great fish and then turned to Allah in sincere supplication.",
            sourceNote: {
              lessonNote: "The story of Prophet Yunus includes his time in the belly of the great fish and his return to Allah.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
          {
            id: "musa",
            prompt: "Which Prophet confronted Fir'awn?",
            type: "multiple-choice",
            options: ["Yusuf", "Musa", "Ibrahim", "Nuh"],
            correct: "Musa",
            explanation: "Musa confronted Fir'awn.",
            sourceNote: {
              lessonNote: "Prophet Musa is remembered for confronting Pharaoh and calling people to faith and justice.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
          {
            id: "ibrahim",
            prompt: "Which Prophet raised the foundations of the Ka'bah with Ismail?",
            type: "multiple-choice",
            options: ["Nuh", "Musa", "Ibrahim", "Yusuf"],
            correct: "Ibrahim",
            explanation: "Ibrahim raised the foundations of the Ka'bah with Ismail.",
            sourceNote: {
              lessonNote: "Prophet Ibrahim and his son Ismail rebuilt the foundations of the Ka'bah.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
          {
            id: "yusuf",
            prompt: "Which Prophet is known for the story of dreams, patience, and trust in Allah?",
            type: "multiple-choice",
            options: ["Yusuf", "Nuh", "Yunus", "Ibrahim"],
            correct: "Yusuf",
            explanation: "Yusuf is known for his story of dreams, patience, and trust in Allah.",
            sourceNote: {
              lessonNote: "The story of Prophet Yusuf includes patience, trust in Allah, and a powerful lesson in perseverance.",
              reviewStatus: "Reviewed for age-appropriate and historical accuracy.",
            },
          },
        ],
      },
      {
        id: "quran-islamic-knowledge",
        title: "Quran & Islamic Knowledge",
        age: "Ages 8–9",
        summary: "Build confidence in Quran basics and essential Islamic knowledge.",
        questions: [
          {
            id: "surah-fatihah",
            prompt: "What is the first surah of the Quran?",
            type: "multiple-choice",
            options: ["Al-Mulk", "Al-Fatihah", "An-Nas", "Al-Baqarah"],
            correct: "Al-Fatihah",
            explanation: "Al-Fatihah is the first surah in the Quran.",
            sourceNote: {
              lessonNote: "Al-Fatihah is the first surah in the Quran and is recited in every unit of Salah.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "surah-count",
            prompt: "How many surahs are in the Quran?",
            type: "multiple-choice",
            options: ["99", "114", "120", "104"],
            correct: "114",
            explanation: "There are 114 surahs in the Quran.",
            sourceNote: {
              lessonNote: "The Quran is made up of 114 surahs in total.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "longest-surah",
            prompt: "What is the longest surah in the Quran?",
            type: "multiple-choice",
            options: ["Al-Fatihah", "Al-Baqarah", "An-Nas", "Maryam"],
            correct: "Al-Baqarah",
            explanation: "Al-Baqarah is the longest surah in the Quran.",
            sourceNote: {
              lessonNote: "Al-Baqarah is the longest surah in the Quran.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "quran-revelation-month",
            prompt: "In which month did the Quran’s revelation begin?",
            type: "multiple-choice",
            options: ["Ramadan", "Muharram", "Rajab", "Sha'ban"],
            correct: "Ramadan",
            explanation: "The Quran’s revelation began in Ramadan.",
            sourceNote: {
              lessonNote: "The Quran's revelation began in Ramadan, which is a central month in Islamic life and worship.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
          {
            id: "zakat",
            prompt: "Which pillar of Islam is obligatory charity?",
            type: "multiple-choice",
            options: ["Salah", "Hajj", "Zakat", "Fasting"],
            correct: "Zakat",
            explanation: "Zakat is the pillar of charity and giving for those who are able.",
            sourceNote: {
              lessonNote: "Zakat is the pillar of obligatory charity in Islam and a key act of social care.",
              reviewStatus: "Reviewed for age-appropriate learning.",
            },
          },
        ],
      },
    ],
  },
];

const allLessons = lessonGroups.flatMap((group) => group.lessons);
const lessons = allLessons;

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
  const [sourceNotesOpen, setSourceNotesOpen] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastSuccessIndex, setLastSuccessIndex] = useState<number | null>(null);
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
    setSourceNotesOpen(false);
  }

  function resetForNewAttempt() {
    if (submitted && isAnswerCorrect === false) {
      setSubmitted(false);
      setFeedback(null);
      setExplanation(null);
      setIsAnswerCorrect(null);
      setSourceNotesOpen(false);
    }
  }

  function clearOrder() {
    setSelectedOrder([]);
  }

  function startLesson(index: number) {
    setLessonIndex(index);
    setQuestionIndex(0);
    setCorrectCount(0);
    setLastSuccessIndex(null);
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
      let nextIndex = (lessonIndex + questionIndex + completedLessons.length) % successPhrases.length;
      const available = successPhrases
        .map((_, index) => index)
        .filter((index) => index !== lastSuccessIndex);

      if (available.length > 0) {
        nextIndex = available[(lessonIndex + questionIndex + completedLessons.length) % available.length];
      }

      setLastSuccessIndex(nextIndex);
      setFeedback(successPhrases[nextIndex]);
      setCorrectCount((count) => count + 1);
      setSourceNotesOpen(false);
    } else {
      setFeedback("Not quite.");
      setSourceNotesOpen(true);
    }

    setExplanation(activeQuestion.explanation);
    setSubmitted(true);
  }

  function advanceQuestion() {
    const nextLessonScore = isAnswerCorrect ? correctCount + 1 : correctCount;

    if (isLastQuestion) {
      const nextScores = { ...lessonScores, [activeLesson.id]: nextLessonScore };
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
    setLastSuccessIndex(null);
  }

  function renderLessonIllustration(lessonId: string) {
    const base = "h-16 w-full rounded-[20px] border border-[#E7DCC7] bg-[#F7F1E7] p-3";
    const iconMap: Record<string, { icon: IconDefinition; className: string } | null> = {
      "salah-basics": { icon: faMosque, className: "text-[#173E39]" },
      "arabic-letters": null,
      "good-character": { icon: faHeart, className: "text-[#173E39]" },
    };

    const lessonIcon = iconMap[lessonId];
    if (lessonId === "arabic-letters") {
      return (
        <div className={`${base} flex items-center justify-center`}>
          <span
            aria-label="Arabic learning"
            className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#E8F0EA] text-[34px] font-black leading-[1] text-[#173E39]"
            style={{ fontFamily: '"Noto Naskh Arabic", "Segoe UI", serif' }}
          >
            ب
          </span>
        </div>
      );
    }

    if (!lessonIcon) return null;

    return (
      <div className={`${base} flex items-center justify-center`}>
        <FontAwesomeIcon icon={lessonIcon.icon} className={`h-8 w-8 ${lessonIcon.className}`} aria-hidden="true" />
      </div>
    );
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
                    resetForNewAttempt();
                    const nextOrder = selectedOrder.includes(option)
                      ? selectedOrder.filter((item) => item !== option)
                      : [...selectedOrder, option];
                    setSelectedOrder(nextOrder);
                  }}
                  className={`relative min-h-[72px] rounded-2xl border px-4 py-3 text-left text-lg font-bold transition ${
                    selectedIndex >= 0
                      ? submitted && isAnswerCorrect === false
                        ? "border-[#B8B0A4] bg-[#F0EEE9] text-[#5D6E6A]"
                        : "border-[#173E39] bg-[#EAF4F2] text-[#173E39] shadow-[0_12px_25px_rgba(23,62,57,0.08)]"
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
                resetForNewAttempt();
                setSelectedChoice(option);
              }}
              className={`min-h-[82px] rounded-2xl border px-4 py-3 text-center text-3xl font-black transition ${
                selectedChoice === option
                  ? submitted && isAnswerCorrect === false
                    ? "border-[#B8B0A4] bg-[#F0EEE9] text-[#5D6E6A]"
                    : "border-[#173E39] bg-[#EAF4F2] text-[#173E39] shadow-[0_12px_25px_rgba(23,62,57,0.08)]"
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
              resetForNewAttempt();
              setSelectedChoice(option);
            }}
            className={`rounded-2xl border px-4 py-4 text-left text-base font-medium leading-6 transition ${
              selectedChoice === option
                ? submitted && isAnswerCorrect === false
                  ? "border-[#B8B0A4] bg-[#F0EEE9] text-[#5D6E6A]"
                  : "border-[#173E39] bg-[#EAF4F2] text-[#173E39] shadow-[0_12px_25px_rgba(23,62,57,0.08)]"
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
            <h2 className="text-3xl font-black text-[#173E39] sm:text-4xl">Explore sample lessons for different ages.</h2>
            <p className="text-base text-[#38514d]">No account or payment needed.</p>
          </div>

          <div className="rounded-2xl border border-[#E7DCC7] bg-[#F7F1E7] p-4 text-sm text-[#173E39]">
            <div className="flex items-center gap-3 font-medium">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#173E39]" />
                {completedLessons.length} of {lessons.length} lessons completed
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {lessonGroups.map((group) => {
              const isEarly = group.id === "early-learners";
              return (
                <div
                  key={group.id}
                  className={`rounded-[28px] border p-4 sm:p-6 md:p-8 ${
                    isEarly
                      ? "border-[#E9DFC7] bg-[#FFF8E9]"
                      : "border-[#CCDFD7] bg-[#F1F8F5]"
                  }`}
                >
                  <div className="mb-5 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5D6E6A]">{group.title}</p>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                        isEarly ? "bg-[#F7EED2] text-[#6C5A2B]" : "bg-[#DCEDE4] text-[#214A47]"
                      }`}>
                        {group.subtitle}
                      </span>
                    </div>
                    <p className="text-sm text-[#38514d]">{group.description}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {group.lessons.map((lesson, index) => {
                      const completed = completedLessons.includes(lesson.id);
                      return (
                        <div key={lesson.id} className="flex h-full flex-col rounded-[24px] border border-[#E7DCC7] bg-[#FFFDFB] p-5 shadow-[0_10px_22px_rgba(23,62,57,0.03)]">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-[#5D6E6A]">Lesson {index + 1}</p>
                            {completed ? (
                              <span className="rounded-full bg-[#EAF4F2] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#173E39]">✓ Completed</span>
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

                          <Button type="button" className="mt-6 w-full" onClick={() => startLesson(allLessons.findIndex((item) => item.id === lesson.id))}>
                            {completed ? "Review Lesson" : "Start Lesson"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    );
  }

  if (view === "summary") {
    const outcomes = {
      "arabic-letters": ["Arabic letters", "letter recognition", "basic reading confidence"],
      "salah-basics": ["daily prayer names", "prayer order", "Salah basics"],
      "good-character": ["kindness", "responsibility", "good manners"],
      "seerah-journey": ["Prophet Muhammad’s story", "major milestones", "Islamic history"],
      "prophets-lessons": ["Prophets stories", "key lessons", "character values"],
      "quran-islamic-knowledge": ["Quran basics", "Islamic knowledge", "faith foundations"],
    }[activeLesson.id] ?? ["Islamic learning", "practice", "confidence"];

    return (
      <Card className="bg-white p-6 sm:p-8">
        <div className="space-y-5">
          <div className="inline-flex rounded-full bg-[#EAF4F2] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#173E39]">
            MashaAllah!
          </div>
          <h2 className="text-3xl font-black text-[#173E39]">{activeLesson.title} complete</h2>
          <p className="text-lg text-[#38514d]">You finished all 5 questions.</p>
          <div className="rounded-2xl bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            <p className="font-semibold text-[#173E39]">You practiced:</p>
            <ul className="mt-2 space-y-2">
              <li>✓ {outcomes[0]}</li>
              <li>✓ {outcomes[1]}</li>
              <li>✓ {outcomes[2]}</li>
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
            MashaAllah!
          </div>
          <h2 className="text-3xl font-black text-[#173E39]">All 6 sample lessons are complete.</h2>
          <div className="space-y-2 text-base text-[#38514d]">
            {allLessons.map((lesson) => (
              <p key={lesson.id}>✓ {lesson.title}</p>
            ))}
          </div>

          <div className="rounded-2xl bg-[#F7F1E7] p-4 text-sm text-[#38514d]">
            <p className="font-semibold text-[#173E39]">Want more structured Islamic learning for your child?</p>
            <p className="mt-2">Join Early Access — get 30 days free.</p>
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
            <p className="text-base text-[#38514d]">Tap each item in the correct order.</p>
          ) : null}
        </div>

        {renderQuestion()}

        {submitted ? (
          <div className={`rounded-2xl border p-4 text-sm text-[#38514d] ${isAnswerCorrect ? "border-[#D8D0C1] bg-[#F7F1E7]" : "border-[#E7C7B8] bg-[#FFF3EC]"}`}>
            <p className="text-lg font-black text-[#173E39]">{feedback}</p>
            <p className="mt-2 leading-6">{explanation}</p>
            {activeQuestion.sourceNote ? (
              <div className="mt-4">
                <SourcesLessonNotes note={activeQuestion.sourceNote} open={sourceNotesOpen} />
              </div>
            ) : null}
          </div>
        ) : null}

        {!submitted ? (
          activeQuestion.sourceNote ? (
            <div className="pt-2">
              <SourcesLessonNotes note={activeQuestion.sourceNote} open={false} />
            </div>
          ) : null
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
          ) : null}

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
