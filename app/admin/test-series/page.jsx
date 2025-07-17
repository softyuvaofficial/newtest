"use client";

import React, { useEffect, useState } from "react";
import { supabase } from '@/utils/supabaseClient'
import AdminSidebar from "@/components/AdminSidebar";
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'

import { Loader2, PlusCircle, Pencil, Trash2 } from "lucide-react";

export default function TestSeriesAdmin() {
  const [seriesList, setSeriesList] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    price: 0,
    isPaid: false,
    assignedTabs: [],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSeries();
    loadTabs();
  }, []);

  const loadSeries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("test_series")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setSeriesList(data);
    setLoading(false);
  };

  const loadTabs = async () => {
    const { data, error } = await supabase
      .from("test_tabs")
      .select("*")
      .order("id");

    if (error) setError(error.message);
    else setTabs(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleTab = (tabId) => {
    setForm((prev) => {
      const exists = prev.assignedTabs.includes(tabId);
      return {
        ...prev,
        assignedTabs: exists
          ? prev.assignedTabs.filter((id) => id !== tabId)
          : [...prev.assignedTabs, tabId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        is_paid: form.isPaid,
        assigned_tabs: form.assignedTabs,
      };

      if (form.id) {
        await supabase.from("test_series").update(payload).eq("id", form.id);
      } else {
        await supabase.from("test_series").insert([payload]);
      }

      resetForm();
      loadSeries();
    } catch (err) {
      setError(err.message);
    }

    setSaving(false);
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      price: 0,
      isPaid: false,
      assignedTabs: [],
    });
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      isPaid: item.is_paid,
      assignedTabs: item.assigned_tabs || [],
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this test series?")) return;
    await supabase.from("test_series").delete().eq("id", id);
    loadSeries();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Test Series Management</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg max-w-xl mb-10 space-y-4">
          {error && <div className="text-red-500 font-semibold">{error}</div>}

          <Input
            placeholder="Test Series Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Textarea
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <Input
            placeholder="Price"
            type="number"
            name="price"
            min="0"
            value={form.price}
            onChange={handleChange}
            disabled={!form.isPaid}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPaid"
              checked={form.isPaid}
              onChange={handleChange}
            />
            Paid Test Series
          </label>

          <div>
            <p className="font-semibold mb-2">Assign Tabs:</p>
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <label
                  key={tab.id}
                  className={`cursor-pointer px-3 py-1 rounded border ${
                    form.assignedTabs.includes(tab.id)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    hidden
                    checked={form.assignedTabs.includes(tab.id)}
                    onChange={() => toggleTab(tab.id)}
                  />
                  {tab.name}
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
            {form.id ? "Update Test Series" : "Create Test Series"}
          </Button>

          {form.id && (
            <Button variant="outline" onClick={resetForm} className="ml-4">
              Cancel
            </Button>
          )}
        </form>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Existing Test Series</h2>
          {loading ? (
            <Loader2 className="animate-spin w-8 h-8 text-blue-500 mx-auto my-8" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Title</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Paid</th>
                    <th className="p-2">Tabs</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {seriesList.map((s) => (
                    <tr key={s.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{s.title}</td>
                      <td className="p-2">{s.price}</td>
                      <td className="p-2">{s.is_paid ? "Yes" : "No"}</td>
                      <td className="p-2">
                        {(s.assigned_tabs || [])
                          .map((id) => tabs.find((t) => t.id === id)?.name)
                          .filter(Boolean)
                          .join(", ")}
                      </td>
                      <td className="p-2 flex gap-2">
                        <Button size="sm" onClick={() => handleEdit(s)}>
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(s.id)}>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {seriesList.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">No test series found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
