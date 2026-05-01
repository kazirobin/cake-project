import React from "react";
import CategoryCard from "@/components/category/CategoryCard";
import LoadingSkeleton from "@/components/category/LoadingUI/LoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";

const AllCategory = () => {
  const axios = useAxios();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      // Fetch categories from API if needed
      const { data } = await axios.get("/categories");
      return data?.data || [];
    },
  });

  console.log("Categories : ", categories);

  if (categories.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <div className="py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-text-primary dark:text-dark-text-primary text-3xl font-bold transition-colors duration-300">
            All Categories
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary mt-2 transition-colors duration-300">
            Browse through our delicious collection of cakes and desserts
          </p>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
              <CategoryCard category={category} key={category.id || index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategory;
