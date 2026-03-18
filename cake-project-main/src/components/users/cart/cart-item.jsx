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
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        {/* Product Image */}
        <div className="h-24 shrink-0 sm:w-24">
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
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <h3 className="line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                SKU: {item.sku || `PROD-${item.id}`}
              </p>
            </div>

            {/* Price on mobile */}
            <div className="sm:hidden">
              <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          </div>

          {/* Quantity Controls and Actions */}
          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
                className="h-8 w-8 border-gray-300 sm:h-9 sm:w-9 dark:border-gray-600"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>

              <span className="w-10 text-center font-medium text-gray-900 sm:w-12 dark:text-white">
                {item.quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                className="h-8 w-8 border-gray-300 sm:h-9 sm:w-9 dark:border-gray-600"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>

              {/* Unit Price */}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                × {formatCurrency(item.price)} each
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleWishlist?.(item)}
                className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-1 hidden sm:inline">Save</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.id)}
                className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-1 hidden sm:inline">Remove</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Total Price - Desktop */}
        <div className="hidden sm:flex sm:flex-col sm:items-end sm:justify-center">
          <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
            {formatCurrency(item.price * item.quantity)}
          </span>
          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {formatCurrency(item.price)} each
          </span>
        </div>
      </div>

      {/* Stock Warning */}
      {item.stock && item.stock < 10 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-orange-600 dark:text-orange-400">
            ⚡ Only {item.stock} left in stock - order soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default CartItem;
