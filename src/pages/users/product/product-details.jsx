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
  Sparkles,
} from "lucide-react";

import { useCart } from "@/Hooks/cart-context";
import productService from "./product-service";
import ReusableBreadcrumb from "@/components/users/BreadCrumbs/ReusableBreadcrumb";
import ProductCard from "@/components/users/product/product-card";
import DeliveryCustomizationModal from "@/components/users/delivery-date-modal/DeliveryDateModal";

// Constants
const MESSAGE_DURATION = 2000;
const FALLBACK_CATEGORY_NAME = "Category";
const FALLBACK_CATEGORY_PATH = "/categories";

const ProductDetails = () => {
  const { productId, categoryId } = useParams(); // Get both params
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
  const product = useMemo(
    () => productService.getProductById(productId),
    [productId]
  );
  
  const relatedProducts = useMemo(
    () => productService.getRelatedProducts(productId),
    [productId]
  );

  // Check if product is customizable
  const isCustomizable = useMemo(() => {
    return product?.attributes?.customizable === true || 
           product?.customizable === true;
  }, [product]);

  // Get all images
  const allImages = useMemo(() => {
    if (!product) return [];
    
    const images = [];
    
    // Add primary image
    if (product.images) {
      const primaryImage = product.images.find(img => img.isPrimary);
      if (primaryImage?.url) images.push(primaryImage.url);
      
      // Add other images
      product.images.forEach(img => {
        if (!img.isPrimary && img.url && !images.includes(img.url)) {
          images.push(img.url);
        }
      });
    }
    
    // Add additionalImages if they exist and aren't already included
    if (product.additionalImages) {
      product.additionalImages.forEach(img => {
        if (!images.includes(img)) {
          images.push(img);
        }
      });
    }
    
    return images.length > 0 ? images : ['https://www.dummyimage.com/500/1d19e8/fff.png'];
  }, [product]);

  // Effects
  useEffect(() => {
    if (product?.categoryId) {
      const catId = Array.isArray(product.categoryId) 
        ? product.categoryId[0] 
        : product.categoryId;
      const foundCategory = productService.getCategoryById(catId);
      setCategoryData(foundCategory || null);
    }
  }, [product]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(productId));
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
    
    const updated = isFavorite
      ? favorites.filter((item) => item !== productId)
      : [...favorites, productId];

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
    if (isCustomizable) {
      setShowDeliveryModal(true);
    } else {
      addToCart({
        ...product,
        quantity: quantity,
        selectedImage: allImages[selectedImage]
      });
      showTemporaryMessage("success");
    }
  }, [isCustomizable, product, quantity, selectedImage, allImages, addToCart, showTemporaryMessage]);

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
        <p className="mt-2 text-gray-600">The product with ID "{productId}" doesn't exist.</p>
        <Button
          onClick={() => navigate("/categories")}
          className="mt-6 bg-orange-500 text-white hover:bg-orange-600"
        >
          Browse Categories
        </Button>
      </div>
    );
  }

  // Get category slug for breadcrumb
  const categorySlug = categoryData?.slug || categoryId || 'category';

  const breadcrumbItems = [
    { path: "/", label: "Home" },
    { path: "/categories", label: "Categories" },
    {
      path: `/categories/${categorySlug}`,
      label: categoryData?.name || "Category",
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
        message={isCustomizable ? "Product configured successfully!" : "Added to cart successfully!"}
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
          isCustomizable={isCustomizable}
          onShowMoreToggle={() => setShowMore(!showMore)}
          onQuantityChange={handleQuantityChange}
          onFavoriteToggle={toggleFavorite}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Product Features */}
      {product.features && product.features.length > 0 && (
        <ProductFeatures product={product} />
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}

      {/* Delivery/Customization Modal */}
      {isCustomizable && (
        <DeliveryCustomizationModal
          isOpen={showDeliveryModal}
          onClose={handleModalClose}
          addToCart={addToCart}
          product={product}
          quantity={quantity}
          onSuccess={handleAddToCartSuccess}
        />
      )}
    </div>
  );
};

// Message Toast Component
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

// Product Images Component
const ProductImages = ({ images, selectedImage, onImageSelect, productTitle }) => (
  <div>
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
      <img
        src={images[selectedImage]}
        alt={productTitle}
        className="h-full w-full object-contain"
        loading="eager"
        onError={(e) => {
          e.target.src = 'https://www.dummyimage.com/500/1d19e8/fff.png';
        }}
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
          >
            <div className="aspect-square w-full bg-gray-50">
              <img
                src={img}
                alt={`${productTitle} - thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://www.dummyimage.com/500.png';
                }}
              />
            </div>
          </button>
        ))}
      </div>
    )}
  </div>
);

// Product Info Component
const ProductInfo = ({
  product,
  quantity,
  isFavorite,
  showMore,
  isCustomizable,
  onShowMoreToggle,
  onQuantityChange,
  onFavoriteToggle,
  onAddToCart,
}) => {
  const discountPercentage = product.price?.discount ? 
    Math.round(((product.price.regular - product.price.discount) / product.price.regular) * 100) : 0;

  const currentPrice = product.price?.discount || product.price?.regular || 0;
  const currency = product.price?.currency || 'USD';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      {product.rating?.average > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 font-semibold">{product.rating.average}</span>
          </div>
          <span className="text-gray-500">({product.rating.totalReviews} reviews)</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-orange-600">
          {currency} {currentPrice}
        </span>
        {product.price?.discount && (
          <>
            <span className="text-lg text-gray-400 line-through">
              {currency} {product.price.regular}
            </span>
            <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">
              {discountPercentage}% OFF
            </span>
          </>
        )}
      </div>

      {isCustomizable && (
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-orange-500" />
            <div>
              <h4 className="text-lg font-bold text-orange-700">
                This Product is Fully Customizable!
              </h4>
              <p className="mt-1 text-sm text-orange-600">
                Personalize this with your preferred options.
              </p>
            </div>
          </div>
        </div>
      )}

      {product.description && (
        <div className="space-y-2">
          <p className={`text-gray-600 ${showMore ? "" : "line-clamp-3"}`}>
            {product.description}
          </p>
          <button
            onClick={onShowMoreToggle}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </div>
      )}

      {product.stock !== undefined && (
        <p className={product.stock > 0 ? "text-sm text-green-600" : "text-sm text-red-600"}>
          {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : "✗ Out of Stock"}
        </p>
      )}

      <div className="flex items-center gap-4">
        <span className="font-medium">Quantity:</span>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onAddToCart}
          className={`flex-1 ${
            isCustomizable
              ? "bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600"
              : "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
          } text-white`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isCustomizable ? "Customize & Add to Cart" : "Add to Cart"}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onFavoriteToggle}
          className="hover:bg-red-50"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>
    </div>
  );
};

// Product Features Component
const ProductFeatures = ({ product }) => (
  <div className="mt-12">
    <h3 className="mb-4 text-xl font-semibold">Features</h3>
    <ul className="grid gap-2 md:grid-cols-2">
      {product.features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <Check className="mt-1 h-4 w-4 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Related Products Component
const RelatedProducts = ({ products }) => (
  <div className="mt-16">
    <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((item) => (
        <ProductCard key={item._id || item.id} product={item} />
      ))}
    </div>
  </div>
);

export default ProductDetails;