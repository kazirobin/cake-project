import React, { useState, useEffect, useCallback, useMemo } from "react";
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

// Constants
const MESSAGE_DURATION = 2000;
const FALLBACK_CATEGORY_NAME = "Category";
const FALLBACK_CATEGORY_PATH = "/categories";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // State
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [messages, setMessages] = useState({
    success: false,
    favorite: false,
  });

  // Memoized product data
  const productData = useMemo(
    () => productService.getFullProductData(productId),
    [productId]
  );
  
  const product = productData?.cakeDetails;
  const relatedProducts = useMemo(
    () => productService.getRelatedProducts(productId),
    [productId]
  );

  // Memoized image list
  const allImages = useMemo(
    () => [product?.avatar, ...(product?.additionalImages || [])].filter(Boolean),
    [product]
  );

  // Effects
  useEffect(() => {
    if (product?.categoryIds?.length > 0) {
      const firstCategoryId = product.categoryIds[0];
      const foundCategory = categories.find((cat) => cat.id === firstCategoryId);
      setCategoryData(foundCategory || null);
    }
  }, [product]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(parseInt(productId)));
  }, [productId]);

  // Handlers
  const showTemporaryMessage = useCallback((type) => {
    setMessages((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setMessages((prev) => ({ ...prev, [type]: false }));
    }, MESSAGE_DURATION);
  }, []);

  const toggleFavorite = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const id = parseInt(productId);
    
    const updated = isFavorite
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      showTemporaryMessage("favorite");
    }
  }, [isFavorite, productId, showTemporaryMessage]);

  const handleImageSelect = useCallback((index) => {
    setSelectedImage(index);
  }, []);

  const handleQuantityChange = useCallback((delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  }, []);

  const handleAddToCart = useCallback(() => {
    // This will be handled by the modal
    setShowDeliveryModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowDeliveryModal(false);
  }, []);

  const handleAddToCartSuccess = useCallback(() => {
    showTemporaryMessage("success");
  }, [showTemporaryMessage]);

  // Early return if product not found
  if (!product) {
    return (
      <div className="container mx-auto py-16 text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Button
          onClick={() => navigate("/categories")}
          className="mt-6 bg-orange-500 text-white hover:bg-orange-600"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  const firstCategoryId = product.categoryIds?.[0] || "";
  const breadcrumbItems = [
    { path: "/categories", label: "Categories" },
    {
      path: firstCategoryId
        ? `/categories/${categoryData?.slug}`
        : FALLBACK_CATEGORY_PATH,
      label: categoryData?.name || FALLBACK_CATEGORY_NAME,
    },
    { label: product.title },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Message Toasts */}
      <MessageToast
        show={messages.success}
        type="success"
        icon={Check}
        message="Added to cart successfully!"
      />
      <MessageToast
        show={messages.favorite}
        type="favorite"
        icon={Heart}
        message="Added to favorites!"
        iconClassName="fill-white"
      />

      <ReusableBreadcrumb items={breadcrumbItems} />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Images */}
        <ProductImages
          images={allImages}
          selectedImage={selectedImage}
          onImageSelect={handleImageSelect}
          productTitle={product.title}
        />

        {/* Product Details */}
        <ProductInfo
          product={product}
          quantity={quantity}
          isFavorite={isFavorite}
          showMore={showMore}
          onShowMoreToggle={() => setShowMore(!showMore)}
          onQuantityChange={handleQuantityChange}
          onFavoriteToggle={toggleFavorite}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}

      {/* Delivery Modal */}
      <DeliveryCustomizationModal
        isOpen={showDeliveryModal}
        onClose={handleModalClose}
        addToCart={addToCart}
        product={product}
        quantity={quantity}
        onSuccess={handleAddToCartSuccess}
      />
    </div>
  );
};

// Sub-components for better organization

