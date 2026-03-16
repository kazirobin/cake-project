import React from "react";
import { useNavigate } from "react-router-dom";
import { Table2Icon, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import MobileNavigateContent from "./MobileNavigateContent";
import { useCart } from "@/Hooks/cart-context";

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
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Table2Icon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[350px] p-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800"
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

          <div className="flex flex-col h-full">
            {/* Header with Close Button */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
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
        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleCartClick}
        className="relative text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cart.totalItems > 9 ? '9+' : cart.totalItems}
          </span>
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleUserClick}
        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        aria-label="User account"
      >
        <User className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MobileRightIcons;