"use client";
import React from "react";


const Input = React.forwardRef(({ label, type = "text", className = "", ...props }, ref) => {
  return (
    <div className="w-full mb-4">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;  // **default export**

