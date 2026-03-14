import { useCart } from '@/Hooks/cart-context';
import React from 'react';

const OrderSummary = () => {
  const { cart } = useCart();

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h2>

      {/* Items List */}
      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
        {cart.items.map(item => (
          <div key={item.id} className="flex gap-3">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64';
              }}
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal:</span>
          <span>{formatCurrency(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tax (10%):</span>
          <span>{formatCurrency(cart.tax)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Delivery:</span>
          <span>{formatCurrency(cart.deliveryCharge)}</span>
        </div>
        
        {/* Total */}
        <div className="flex justify-between font-bold text-gray-900 dark:text-white text-lg pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
          <span>Total:</span>
          <span className="text-orange-600 dark:text-orange-400">
            {formatCurrency(cart.total)}
          </span>
        </div>
      </div>

      {/* Delivery Note */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
        Free delivery inside Kathmandu Valley
      </p>
    </div>
  );
};

export default OrderSummary;