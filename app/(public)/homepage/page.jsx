"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (you can move this to utils/supabaseClient.js)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredTests, setFeaturedTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and featured test series from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: cats, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("name", { ascending: true });

        const { data: tests, error: testError } = await supabase
          .from("test_series")
          .select("*")
          .eq("is_featured", true)
          .limit(5);

        if (catError) console.error("Categories fetch error:", catError);
        if (testError) console.error("Featured tests fetch error:", testError);

        setCategories(cats || []);
        setFeaturedTests(tests || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-900">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-24 px-6 md:px-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Prepare Smarter, Score Higher
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Join TestYukti - India's most trusted online test platform for
          mock tests, past year questions, and detailed analytics.
        </p>
        <Link
          href="/auth/user-login"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold px-8 py-3 rounded-full transition"
        >
          Get Started
        </Link>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Test Categories</h2>
        {loading ? (
          <p className="text-center text-lg">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No categories available yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/test-series?category=${cat.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center justify-center text-indigo-700 font-semibold text-lg"
              >
                <img
                  src={cat.icon_url || "/icons/category-default.svg"}
                  alt={cat.name}
                  className="w-16 h-16 mb-4"
                />
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Test Series Slider */}
      <section className="bg-white py-16 px-6 md:px-16 max-w-7xl mx-auto rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
          Featured Test Series
        </h2>
        {loading ? (
          <p className="text-center text-lg">Loading featured tests...</p>
        ) : featuredTests.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No featured test series available.
          </p>
        ) : (
          <div className="flex overflow-x-auto gap-6 no-scrollbar">
            {featuredTests.map((test) => (
              <Link
                key={test.id}
                href={`/test-series/${test.id}`}
                className="flex-shrink-0 w-72 p-6 bg-indigo-50 rounded-lg shadow hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-xl mb-2 text-indigo-900">
                  {test.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {test.description}
                </p>
                <p className="font-semibold text-indigo-700">
                  {test.is_paid ? `₹${test.price}` : "Free"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose TestYukti?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-indigo-100 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Comprehensive Tests</h3>
            <p>
              Mock tests, previous year questions, boosters, and live tests
              all in one platform.
            </p>
          </div>
          <div className="bg-indigo-100 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Detailed Analytics</h3>
            <p>
              Instant results with detailed reports to track strengths and
              weaknesses.
            </p>
          </div>
          <div className="bg-indigo-100 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">All India Ranking</h3>
            <p>
              Compete with thousands of students across India with live
              rankings.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-indigo-200 py-8 text-center text-sm">
        &copy; {new Date().getFullYear()} TestYukti. All rights reserved.
      </footer>
    </main>
  );
}
