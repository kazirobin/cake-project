// src/components/users/product/ProductDetails.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Check, AlertCircle, Minus, Plus, Sparkles, Loader2 } from "lucide-react";
import { useCart } from "@/Hooks/cart-context";
import productService from "./product-service";
import DeliveryCustomizationModal from "@/components/users/delivery-date-modal/DeliveryDateModal";
import  ProductCard  from '@/components/users/product/product-card';

const ProductDetails = () => {
  const { productId, categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = useMemo(() => productService.getProductById(productId), [productId]);
  const relatedProducts = useMemo(() => productService.getRelatedProducts(productId), [productId]);
  
  const isCustomizable = useMemo(() => {
    return product?.attributes?.customizable === true || product?.customizable === true;
  }, [product]);

  const allImages = useMemo(() => {
    if (!product) return [];
    const images = [];
    if (product.images) {
      product.images.forEach(img => {
        if (img.url && !images.includes(img.url)) images.push(img.url);
      });
    }
    if (product.additionalImages) {
      product.additionalImages.forEach(img => {
        if (!images.includes(img)) images.push(img);
      });
    }
    return images.length > 0 ? images : ['https://via.placeholder.com/500'];
  }, [product]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(productId));
  }, [productId]);

  const handleAddToCart = useCallback(async () => {
    if (isCustomizable) {
      setShowDeliveryModal(true);
      return;
    }
    
    setIsAdding(true);
    try {
      addToCart({
        ...product,
        quantity,
        selectedImage: allImages[selectedImage],
        image: allImages[selectedImage]
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  }, [isCustomizable, product, quantity, selectedImage, allImages, addToCart]);

  const toggleFavorite = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = isFavorite
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  }, [isFavorite, productId]);

  if (!product) {
    return (
      <div className="container mx-auto py-16 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="mt-4 text-2xl font-bold">Product Not Found</h2>
        <Button onClick={() => navigate("/categories")} className="mt-6 bg-orange-500">
          Browse Categories
        </Button>
      </div>
    );
  }

  const currentPrice = product.price?.discount || product.price?.regular || 0;
  const currency = product.price?.currency || "$";
  const discountPercentage = product.price?.discount 
    ? Math.round(((product.price.regular - product.price.discount) / product.price.regular) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            <Check className="h-5 w-5" />
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={allImages[selectedImage]}
              alt={product.title}
              className="h-full w-full object-contain"
              onError={(e) => e.target.src = "https://via.placeholder.com/500"}
            />
          </div>
          {allImages.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`overflow-hidden rounded-lg border-2 ${
                    selectedImage === i ? "border-orange-500" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
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
              {currency}{currentPrice.toFixed(2)}
            </span>
            {product.price?.discount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {currency}{product.price.regular}
                </span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {isCustomizable && (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
              <div className="flex gap-3">
                <Sparkles className="h-6 w-6 text-orange-500" />
                <div>
                  <h4 className="font-bold text-orange-700">Fully Customizable!</h4>
                  <p className="text-sm text-orange-600">Personalize with your preferred options.</p>
                </div>
              </div>
            </div>
          )}

          {product.description && (
            <div>
              <p className={`text-gray-600 ${showMore ? "" : "line-clamp-3"}`}>
                {product.description}
              </p>
              <button onClick={() => setShowMore(!showMore)} className="mt-2 text-orange-500">
                {showMore ? "Show Less" : "Read More"}
              </button>
            </div>
          )}

          {product.stock !== undefined && (
            <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : "✗ Out of Stock"}
            </p>
          )}

          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              className={`flex-1 ${
                isCustomizable
                  ? "bg-gradient-to-r from-purple-500 to-orange-500"
                  : "bg-gradient-to-r from-orange-400 to-orange-600"
              } text-white`}
            >
              {isAdding ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className="mr-2 h-4 w-4" />
              )}
              {isCustomizable ? "Customize & Add to Cart" : "Add to Cart"}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFavorite}
              className="hover:bg-red-50"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      {product.features?.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-4 text-xl font-semibold">Features</h3>
          <ul className="grid gap-2 md:grid-cols-2">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-1 h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id || item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {isCustomizable && (
        <DeliveryCustomizationModal
          isOpen={showDeliveryModal}
          onClose={() => setShowDeliveryModal(false)}
          addToCart={addToCart}
          product={product}
          quantity={quantity}
          onSuccess={() => {
            setShowDeliveryModal(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
          }}
        />
      )}
    </div>
  );
};

export default ProductDetails;