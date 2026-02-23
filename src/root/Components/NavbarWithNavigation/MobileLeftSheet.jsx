import React from "react";
import { Link } from "react-router-dom";
import { Menu, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import ThemeToggle from "./ThemeToggle";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const MobileLeftSheet = ({ navLinks }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[350px] p-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
      >
        {/* Hidden Title for Accessibility - Fixed VisuallyHidden usage */}
        <VisuallyHidden.Root asChild>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root asChild>
          <SheetDescription>
            Browse through categories and access your account
          </SheetDescription>
        </VisuallyHidden.Root>

        <div className="flex flex-col h-full">
          {/* Mobile Logo in Sheet */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <Link to="/">
              <img
                className="w-40 dark:brightness-90"
                src="https://i.ibb.co/nNjY5t0b/long-logo-sd.webp"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <SheetClose asChild>
                      <Link
                        to={link.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 rounded-lg transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Footer Actions with Theme Toggle */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart (0)</span>
            </Button>
            
            {/* Theme Toggle */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileLeftSheet;