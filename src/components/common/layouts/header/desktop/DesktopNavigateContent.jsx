import React from "react";
import data from "@/data/data.json";
import NavItem from "@/components/common/layouts/header/navbar-with-navigation/NavItem";

const DesktopNavigateContent = () => {
  const navigateLinks = data.navigateLinks
  return (
    <div className="w-full border-t border-gray-200 py-4 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop Horizontal View - Always visible */}
        <div className="flex items-center justify-center gap-2">
          {navigateLinks.map((item) => (
            <div key={item.id}>
              <NavItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopNavigateContent;
