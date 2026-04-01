import { useCart } from "@/components/cart/CartContext/cart-context";
import React from "react";

const OrderSummary = () => {
  const { cart } = useCart();

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="sticky top-24 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Order Summary
      </h2>

      {/* Items List */}
      <div className="mb-6 max-h-80 space-y-4 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-16 rounded-lg object-cover"
              onError={(e) => {
                e.target.src = "https://www.dummyimage.com/64/1d19e8/fff.png";
              }}
            />
            <div className="flex-1">
              <h3 className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
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
      <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
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
        <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          <span>Total:</span>
          <span className="text-orange-600 dark:text-orange-400">
            {formatCurrency(cart.total)}
          </span>
        </div>
      </div>

      {/* Delivery Note */}
      <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        Free delivery inside Kathmandu Valley
      </p>
    </div>
  );
};

export default OrderSummary;
