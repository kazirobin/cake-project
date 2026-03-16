import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/Hooks/cart-context';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const { id, title, avatar, pricing, rating, stock } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart
    addToCart({
      id,
      title,
      price: pricing.discounted,
      image: avatar,
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
        <Link to={`/categories/product/${id}`}>
          <div className="relative overflow-hidden h-48">
            <img 
              src={avatar} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
              }}
            />
            {pricing.discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                {pricing.discountPercentage}% OFF
              </Badge>
            )}
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
              {title}
            </h3>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {rating.value}
                </span>
              </div>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {rating.count} reviews
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {pricing.currency}{pricing.discounted}
                </span>
                {pricing.original > pricing.discounted && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    {pricing.currency}{pricing.original}
                  </span>
                )}
              </div>
              
              <Button
                onClick={handleAddToCart}
                size="sm"
                disabled={stock === 0}
                className="bg-orange-500 hover:bg-orange-600 text-white relative overflow-hidden group/btn cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              </Button>
            </div>

            {stock < 10 && stock > 0 && (
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

export default ProductCard;