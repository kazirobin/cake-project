import React from "react";
import { useNavigate } from "react-router-dom";
import { Table2Icon, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import MobileNavigateContent from "../mobile/MobileNavigateContent";
import { useCart } from "@/context/cart/cart-context";

const MobileRightIcons = ({
  onSearchClick,
  isRightMenuOpen,
  setIsRightMenuOpen,
}) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleUserClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-1 lg:hidden">
      {/* Table2Icon Button with Right Sheet */}
      <Sheet open={isRightMenuOpen} onOpenChange={setIsRightMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Open navigation menu"
          >
            <Table2Icon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] border-l border-gray-200 bg-white p-0 sm:w-[350px] dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Hidden Title for Accessibility */}
          <VisuallyHidden.Root asChild>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden.Root>
          <VisuallyHidden.Root asChild>
            <SheetDescription>
              Access navigation links, categories, and mobile menu options
            </SheetDescription>
          </VisuallyHidden.Root>

          <div className="flex h-full flex-col">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                Navigation Menu
              </h2>
            </div>
            {/* Navigate Content in Mobile Sheet */}
            <MobileNavigateContent />
          </div>
        </SheetContent>
      </Sheet>

      <Button
        variant="ghost"
        size="icon"
        onClick={onSearchClick}
        className="cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleCartClick}
        className="relative cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
            {cart.totalItems > 9 ? "9+" : cart.totalItems}
          </span>
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleUserClick}
        className="cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-label="User account"
      >
        <User className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MobileRightIcons;
