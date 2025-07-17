"use client";

import React from "react";

export default function QuestionNavigator({
  questions = [],
  currentQuestionIndex,
  onJumpToQuestion,
  answers = {}, // { questionId: answer or boolean answered }
}) {
  return (
    <nav
      aria-label="Question Navigator"
      className="overflow-auto max-h-64 bg-white p-3 rounded shadow"
    >
      <ul className="grid grid-cols-5 gap-2">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;

          return (
            <li key={q.id}>
              <button
                onClick={() => onJumpToQuestion(idx)}
                aria-current={isCurrent ? "true" : undefined}
                className={`w-10 h-10 flex items-center justify-center rounded border font-semibold focus:outline-none
                  ${
                    isCurrent
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : isAnswered
                      ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }
                `}
                aria-label={`Question ${idx + 1} ${isAnswered ? "answered" : "unanswered"}`}
                title={`Question ${idx + 1} ${isAnswered ? "answered" : "unanswered"}`}
              >
                {idx + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
