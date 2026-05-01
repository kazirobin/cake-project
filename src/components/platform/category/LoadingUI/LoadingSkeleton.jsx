import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="dark:bg-dark-card animate-pulse overflow-hidden rounded-xl bg-white shadow-md"
        >
          <div className="h-48 bg-gray-200 dark:bg-gray-700" />
          <div className="p-4">
            <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
