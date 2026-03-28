import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchSuggestions from "./SearchSuggestions";

const DesktopSearch = ({
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

  return (
    <div className="relative w-full max-w-[380px]" ref={searchRef}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search for cakes, categories, or flavors..."
        className="w-full pl-8 pr-10 py-1.5 h-[44px] rounded-full border border-gray-300 dark:border-gray-600 focus:ring-0 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      />
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-3.5 w-3.5" />
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 dark:text-gray-500">
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
  );
};

export default DesktopSearch;