import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import data from "@/data/data.json";
import ProductCard from "../../../components/users/product/product-card";
import NoProductsFound from "../../../components/users/product/no-product-found";
import SortDropdown from "../../../components/users/category/sort-dropdown";
import FeaturesBar from "../../../components/users/category/category-features-bar";
import CategoryHero from "../../../components/users/category/category-hero";
import ReusableBreadcrumb from "@/components/users/BreadCrumbs/ReusableBreadcrumb";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const categories = data.categories || [];
    
    const foundCategory = categories.find((cat) => cat.slug === categoryId);
    setCategory(foundCategory);

    if (foundCategory) {
      const products = data.products || [];
      
      const productsInCategory = products.filter((product) => {
        if (Array.isArray(product.categoryId)) {
          return product.categoryId.includes(foundCategory._id);
        }
        return product.categoryId === foundCategory._id;
      });

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
          const priceA = a.price?.discount || a.price?.regular || 0;
          const priceB = b.price?.discount || b.price?.regular || 0;
          return priceA - priceB;
        });
        break;
      case "price-high":
        sorted.sort((a, b) => {
          const priceA = a.price?.discount || a.price?.regular || 0;
          const priceB = b.price?.discount || b.price?.regular || 0;
          return priceB - priceA;
        });
        break;
      case "rating":
        sorted.sort((a, b) => 
          (b.rating?.average || 0) - (a.rating?.average || 0)
        );
        break;
      case "newest":
        sorted.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default: // popular - sort by review count
        sorted.sort((a, b) => 
          (b.rating?.totalReviews || 0) - (a.rating?.totalReviews || 0)
        );
        break;
    }

    return sorted;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500 dark:border-orange-400"></div>
          <p className="mt-4 text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Loading category...
          </p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">
            Category Not Found
          </h1>
          <p className="mb-6 text-gray-600 transition-colors duration-300 dark:text-gray-300">
            The category "{categoryId}" doesn't exist.
          </p>
          <Button
            asChild
            className="bg-orange-500 text-white transition-colors duration-300 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
          >
            <Link to="/categories">Browse All Categories</Link>
          </Button>
        </div>
      </div>
    );
  }

  const sortedProducts = getSortedProducts();

  return (
    <div className="min-h-screen transition-colors duration-300">
      <ReusableBreadcrumb
        items={[
          { path: "/", label: "Home" },
          { path: "/categories", label: "Categories" },
          { label: category?.name || "Category" },
        ]}
      />
      
      <CategoryHero
        category={category}
        productCount={categoryProducts.length}
      />

      <div className="container mx-auto px-4 py-8">
        <FeaturesBar />

        <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="mb-4 text-gray-600 transition-colors duration-300 sm:mb-0 dark:text-gray-300">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {categoryProducts.length}
            </span>{" "}
            {categoryProducts.length === 1 ? "product" : "products"}
          </p>

          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>

       

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                categorySlug={category.slug} // Pass category slug for correct linking
              />
            ))}
          </div>
        ) : (
          <NoProductsFound 
            message={`No products found in ${category.name}`}
            suggestion="Check back later for new arrivals!"
          />
        )}
      </div>
    </div>
  );
};



export default CategoryDetails;