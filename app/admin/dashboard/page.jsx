"use client";

import { useEffect, useState } from "react";
import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  // Mock stats - replace with API/Supabase queries
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalTests: 80,
    totalQuestions: 4500,
    totalPayments: 23000,
  });

  // Mock recent users and tests
  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: "Rahul Sharma", joined: "2025-07-10" },
    { id: 2, name: "Sneha Patel", joined: "2025-07-09" },
    { id: 3, name: "Amit Singh", joined: "2025-07-08" },
  ]);

  const [recentTests, setRecentTests] = useState([
    { id: 1, name: "SSC General Awareness", createdOn: "2025-07-05" },
    { id: 2, name: "Banking English Mock", createdOn: "2025-07-04" },
    { id: 3, name: "Railway Quant PYQ", createdOn: "2025-07-02" },
  ]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Admin Dashboard</h1>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded shadow p-6 flex items-center space-x-4 border-l-8 border-indigo-500">
          <UserGroupIcon className="w-12 h-12 text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500 uppercase">Total Users</p>
            <p className="text-3xl font-semibold">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 flex items-center space-x-4 border-l-8 border-green-500">
          <ClipboardDocumentListIcon className="w-12 h-12 text-green-500" />
          <div>
            <p className="text-sm text-gray-500 uppercase">Total Tests</p>
            <p className="text-3xl font-semibold">{stats.totalTests}</p>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 flex items-center space-x-4 border-l-8 border-yellow-500">
          <QuestionMarkCircleIcon className="w-12 h-12 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500 uppercase">Total Questions</p>
            <p className="text-3xl font-semibold">{stats.totalQuestions}</p>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 flex items-center space-x-4 border-l-8 border-pink-500">
          <CreditCardIcon className="w-12 h-12 text-pink-500" />
          <div>
            <p className="text-sm text-gray-500 uppercase">Total Payments (₹)</p>
            <p className="text-3xl font-semibold">{stats.totalPayments}</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
            Recent Users
          </h2>
          <ul className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <li key={user.id} className="py-3 flex justify-between items-center">
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">{user.joined}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Tests */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
            Recent Tests Created
          </h2>
          <ul className="divide-y divide-gray-200">
            {recentTests.map((test) => (
              <li key={test.id} className="py-3 flex justify-between items-center">
                <span>{test.name}</span>
                <span className="text-sm text-gray-500">{test.createdOn}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
