import React from "react";
import categories from "@/data/category.json";
import CategoryCard from "../../../components/users/category/category-card";

const AllCategory = () => {
  /* ["birthday-cakes", "wedding-cakes", "anniversary-cakes", "kids-cakes", "photo-cakes", "cupcakes", "pastries", "cookies"] */
  console.log(categories);

  return (
    <div className="py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-text-primary dark:text-dark-text-primary text-3xl font-bold transition-colors duration-300">
            All Categories
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary mt-2 transition-colors duration-300">
            Browse through our delicious collection of cakes and desserts
          </p>
        </div>

        {/* Simple Grid Layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard category={category} key={category.id || index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
