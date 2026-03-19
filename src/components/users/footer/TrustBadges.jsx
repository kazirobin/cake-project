import React from "react";

const TrustBadges = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
          <span>✓ Fresh Ingredients</span>
          <span>✓ Free Delivery</span>
          <span>✓ 100% Satisfaction</span>
          <span>✓ Secure Payment</span>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
