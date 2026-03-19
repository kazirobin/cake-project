import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  ShoppingCart,
  Heart,
  Check,
  AlertCircle,
  Minus,
  Plus,
} from "lucide-react";

import { useCart } from "@/Hooks/cart-context";
import productService from "./product-service";

import ReusableBreadcrumb from "@/components/users/BreadCrumbs/ReusableBreadcrumb";
import categories from "@/data/category.json";
import ProductCard from "@/components/users/product/product-card";
import DeliveryCustomizationModal from "@/components/users/delivery-date-modal/DeliveryDateModal";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  const productData = productService.getFullProductData(productId);
  const product = productData?.cakeDetails;
  const relatedProducts = productService.getRelatedProducts(productId);

  useEffect(() => {
    if (product?.categoryIds?.length > 0) {
      const firstCategoryId = product.categoryIds[0];
      const foundCategory = categories.find(
        (cat) => cat.id === firstCategoryId,
      );
      setCategoryData(foundCategory || null);
    }
  }, [product]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(parseInt(productId)));
  }, [productId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const id = parseInt(productId);

    let updated;

    if (isFavorite) {
      updated = favorites.filter((item) => item !== id);
    } else {
      updated = [...favorites, id];
      setShowFavoriteMessage(true);
      setTimeout(() => setShowFavoriteMessage(false), 2000);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return (
      <div className="container mx-auto py-16 text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Button
          onClick={() => navigate("/categories")}
          className="mt-6 bg-orange-500 text-white"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  const allImages = [
    product.avatar,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  const firstCategoryId = product.categoryIds?.[0] || "";

  return (
    <div className="container mx-auto px-5">
      {/* SUCCESS MESSAGE */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white">
          <Check className="h-5 w-5" />
          Added to cart successfully!
        </div>
      )}

      {/* FAVORITE MESSAGE */}
      {showFavoriteMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-white">
          <Heart className="h-5 w-5 fill-white" />
          Added to favorites!
        </div>
      )}

      <ReusableBreadcrumb
        items={[
          { path: "/categories", label: "Categories" },
          {
            path: firstCategoryId
              ? `/categories/${categoryData?.slug}`
              : "/categories",
            label: categoryData?.name || "Category",
          },
          { label: product.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* IMAGES */}
        <div>
          <img
            src={allImages[selectedImage]}
            className="rounded-lg"
            alt={product.title}
          />

          <div className="mt-4 grid grid-cols-4 gap-2">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(i)}
                className="cursor-pointer rounded-lg border"
                alt={`${product.title} - view ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>

          <p className="text-3xl font-bold text-orange-600">
            {product.pricing.currency}
            {product.pricing.discounted}
          </p>

          {/* customizable badge */}
          {product.customizable && (
            <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-2 dark:border-orange-700 dark:bg-orange-900/20">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full text-xl">
                  ✨
                </span>
                <div>
                  <h4 className="text-lg font-bold text-orange-700 dark:text-orange-400">
                    This Cake is Fully Customizable!
                  </h4>
                  <p className="mt-1 text-sm text-orange-600 dark:text-orange-300">
                    Personalize this cake with your preferred flavors, shapes,
                    sizes, and icing colors.
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className={`mt-4 text-gray-600 ${showMore ? "" : "line-clamp-3"}`}>
            {product.description}
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-1 text-orange-500"
          >
            {showMore ? "Show Less" : "Read More"}
          </button>

          <div className="mt-4 mb-6 rounded-lg border border-orange-200 bg-orange-50 p-1 dark:border-orange-700 dark:bg-orange-900/20">
            <div className="flex justify-between gap-3">
              <h4>Starting Price:</h4>
              <p className="flex items-center text-lg font-bold text-gray-900 dark:text-white">
                {product.pricing.currency}
                <span className="ml-1">{product.pricing.discounted}</span>
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              The price shown is for a single pound cake in base options. The
              final price might change based on the options you choose.
            </p>
          </div>

          {/* QUANTITY */}
          <div className="mt-6 flex items-center gap-3">
            <Button
              className="cursor-pointer"
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              className="cursor-pointer"
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus />
            </Button>
          </div>

          {/* ACTION BUTTON */}
          <div className="mt-6 flex gap-4">
            <Button
              onClick={() => setShowDeliveryModal(true)}
              className="flex-1 cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 text-white"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Customize & Add to Cart
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFavorite}
              className="cursor-pointer hover:bg-red-50"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* DELIVERY + CUSTOMIZATION MODAL */}
      <DeliveryCustomizationModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        addToCart={addToCart}
        product={product}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductDetails;
