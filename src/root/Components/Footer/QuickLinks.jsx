import React from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

const quickLinks = [
  { name: "Cakes", path: "/cakes" },
  { name: "Mugs", path: "/mugs" },
  { name: "Pendants", path: "/pendants" },
  { name: "About US", path: "/about" },
  { name: "FAQ", path: "/faq" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Blogs", path: "/blogs" },
  { name: "Send Gifts to Nepal", path: "/send-gifts" },
  { name: "International Payment Info", path: "/payment-info" },
  { name: "Wedding Cakes", path: "/wedding-cakes" },
];

const QuickLinks = () => {
  return (
    <div className="lg:col-span-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
        Quick Links
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1 group"
          >
            <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
