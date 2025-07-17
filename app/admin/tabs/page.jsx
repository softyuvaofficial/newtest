"use client";

import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

export default function TabsPage() {
  const supabase = useSupabaseClient();
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [editingTab, setEditingTab] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Fetch tabs from DB
  const fetchTabs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("test_tabs").select("*").order("id");
    setLoading(false);
    if (error) return toast.error("Failed to load tabs");
    setTabs(data);
  };

  useEffect(() => {
    fetchTabs();
  }, []);

  // Add new tab
  const addTab = async () => {
    if (!newTabName.trim()) return toast.warn("Tab name cannot be empty");
    setLoading(true);
    const { error } = await supabase.from("test_tabs").insert([{ name: newTabName.trim() }]);
    setLoading(false);
    if (error) return toast.error("Failed to add tab");
    toast.success("Tab added");
    setNewTabName("");
    fetchTabs();
  };

  // Start editing
  const startEdit = (tab) => {
    setEditingTab(tab.id);
    setEditingName(tab.name);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTab(null);
    setEditingName("");
  };

  // Save edited tab
  const saveEdit = async () => {
    if (!editingName.trim()) return toast.warn("Tab name cannot be empty");
    setLoading(true);
    const { error } = await supabase.from("test_tabs").update({ name: editingName.trim() }).eq("id", editingTab);
    setLoading(false);
    if (error) return toast.error("Failed to update tab");
    toast.success("Tab updated");
    setEditingTab(null);
    setEditingName("");
    fetchTabs();
  };

  // Delete tab
  const deleteTab = async (id) => {
    if (!confirm("Are you sure you want to delete this tab?")) return;
    setLoading(true);
    const { error } = await supabase.from("test_tabs").delete().eq("id", id);
    setLoading(false);
    if (error) return toast.error("Failed to delete tab");
    toast.success("Tab deleted");
    fetchTabs();
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Manage Test Tabs</h1>

      {/* Add New Tab */}
      <div className="flex mb-8 space-x-4">
        <input
          type="text"
          placeholder="New tab name (e.g. Mock, PYQ)"
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={addTab}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Add Tab
        </button>
      </div>

      {/* Tabs List */}
      {loading ? (
        <p>Loading tabs...</p>
      ) : (
        <table className="w-full bg-white rounded-md shadow-md">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Tab Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tabs.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No tabs found. Add one above.
                </td>
              </tr>
            )}

            {tabs.map((tab) => (
              <tr key={tab.id} className="border-b hover:bg-indigo-50 transition">
                <td className="py-3 px-6">{tab.id}</td>
                <td className="py-3 px-6">
                  {editingTab === tab.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={loading}
                    />
                  ) : (
                    tab.name
                  )}
                </td>
                <td className="py-3 px-6 text-center space-x-4">
                  {editingTab === tab.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        disabled={loading}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={loading}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(tab)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTab(tab.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
