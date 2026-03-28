import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchSuggestions from "./SearchSuggestions";

const MobileSearch = ({
  isOpen,
  searchTerm,
  setSearchTerm,
  showSuggestions,
  setShowSuggestions,
  suggestions,
  onSelectSuggestion,
}) => {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  if (!isOpen) return null;

  return (
    <div className="w-full lg:hidden ms-auto" ref={searchRef}>
      <div className="relative">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for cakes..."
          className="w-full pl-9 pr-12 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500">
          ⌘K
        </span>

        <SearchSuggestions
          suggestions={suggestions.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.category.toLowerCase().includes(searchTerm.toLowerCase()),
          )}
          onSelect={onSelectSuggestion}
          isVisible={showSuggestions && searchTerm.length > 0}
        />
      </div>
    </div>
  );
};

export default MobileSearch;
