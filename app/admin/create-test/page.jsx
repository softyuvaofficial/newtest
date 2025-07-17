"use client";

import { useState, useEffect } from "react";

// Mock data for categories, subjects, topics, and questions
const mockCategories = [
  { id: 1, name: "SSC" },
  { id: 2, name: "Banking" },
];

const mockSubjects = {
  1: [ // SSC
    { id: 101, name: "General Awareness" },
    { id: 102, name: "Quantitative Aptitude" },
  ],
  2: [ // Banking
    { id: 201, name: "English" },
    { id: 202, name: "Reasoning" },
  ],
};

const mockTopics = {
  101: [ // GA
    { id: 1001, name: "History" },
    { id: 1002, name: "Geography" },
  ],
  102: [ // Quant
    { id: 1003, name: "Arithmetic" },
    { id: 1004, name: "Algebra" },
  ],
  201: [ // English
    { id: 1005, name: "Grammar" },
    { id: 1006, name: "Vocabulary" },
  ],
  202: [ // Reasoning
    { id: 1007, name: "Puzzles" },
    { id: 1008, name: "Series" },
  ],
};

const mockQuestions = [
  { id: 1, text: "What is the capital of India?", categoryId: 1, subjectId: 101, topicId: 1002 },
  { id: 2, text: "Solve: 5 + 7 = ?", categoryId: 1, subjectId: 102, topicId: 1003 },
  { id: 3, text: "Choose the correct synonym of 'Happy'.", categoryId: 2, subjectId: 201, topicId: 1006 },
  { id: 4, text: "Find the next number in the series: 2, 4, 8, ?", categoryId: 2, subjectId: 202, topicId: 1008 },
  // More questions...
];

export default function CreateTestPage() {
  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [duration, setDuration] = useState(30); // duration in minutes

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const [selectedQuestions, setSelectedQuestions] = useState(new Set());

  // Update subjects when category changes
  useEffect(() => {
    if (selectedCategory && mockSubjects[selectedCategory]) {
      setFilteredSubjects(mockSubjects[selectedCategory]);
    } else {
      setFilteredSubjects([]);
      setSelectedSubject(null);
    }
    setSelectedTopic(null);
    setFilteredTopics([]);
  }, [selectedCategory]);

  // Update topics when subject changes
  useEffect(() => {
    if (selectedSubject && mockTopics[selectedSubject]) {
      setFilteredTopics(mockTopics[selectedSubject]);
    } else {
      setFilteredTopics([]);
      setSelectedTopic(null);
    }
  }, [selectedSubject]);

  // Update questions when category/subject/topic changes
  useEffect(() => {
    let questions = mockQuestions;

    if (selectedCategory) {
      questions = questions.filter((q) => q.categoryId === selectedCategory);
    }
    if (selectedSubject) {
      questions = questions.filter((q) => q.subjectId === selectedSubject);
    }
    if (selectedTopic) {
      questions = questions.filter((q) => q.topicId === selectedTopic);
    }
    setFilteredQuestions(questions);
    setSelectedQuestions(new Set()); // reset selection on filter change
  }, [selectedCategory, selectedSubject, selectedTopic]);

  // Toggle question selection
  const toggleQuestion = (id) => {
    const newSet = new Set(selectedQuestions);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedQuestions(newSet);
  };

  // Save test handler (replace with actual Supabase API later)
  const handleSaveTest = () => {
    if (!testName.trim()) return alert("Please enter test name");
    if (selectedQuestions.size === 0) return alert("Select at least one question");

    // Mock save logic:
    const testData = {
      testName,
      testDescription,
      duration,
      questions: Array.from(selectedQuestions),
      filters: {
        category: selectedCategory,
        subject: selectedSubject,
        topic: selectedTopic,
      },
    };
    console.log("Saving test:", testData);
    alert("Test saved successfully (mock)");

    // Clear form
    setTestName("");
    setTestDescription("");
    setDuration(30);
    setSelectedCategory(null);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setSelectedQuestions(new Set());
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Test</h1>

      <section className="mb-8 bg-white p-6 rounded shadow max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Test Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Test Description (optional)"
            value={testDescription}
            onChange={(e) => setTestDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center gap-4">
            <label className="font-semibold">Duration (minutes):</label>
            <input
              type="number"
              min={1}
              max={180}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded shadow max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Filter Questions (optional)</h2>
        <div className="flex flex-wrap gap-4">
          {/* Category Select */}
          <select
            value={selectedCategory || ""}
            onChange={(e) =>
              setSelectedCategory(e.target.value ? Number(e.target.value) : null)
            }
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            {mockCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Subject Select */}
          <select
            value={selectedSubject || ""}
            onChange={(e) =>
              setSelectedSubject(e.target.value ? Number(e.target.value) : null)
            }
            disabled={!filteredSubjects.length}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <option value="">Select Subject</option>
            {filteredSubjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          {/* Topic Select */}
          <select
            value={selectedTopic || ""}
            onChange={(e) =>
              setSelectedTopic(e.target.value ? Number(e.target.value) : null)
            }
            disabled={!filteredTopics.length}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <option value="">Select Topic</option>
            {filteredTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded shadow max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Select Questions</h2>
        {filteredQuestions.length === 0 ? (
          <p className="text-gray-600">No questions found for selected filters.</p>
        ) : (
          <div className="max-h-96 overflow-auto border border-gray-300 rounded p-3">
            {filteredQuestions.map((q) => (
              <label
                key={q.id}
                className="flex items-center space-x-3 py-2 border-b last:border-b-0 cursor-pointer hover:bg-indigo-50 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedQuestions.has(q.id)}
                  onChange={() => toggleQuestion(q.id)}
                  className="w-5 h-5"
                />
                <span>{q.text}</span>
              </label>
            ))}
          </div>
        )}
      </section>

      <button
        onClick={handleSaveTest}
        className="bg-indigo-600 text-white px-8 py-3 rounded hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={selectedQuestions.size === 0 || !testName.trim()}
      >
        Save Test
      </button>
    </main>
  );
}
