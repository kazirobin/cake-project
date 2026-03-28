import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Check } from "lucide-react";
import useCart from "@/Hooks/useCart";
import { toast } from "@/Hooks/useToast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, title, avatar, pricing, rating, stock } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (stock === 0) {
      toast.error("Out of stock!");
      return;
    }

    addToCart({ id, title, price: pricing.discounted, image: avatar });
    toast.success("Added to cart!");
  };

  return (
    <>
      <Card className="group bg-background relative overflow-hidden transition-all duration-300 hover:shadow-xl">
        <Link to={`/categories/product/${id}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={avatar}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Product+Image";
              }}
            />
            {pricing.discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                {pricing.discountPercentage}% OFF
              </Badge>
            )}
          </div>

          <CardContent className="p-4">
            <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>

            <div className="mb-2 flex items-center">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
                  {pricing.currency}
                  {pricing.discounted}
                </span>
                {pricing.original > pricing.discounted && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    {pricing.currency}
                    {pricing.original}
                  </span>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                size="sm"
                disabled={stock === 0}
                className="group/btn relative cursor-pointer overflow-hidden bg-orange-500 text-white hover:bg-orange-600"
              >
                <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
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
