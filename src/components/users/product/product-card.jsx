import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Check, Paintbrush, Loader2, Sparkles } from "lucide-react";
import { useCart } from "@/Hooks/cart-context";
import DeliveryCustomizationModal from "@/components/users/delivery-date-modal/DeliveryDateModal";

// Helper function to get default delivery date (3 days from now)
const getDefaultDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
};

// Helper function to get default size
const getDefaultSize = (product) => {
  if (product.type === 'bakery') {
    return product.attributes?.defaultSize || '1kg';
  }
  return 'Standard';
};

// Helper function to get default flavor for bakery
const getDefaultFlavor = (product) => {
  if (product.type === 'bakery') {
    return product.attributes?.defaultFlavor || 'Original';
  }
  return null;
};

const ProductCard = ({ product, categorySlug = "category" }) => {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Extract product data
  const productId = product._id || product.id;
  const title = product.title || "Product";
  
  // Get primary image
  let avatar = product.avatar;
  if (!avatar && product.images) {
    const primaryImage = product.images.find(img => img.isPrimary);
    avatar = primaryImage?.url || product.images[0]?.url;
  }
  avatar = avatar || "https://via.placeholder.com/300";
  
  const price = product.price || {};
  const regularPrice = Number(price.regular) || 0;
  const discountedPrice = Number(price.discount) || regularPrice;
  const currency = price.currency || "$";
  const discountPercentage = price.discount && regularPrice > 0
    ? Math.round(((regularPrice - discountedPrice) / regularPrice) * 100)
    : 0;
  
  const ratingValue = product.rating?.average || 0;
  const reviewCount = product.rating?.totalReviews || 0;
  const stock = product.stock !== undefined ? product.stock : 10;
  const isOutOfStock = stock === 0;
  
  // Check if product is customizable from JSON data
  const isCustomizable =
    product.attributes?.customizable === true || 
    product.customizable === true ||
    product.filters?.customizable === true;

  // Format product for modal with COMPLETE data
  const modalProduct = {
    ...product,
    id: productId,
    title: title,
    avatar: avatar,
    pricing: {
      discounted: discountedPrice,
      currency: currency,
      regular: regularPrice
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) return;
    
    if (isCustomizable) {
      // Open customization modal for customizable products
      setShowModal(true);
    } else {
      // Direct add to cart for non-customizable products
      setIsAdding(true);
      try {
        // Create cart item with complete data including defaults
        const cartItem = {
          // Core identification
          id: productId,
          _id: productId,
          title: title,
          name: title,
          
          // Pricing
          price: discountedPrice,
          regularPrice: regularPrice,
          currency: currency,
          
          // Images
          image: avatar,
          images: product.images || [],
          additionalImages: product.additionalImages || [],
          
          // Product metadata
          type: product.type || "regular",
          categoryId: product.categoryId,
          categorySlug: categorySlug,
          brand: product.brand,
          slug: product.slug,
          
          // Stock
          stock: stock,
          
          // Ratings
          rating: ratingValue,
          reviewCount: reviewCount,
          
          // All product details
          attributes: product.attributes || {},
          specifications: product.specifications || {},
          features: product.features || [],
          description: product.description || "",
          deliveryInfo: product.deliveryInfo || [],
          
          // Quantity
          quantity: 1,
          
          // Default values for non-customizable products
          isCustomizable: false,
          size: getDefaultSize(product),
          flavor: getDefaultFlavor(product),
          cakeType: product.type === 'bakery' ? 'Normal' : null,
          deliveryDate: getDefaultDeliveryDate(),
          message: null,
          
          // For electronics
          color: product.attributes?.defaultColor || null,
          storage: product.attributes?.defaultStorage || null,
          ram: product.attributes?.defaultRam || null,
          
          // Timestamp
          addedAt: new Date().toISOString()
        };
        
        console.log('Adding to cart:', cartItem);
        addToCart(cartItem);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSuccess = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <>
      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex min-w-[250px] items-center gap-3 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg">
            <div className="rounded-full bg-white/20 p-1">
              <Check className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Added to Cart!</p>
              <p className="max-w-[180px] truncate text-xs text-white/90">
                {title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {isCustomizable && (
        <DeliveryCustomizationModal
          isOpen={showModal}
          onClose={handleModalClose}
          addToCart={addToCart}
          product={modalProduct}
          quantity={1}
          onSuccess={handleModalSuccess}
        />
      )}

      <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isCustomizable && !isOutOfStock ? "border-purple-200 dark:border-purple-800" : ""
      }`}>
        <Link to={`/categories/${categorySlug}/product/${productId}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={avatar}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300")
              }
            />
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                {discountPercentage}% OFF
              </Badge>
            )}
            
            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge className="bg-red-600 text-white px-3 py-1">
                  Out of Stock
                </Badge>
              </div>
            )}
            
            {/* Customizable Badge */}
            {isCustomizable && !isOutOfStock && (
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                <Sparkles className="w-3 h-3 mr-1" />
                Customizable
              </Badge>
            )}
          </div>

          <CardContent className="p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 flex-1 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              {isCustomizable && !isOutOfStock && (
                <Paintbrush
                  className="h-4 w-4 flex-shrink-0 text-purple-500"
                  title="Customizable"
                />
              )}
            </div>

            {/* Rating */}
            {ratingValue > 0 && (
              <div className="mb-2 flex items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {ratingValue.toFixed(1)}
                  </span>
                </div>
                {reviewCount > 0 && (
                  <>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Price and Button Section */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {currency} {discountedPrice.toFixed(2)}
                </span>
                {price.discount && regularPrice > discountedPrice && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    {currency} {regularPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Different Button Styles Based on Customizable */}
              {isCustomizable && !isOutOfStock ? (
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  disabled={isOutOfStock || isAdding}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {isAdding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span className="text-xs">Customize</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  disabled={isOutOfStock || isAdding}
                  className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200"
                >
                  {isAdding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {/* Stock Warning */}
            {stock > 0 && stock < 10 && !isOutOfStock && (
              <p className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                Only {stock} left in stock!
              </p>
            )}
            
            {/* Delivery Date Hint for Non-Customizable */}
            {!isCustomizable && !isOutOfStock && (
              <p className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Est. delivery: {getDefaultDeliveryDate()}
              </p>
            )}
            
            {/* Customizable Hint */}
            {isCustomizable && !isOutOfStock && (
              <p className="mt-2 text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Customize size, flavor & more
              </p>
            )}
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default ProductCard;