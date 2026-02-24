import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import products from "@/data/products.json";

// Map category names to IDs
const categoryNameToId = {
  "birthday-cakes": 1,
  "wedding-cakes": 2,
  "anniversary-cakes": 3,
  "kids-cakes": 4,
  "photo-cakes": 5,
  "cupcakes": 6,
  "pastries": 7,
  "cookies": 8,
};

// Pre-calculate all product counts
const getProductCounts = () => {
  const counts = {};
  
  products.forEach(product => {
    product.cakeDetails.categoryIds.forEach(categoryId => {
      counts[categoryId] = (counts[categoryId] || 0) + 1;
    });
  });
  
  return counts;
};

const productCounts = getProductCounts();

const CategoryCard = ({ category }) => {
  const { slug, name, description, image } = category;
  
  // Get category ID and corresponding count
  const categoryId = categoryNameToId[slug];
  const productCount = productCounts[categoryId] || 0;

  return (
    <Link to={`/categories/${slug}`} className="block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md transition-all duration-300 hover:shadow-lg dark:shadow-gray-700/30 hover:scale-[1.02]">
        {/* Image - Fixed height */}
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" 
          />
        </div>

        {/* Content - Grid layout for consistent spacing */}
        <div className="grid flex-1 grid-rows-[auto_1fr_auto] gap-2 p-4">
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <h3 className="line-clamp-1 pr-2 text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
              {name}
            </h3>
            <span className="rounded bg-orange-100 dark:bg-orange-900/30 px-2 py-1 text-xs whitespace-nowrap text-orange-600 dark:text-orange-400 transition-colors duration-300">
              {productCount} {productCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Description Row - Takes remaining space */}
          <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {description}
          </p>

          {/* Footer Row */}
          <div className="pt-2 text-sm font-medium text-orange-600 dark:text-orange-400 transition-colors duration-300">
            View Products →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;