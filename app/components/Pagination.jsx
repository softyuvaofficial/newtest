"use client";

import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // no pagination needed

  // Create array of page numbers to show (simple approach)
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center space-x-2 mt-6"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border border-gray-300 font-semibold ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "hover:bg-indigo-600 hover:text-white"
        }`}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`px-3 py-1 rounded border border-gray-300 font-semibold ${
            page === currentPage
              ? "bg-indigo-600 text-white cursor-default"
              : "hover:bg-indigo-600 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border border-gray-300 font-semibold ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "hover:bg-indigo-600 hover:text-white"
        }`}
      >
        Next
      </button>
    </nav>
  );
}
