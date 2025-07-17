"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestInstructionsPage({ params }) {
  const { testId } = params;
  const router = useRouter();

  // Example instruction text (can fetch dynamically from Supabase later)
  const instructions = [
    "This test consists of multiple sections. Please read all instructions carefully.",
    "You can navigate between questions using the sidebar summary.",
    "Use the Save button frequently to save your answers.",
    "The test is timed. Once time is over, it will submit automatically.",
    "Do not refresh the page during the test.",
    "You can select the language before starting the test.",
  ];

  // Languages example (can be dynamic from backend)
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "mr", label: "Marathi" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleStartTest = () => {
    // Pass selected language as query param or via context/store
    router.push(`/test-attempt/${testId}/start?lang=${selectedLanguage}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Test Instructions
        </h1>

        <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8">
          {instructions.map((inst, idx) => (
            <li key={idx}>{inst}</li>
          ))}
        </ul>

        <div className="mb-6">
          <label
            htmlFor="language-select"
            className="block text-indigo-700 font-semibold mb-2"
          >
            Select Language:
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full border border-indigo-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {languages.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleStartTest}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
        >
          Start Test
        </button>
      </div>
    </main>
  );
}
