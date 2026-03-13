import React from "react";
import { navigateLinks } from "@/data/data";
import NavItem from "./NavItem";

const DesktopNavigateContent = () => {
  return (
    <div className="w-full py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
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
