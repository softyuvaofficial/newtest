import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">TestYukti</h2>
          <p className="text-sm max-w-xs">
            India's most advanced online test platform offering mock tests, PYQs, and smart analytics for students.
          </p>
          <p className="mt-4 text-xs opacity-80">
            © 2025 TestYukti. All Rights Reserved.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <nav className="flex space-x-8 mb-6 md:mb-0">
          <a href="/" className="hover:underline hover:text-yellow-300 transition">
            Home
          </a>
          <a href="/leaderboard" className="hover:underline hover:text-yellow-300 transition">
            Leaderboard
          </a>
          <a href="/test-series" className="hover:underline hover:text-yellow-300 transition">
            Test Series
          </a>
          <a href="/contact" className="hover:underline hover:text-yellow-300 transition">
            Contact
          </a>
        </nav>

        {/* Right Section - Contact */}
        <div className="text-center md:text-right">
          <h3 className="font-semibold mb-2">Connect With Us</h3>
          <p>Contact: <a href="mailto:support@testyukti.in" className="underline hover:text-yellow-300">support@testyukti.in</a></p>
          <p className="mt-1 text-sm opacity-90">Phone: +91-XXXXXXXXXX</p>
        </div>
      </div>
    </footer>
  );
}
