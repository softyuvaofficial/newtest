"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (ideally move to utils)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data from Supabase
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        // Example: Fetch top 20 users ordered by total score desc
        const { data, error } = await supabase
          .from("leaderboard")
          .select("user_id, user_name, total_score, rank")
          .order("rank", { ascending: true })
          .limit(20);

        if (error) throw error;
        setLeaderboard(data);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 text-gray-900 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-indigo-900">
        Top Performers Leaderboard
      </h1>

      {loading ? (
        <p className="text-center text-lg text-indigo-700">Loading leaderboard...</p>
      ) : leaderboard.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No leaderboard data available.</p>
      ) : (
        <div className="max-w-4xl mx-auto overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Rank</th>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-right">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map(({ user_id, user_name, total_score, rank }, idx) => (
                <tr
                  key={user_id}
                  className={idx % 2 === 0 ? "bg-indigo-50" : "bg-indigo-100"}
                >
                  <td className="py-3 px-6 font-semibold">{rank}</td>
                  <td className="py-3 px-6">{user_name}</td>
                  <td className="py-3 px-6 text-right font-semibold">{total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-indigo-700">
        Compete and improve your rank by attempting more tests!
      </p>
    </main>
  );
}
