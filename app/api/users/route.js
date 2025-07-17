"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import AdminSidebar from "@/components/AdminSidebar";

export default function UsersManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setUsers(data);
    setLoading(false);
  }

  async function toggleRole(user) {
    const newRole = user.role === "user" ? "admin" : "user";
    const { error } = await supabase.from("users").update({ role: newRole }).eq("id", user.id);
    if (error) alert(error.message);
    else fetchUsers();
  }

  async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchUsers();
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white p-6 rounded shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{user.name || "N/A"}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2 font-semibold capitalize">{user.role}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => toggleRole(user)}
                        className="text-blue-600 hover:underline"
                      >
                        {user.role === "admin" ? "Make User" : "Make Admin"}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500 italic">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
