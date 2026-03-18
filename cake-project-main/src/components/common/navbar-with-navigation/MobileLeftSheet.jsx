import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import useCart from "@/Hooks/useCart";

const MobileLeftSheet = ({ navLinks }) => {
  const navigate = useNavigate();
  const cartData = useCart();

  if (!cartData) return null;

    const { cart } = cartData;
  // calculate total items in cart
  const cartLength = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleUserClick = () => {
    navigate("/login");
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] border-r border-gray-200 bg-white p-0 transition-colors duration-300 sm:w-[350px] dark:border-gray-800 dark:bg-gray-900"
      >
        {/* Hidden Title for Accessibility */}
        <VisuallyHidden.Root asChild>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root asChild>
          <SheetDescription>
            Browse through categories and access your account
          </SheetDescription>
        </VisuallyHidden.Root>

        <div className="flex h-full flex-col">
          {/* Mobile Logo in Sheet with Theme Switching */}
          <div className="border-b border-gray-200 p-6 transition-colors duration-300 dark:border-gray-800">
            <Link to="/">
              {/* Light logo (visible in light mode) */}
              <img
                className="block h-auto w-32 sm:w-40 dark:hidden"
                src="https://i.ibb.co/nNjY5t0b/long-logo-sd.webp"
                alt="Logo - Light Mode"
              />
              {/* Dark logo (visible in dark mode) */}
              <img
                className="hidden h-auto w-32 sm:w-40 dark:block"
                src="https://media.ugcakes.com/assets/logo/long-logo-dark-sd.webp"
                alt="Logo - Dark Mode"
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
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-purple-50 hover:text-purple-700 dark:text-gray-300 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
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
          <div className="space-y-3 border-t border-gray-200 p-4 transition-colors duration-300 dark:border-gray-800">
            <Button
              variant="outline"
              onClick={handleUserClick}
              className="w-full cursor-pointer justify-start gap-3 border-gray-300 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleCartClick}
              className="relative w-full cursor-pointer justify-start gap-3 border-gray-300 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartLength > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1 text-xs text-white">
                  {cartLength > 99 ? "99+" : cartLength}
                </span>
              )}
            </Button>

            {/* Theme Toggle */}
            <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2 transition-colors duration-300 dark:border-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Theme
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileLeftSheet;
