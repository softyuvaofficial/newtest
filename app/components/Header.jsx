"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/">
          <a className="text-2xl font-extrabold tracking-tight hover:text-yellow-300 transition">
            TestYukti
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-semibold">
          <Link href="/">
            <a className="hover:text-yellow-300 transition">Home</a>
          </Link>
          <Link href="/leaderboard">
            <a className="hover:text-yellow-300 transition">Leaderboard</a>
          </Link>
          <Link href="/test-series">
            <a className="hover:text-yellow-300 transition">Test Series</a>
          </Link>
          <Link href="/contact">
            <a className="hover:text-yellow-300 transition">Contact</a>
          </Link>
        </nav>

        {/* Auth Buttons Desktop */}
        <div className="hidden md:flex space-x-4">
          <Link href="/auth/user-login">
            <a className="px-4 py-1 border border-white rounded hover:bg-yellow-300 hover:text-indigo-900 transition font-semibold">
              Login
            </a>
          </Link>
          <Link href="/auth/user-signup">
            <a className="px-4 py-1 bg-yellow-300 text-indigo-900 rounded hover:bg-yellow-400 transition font-semibold">
              Signup
            </a>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-yellow-300"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-indigo-800 bg-opacity-90 text-white px-4 py-4 space-y-2">
          <Link href="/">
            <a
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-yellow-300 hover:text-indigo-900 transition font-semibold"
            >
              Home
            </a>
          </Link>
          <Link href="/leaderboard">
            <a
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-yellow-300 hover:text-indigo-900 transition font-semibold"
            >
              Leaderboard
            </a>
          </Link>
          <Link href="/test-series">
            <a
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-yellow-300 hover:text-indigo-900 transition font-semibold"
            >
              Test Series
            </a>
          </Link>
          <Link href="/contact">
            <a
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-yellow-300 hover:text-indigo-900 transition font-semibold"
            >
              Contact
            </a>
          </Link>
          <hr className="border-yellow-300 opacity-40" />
          <Link href="/auth/user-login">
            <a
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 border border-yellow-300 rounded hover:bg-yellow-300 hover:text-indigo-900 transition font-semibold"
            >
              Login
            </a>
          </Link>
          <Link href="/auth/user-signup">
            <a
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 bg-yellow-300 text-indigo-900 rounded hover:bg-yellow-400 transition font-semibold"
            >
              Signup
            </a>
          </Link>
        </nav>
      )}
    </header>
  );
}
