import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavItem = ({ item, className = "", isMobile = false }) => {
  if (item.subItems) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex items-center justify-between gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm w-full ${className}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 ml-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          {item.subItems.map((subItem, index) => (
            <DropdownMenuItem
              key={index}
              asChild
              className="focus:bg-gray-100 dark:focus:bg-gray-700"
            >
              <NavLink
                to={subItem.path}
                className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {subItem.label}
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center px-1 rounded-lg transition-colors text-sm w-full ${
          isActive
            ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
        } ${className}`
      }
    >
      <span className="text-lg">{item.icon}</span>
      <span className="font-medium ps-1">{item.label}</span>
    </NavLink>
  );
};

export default NavItem;
