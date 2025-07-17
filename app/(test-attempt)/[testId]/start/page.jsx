"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import TestContext from "@/contexts/TestContext"; // Assuming context for test state

export default function TestStartPage({ params }) {
  const { testId } = params;
  const router = useRouter();

  // For demo, static question list (replace with fetch from supabase)
  const questions = [
    {
      id: 1,
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    },
    {
      id: 2,
      question: "Who wrote 'Mahabharata'?",
      options: ["Vyasa", "Valmiki", "Kalidasa", "Tulsidas"],
    },
    {
      id: 3,
      question: "What is the boiling point of water?",
      options: ["100°C", "90°C", "120°C", "80°C"],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // key: questionId, value: selected option

  // Save answer handler
  const saveAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Auto save simulation
  useEffect(() => {
    // Here you can implement saving to backend or localStorage
    console.log("Saving answers:", answers);
  }, [answers]);

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = () => {
    // Submit answers and redirect to result page
    // Pass score or testId as needed
    router.push(`/test-attempt/${testId}/result?score=85&total=${questions.length}&correct=85&time=60`);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar: Question Navigator */}
      <aside className="w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        <ul className="space-y-2">
          {questions.map((q, idx) => (
            <li key={q.id}>
              <button
                onClick={() => jumpToQuestion(idx)}
                className={`w-full px-3 py-2 rounded ${
                  idx === currentQuestionIndex
                    ? "bg-indigo-600 text-white"
                    : answers[q.id]
                    ? "bg-green-200"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Jump to question ${idx + 1}`}
              >
                Q{idx + 1} {answers[q.id] ? "✓" : ""}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Question Area */}
      <section className="flex-1 p-8 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h1>
          <p className="text-lg">{currentQuestion.question}</p>
        </div>

        <div className="space-y-4 mb-6">
          {currentQuestion.options.map((opt) => (
            <label
              key={opt}
              className={`block p-3 rounded border cursor-pointer select-none
                ${
                  answers[currentQuestion.id] === opt
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white border-gray-300 hover:bg-indigo-100"
                }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={opt}
                checked={answers[currentQuestion.id] === opt}
                onChange={() => saveAnswer(currentQuestion.id, opt)}
                className="mr-3"
              />
              {opt}
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-auto flex justify-between">
          <button
            onClick={goToPrev}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
          >
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={goToNext}
              className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Submit Test
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
