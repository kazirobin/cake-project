import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="sm:w-24 h-24 flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/96x96?text=Product';
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
                className="h-8 w-8 sm:h-9 sm:w-9 border-gray-300 dark:border-gray-600"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              
              <span className="w-10 sm:w-12 text-center font-medium text-gray-900 dark:text-white">
                {item.quantity}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                className="h-8 w-8 sm:h-9 sm:w-9 border-gray-300 dark:border-gray-600"
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
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
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
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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