import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (user) {
      setOpen((prev) => !prev); // toggle dropdown if logged in
    } else {
      navigate("/login"); // go to login if not logged in
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const name = user?.displayName;
  const email = user?.email;

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* Button + name/email trigger */}
      <div className="flex cursor-pointer items-center" onClick={handleToggle}>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="User account"
        >
          <User className="h-4 w-4" />
        </Button>

        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          {name || email || "Login"}
        </span>
      </div>

      {/* Dropdown */}
      {open && user && (
        <div className="ring-opacity-5 absolute right-0 z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black dark:bg-gray-800">
          <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            {name && (
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {name}
              </p>
            )}
            {email && (
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {email}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
