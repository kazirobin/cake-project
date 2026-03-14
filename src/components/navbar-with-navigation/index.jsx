import React, { useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { navLinks, searchSuggestions } from "./constants";
import LogoSection from "./LogoSection";
import MobileLeftSheet from "./MobileLeftSheet";
import MobileRightIcons from "./MobileRightIcons";
import MobileSearch from "./MobileSearch";
import DesktopRightSection from "./DesktopRightSection";
import DesktopNavigateContent from "./DesktopNavigateContent";

const NavbarWithNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme } = useTheme();

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    console.log("Selected:", suggestion);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="relative container mx-auto flex flex-col items-center justify-between gap-4 border-b border-gray-200 p-4 shadow-sm lg:flex-row lg:gap-0 lg:px-8 dark:border-gray-800">
        {/* Logo and Mobile Menu */}
        <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
          <MobileLeftSheet navLinks={navLinks} />
          <LogoSection />
          <MobileRightIcons
            onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
            isRightMenuOpen={isRightMenuOpen}
            setIsRightMenuOpen={setIsRightMenuOpen}
            navLinks={navLinks}
          />
        </div>

        {/* Mobile Search Bar with Suggestions */}
        <MobileSearch
          isOpen={isSearchOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={searchSuggestions}
          onSelectSuggestion={handleSuggestionSelect}
        />

        {/* Desktop Sections with Search Suggestions */}
        <DesktopRightSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={searchSuggestions}
          onSelectSuggestion={handleSuggestionSelect}
        />
      </div>
    </>
  );
};

export default NavbarWithNavigation;
