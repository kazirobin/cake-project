// CartSidebar.jsx - সুরক্ষিত ভার্সন
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Minus, Plus, Trash2, Edit2 } from "lucide-react";
import { useCart } from "@/context/cart/cart-context";
import CartEdit from "./cart-edit";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { 
    cart, 
    items = [], 
    totalItems = 0, 
    subtotal = 0, 
    tax = 0, 
    deliveryCharge = 50, 
    total = 0, 
    removeFromCart, 
    updateQuantity, 
    updateItem 
  } = useCart();
  
  const [editingItem, setEditingItem] = useState(null);

  const cartItems = Array.isArray(items) ? items : [];
  const hasItems = cartItems.length > 0;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = (updatedItem) => {
    if (updateItem) {
      updateItem(updatedItem.id, updatedItem);
    }
    setEditingItem(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md transform flex-col overflow-hidden bg-white shadow-xl transition-transform duration-300 dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({totalItems})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {!hasItems ? (
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
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg object-cover"
                  onError={(e) => e.target.src = "https://www.dummyimage.com/64/1d19e8/fff.png"}
                />

                <div className="flex-1">
                  <h3 className="line-clamp-1 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-bold text-orange-600 dark:text-orange-400">
                    ${(item.price || 0).toFixed(2)}
                  </p>
                  
                  {item.customizations && (
                    <div className="mt-1 text-xs text-gray-500">
                      {item.customizations.size && <span>Size: {item.customizations.size} | </span>}
                      {item.customizations.flavor && <span>Flavor: {item.customizations.flavor}</span>}
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity && updateQuantity(item.id, (item.quantity || 1) - 1)}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center text-sm text-gray-900 dark:text-white">
                        {item.quantity || 1}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity && updateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex gap-1">
                      {item.isCustomizable && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-blue-500 hover:bg-blue-50"
                          onClick={() => handleEditItem(item)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500 hover:bg-red-50"
                        onClick={() => removeFromCart && removeFromCart(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {hasItems && (
          <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span>${(subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (10%):</span>
                <span>${(tax || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery:</span>
                <span>${(deliveryCharge || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-900 dark:border-gray-700 dark:text-white">
                <span>Total:</span>
                <span>${(total || 0).toFixed(2)}</span>
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

      <CartEdit
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onUpdate={handleUpdateItem}
      />
    </>
  );
};

export default CartSidebar;