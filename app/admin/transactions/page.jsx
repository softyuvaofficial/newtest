"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import AdminSidebar from "@/components/AdminSidebar";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setTransactions(data);

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Transactions</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white p-6 rounded shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Order ID</th>
                  <th className="p-2">User Email</th>
                  <th className="p-2">Amount (₹)</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{tx.order_id}</td>
                    <td className="p-2">{tx.user_email}</td>
                    <td className="p-2">{tx.amount}</td>
                    <td
                      className={`p-2 font-semibold ${
                        tx.status === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.status}
                    </td>
                    <td className="p-2">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}

                {transactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No transactions found.
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
