import React from "react";
import { Link } from "react-router";
import { Heart } from "lucide-react";

const BottomBar = ({ currentYear }) => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/privacy" className="hover:text-purple-600">
            Privacy Policy
          </Link>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <Link to="/refund" className="hover:text-purple-600">
            Refund Policy
          </Link>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          © {currentYear} UG Cakes. Made with{" "}
          <Heart className="h-3 w-3 text-red-500 fill-red-500" /> All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default BottomBar;
