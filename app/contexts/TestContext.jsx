"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

const TestContext = createContext();

export function TestProvider({ children }) {
  const [currentTestId, setCurrentTestId] = useState(null);
  const [questions, setQuestions] = useState([]); // Array of questions for current test
  const [answers, setAnswers] = useState({}); // { questionId: answer }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startedAt, setStartedAt] = useState(null);

  // Load questions for a testId
  async function loadTest(testId) {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("test_id", testId)
        .order("question_number", { ascending: true });

      if (error) throw error;

      setQuestions(data || []);
      setCurrentTestId(testId);
      setAnswers({});
      setStartedAt(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Save answer for a question
  function saveAnswer(questionId, answer) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }

  // Clear all answers
  function clearAnswers() {
    setAnswers({});
  }

  // Submit test answers to backend
  async function submitTest(userId) {
    if (!currentTestId) {
      setError("No test loaded.");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        user_id: userId,
        test_id: currentTestId,
        answers,
        started_at: startedAt,
        submitted_at: new Date(),
      };

      const { data, error } = await supabase
        .from("test_attempts")
        .insert([payload]);

      if (error) throw error;

      return data[0]; // Return inserted attempt record
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <TestContext.Provider
      value={{
        currentTestId,
        questions,
        answers,
        loading,
        error,
        loadTest,
        saveAnswer,
        clearAnswers,
        submitTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error("useTest must be used within a TestProvider");
  }
  return context;
}
