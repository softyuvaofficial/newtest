"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../../contexts/UserAuthContext";
import { supabase } from '@/utils/supabaseClient' 

const tabs = [
  { key: "mock", label: "Mock Tests" },
  { key: "pyq", label: "Previous Year Questions" },
  { key: "booster", label: "Booster Tests" },
];

export default function TestSeriesDetailPage({ params }) {
  const { testId } = params;
  const router = useRouter();
  const { user } = useUserAuth();

  const [loading, setLoading] = useState(true);
  const [testSeries, setTestSeries] = useState(null);
  const [activeTab, setActiveTab] = useState("mock");
  const [testsByTab, setTestsByTab] = useState({ mock: [], pyq: [], booster: [] });
  const [purchasedTests, setPurchasedTests] = useState([]);

  useEffect(() => {
    if (!testId) return;

    const fetchTestSeries = async () => {
      setLoading(true);
      try {
        // Fetch test series metadata
        const { data: seriesData, error: seriesError } = await supabase
          .from("test_series")
          .select("*")
          .eq("id", testId)
          .single();

        if (seriesError) throw seriesError;
        setTestSeries(seriesData);

        // Fetch tests grouped by type
        const { data: testsData, error: testsError } = await supabase
          .from("tests")
          .select("*")
          .eq("test_series_id", testId)
          .order("created_at", { ascending: true });

        if (testsError) throw testsError;

        // Group tests by their type (mock, pyq, booster)
        const grouped = { mock: [], pyq: [], booster: [] };
        testsData.forEach((test) => {
          if (grouped[test.type]) grouped[test.type].push(test);
        });
        setTestsByTab(grouped);

        // Fetch purchased tests if user is logged in
        if (user) {
          const { data: purchased, error: purchaseError } = await supabase
            .from("purchases")
            .select("test_id")
            .eq("user_id", user.id);

          if (purchaseError) throw purchaseError;
          setPurchasedTests(purchased.map((p) => p.test_id));
        }
      } catch (error) {
        console.error("Error loading test series:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestSeries();
  }, [testId, user]);

  if (loading) {
    return (
      <main className="container mx-auto p-8 text-center">
        <p className="text-gray-600">Loading test series details...</p>
      </main>
    );
  }

  if (!testSeries) {
    return (
      <main className="container mx-auto p-8 text-center text-red-600">
        <p>Test series not found.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Test Series Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{testSeries.title}</h1>
        <p className="text-gray-700 mb-4">{testSeries.description}</p>
        <div className="bg-gray-50 p-4 rounded border text-gray-600 whitespace-pre-wrap">
          <strong>Syllabus:</strong>
          <br />
          {testSeries.syllabus || "No syllabus information available."}
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex space-x-4 mb-6 border-b border-gray-300">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`py-2 px-4 -mb-px font-semibold ${
              activeTab === key
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Tests List */}
      <section>
        {testsByTab[activeTab].length === 0 ? (
          <p className="text-gray-600">No tests available in this category.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testsByTab[activeTab].map((test) => {
              const isPurchased = purchasedTests.includes(test.id);
              return (
                <div
                  key={test.id}
                  className="border rounded shadow p-4 hover:shadow-lg transition relative"
                >
                  <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">{test.description}</p>
                  <p className="text-sm mb-3 font-medium">
                    Duration: {test.duration} mins | Questions: {test.question_count}
                  </p>
                  <button
                    onClick={() => {
                      if (isPurchased) {
                        router.push(`/test-series/${testId}/test/${test.id}/start`);
                      } else {
                        alert("This test is locked. Please purchase to attempt.");
                      }
                    }}
                    className={`w-full py-2 rounded text-white font-semibold ${
                      isPurchased ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isPurchased ? "Start Test" : "Locked"}
                  </button>

                  {/* View Preview Button */}
                  <button
                    onClick={() => router.push(`/test-series/${testId}/test/${test.id}/preview`)}
                    className="mt-2 w-full py-2 rounded border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50"
                  >
                    View
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
