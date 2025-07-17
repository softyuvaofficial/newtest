"use client";

import React from "react";
import Link from "next/link";

export default function TestCard({ test, userHasAccess }) {
  // test: { id, title, description, price, is_paid, thumbnailUrl }
  // userHasAccess: boolean - if user purchased/unlocked test

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white flex flex-col">
      {/* Thumbnail Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={test.thumbnailUrl || "/default-test-thumbnail.jpg"}
          alt={test.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        {!userHasAccess && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m0-8v2m4 4H8m4-4a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{test.title}</h3>
        <p className="text-sm text-gray-600 flex-grow line-clamp-3">{test.description || "No description available."}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-indigo-600 font-bold text-lg">
            {test.is_paid ? `₹${test.price}` : "Free"}
          </span>

          <Link href={`/test-series/${test.id}`}>
            <a
              className={`px-4 py-2 rounded font-semibold transition ${
                userHasAccess
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-700 cursor-not-allowed select-none"
              }`}
              aria-disabled={!userHasAccess}
              tabIndex={userHasAccess ? 0 : -1}
            >
              {userHasAccess ? "Start Test" : "Locked"}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
