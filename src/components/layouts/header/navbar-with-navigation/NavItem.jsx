import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavItem = ({ item, className = "" }) => {
  if (item.subItems) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex w-full items-center justify-between gap-1 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 ${className}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-4 w-48 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          {item.subItems.map((subItem, index) => (
            <DropdownMenuItem
              key={index}
              asChild
              className="focus:bg-gray-100 dark:focus:bg-gray-700"
            >
              <NavLink
                to={subItem.path}
                className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
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
        `flex w-full items-center rounded-lg px-1 text-sm transition-colors ${
          isActive
            ? "bg-purple-50 font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        } ${className}`
      }
    >
      <span className="text-lg">{item.icon}</span>
      <span className="ps-1 font-medium">{item.label}</span>
    </NavLink>
  );
};

export default NavItem;
