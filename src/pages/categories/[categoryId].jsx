// src/pages/categories/[categoryId].jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { 
  getCategoryBySlug, 
  getProductsByCategory, 
  getCategorySpecificData,
  getRelatedCategories 
} from "../../data/data";
import AllCards from "@/root/Components/Cards/AllCards";
import CategoryHero from "@/root/Components/Category/CategoryHero";
import BirthdaySpecial from "@/root/Components/Category/category-specific/BirthdaySpecial";
import WeddingSpecial from "@/root/Components/Category/category-specific/WeddingSpecial";
import AnniversarySpecial from "@/root/Components/Category/category-specific/AnniversarySpecial";
import KidsSpecial from "@/root/Components/Category/category-specific/KidsSpecial";
import PhotoSpecial from "@/root/Components/Category/category-specific/PhotoSpecial";
import CupcakeSpecial from "@/root/Components/Category/category-specific/CupcakeSpecial";
import PastrySpecial from "@/root/Components/Category/category-specific/PastrySpecial";
import CookieSpecial from "@/root/Components/Category/category-specific/CookieSpecial";

const componentMap = {
  BirthdaySpecial,
  WeddingSpecial,
  AnniversarySpecial,
  KidsSpecial,
  PhotoSpecial,
  CupcakeSpecial,
  PastrySpecial,
  CookieSpecial
};

export default function CategoryDetailsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedCategories, setRelatedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const fetchCategoryData = () => {
      setLoading(true);
      try {
        const categoryData = getCategoryBySlug(categoryId);
        if (!categoryData) {
          navigate("/categories", { replace: true });
          return;
        }
        setCategory(categoryData);
        
        const productsData = getProductsByCategory(categoryData.id);
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        const related = getRelatedCategories(categoryData.id);
        setRelatedCategories(related);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId, navigate]);

  useEffect(() => {
    if (!products.length) return;

    let sorted = [...products];

    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) => a.cakeDetails.title.localeCompare(b.cakeDetails.title));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.cakeDetails.title.localeCompare(a.cakeDetails.title));
        break;
      case "price-low":
        sorted.sort((a, b) => a.cakeDetails.pricing.discounted - b.cakeDetails.pricing.discounted);
        break;
      case "price-high":
        sorted.sort((a, b) => b.cakeDetails.pricing.discounted - a.cakeDetails.pricing.discounted);
        break;
      case "rating":
        sorted.sort((a, b) => b.cakeDetails.rating.value - a.cakeDetails.rating.value);
        break;
      default: // popular
        sorted.sort((a, b) => b.cakeDetails.rating.count - a.cakeDetails.rating.count);
    }

    setFilteredProducts(sorted);
  }, [sortBy, products]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!category) return null;

  const categorySpecificData = getCategorySpecificData(category.id);

  return (
    <div className="space-y-8">
      <VisuallyHidden.Root>
        <h1>{category.name} Category</h1>
      </VisuallyHidden.Root>

      <CategoryHero category={category} />

      <div className="flex flex-col gap-4">
        {/* Simple Sort Dropdown */}
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <AllCards 
            title={`${category.name} (${filteredProducts.length})`}
            subtitle={category.description}
            badge={category.type}
            updateTime={`${filteredProducts.length} products available`}
            cakes={filteredProducts}
            initialDesktop={8}
            initialLaptop={6}
            initialMobile={4}
            left={true}
          />
        </div>
      </div>

      {category.specificComponents && category.specificComponents.map((componentName, index) => {
        const SpecificComponent = componentMap[componentName];
        return SpecificComponent ? (
          <SpecificComponent 
            key={index} 
            category={category} 
            products={products}
            specificData={categorySpecificData}
          />
        ) : null;
      })}

      {relatedCategories.length > 0 && (
        <div className="mt-12">
          <AllCards 
            title="🔗 Related Categories"
            subtitle="You might also like"
            cakes={relatedCategories.map(relCat => ({
              id: relCat.id,
              title: relCat.name,
              avatar: relCat.image,
              category: relCat.type,
              description: relCat.description,
              rating: { value: 4.5, count: 100 },
              pricing: { 
                discounted: 0,
                original: 0 
              },
              features: [],
              stock: relCat.productCount || 0,
              customizable: false
            }))}
            initialDesktop={3}
            initialLaptop={2}
            initialMobile={1}
            left={true}
          />
        </div>
      )}
    </div>
  );
}