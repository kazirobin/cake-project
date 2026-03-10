import React, { useState } from "react";
import { Home, Grid, ShoppingCart, User, Settings } from "lucide-react";
import { motion } from "framer-motion";

const MobileBottomNav = () => {
  const [active, setActive] = useState("Home");

  const tabs = [
    { name: "Home", icon: <Home size={25} /> },
    { name: "Categories", icon: <Grid size={25} /> },
    { name: "Cart", icon: <ShoppingCart size={25} /> },
    { name: "Account", icon: <User size={25} /> },
    { name: "More", icon: <Settings size={25} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t dark:bg-[#0f0f0f] dark:border-gray-800 shadow-md md:hidden">
      <ul className="flex justify-around items-center py-7">
        {tabs.map((tab) => (
          <li
            key={tab.name}
            onClick={() => setActive(tab.name)}
            className="flex flex-col items-center text-m font-bold cursor-pointer"
          >
            <motion.div
              animate={active === tab.name ? { scale: 1.2 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`${
                active === tab.name
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {tab.icon}
            </motion.div>
            <span
              className={`mt-1 ${
                active === tab.name
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {tab.name}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;