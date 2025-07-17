"use client";
import React from "react";

const Textarea = React.forwardRef(({ label, rows = 4, className = "", ...props }, ref) => {
  return (
    <div className="w-full mb-4">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea; // **default export**
