"use client";
import { useState } from "react";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
  { name: "Recemonded for you", href: "#Recemonded for you" },
  { name: "Most popular", href: "#Most popular" },
  { name: "Top rated", href: "#Top rated" },
  { name: "Newest", href: "#Newest" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ExploreSection() {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  return (
    <div className="border-b  pb-5 sm:pb-0">
      <div className="mt-3 sm:mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            //@ts-ignore
            value={currentTab}
            onChange={(e) => setCurrentTab(e.target.value)}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={() => setCurrentTab(tab.name)}
                aria-current={currentTab ? "page" : undefined}
                className={classNames(
                  currentTab ===tab.name
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent  hover:border-gray-300 hover:text-gray-700",
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
