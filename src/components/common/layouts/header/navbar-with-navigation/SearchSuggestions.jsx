import React from "react";
import { useTheme } from "@/components/common/Theme/ThemeProvider";

const SearchSuggestions = ({ suggestions, onSelect, isVisible }) => {
  const { theme } = useTheme();

  if (!isVisible) return null;

  return (
    <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="p-2">
        <p className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
          Popular Suggestions
        </p>
        {suggestions.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {item.name}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {item.category}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
