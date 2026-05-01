import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Paintbrush } from "lucide-react";

const ProductCard = ({ product, categorySlug = "category" }) => {
  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl`}
    >
      <Link to={`/categories/${categorySlug}/product/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) =>
              (e.target.src = "https://www.dummyimage.com/64/1d19e8/fff.png")
            }
          />

          {/* {discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                {discountPercentage}% OFF
              </Badge>
            )} */}

          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge className="bg-red-600 px-3 py-1 text-white">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 flex-1 text-lg font-semibold text-gray-900 dark:text-white">
              {product.title}
            </h3>
            {product.isCustomizable && product.stock > 0 && (
              <Paintbrush
                className="h-4 w-4 shrink-0 text-purple-500"
                title="Customizable"
              />
            )}
          </div>

          {/* {ratingValue > 0 && (
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
            )} */}

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {product.price?.currency} {product.price?.discount?.toFixed(2)}
              </span>
              {product.price?.discount &&
                product.price?.regular > product.price?.discount && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    {product.price?.currency}{" "}
                    {product.price?.regular.toFixed(2)}
                  </span>
                )}
            </div>

            {/* {isCustomizable && !isOutOfStock ? (
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  disabled={isOutOfStock || isAdding}
                  className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {isAdding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
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
              )} */}
          </div>

          {product.stock > 0 && product.stock < 10 && !product.stock === 0 && (
            <p className="mt-2 text-xs text-orange-600 dark:text-orange-400">
              Only {product.stock} left in stock!
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
