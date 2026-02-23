import React from "react";
import { useTheme } from "@/components/Theme/theme-provider";

const SearchSuggestions = ({ suggestions, onSelect, isVisible }) => {
  const { theme } = useTheme();

  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">
          Popular Suggestions
        </p>
        {suggestions.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
