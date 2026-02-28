import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Shield, Clock, Heart } from "lucide-react";
import SliderBanner from "@/root/Components/SliderBanner/SliderBanner";
import { useCart } from "@/Hooks/cart-context";
import ProductCard from "../category/product/product-card";
import productService from "../category/product/product-service";
import CartSidebar from "@/root/Components/Cart/cart-sidebar";
import PlayWinCake from "@/root/Components/Mohosin/PlayWinCake";

const Home = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const featuredProducts = productService.getFeaturedProducts(4);
  const newArrivals = productService.getNewArrivals(4);

  return (
    <div className="min-h-screen">
      {/* Slider Banner Section */}
      <SliderBanner />

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Discover our most popular cakes, carefully crafted for your special
            moments
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/categories">
            <Button
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Truck className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Free Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Free delivery inside Kathmandu Valley
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                100% satisfaction guaranteed
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Fresh Daily
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Baked fresh every morning
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Heart className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Made with Love
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Handcrafted with premium ingredients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            New Arrivals
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Check out our latest creations, fresh from the oven
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Play and wind cake section */}
      <PlayWinCake />
    </div>
  );
};

export default Home;
