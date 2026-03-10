import React from "react";
import { Home, Grid, ShoppingCart, User, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Home", icon: <Home size={25} />, path: "/" },
    { name: "Categories", icon: <Grid size={25} />, path: "/categories" },
    { name: "Cart", icon: <ShoppingCart size={25} />, path: "/cart" },
    { name: "Account", icon: <User size={25} />, path: "/account" },
    { name: "More", icon: <Settings size={25} />, path: "/more" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t dark:bg-[#0f0f0f] dark:border-gray-800 shadow-md md:hidden">
      <ul className="flex justify-around items-center py-4">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <li
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center text-m font-bold cursor-pointer"
            >
              <motion.div
                animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {tab.icon}
              </motion.div>
              <span
                className={`mt-1 ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {tab.name}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;