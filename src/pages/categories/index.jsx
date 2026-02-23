// src/pages/categories/index.jsx
import React from 'react';
import { Link } from "react-router-dom";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { categories, getPopularProducts, getProductsByCategory } from "@/data/data";
import AllCards from "@/root/Components/Cards/AllCards";

export default function CategoriesPage() {
  const popularProducts = getPopularProducts(8);
  // console.log("Popular products:", popularProducts);

  // Calculate actual product count for each category
  const categoriesWithCounts = categories.map(category => {
    const productsInCategory = getProductsByCategory(category.id);
    return {
      ...category,
      actualProductCount: productsInCategory.length
    };
  });

  return (
    <div>
      <VisuallyHidden.Root>
        <h1>All Categories</h1>
      </VisuallyHidden.Root>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-gray-600">Browse our delicious collection of cakes and desserts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {categoriesWithCounts.map((category) => (
          <Link 
            key={category.id} 
            to={`/categories/${category.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold group-hover:text-purple-600">
                    {category.name}
                  </h2>
                  <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                    {category.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {category.actualProductCount} Products
                  </span>
                  <span className="text-purple-600 group-hover:translate-x-1 transition-transform">
                    View All →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <AllCards 
        title="🔥 Popular Products"
        subtitle="Most loved items across all categories"
        badge="TRENDING"
        updateTime={new Date().toLocaleDateString()}
        cakes={popularProducts}
        initialDesktop={4}
        initialLaptop={3}
        initialMobile={2}
        left={false}
      />
    </div>
  );
}