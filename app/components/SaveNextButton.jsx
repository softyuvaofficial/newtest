"use client";

import React from "react";

export default function SaveNextButton({
  onSave,
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  saving = false,
}) {
  return (
    <div className="flex justify-between mt-6 space-x-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={disablePrevious || saving}
        className={`px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition`}
      >
        Previous
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className={`px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition`}
      >
        {saving ? "Saving..." : "Save"}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={disableNext || saving}
        className={`px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition`}
      >
        Next
      </button>
    </div>
  );
}
