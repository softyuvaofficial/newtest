"use client";

import React from "react";

export default function TestTabs({ tabs = [], activeTab, onTabChange }) {
  // tabs = [{ id, name }]  e.g. [{id:1, name:"Mock"}, {id:2, name:"PYQ"}, ...]
  // activeTab = id of current active tab
  // onTabChange = function to call on tab click (pass id)

  return (
    <div className="border-b border-gray-300 mb-6">
      <nav className="flex space-x-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap px-4 py-2 font-semibold text-sm rounded-t-md transition ${
                isActive
                  ? "border-b-4 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
