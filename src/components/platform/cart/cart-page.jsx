// cart-page.jsx - সুরক্ষিত ভার্সন
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/cart/cart-context";
import CartItem from "@/components/platform/cart/cart-item";
import CartEdit from "@/components/platform/cart/cart-edit";
import { ShoppingCart, Trash2, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const CartPage = () => {
  const {
    items = [],  // Default empty array
    subtotal = 0,
    tax = 0,
    deliveryCharge = 50,
    total = 0,
    updateQuantity,
    removeFromCart,
    clearCart,
    updateItem,
  } = useCart();
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isClearing, setIsClearing] = useState(false);

  // Safety check - ensure items is an array
  const cartItems = Array.isArray(items) ? items : [];
  const hasItems = cartItems.length > 0;

  const handleRemoveItem = async (itemId) => {
    if (itemId && removeFromCart) {
      removeFromCart(itemId);
      toast.info("Item removed from cart");
    } else {
      console.error("Invalid item ID or removeFromCart not available");
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    if (updateQuantity) {
      updateQuantity(id, quantity);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      if (clearCart) {
        clearCart();
        toast.success("Cart cleared successfully!");
      }
      setShowConfirmModal(false);
    } catch (error) {
      toast.error("Failed to clear cart. Please try again.");
      console.error("Error clearing cart:", error);
    } finally {
      setIsClearing(false);
    }
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

  // Empty cart view
  if (!hasItems) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md">
          <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>
          <p className="mb-8 text-gray-600">
            Looks like you haven't added any items yet.
          </p>
          <Link
            to="/categories"
            className="inline-block rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Items */}
          <div className="space-y-4 lg:w-2/3">
            {cartItems.map((item, index) => (
              <CartItem
                key={item.id || index}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                onEdit={handleEditItem}
              />
            ))}
            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={isClearing}
              className="flex items-center gap-2 text-red-500 transition-colors hover:text-red-700 disabled:opacity-50"
            >
              {isClearing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-4 rounded-lg border bg-gray-50 p-6 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${(subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${(tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>${(deliveryCharge || 0).toFixed(2)}</span>
                </div>
                <div className="mt-2 border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link to="/checkout">
                <button className="mt-6 w-full cursor-pointer rounded-lg bg-orange-500 py-3 text-white transition-colors hover:bg-orange-600">
                  Proceed to Checkout
                </button>
              </Link>
              <Link to="/categories">
                <button className="mt-3 w-full rounded-lg border border-gray-300 py-3 transition-colors hover:bg-gray-50">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Clear Cart</h3>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to remove all items from your cart? This
              action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
              >
                {isClearing ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : (
                  "Clear Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <CartEdit
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onUpdate={handleUpdateItem}
      />
    </>
  );
};

export default CartPage;