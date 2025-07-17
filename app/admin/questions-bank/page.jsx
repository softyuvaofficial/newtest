"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function BulkUploadQuestions() {
  const [fileName, setFileName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setQuestions(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadQuestions = async () => {
    if (questions.length === 0) {
      alert("No questions to upload!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/questions/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),
      });

      if (res.ok) {
        alert("Questions uploaded successfully!");
        setQuestions([]);
        setFileName("");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      alert("Error uploading: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Bulk Upload Questions (Excel/CSV)</h2>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="mb-4" />
      {fileName && <p className="mb-4">Selected File: {fileName}</p>}

      {questions.length > 0 && (
        <>
          <p className="mb-2 font-semibold">Preview (first 3 rows):</p>
          <pre className="bg-gray-100 p-3 rounded max-h-48 overflow-auto text-sm">
            {JSON.stringify(questions.slice(0, 3), null, 2)}
          </pre>
          <button
            onClick={uploadQuestions}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Questions"}
          </button>
        </>
      )}
    </div>
  );
}
