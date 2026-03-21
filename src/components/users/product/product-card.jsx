import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Check, Paintbrush } from "lucide-react";
import { useCart } from "@/Hooks/cart-context";
import DeliveryCustomizationModal from "@/components/users/delivery-date-modal/DeliveryDateModal";

const ProductCard = ({ product, categorySlug = "category" }) => {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Extract product data
  const productId = product._id || product.id;
  const title = product.title || "Product";
  const avatar =
    product.avatar ||
    product.images?.[0]?.url ||
    "https://www.dummyimage.com/300/1d19e8/fff.png";
  const price = product.price || {};
  const regularPrice = price.regular || 0;
  const discountedPrice = price.discount || regularPrice;
  const currency = price.currency || "USD";
  const discountPercentage = price.discount
    ? Math.round(((regularPrice - discountedPrice) / regularPrice) * 100)
    : 0;
  const ratingValue = product.rating?.average || 0;
  const reviewCount = product.rating?.totalReviews || 0;
  const stock = product.stock !== undefined ? product.stock : 10;
  const isCustomizable =
    product.attributes?.customizable === true || 
    product.customizable === true ||
    product.filters?.customizable === true;

  // Format product for modal
  const modalProduct = {
    id: productId,
    title: title,
    avatar: avatar,
    pricing: {
      discounted: discountedPrice,
      currency: currency,
      regular: regularPrice
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCustomizable) {
      // Open customization modal for customizable products
      setShowModal(true);
    } else {
      // Direct add to cart for non-customizable products
      addToCart({
        id: productId,
        title,
        price: discountedPrice,
        image: avatar,
        quantity: 1,
      });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
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
        <div className="fixed top-20 right-4 z-50">
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

      <Card className="group bg-background relative overflow-hidden transition-all duration-300 hover:shadow-xl">
        <Link to={`/categories/${categorySlug}/product/${productId}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={avatar}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) =>
                (e.target.src =
                  "https://www.dummyimage.com/300x200/1d19e8/fff.png")
              }
            />
            {discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          <CardContent className="p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 flex-1 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              {isCustomizable && (
                <Paintbrush
                  className="h-4 w-4 flex-shrink-0 text-purple-500"
                  title="Customizable"
                />
              )}
            </div>

            {ratingValue > 0 && (
              <div className="mb-2 flex items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {ratingValue}
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

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {currency} {discountedPrice}
                </span>
                {price.discount && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    {currency} {regularPrice}
                  </span>
                )}
              </div>
              <Button
                onClick={handleAddToCart}
                size="sm"
                disabled={stock === 0}
                className={`${
                  isCustomizable 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>

            {stock > 0 && stock < 10 && (
              <p className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                Only {stock} left in stock!
              </p>
            )}
            {stock === 0 && (
              <p className="mt-2 text-xs text-red-500">Out of stock</p>
            )}
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default ProductCard;