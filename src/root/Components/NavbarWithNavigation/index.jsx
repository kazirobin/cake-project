import React, { useState } from 'react';
import { useTheme } from "@/components/Theme/theme-provider";
import { navLinks, searchSuggestions } from './constants';
import LogoSection from './LogoSection';
import MobileLeftSheet from './MobileLeftSheet';
import MobileRightIcons from './MobileRightIcons';
import MobileSearch from './MobileSearch';
import DesktopRightSection from './DesktopRightSection';
import DesktopNavigateContent from './DesktopNavigateContent';

const NavbarWithNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme } = useTheme();

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    console.log('Selected:', suggestion);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="container mx-auto bg-white dark:bg-gray-900 shadow-sm flex flex-col lg:flex-row items-center justify-between p-4 lg:px-8 gap-4 lg:gap-0 relative border-b border-gray-200 dark:border-gray-800">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
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

      {/* Bottom Navigation Bar - Desktop Only */}
      <div className='hidden lg:flex'>

      <DesktopNavigateContent />
      </div>
    </>
  );
};

export default NavbarWithNavigation;