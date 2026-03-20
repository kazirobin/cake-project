import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Heart } from "lucide-react";

const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleWishlist }) => {
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-gray-800">
      <div className="p-3 sm:p-4">
        {/* Product Row - Stacked on mobile */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          {/* Product Image - Full width on mobile */}
          <div className="h-32 w-full sm:h-24 sm:w-24 flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/96x96?text=Product";
              }}
            />
          </div>

          {/* Product Details */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1">
              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SKU: {item.sku || `PROD-${item.id}`}
              </p>
            </div>

            {/* Price on mobile - Compact */}
            <div className="mt-2 sm:hidden">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-gray-500">Total:</span>
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>

            {/* Quantity Controls and Actions - Responsive layout */}
            <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-0">
              {/* Quantity Controls - Centered on mobile */}
              <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                  Quantity:
                </span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDecrement}
                    disabled={item.quantity <= 1}
                    className="h-7 w-7 border-gray-300 sm:h-8 sm:w-8 dark:border-gray-600"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <span className="min-w-[30px] text-center text-sm font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleIncrement}
                    className="h-7 w-7 border-gray-300 sm:h-8 sm:w-8 dark:border-gray-600"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Unit Price - Compact on mobile */}
                <span className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                  @ {formatCurrency(item.price)}
                </span>
              </div>

              {/* Unit Price - Desktop only */}
              <div className="hidden sm:flex sm:items-center sm:gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  × {formatCurrency(item.price)} each
                </span>
              </div>

              {/* Action Buttons - Full width on mobile */}
              <div className="flex gap-2 sm:justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleWishlist?.(item)}
                  className="flex-1 text-gray-600 hover:text-red-500 sm:flex-none dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="ml-1 text-xs sm:text-sm">Save</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  className="flex-1 text-red-500 hover:bg-red-50 hover:text-red-600 sm:flex-none dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="ml-1 text-xs sm:text-sm">Remove</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Total Price - Desktop only */}
          <div className="hidden sm:flex sm:flex-col sm:items-end sm:justify-center">
            <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(item.price * item.quantity)}
            </span>
            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {formatCurrency(item.price)} each
            </span>
          </div>
        </div>

        {/* Stock Warning - Responsive */}
        {item.stock && item.stock < 10 && (
          <div className="mt-3">
            <p className="text-xs text-orange-600 dark:text-orange-400">
              ⚡ Only {item.stock} left in stock - order soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;