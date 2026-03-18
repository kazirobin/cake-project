import useCart from "@/Hooks/useCart";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "./order-summary";
import CheckoutForm from "./checkout-form";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleOrderComplete = () => {
    // Generate random order number
    const randomOrder = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrder);
    setOrderPlaced(true);
    clearCart(); // Clear the cart after successful order
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>

            {/* Success Message */}
            <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
              Order Placed Successfully!
            </h2>

            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {/* Order Number */}
            <div className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Order Number
              </p>
              <p className="font-mono text-xl font-bold text-orange-600 dark:text-orange-400">
                {orderNumber}
              </p>
            </div>

            {/* Delivery Info */}
            <div className="mb-8 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <p className="mb-2 text-gray-600 dark:text-gray-300">
                📦 Estimated Delivery: 2-3 business days
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You will receive a confirmation email with tracking details
                shortly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/categories">
                <Button
                  className="w-full bg-orange-500 text-white hover:bg-orange-600 sm:w-auto"
                  size="lg"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto"
                size="lg"
              >
                Go to Home
              </Button>
            </div>

            {/* Suggestions */}
            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                You might also like:
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  to="/categories/1"
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-orange-500 hover:text-white dark:bg-gray-700"
                >
                  Birthday Cakes
                </Link>
                <Link
                  to="/categories/2"
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-orange-500 hover:text-white dark:bg-gray-700"
                >
                  Anniversary Cakes
                </Link>
                <Link
                  to="/categories/3"
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-orange-500 hover:text-white dark:bg-gray-700"
                >
                  Cupcakes
                </Link>
                <Link
                  to="/categories/5"
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-orange-500 hover:text-white dark:bg-gray-700"
                >
                  Special Offers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Add some items to your cart before checking out.
        </p>
        <Link
          to="/categories"
          className="inline-block rounded-lg bg-orange-500 px-6 py-3 text-white transition-colors hover:bg-orange-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center text-orange-600 hover:underline dark:text-orange-400"
          >
            ← Back to Cart
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm onOrderComplete={handleOrderComplete} />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
