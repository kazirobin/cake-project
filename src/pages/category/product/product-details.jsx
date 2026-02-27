import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Check,
  AlertCircle,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "@/Hooks/cart-context";
import productService from "./product-service";
import ProductCard from "./product-card";
import ReusableBreadcrumb from "@/root/Components/BreadCrumbs/ReusableBreadcrumb";
import categories from "@/data/category.json";

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

  const productData = productService.getFullProductData(productId);
  const product = productData?.cakeDetails;
  const relatedProducts = productService.getRelatedProducts(productId);

  // Get category data from categories.json based on product categoryIds
  useEffect(() => {
    if (product?.categoryIds && product.categoryIds.length > 0) {
      const firstCategoryId = product.categoryIds[0];
      const foundCategory = categories.find(
        (cat) => cat.id === firstCategoryId,
      );
      setCategoryData(foundCategory || null);
    }
  }, [product]);

  // Load favorite status from localStorage on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(parseInt(productId)));
  }, [productId]);

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const productIdNum = parseInt(productId);

    let newFavorites;
    if (isFavorite) {
      // Remove from favorites
      newFavorites = favorites.filter((id) => id !== productIdNum);
    } else {
      // Add to favorites
      newFavorites = [...favorites, productIdNum];
      setShowFavoriteMessage(true);
      setTimeout(() => setShowFavoriteMessage(false), 2000);
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Product Not Found
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => navigate("/categories")}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.pricing.discounted,
        image: product.avatar,
      });
    }

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const getIcon = (iconName) => {
    const icons = {
      Truck: <Truck className="h-5 w-5" />,
      Shield: <Shield className="h-5 w-5" />,
      RotateCcw: <RotateCcw className="h-5 w-5" />,
      Package: <Package className="h-5 w-5" />,
    };
    return icons[iconName] || <Package className="h-5 w-5" />;
  };

  const allImages = [
    product.avatar,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  // Get the first category ID for the breadcrumb link
  const firstCategoryId = product.categoryIds?.[0] || "";
  // console.log(categoryData);
  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Success Messages */}
      {showSuccessMessage && (
        <div className="animate-slideIn fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
          <Check className="h-5 w-5" />
          Added to cart successfully!
        </div>
      )}

      {showFavoriteMessage && (
        <div className="animate-slideIn fixed top-20 right-4 z-50 flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-white shadow-lg">
          <Heart className="h-5 w-5 fill-white" />
          Added to favorites!
        </div>
      )}

      <div className="container mx-auto">
        {/* Breadcrumb with Category Name from JSON */}
        <ReusableBreadcrumb
          items={[
            {
              path: "/categories",
              label: "Categories",
            },
            {
              path: firstCategoryId
                ? `/categories/${categoryData?.slug}`
                : "/categories",
              label: categoryData?.name || "Category",
            },
            {
              label: product.title,
            },
          ]}
        />

 

        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg shadow-lg ">
              <img
                src={allImages[selectedImage]}
                alt={product.title}
                className="h-auto w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=Product+Image";
                }}
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? "scale-105 border-orange-500"
                        : "border-transparent hover:border-orange-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} - View ${index + 1}`}
                      className="h-20 w-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x80?text=Image";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="rounded-lg p-6 shadow-lg ">
            {/* Title and SKU */}
            <div className="mb-4">
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                SKU: {product.SKU}
              </p>
            </div>

            {/* Rating */}
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating.stars
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                  {product.rating.value}
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {product.pricing.currency}
                  {product.pricing.discounted}
                </p>
                {product.pricing.original > product.pricing.discounted && (
                  <>
                    <p className="text-lg text-gray-400 line-through">
                      {product.pricing.currency}
                      {product.pricing.original}
                    </p>
                    <Badge className="bg-green-500 text-white">
                      Save {product.pricing.currency}
                      {(
                        product.pricing.original - product.pricing.discounted
                      ).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>
              <p
                className={`mt-2 text-sm ${
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Description:
              </h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="ml-2 text-sm text-gray-500">
                  (Max: {product.stock})
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>

              {/* Single Heart Icon in Action Buttons */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFavorite}
                className={`border-gray-300 transition-all dark:border-gray-600 ${
                  isFavorite ? "border-red-200 dark:border-red-800" : ""
                }`}
              >
                <Heart
                  className={`h-4 w-4 transition-all ${
                    isFavorite
                      ? "scale-110 fill-red-500 text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  // You can add a toast notification here
                }}
                className="border-gray-300 dark:border-gray-600"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Customizable Badge */}
            {product.customizable && (
              <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
                <p className="font-medium text-orange-600 dark:text-orange-400">
                  ✨ This cake is customizable! You can add a personalized
                  message.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mb-12 rounded-lg p-6 shadow-lg">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="p-4">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Product Features:
              </h3>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {product.features?.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="specifications" className="p-4">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Specifications:
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {product.specifications?.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between rounded bg-gray-50 p-3 dark:bg-gray-700"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      {spec.label}:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="p-4">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Delivery Information:
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {product.deliveryInfo?.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded bg-gray-50 p-3 dark:bg-gray-700"
                  >
                    <span className="text-orange-500">
                      {getIcon(info.icon)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {info.text}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="p-4">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Nutrition Facts (per serving):
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {product.nutritionInfo?.map((info, index) => (
                  <div
                    key={index}
                    className="rounded bg-gray-50 p-3 text-center dark:bg-gray-700"
                  >
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {info.label}
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {info.value}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
