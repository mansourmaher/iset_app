"use client"
import { useState } from "react";

const tabs = [
  { name: "Skills", href: "#Skills" },
  { name: "Modules", href: "#course-module" },
  { name: "You might like", href: "#recemondation" },
  { name: "Reviews", href: "#reviews" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function LearnSectionheaders() {
  const [currentTab, setCurrentTab] = useState(tabs[0].name); // Track the current tab

  return (
    <div className="border-b pb-5 sm:pb-0">
      <div className="mt-3 sm:mt-4">
        {/* Dropdown for smaller screens */}
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            value={currentTab}
            onChange={(e) => setCurrentTab(e.target.value)} // Update state when a tab is selected
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>

        {/* Tab navigation for larger screens */}
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={() => setCurrentTab(tab.name)} // Update current tab on click
                aria-current={currentTab === tab.name ? "page" : undefined}
                className={classNames(
                  currentTab === tab.name
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
