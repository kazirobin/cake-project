import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import useCart from "@/Hooks/useCart";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md transform flex-col overflow-hidden bg-white shadow-xl transition-transform duration-300 dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({cart.totalItems})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Your cart is empty
              </p>
              <Button
                onClick={onClose}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="line-clamp-1 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-bold text-orange-600 dark:text-orange-400">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center text-sm text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (10%):</span>
                <span>${cart.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery:</span>
                <span>${cart.deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-900 dark:border-gray-700 dark:text-white">
                <span>Total:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleCheckout}
                className="w-full bg-orange-500 text-white hover:bg-orange-600"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              <Button
                onClick={handleViewCart}
                variant="outline"
                className="w-full"
                size="lg"
              >
                View Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
