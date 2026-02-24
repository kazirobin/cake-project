import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import categories from "@/data/category.json";
import products from "@/data/products.json";
import ProductCard from "./product/product-card";
import NoProductsFound from "./product/no-product-found";
import SortDropdown from "./sort-dropdown";
import FeaturesBar from "./category-features-bar";
import CategoryHero from "./category-hero";
import { formatPriceData } from './../../lib/price-formatter';

// Map category names to IDs
const categoryNameToId = {
  "birthday-cakes": 1,
  "wedding-cakes": 2,
  "anniversary-cakes": 3,
  "kids-cakes": 4,
  "photo-cakes": 5,
  cupcakes: 6,
  pastries: 7,
  cookies: 8,
};

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const foundCategory = categories.find((cat) => cat.slug === categoryId);
    setCategory(foundCategory);

    if (foundCategory) {
      const categoryNumericId = categoryNameToId[categoryId] || 1;

      const productsInCategory = products.filter((product) =>
        product.cakeDetails.categoryIds.includes(categoryNumericId),
      );

      setCategoryProducts(productsInCategory);
    }

    setLoading(false);
    window.scrollTo(0, 0);
  }, [categoryId]);

  const getSortedProducts = () => {
    let sorted = [...categoryProducts];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => {
          const priceA =
            a.cakeDetails.pricing?.discounted || a.cakeDetails.price;
          const priceB =
            b.cakeDetails.pricing?.discounted || b.cakeDetails.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        sorted.sort((a, b) => {
          const priceA =
            a.cakeDetails.pricing?.discounted || a.cakeDetails.price;
          const priceB =
            b.cakeDetails.pricing?.discounted || b.cakeDetails.price;
          return priceB - priceA;
        });
        break;
      case "rating":
        sorted.sort(
          (a, b) => b.cakeDetails.rating.value - a.cakeDetails.rating.value,
        );
        break;
      default:
        sorted.sort(
          (a, b) => b.cakeDetails.rating.count - a.cakeDetails.rating.count,
        );
        break;
    }

    return sorted;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500 dark:border-orange-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Loading category...
          </p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            Category Not Found
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300 transition-colors duration-300">
            The category "{categoryId}" doesn't exist.
          </p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white transition-colors duration-300">
            <Link to="/categories">Browse All Categories</Link>
          </Button>
        </div>
      </div>
    );
  }

  const sortedProducts = getSortedProducts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <CategoryHero
        category={category}
        productCount={categoryProducts.length}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Features Bar */}
        <FeaturesBar />

        {/* Sort and Results Count */}
        <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="mb-4 text-gray-600 dark:text-gray-300 sm:mb-0 transition-colors duration-300">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {categoryProducts.length}
            </span>{" "}
            products
          </p>

          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((item) => {
              const product = item.cakeDetails;
              const priceData = formatPriceData(item);
              
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  priceData={priceData}
                />
              );
            })}
          </div>
        ) : (
          <NoProductsFound />
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;