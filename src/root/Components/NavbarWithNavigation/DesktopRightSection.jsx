import React from "react";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart } from "lucide-react";
import OfferBadge from "./OfferBadge";
import DesktopSearch from "./DesktopSearch";
import ThemeToggle from "./ThemeToggle";

const DesktopRightSection = ({
  searchTerm,
  setSearchTerm,
  showSuggestions,
  setShowSuggestions,
  suggestions,
  onSelectSuggestion,
}) => {
  return (
    <div className="hidden lg:flex items-center w-full justify-end gap-3">
      {/* Offer Badge - Left side */}
      <OfferBadge />
      
      {/* Search Input - Middle section with flex-1 for proper spacing */}
      <div className="flex-1 max-w-md ">
        <DesktopSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={suggestions}
          onSelectSuggestion={onSelectSuggestion}
        />
      </div>

      {/* Right Icons Group */}
      <div className="flex items-center ">
        {/* Theme Toggle - Separated */}
        <ThemeToggle />
        
        {/* Wishlist Icon */}
 

        {/* Cart Icon - Left side of user */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 relative"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center">
            5
          </span>
        </Button>

        {/* User Icon - Rightmost */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DesktopRightSection;