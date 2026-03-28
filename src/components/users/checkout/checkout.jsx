import { useCart } from '@/Hooks/cart-context';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderSummary from './order-summary';
import CheckoutForm from './checkout-form';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleOrderComplete = () => {
    // Generate random order number
    const randomOrder = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrder);
    setOrderPlaced(true);
    clearCart(); // Clear the cart after successful order
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="bg-green-100 dark:bg-green-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Order Placed Successfully!
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {/* Order Number */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
              <p className="text-xl font-mono font-bold text-orange-600 dark:text-orange-400">
                {orderNumber}
              </p>
            </div>

            {/* Delivery Info */}
            <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                📦 Estimated Delivery: 2-3 business days
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You will receive a confirmation email with tracking details shortly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/categories">
                <Button 
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
                  size="lg"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
                size="lg"
              >
                Go to Home
              </Button>
            </div>

            {/* Suggestions */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                You might also like:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/categories/1" className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
                  Birthday Cakes
                </Link>
                <Link to="/categories/2" className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
                  Anniversary Cakes
                </Link>
                <Link to="/categories/3" className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
                  Cupcakes
                </Link>
                <Link to="/categories/5" className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Add some items to your cart before checking out.
        </p>
        <Link
          to="/categories"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="mb-6">
          <Link 
            to="/cart" 
            className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center"
          >
            ← Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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