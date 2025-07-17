"use client";

import { useState, useEffect } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function NotificationsPage() {
  // Mock notifications data, replace with Supabase fetch
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Email",
      message: "New test series launched!",
      status: "Sent",
      date: "2025-07-12 10:30 AM",
    },
    {
      id: 2,
      type: "SMS",
      message: "Reminder: Live test tomorrow",
      status: "Scheduled",
      date: "2025-07-15 09:00 AM",
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    type: "Email",
    message: "",
    scheduleDate: "",
  });

  // Toggle form visibility
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = () => {
    if (!formData.message.trim()) {
      alert("Please enter a message.");
      return;
    }

    // For demo, add new notification to list
    const newNotification = {
      id: Date.now(),
      type: formData.type,
      message: formData.message,
      status: formData.scheduleDate ? "Scheduled" : "Sent",
      date: formData.scheduleDate || new Date().toLocaleString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setFormData({ type: "Email", message: "", scheduleDate: "" });
    setShowForm(false);

    // TODO: Call API to send or schedule notification
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete this notification?")) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      // TODO: Delete from backend
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700">Notifications</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
        >
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          {showForm ? "Cancel" : "New Notification"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-8 max-w-2xl">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option>Email</option>
              <option>SMS</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Type your notification message here..."
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Schedule Date & Time (optional)
            </label>
            <input
              type="datetime-local"
              name="scheduleDate"
              value={formData.scheduleDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Send Notification
          </button>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto max-w-4xl mx-auto">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No notifications found.
                </td>
              </tr>
            ) : (
              notifications.map(({ id, type, message, status, date }) => (
                <tr
                  key={id}
                  className="border-b last:border-b-0 hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-4 font-semibold">{type}</td>
                  <td className="px-6 py-4 max-w-lg truncate">{message}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        status === "Sent"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{date}</td>
                  <td className="px-6 py-4 space-x-3">
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete notification ${id}`}
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
