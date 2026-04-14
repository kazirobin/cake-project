import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/cart/cart-context";
import CartItem from "@/components/platform/cart/cart-item";
import { ShoppingCart, Trash2, X } from "lucide-react";

const CartPage = () => {
  const {
    items,
    subtotal,
    tax,
    deliveryCharge,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // console.log('CartPage items:', items);

  const handleRemoveItem = (itemId) => {
    console.log("Removing item with ID:", itemId);
    if (itemId) {
      removeFromCart(itemId);
    } else {
      console.error("Invalid item ID for removal");
    }
  };

  const handleClearCart = () => {
    console.log("Clearing cart");
    clearCart();
    setShowConfirmModal(false);
  };

  if (items.length === 0) {
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
          Shopping Cart ({items.length} items)
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Items */}
          <div className="space-y-4 lg:w-2/3">
            {items.map((item, index) => (
              <CartItem
                key={item.id || index}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-2 text-red-500 transition-colors hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-4 rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="mt-2 border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
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
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
