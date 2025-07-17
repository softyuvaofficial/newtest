"use client";

import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabaseClient'

import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";

export default function AdminTestSeriesPage() {
  const [testSeries, setTestSeries] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestSeries();
  }, []);

  const fetchTestSeries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("test_series")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setTestSeries(data);
    setLoading(false);
  };

  const handleCreateTestSeries = async () => {
    if (!title) return alert("Title required");

    setLoading(true);
    const { error } = await supabase.from("test_series").insert([{ title, short_description: description }]);

    if (error) console.error(error);
    else {
      setTitle("");
      setDescription("");
      fetchTestSeries();
    }
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Test Series</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Test Series</h2>

        <div className="flex flex-col gap-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button onClick={handleCreateTestSeries} disabled={loading}>
            {loading ? "Creating..." : "Create Test Series"}
          </Button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Test Series</h2>
      <div className="space-y-4">
        {testSeries.map((series) => (
          <div key={series.id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{series.title}</h3>
              <p className="text-gray-600 text-sm">{series.short_description}</p>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full ${series.is_paid ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {series.is_paid ? "Paid" : "Free"}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
