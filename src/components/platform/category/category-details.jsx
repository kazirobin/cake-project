import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import data from "@/data/data.json";
import ProductCard from "@/components/platform/product/product-card";
import NoProductsFound from "@/components/platform/product/no-product-found";
import SortDropdown from "@/components/platform/category/sort-dropdown";
import FeaturesBar from "@/components/platform/category/category-features-bar";
import CategoryHero from "@/components/platform/category/category-hero";
import ReusableBreadcrumb from "@/components/common/ReusableBreadcrumb";

const CategoryDetails = () => {
  const { slug } = useParams();
  const axios = useAxios();

  const { data: category = {}, isLoading: loading } = useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      // Simulate fetching category details from an API
      const { data } = await axios.get(`/categories/category/${slug}`);
      return data?.data || {};
    },
  });

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
            The category "{slug}" doesn't exist.
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

  return (
    <div className="min-h-screen transition-colors duration-300">
      <ReusableBreadcrumb
        items={[
          { path: "/", label: "Home" },
          { path: "/categories", label: "Categories" },
          { label: category?.name || "Category" },
        ]}
      />

      <CategoryHero category={category} productCount={category?.cakes.length} />

      <div className="container mx-auto px-4 py-8">
        <FeaturesBar />

        <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="mb-4 text-gray-600 transition-colors duration-300 sm:mb-0 dark:text-gray-300">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {category?.cakes.length}
            </span>{" "}
            {category?.cakes.length === 1 ? "product" : "products"}
          </p>
        </div>

        {category?.cakes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category?.cakes.map((product) => (
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
