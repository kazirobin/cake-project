// src/components/users/product/ProductDetails.jsx
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
  Loader2,
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext/cart-context";
import productService from "./product-service";
import DeliveryCustomizationModal from "@/components/cart/delivery-date-modal/DeliveryDateModal";
import ProductCard from "@/components/product/product-card";
import ReusableBreadcrumb from "@/components/DynamicComponents/ReusableBreadcrumb";

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
  const [needsTruncation, setNeedsTruncation] = useState(false);

  const descriptionRef = useRef(null);

  const product = useMemo(
    () => productService.getProductById(productId),
    [productId],
  );
  const relatedProducts = useMemo(
    () => productService.getRelatedProducts(productId),
    [productId],
  );

  const isCustomizable = useMemo(() => {
    return (
      product?.attributes?.customizable === true ||
      product?.customizable === true
    );
  }, [product]);

  // Extract all images from product data - IMPROVED VERSION WITH DEBUGGING
  const allImages = useMemo(() => {
    if (!product) return ["https://www.dummyimage.com/64/1d19e8/fff.png"];

    const images = [];

    console.log("Full product object:", product); // Debug: See entire product
    console.log("Product images:", product.images); // Debug
    console.log("Product additionalImages:", product.additionalImages); // Debug
    console.log("Product all keys:", Object.keys(product)); // Debug: See all available keys

    // Add primary images from images array
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img.url && !images.includes(img.url)) {
          images.push(img.url);
        }
      });
    }

    // Add additional images - Check different possible key names
    const additionalImagesKey =
      product.additionalImages ||
      product.additional_images ||
      product.extraImages ||
      product.moreImages;

    if (additionalImagesKey && Array.isArray(additionalImagesKey)) {
      additionalImagesKey.forEach((img) => {
        if (img && typeof img === "string" && !images.includes(img)) {
          images.push(img);
        }
      });
    }

    // Also check if images array has objects with url property that are not primary
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img.url && !images.includes(img.url)) {
          images.push(img.url);
        }
      });
    }

    // Remove duplicates
    const uniqueImages = [...new Set(images)];

    console.log("All images loaded:", uniqueImages.length, uniqueImages); // Debug log

    return uniqueImages.length > 0
      ? uniqueImages
      : ["https://www.dummyimage.com/64/1d19e8/fff.png"];
  }, [product]);

  // Get category name from product or categoryId
  const categoryName = useMemo(() => {
    if (product?.category) {
      return product.category;
    } else if (categoryId) {
      return categoryId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return "Categories";
  }, [product, categoryId]);

  // Check if description needs truncation
  useEffect(() => {
    if (product?.description && descriptionRef.current) {
      const checkTruncation = () => {
        const element = descriptionRef.current;
        if (element) {
          const lineHeight = parseInt(getComputedStyle(element).lineHeight);
          const maxHeight = lineHeight * 3;
          const actualHeight = element.scrollHeight;
          setNeedsTruncation(actualHeight > maxHeight);
        }
      };

      setTimeout(checkTruncation, 100);
      window.addEventListener("resize", checkTruncation);
      return () => window.removeEventListener("resize", checkTruncation);
    }
  }, [product?.description]);

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
        image: allImages[selectedImage],
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
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
        <Button
          onClick={() => navigate("/categories")}
          className="mt-6 bg-orange-500"
        >
          Browse Categories
        </Button>
      </div>
    );
  }

  const currentPrice = product.price?.discount || product.price?.regular || 0;
  const currency = product.price?.currency || "$";
  const discountPercentage = product.price?.discount
    ? Math.round(
        ((product.price.regular - product.price.discount) /
          product.price.regular) *
          100,
      )
    : 0;

  const hasImages =
    allImages.length > 0 &&
    allImages[0] !== "https://www.dummyimage.com/64/1d19e8/fff.png";

  return (
    <div className="container mx-auto px-4 py-6">
      {showSuccess && (
        <div className="animate-in slide-in-from-top-2 fixed top-20 right-4 z-50">
          <div className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            <Check className="h-5 w-5" />
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <ReusableBreadcrumb
        items={[
          { path: "/", label: "Home" },
          { path: "/categories", label: "Categories" },
          {
            path: `/categories/${categoryId}`,
            label: categoryName,
          },
          { label: product?.title || "Product" },
        ]}
      />

      {/*main*/}
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/*left */}
        <div className={hasImages ? "flex items-center justify-center" : ""}>
          <div className={hasImages ? "mx-auto w-full max-w-md" : "w-full"}>
            {/* Main Image */}
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={allImages[selectedImage]}
                alt={product.title}
                className="h-full w-full object-contain"
                onError={(e) => {
                  console.log(
                    `Failed to load image: ${allImages[selectedImage]}`,
                  );
                  e.target.src = "https://www.dummyimage.com/64/1d19e8/fff.png";
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="mt-4">
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        console.log(`Switching to image ${i}: ${img}`);
                        setSelectedImage(i);
                      }}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === i
                          ? "border-orange-500 ring-2 ring-orange-200"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <div className="aspect-square w-full">
                        <img
                          src={img}
                          alt={`${product.title} - view ${i + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://www.dummyimage.com/64/1d19e8/fff.png";
                          }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/*right */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {product.rating?.average > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 font-semibold">
                  {product.rating.average}
                </span>
              </div>
              <span className="text-gray-500">
                ({product.rating.totalReviews} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-orange-600">
              {currency}
              {currentPrice.toFixed(2)}
            </span>
            {product.price?.discount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {currency}
                  {product.price.regular}
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
                  <h4 className="font-bold text-orange-700">
                    Fully Customizable!
                  </h4>
                  <p className="text-sm text-orange-600">
                    Personalize with your preferred options.
                  </p>
                </div>
              </div>
            </div>
          )}

          {product.description && (
            <div>
              <p
                ref={descriptionRef}
                className={`text-gray-600 ${showMore ? "" : "line-clamp-3"}`}
              >
                {product.description}
              </p>
              {needsTruncation && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-2 text-orange-500 transition-colors hover:text-orange-600"
                >
                  {showMore ? "Show Less" : "Read More"}
                </button>
              )}
            </div>
          )}

          {product.stock !== undefined && (
            <p
              className={product.stock > 0 ? "text-green-600" : "text-red-600"}
            >
              {product.stock > 0
                ? `✓ In Stock (${product.stock} available)`
                : "✗ Out of Stock"}
            </p>
          )}

          {/* This div will create space and push the quantity and buttons to the bottom */}
          <div className="flex-1" />

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
                  ? "bg-linear-to-r from-purple-500 to-orange-500"
                  : "bg-linear-to-r from-orange-400 to-orange-600"
              } text-white transition-opacity hover:opacity-90`}
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
              className="transition-colors hover:bg-red-50"
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

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
