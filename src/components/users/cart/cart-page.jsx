import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/Hooks/cart-context";

const CartPage = () => {
  const navigate = useNavigate();
  const cartContext = useCart();
  
  // Safely access cart with fallback
  const cart = cartContext?.cart || { items: [], totalItems: 0, subtotal: 0, tax: 0, deliveryCharge: 50, total: 0 };
  const { removeFromCart, updateQuantity, clearCart } = cartContext;

  // Helper function to safely convert price to number
  const safePrice = (price) => {
    if (price === null || price === undefined) return 0;
    if (typeof price === 'number') return price;
    if (typeof price === 'string') return parseFloat(price) || 0;
    return 0;
  };

  // Helper function to get item identifier (handles both regular and customizable items)
  const getItemKey = (item) => {
    if (!item) return 'unknown';
    if (item.customizations) {
      return `${item.id}-${JSON.stringify(item.customizations)}`;
    }
    return item.id || Math.random().toString();
  };

  // Safely check if cart has items
  const hasItems = cart?.items && Array.isArray(cart.items) && cart.items.length > 0;

  if (!hasItems) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="mx-auto mb-4 h-20 w-20 text-gray-400" />
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/categories">
          <Button className="bg-orange-500 text-white hover:bg-orange-600">
            Browse Categories
          </Button>
        </Link>
      </div>
    );
  }

  const handleRemoveFromCart = (item) => {
    if (!item || !item.id) return;
    if (item.customizations) {
      removeFromCart(item.id, item.customizations);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (!item || !item.id) return;
    if (item.customizations) {
      updateQuantity(item.id, newQuantity, item.customizations);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((item) => {
            if (!item) return null;
            
            const itemPrice = safePrice(item.price);
            
            return (
              <Card key={getItemKey(item)} className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img
                    src={item.image || 'https://via.placeholder.com/96'}
                    alt={item.title || 'Product'}
                    className="h-24 w-24 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/96';
                    }}
                  />

                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                      {item.title || 'Product'}
                    </h3>
                    
                    {/* Show customizations if any */}
                    {item.customizations && (
                      <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                        {item.customizations.flavor && (
                          <p className="mr-2">Flavor: {item.customizations.flavor}</p>
                        )}
                        {item.customizations.size && (
                          <p className="mr-2">Size: {item.customizations.size}</p>
                        )}
                        {item.customizations.cakeType && (
                          <span className="mr-2">{item.customizations.cakeType}</span>
                        )}
                        {item.customizations.message && (
                          <span className="block mt-1 italic">"{item.customizations.message}"</span>
                        )}
                        {item.customizations.deliveryDate && (
                          <span className="block mt-1 text-xs">
                            Delivery: {new Date(item.customizations.deliveryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="mb-2 font-bold text-orange-600 dark:text-orange-400">
                      ${itemPrice.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="w-12 text-center font-medium">
                          {item.quantity || 1}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item, (item.quantity || 1) + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${(itemPrice * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Clear Cart Button */}
          {cart.items.length > 0 && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 hover:text-red-600"
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal ({cart.totalItems || 0} {cart.totalItems === 1 ? 'item' : 'items'})</span>
                <span>${Number(cart.subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (10%)</span>
                <span>${Number(cart.tax || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery</span>
                <span>${Number(cart.deliveryCharge || 50).toFixed(2)}</span>
              </div>
              
              {/* Free delivery message for orders over certain amount */}
              {Number(cart.subtotal || 0) > 100 && (
                <p className="text-sm text-green-600">
                  🎉 Free delivery on orders over $100!
                </p>
              )}
              
              <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${Number(cart.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate("/login")}//checkout page
              className="mb-3 w-full bg-orange-500 text-white hover:bg-orange-600"
              size="lg"
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/categories")}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;