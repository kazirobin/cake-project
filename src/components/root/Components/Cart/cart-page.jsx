import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/Hooks/cart-context";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.items.length === 0) {
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
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mb-2 font-bold text-orange-600 dark:text-orange-400">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {/* Clear Cart Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-500 hover:text-red-600"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal ({cart.totalItems} items)</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (10%)</span>
                <span>${cart.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery</span>
                <span>${cart.deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate("/checkout")}
              className="mb-3 w-full bg-orange-500 text-white hover:bg-orange-600"
              size="lg"
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/products")}
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
