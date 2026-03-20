import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Check, Sparkles, Paintbrush } from 'lucide-react';
import { useCart } from '@/Hooks/cart-context';

const ProductCard = ({ product, categorySlug = 'category' }) => {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  // Safely extract product data with fallbacks
  const productId = product._id || product.id;
  const title = product.title || 'Product';
  const avatar = product.avatar || 
                 (product.images?.find(img => img.isPrimary)?.url) || 
                 (product.images?.[0]?.url) || 
                 'https://via.placeholder.com/300x200?text=Product+Image';
  
  // Handle pricing safely
  const price = product.price || {};
  const regularPrice = price.regular || 0;
  const discountedPrice = price.discount || regularPrice;
  const currency = price.currency || 'USD';
  
  // Calculate discount percentage
  const discountPercentage = price.discount ? 
    Math.round(((regularPrice - discountedPrice) / regularPrice) * 100) : 0;

  // Handle rating safely
  const ratingValue = product.rating?.average || 0;
  const reviewCount = product.rating?.totalReviews || 0;

  // Handle stock safely
  const stock = product.stock !== undefined ? product.stock : 10;

  // Check if product is customizable
  const isCustomizable = product.attributes?.customizable === true || 
                         product.customizable === true ||
                         product.filters?.customizable === true;

  // Get category slug - use prop if provided, otherwise try to get from product
  const finalCategorySlug = categorySlug || 
                            (product.categorySlug) || 
                            'category';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart
    addToCart({
      id: productId,
      title: title,
      price: discountedPrice,
      image: avatar,
      quantity: 1,
    });
    
    // Show popup
    setShowPopup(true);
    
    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <>
      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-20 right-4 z-50 animate-slideDown">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[250px]">
            <div className="bg-white/20 rounded-full p-1">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Added to Cart!</p>
              <p className="text-xs text-white/90 truncate max-w-[180px]">{title}</p>
            </div>
          </div>
        </div>
      )}

      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 relative bg-background">
        <Link to={`/categories/${finalCategorySlug}/product/${productId}`}>
          <div className="relative overflow-hidden h-48">
            <img 
              src={avatar} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
              }}
            />
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                {discountPercentage}% OFF
              </Badge>
            )}
            
           
          </div>
          
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1 flex-1">
                {title}
              </h3>
              {/* Customizable icon indicator on title */}
              {isCustomizable && (
                <Paintbrush className="h-4 w-4 text-purple-500 flex-shrink-0" title="Customizable" />
              )}
            </div>
            
            {ratingValue > 0 && (
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {ratingValue}
                  </span>
                </div>
                {reviewCount > 0 && (
                  <>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'bg-orange-500 hover:bg-orange-600'
                } text-white relative overflow-hidden group/btn cursor-pointer`}
              >
                <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
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

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

// Add animation styles
const styles = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default ProductCard;