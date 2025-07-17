"use client";

import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { supabase } from '@/utils/supabaseClient'

export default function ProfilePage() {
  const { user, loading } = useUserAuth();
  const [profile, setProfile] = useState(null);
  const [testAttempts, setTestAttempts] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("users")
          .select("user_name, email, created_at")
          .eq("id", user.id)
          .single();
        if (profileError) throw profileError;
        setProfile(profileData);

        const { data: attempts, error: attemptsError } = await supabase
          .from("test_attempts")
          .select("test_id, score, attempted_on")
          .eq("user_id", user.id)
          .order("attempted_on", { ascending: false });
        if (attemptsError) throw attemptsError;
        setTestAttempts(attempts);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to view profile.</p>;

  return (
    <main className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
      <section className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <p><strong>Name:</strong> {profile?.user_name ?? "N/A"}</p>
        <p><strong>Email:</strong> {profile?.email ?? "N/A"}</p>
        <p><strong>Member Since:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}</p>
      </section>

      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Test Attempts</h2>
        {testAttempts.length === 0 ? (
          <p>You have not attempted any tests yet.</p>
        ) : (
          <table className="w-full border border-gray-300 table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Test ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Score</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date Attempted</th>
              </tr>
            </thead>
            <tbody>
              {testAttempts.map(({ test_id, score, attempted_on }) => (
                <tr key={`${test_id}-${attempted_on}`}>
                  <td className="border border-gray-300 px-4 py-2">{test_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{score}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(attempted_on).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
