import React from "react";
import { ChevronRight } from "lucide-react";

const OfferBadge = () => {
  return (
    <div className="flex items-center justify-between bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-full px-3 py-1.5 w-full max-w-[240px] hover:bg-purple-200 dark:hover:bg-purple-900/50 transition cursor-pointer h-[44px]">
      <div className="flex items-center gap-2">
        <img
          src="https://media.ugcakes.com/occasions/extra-small/holi-31761705806-tgUU1Gns4r.webp"
          alt="offer"
          className="w-8 h-8 rounded-full border dark:border-gray-600"
        />
        <div>
          <h3 className="text-purple-700 dark:text-purple-300 font-semibold text-xs">
            Valentine’s Day
          </h3>
          <p className="text-[10px] text-purple-600 dark:text-purple-400">
            2 days
          </p>
        </div>
      </div>
      <ChevronRight
        className="text-purple-600 dark:text-purple-400"
        size={16}
      />
    </div>
  );
};

export default OfferBadge;