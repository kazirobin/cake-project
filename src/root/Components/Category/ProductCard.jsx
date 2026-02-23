// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

const handleAddToCart = (product) => {
  // Add to cart logic
  console.log("Added to cart:", product);
};

export default function ProductCard({ product }) {
  if (!product || !product.cakeDetails) {
    return null;
  }

  const { cakeDetails } = product;
  const { pricing, rating } = cakeDetails;

  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/product/${cakeDetails.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={cakeDetails.avatar}
            alt={cakeDetails.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-4">
          {/* Category Badge */}
          <Badge variant="secondary" className="mb-2">
            {cakeDetails.category}
          </Badge>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 font-semibold">
            {cakeDetails.title}
          </h3>

          {/* Rating */}
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">
                {rating?.value || 0}
              </span>
            </div>
            <span className="text-muted-foreground text-sm">
              ({rating?.count || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {pricing?.currency || "$"}
              {pricing?.discounted?.toFixed(2) || "0.00"}
            </span>
            {pricing?.original && (
              <>
                <span className="text-muted-foreground text-sm line-through">
                  {pricing.currency || "$"}
                  {pricing.original.toFixed(2)}
                </span>
                <Badge variant="destructive" className="ml-auto">
                  {pricing.discountPercentage}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            {cakeDetails.stock > 0 ? (
              <span className="text-sm text-green-600">
                In Stock ({cakeDetails.stock})
              </span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>

          {/* Customizable Badge */}
          {cakeDetails.customizable && (
            <Badge variant="outline" className="mt-2">
              Customizable
            </Badge>
          )}
        </CardContent>
      </Link>

      {/* Quick Add Button */}
      {cakeDetails.stock > 0 && (
        <Button
          size="sm"
          className="absolute right-4 bottom-4 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart(cakeDetails);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      )}
    </Card>
  );
}
