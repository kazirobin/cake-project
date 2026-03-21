import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/Hooks/cart-context";
import CartItem from "@/components/users/cart/cart-item";
import { toast } from "react-toastify";

const CartPage = () => {
  const navigate = useNavigate();
  const cartContext = useCart();
  const { cart, removeFromCart, updateQuantity, updateItem, clearCart } = cartContext;

  const getItemKey = (item) => {
    if (!item) return 'unknown';
    if (item.customizations) return `${item.id}-${JSON.stringify(item.customizations)}`;
    return item.id || Math.random().toString();
  };

  const hasItems = cart?.items && Array.isArray(cart.items) && cart.items.length > 0;

  const handleRemoveFromCart = (itemId, customizations = null) => {
    removeFromCart(itemId, customizations);
    toast.success("Item removed from cart");
  };

  const handleUpdateQuantity = (itemId, newQuantity, customizations = null) => {
    updateQuantity(itemId, newQuantity, customizations);
  };

  const handleUpdateItem = (updatedItem) => {
    updateItem(
      updatedItem.id,
      updatedItem.customizations,
      {
        customizations: updatedItem.customizations,
        size: updatedItem.size,
        flavor: updatedItem.flavor,
        cakeType: updatedItem.cakeType,
        deliveryDate: updatedItem.deliveryDate,
        message: updatedItem.message,
      }
    );
    toast.success(`${updatedItem.title} updated successfully!`);
  };

  const handleToggleWishlist = (item) => {
    toast.info("Item saved for later");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!");
  };

  if (!hasItems) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="mx-auto mb-4 h-20 w-20 text-gray-400" />
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/categories">
          <Button className="bg-orange-500 text-white hover:bg-orange-600">Browse Categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((item) => (
            <CartItem
              key={getItemKey(item)}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
              onToggleWishlist={handleToggleWishlist}
              onUpdateItem={handleUpdateItem}
            />
          ))}

          {cart.items.length > 0 && (
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleClearCart} className="text-red-500 hover:text-red-600">
                Clear Cart
              </Button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>

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
              
              {Number(cart.subtotal || 0) > 100 && (
                <p className="text-sm text-green-600">🎉 Free delivery on orders over $100!</p>
              )}
              
              <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${Number(cart.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate("/checkout")} className="mb-3 w-full bg-orange-500 text-white hover:bg-orange-600" size="lg">
              Proceed to Checkout
            </Button>

            <Button variant="outline" onClick={() => navigate("/categories")} className="w-full">
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