const MessageToast = ({ show, type, icon: Icon, message, iconClassName = "" }) => {
  if (!show) return null;
  
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  
  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg ${bgColor} px-6 py-3 text-white shadow-lg animate-in slide-in-from-top-2`}>
      <Icon className={`h-5 w-5 ${iconClassName}`} />
      <span>{message}</span>
    </div>
  );
};

const ProductImages = ({ images, selectedImage, onImageSelect, productTitle }) => (
  <div>
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
      <img
        src={images[selectedImage]}
        alt={productTitle}
        className="h-full w-full object-contain"
        loading="eager"
      />
    </div>

    {images.length > 1 && (
      <div className="mt-4 grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onImageSelect(i)}
            className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === i
                ? "border-orange-500"
                : "border-transparent hover:border-gray-300"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <div className="aspect-square w-full bg-gray-50">
              <img
                src={img}
                alt={`${productTitle} - thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>
    )}
  </div>
);

const ProductInfo = ({
  product,
  quantity,
  isFavorite,
  showMore,
  onShowMoreToggle,
  onQuantityChange,
  onFavoriteToggle,
  onAddToCart,
}) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">{product.title}</h1>

    <p className="text-3xl font-bold text-orange-600">
      {product.pricing.currency}
      {product.pricing.discounted}
    </p>

    {product.customizable && <CustomizableBadge />}

    <div className="space-y-2">
      <p className={`text-gray-600 dark:text-gray-300 ${showMore ? "" : "line-clamp-3"}`}>
        {product.description}
      </p>
      <button
        onClick={onShowMoreToggle}
        className="text-orange-500 hover:text-orange-600 font-medium"
      >
        {showMore ? "Show Less" : "Read More"}
      </button>
    </div>

    <PriceInfo product={product} />

    <div className="flex items-center gap-4">
      <QuantitySelector quantity={quantity} onChange={onQuantityChange} />
    </div>

    <ActionButtons
      onAddToCart={onAddToCart}
      isFavorite={isFavorite}
      onFavoriteToggle={onFavoriteToggle}
    />
  </div>
);

const CustomizableBadge = () => (
  <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-700 dark:bg-orange-900/20">
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full text-xl">
        ✨
      </span>
      <div>
        <h4 className="text-lg font-bold text-orange-700 dark:text-orange-400">
          This Cake is Fully Customizable!
        </h4>
        <p className="mt-1 text-sm text-orange-600 dark:text-orange-300">
          Personalize this cake with your preferred flavors, shapes, sizes, and icing colors.
        </p>
      </div>
    </div>
  </div>
);

const PriceInfo = ({ product }) => (
  <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-700 dark:bg-orange-900/20">
    <div className="flex justify-between gap-3">
      <span className="font-medium">Starting Price:</span>
      <p className="flex items-center text-lg font-bold text-gray-900 dark:text-white">
        {product.pricing.currency}
        <span className="ml-1">{product.pricing.discounted}</span>
      </p>
    </div>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      The price shown is for a single pound cake in base options. The final price might change
      based on the options you choose.
    </p>
  </div>
);

const QuantitySelector = ({ quantity, onChange }) => (
  <div className="flex items-center gap-3">
    <Button
      variant="outline"
      size="icon"
      onClick={() => onChange(-1)}
      disabled={quantity <= 1}
      className="cursor-pointer"
      aria-label="Decrease quantity"
    >
      <Minus className="h-4 w-4" />
    </Button>
    <span className="w-8 text-center font-medium">{quantity}</span>
    <Button
      variant="outline"
      size="icon"
      onClick={() => onChange(1)}
      className="cursor-pointer"
      aria-label="Increase quantity"
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

const ActionButtons = ({ onAddToCart, isFavorite, onFavoriteToggle }) => (
  <div className="flex gap-4">
    <Button
      onClick={onAddToCart}
      className="flex-1 cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Customize & Add to Cart
    </Button>

    <Button
      variant="outline"
      size="icon"
      onClick={onFavoriteToggle}
      className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          isFavorite ? "fill-red-500 text-red-500" : ""
        }`}
      />
    </Button>
  </div>
);

const RelatedProducts = ({ products }) => (
  <div className="mt-16">
    <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  </div>
);

export default ProductDetails;