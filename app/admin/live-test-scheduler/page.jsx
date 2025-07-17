"use client";

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function LiveTestScheduler() {
  // Mock data - replace with Supabase fetch logic
  const [liveTests, setLiveTests] = useState([
    {
      id: 1,
      name: "SSC General Awareness Live Test",
      startDate: "2025-07-25T10:00:00",
      duration: 90, // minutes
      price: 100,
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Banking English Live Test",
      startDate: "2025-07-18T15:00:00",
      duration: 60,
      price: 0,
      status: "Ongoing",
    },
    {
      id: 3,
      name: "Railway Quant Live Test",
      startDate: "2025-06-30T13:00:00",
      duration: 120,
      price: 150,
      status: "Completed",
    },
  ]);

  // Handlers for edit, delete, add - implement your logic here
  const handleEdit = (id) => {
    alert(`Edit Live Test ID: ${id}`);
    // Open modal or navigate to edit page
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this live test schedule?")) {
      setLiveTests((prev) => prev.filter((test) => test.id !== id));
      // Also delete from backend
    }
  };

  const handleAddNew = () => {
    alert("Open Add New Live Test Scheduler modal/page");
    // Open modal or navigate to create page
  };

  // Format date & time nicely
  const formatDateTime = (dateStr) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateStr).toLocaleString(undefined, options);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700">Live Test Scheduler</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
        >
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          Schedule New Test
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3">Test Name</th>
              <th className="px-6 py-3">Start Date & Time</th>
              <th className="px-6 py-3">Duration (min)</th>
              <th className="px-6 py-3">Price (₹)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {liveTests.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No live tests scheduled yet.
                </td>
              </tr>
            ) : (
              liveTests.map(({ id, name, startDate, duration, price, status }) => (
                <tr
                  key={id}
                  className="border-b last:border-b-0 hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-4">{name}</td>
                  <td className="px-6 py-4">{formatDateTime(startDate)}</td>
                  <td className="px-6 py-4">{duration}</td>
                  <td className="px-6 py-4">{price === 0 ? "Free" : price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        status === "Upcoming"
                          ? "bg-yellow-200 text-yellow-800"
                          : status === "Ongoing"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-3">
                    <button
                      onClick={() => handleEdit(id)}
                      className="text-indigo-600 hover:text-indigo-800"
                      aria-label={`Edit live test ${name}`}
                    >
                      <PencilIcon className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete live test ${name}`}
                    >
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
