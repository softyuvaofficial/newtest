"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TestResultPage({ params }) {
  const { testId } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Example: fetch score from URL or API
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    // Simulated fetch or read from search params (replace with API call)
    const sc = searchParams.get("score") || 85;
    const totalQ = searchParams.get("total") || 100;
    const correct = searchParams.get("correct") || 85;
    const time = searchParams.get("time") || 60; // minutes

    setScore(Number(sc));
    setTotalQuestions(Number(totalQ));
    setCorrectAnswers(Number(correct));
    setTimeTaken(Number(time));
  }, [searchParams]);

  if (score === null) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading result...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Test Result Summary
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-center">
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-indigo-600">Score</h2>
            <p className="text-3xl font-bold text-indigo-900">{score}%</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-indigo-600">Total Questions</h2>
            <p className="text-3xl font-bold text-indigo-900">{totalQuestions}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-indigo-600">Correct Answers</h2>
            <p className="text-3xl font-bold text-indigo-900">{correctAnswers}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-indigo-600">Time Taken</h2>
            <p className="text-3xl font-bold text-indigo-900">{timeTaken} mins</p>
          </div>
        </div>

        {/* Analytics / Charts Placeholder */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
            Performance Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 rounded-lg shadow p-6">
              <h3 className="font-semibold text-indigo-600 mb-2">Accuracy by Section</h3>
              <div className="h-48 flex items-center justify-center text-indigo-400 italic">
                {/* Replace with chart */}
                Chart Coming Soon
              </div>
            </div>
            <div className="bg-indigo-50 rounded-lg shadow p-6">
              <h3 className="font-semibold text-indigo-600 mb-2">Time Spent per Question</h3>
              <div className="h-48 flex items-center justify-center text-indigo-400 italic">
                {/* Replace with chart */}
                Chart Coming Soon
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 flex justify-center space-x-6">
          <button
            onClick={() => router.push(`/test-series/${testId}`)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Back to Test Series
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-100 transition"
          >
            View Profile
          </button>
        </div>
      </div>
    </main>
  );
}
