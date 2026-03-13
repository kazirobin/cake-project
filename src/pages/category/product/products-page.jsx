import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { useCart } from "@/Hooks/cart-context";
import productService from "./product-service";
import ProductCard from "./product-card";
import CartSidebar from "@/components/root/Components/Cart/cart-sidebar";

const ProductsPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const { cart } = useCart();

  const allProducts = productService.getAllProducts();

  // Get unique categories
  // const categories = [
  //   "all",
  //   ...new Set(allProducts.flatMap((p) => p.categoryIds)),
  // ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery) {
      filtered = productService.searchProducts(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) =>
        p.categoryIds.includes(parseInt(selectedCategory)),
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (p) =>
        p.pricing.discounted >= priceRange.min &&
        p.pricing.discounted <= priceRange.max,
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricing.discounted - b.pricing.discounted);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricing.discounted - a.pricing.discounted);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.value - a.rating.value);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured - keep as is
        break;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy, allProducts]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: 100 });
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold text-orange-600 dark:text-orange-400"
            >
              UG Cakes
            </Link>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => setIsCartOpen(true)}
                className="relative"
                variant="outline"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                    {cart.totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-md">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Filters - Desktop */}
          <div className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Filters
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Categories
                </h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="1">Birthday Cakes</option>
                  <option value="2">Anniversary Cakes</option>
                  <option value="3">Cupcakes</option>
                  <option value="4">Wedding Cakes</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Price Range
                </h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Sort By
                </h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setShowFilters(false)}
            >
              <div
                className="absolute top-0 right-0 h-full w-64 bg-white p-6 dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Same filter content as desktop */}
                <div className="mb-6">
                  <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Categories
                  </h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-lg border p-2"
                  >
                    <option value="all">All Categories</option>
                    <option value="1">Birthday Cakes</option>
                    <option value="2">Anniversary Cakes</option>
                    <option value="3">Cupcakes</option>
                  </select>
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Price Range
                  </h4>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Sort By
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-lg border p-2"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                {filteredProducts.length} products found
              </p>
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="md:hidden"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  No products found matching your criteria
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ProductsPage;
