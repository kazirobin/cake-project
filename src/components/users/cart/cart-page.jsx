import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/Hooks/cart-context';
import CartItem from './cart-item';
import { ShoppingCart, Trash2, X } from 'lucide-react';

const CartPage = () => {
  const { items, subtotal, tax, deliveryCharge, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // console.log('CartPage items:', items);

  const handleRemoveItem = (itemId) => {
    console.log('Removing item with ID:', itemId);
    if (itemId) {
      removeFromCart(itemId);
    } else {
      console.error('Invalid item ID for removal');
    }
  };

  const handleClearCart = () => {
    console.log('Clearing cart');
    clearCart();
    setShowConfirmModal(false);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items yet.</p>
          <Link to="/categories" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="lg:w-2/3 space-y-4">
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
              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
          
          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg mt-6 hover:bg-orange-600 transition-colors">
                Proceed to Checkout
              </button>
              <Link to="/categories">
                <button className="w-full border border-gray-300 py-3 rounded-lg mt-3 hover:bg-gray-50 transition-colors">
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
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Clear Cart</h3>
              <button onClick={() => setShowConfirmModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to remove all items from your cart? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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