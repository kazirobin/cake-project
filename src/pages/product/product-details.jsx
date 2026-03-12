import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Check,
  AlertCircle,
  Minus,
  Plus,
  X,
  Calendar,
} from "lucide-react";

import { useCart } from "@/Hooks/cart-context";
import productService from "./product-service";
import ProductCard from "../../root/Components/Product/product-card";
import ReusableBreadcrumb from "@/root/Components/BreadCrumbs/ReusableBreadcrumb";
import categories from "@/data/category.json";

/* ---------------- DELIVERY MODAL ---------------- */

const DeliveryDateModal = ({
  isOpen,
  onClose,
  setDeliveryDate,
  handleAddToCart,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  if (!isOpen) return null;

  const dates = [
    "Mar 11",
    "Mar 12",
    "Mar 13",
    "Mar 14",
    "Mar 15",
    "Mar 16",
    "Mar 17",
    "Mar 18",
  ];

  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  const handleNext = () => {
    if (!selectedDate) {
      alert("Please select a delivery date");
      return;
    }

    setDeliveryDate(selectedDate);
    handleAddToCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[700px] rounded-xl bg-white shadow-xl dark:bg-[#111]">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-semibold">Select Delivery Date</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="p-6">
          <p className="mb-4 font-medium">
            When would you like it delivered?
          </p>

          <div className="grid grid-cols-4 gap-4">
            {dates.map((date, i) => (
              <div
                key={i}
                onClick={() => handleSelect(date)}
                className={`cursor-pointer rounded-lg border p-4 text-center hover:border-purple-500
                ${
                  selectedDate === date
                    ? "border-purple-500 bg-purple-50"
                    : ""
                }`}
              >
                <p className="text-sm font-semibold">{date}</p>
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="mt-5 rounded-lg bg-purple-50 p-3 text-sm text-purple-700">
              Delivery scheduled for: <b>{selectedDate}</b>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-4 border-t p-5">
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            onClick={handleNext}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- PRODUCT DETAILS ---------------- */

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(null);

  const productData = productService.getFullProductData(productId);
  const product = productData?.cakeDetails;
  const relatedProducts = productService.getRelatedProducts(productId);

  useEffect(() => {
    if (product?.categoryIds?.length > 0) {
      const firstCategoryId = product.categoryIds[0];
      const foundCategory = categories.find(
        (cat) => cat.id === firstCategoryId
      );
      setCategoryData(foundCategory || null);
    }
  }, [product]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(parseInt(productId)));
  }, [productId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const id = parseInt(productId);

    let updated;

    if (isFavorite) {
      updated = favorites.filter((item) => item !== id);
    } else {
      updated = [...favorites, id];
      setShowFavoriteMessage(true);
      setTimeout(() => setShowFavoriteMessage(false), 2000);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return (
      <div className="container mx-auto py-16 text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Button
          onClick={() => navigate("/categories")}
          className="mt-6 bg-orange-500 text-white"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.pricing.discounted,
      image: product.avatar,
      quantity,
      deliveryDate,
    });

    setShowDeliveryModal(false);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const allImages = [
    product.avatar,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  const firstCategoryId = product.categoryIds?.[0] || "";

  return (
    <div className="container mx-auto">

      {/* SUCCESS MESSAGE */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white">
          <Check className="h-5 w-5" />
          Added to cart successfully!
        </div>
      )}

      <ReusableBreadcrumb
        items={[
          { path: "/categories", label: "Categories" },
          {
            path: firstCategoryId
              ? `/categories/${categoryData?.slug}`
              : "/categories",
            label: categoryData?.name || "Category",
          },
          { label: product.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">

        {/* IMAGES */}
        <div>
          <img
            src={allImages[selectedImage]}
            className="rounded-lg"
          />

          <div className="mt-4 grid grid-cols-4 gap-2">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(i)}
                className="cursor-pointer rounded-lg border"
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>

          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <p className="text-3xl font-bold text-orange-600">
            {product.pricing.currency}
            {product.pricing.discounted}
          </p>
            {/* customizable badge */}
            {product.customizable && (
  <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-2 dark:border-orange-700 dark:bg-orange-900/20">
    
    <div className="flex items-start gap-3">
      
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-xl dark:bg-orange-800">
        ✨
      </span>

      <div>
        <h4 className="text-lg font-bold text-orange-700 dark:text-orange-400">
          This Cake is Fully Customizable!
        </h4>

        <p className="mt-1 text-sm text-orange-600 dark:text-orange-300">
          Personalize this cake with your preferred flavors, shapes, sizes, and icing colors.
        </p>
      </div>

    </div>

  </div>
)}
          <p
            className={`mt-4 text-gray-600 ${
              showMore ? "" : "line-clamp-3"
            }`}
          >
            {product.description}
          </p>




          <button
            onClick={() => setShowMore(!showMore)}
            className="text-orange-500 mt-1"
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
           
            <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-1 dark:border-orange-700 dark:bg-orange-900/20">
                 <div className="flex justify-between gap-3">
                    <h4>Starting Price:</h4>
                    <p className="flex items-center text-lg font-bold text-gray-900 dark:text-white">
                    {product.pricing.currency}
                    <span className="ml-1">{product.pricing.discounted}</span>
                  </p>
                 </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"> 
                    The price shown is for a single pound cake in base options. The final price might change based on the options you choose.
                  </p>
            </div>



          {/* QUANTITY */}
          <div className="flex items-center gap-3 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus />
            </Button>

            <span>{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus />
            </Button>
          </div>

          {/* ACTION BUTTON */}
          <div className="mt-6 flex gap-4">

            <Button
              onClick={() => setShowDeliveryModal(true)}
              className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Customize & Add to Cart
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "text-red-500 fill-red-500" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">
          You Might Also Like
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

      {/* DELIVERY MODAL */}

      <DeliveryDateModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        setDeliveryDate={setDeliveryDate}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDetails;