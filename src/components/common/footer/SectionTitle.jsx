import React from "react";

const SectionTitle = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
      {children}
    </h3>
  );
};

export default SectionTitle;
