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

import useCart from "@/Hooks/useCart";
import productService from "./product-service";

import ReusableBreadcrumb from "@/components/common/ReusableBreadcrumb";
import categories from "@/data/category.json";
import ProductCard from "@/components/users/product/product-card";
import useAuth from "@/Hooks/useAuth";
import { toast } from "@/Hooks/useToast";

/* ---------------- MULTI-STEP DELIVERY + CUSTOMIZATION MODAL ---------------- */

const DeliveryCustomizationModal = ({
  isOpen,
  onClose,
  addToCart,
  product,
  quantity,
}) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();
  // Delivery selection
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCustomDates, setShowCustomDates] = useState(false);

  // Customization selection
  const [selectedSize, setSelectedSize] = useState("1lb");
  const [showAllFlavors, setShowAllFlavors] = useState(false);

  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate");
  const [cakeType, setCakeType] = useState("Normal");
  const [personalMessage, setPersonalMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const weekDates = Array.from({ length: 8 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 2);
    return d.toDateString();
  });

  const sizes = ["1lb", "2lb", "3lb"];
  const flavors = [
    "Chocolate",
    "Vanilla",
    "Butterscotch",
    "Black Forest",
    "White Forest",
    "Strawberry",
    "Red Velvet",
    "Pineapple",
    "Mango",
    "Blueberry",
    "Coffee",
    "Caramel",
    "Orange",
    "Lemon",
    "Hazelnut",
  ];
  const types = ["Eggless", "Less Cream", "Extra Juicy"];

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !selectedDate) {
      alert("Please select a delivery date");
      return;
    }
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.pricing.discounted, // you can update for dynamic pricing based on size
      image: product.avatar,
      quantity,
      deliveryDate: selectedDate,
      size: selectedSize,
      flavor: selectedFlavor,
      cakeType,
      personalMessage,
    };
    addToCart(cartItem);
    onClose();
    // Show success toast globally
    toast.success("Added to cart!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[700px] rounded-xl bg-white p-6 shadow-xl dark:bg-[#111]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {step === 1 ? "Select Delivery Date" : "Customize Your Cake"}
          </h2>
          <X className="cursor-pointer" onClick={handleCancel} />
        </div>

        <div className="max-h-[500px] space-y-4 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              {/* Today / Tomorrow */}
              {/* Title */}
              <hr />
              <p className="mb-4 font-medium">
                When would you like it delivered?
              </p>
              <div className="flex gap-4">
                {[today.toDateString(), tomorrow.toDateString()].map(
                  (date, i) => (
                    <div
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`w-1/2 cursor-pointer rounded border p-4 text-center ${
                        selectedDate === date
                          ? "border-purple-500 bg-purple-50"
                          : ""
                      }`}
                    >
                      {/* Label */}
                      <div className="text-sm text-gray-500">
                        <div className="flex justify-center space-x-2">
                          <img
                            src={
                              i === 0
                                ? "/icons/calendar.png"
                                : "/icons/tomorrow.png"
                            }
                            width="20px"
                          />
                          <p className="font-bold">
                            {i === 0 ? "Today" : "Tomorrow"}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <p className="text-sm font-semibold">{date}</p>
                    </div>
                  ),
                )}
              </div>

              {/* This week */}
              <div>
                <div className="flex gap-2">
                  <img
                    src="/icons/agenda.png"
                    width="30px"
                    className="mr-1 inline-block"
                  />
                  <p className="mb-2 font-semibold">Select Delivery Date</p>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {weekDates.map((d) => (
                    <div
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`flex-1 cursor-pointer rounded border p-3 text-center ${
                        selectedDate === d
                          ? "border-purple-500 bg-purple-50"
                          : ""
                      }`}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Dates */}
              <div className="mt-4 justify-center rounded-lg border border-dashed border-gray-400 py-2 text-center">
                <p
                  className="cursor-pointer text-blue-500"
                  onClick={() => setShowCustomDates(!showCustomDates)}
                >
                  <img
                    src="/icons/agenda.png"
                    width="20px"
                    className="mr-1 inline-block"
                  />
                  Pick another date {showCustomDates ? "▲" : "▼"}
                </p>
                {showCustomDates && (
                  <input
                    type="date"
                    className="mt-2 w-full rounded border p-2"
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                )}
              </div>

              {selectedDate && (
                <div className="rounded-lg bg-purple-50 p-3 text-sm text-purple-700">
                  Delivery Scheduled for: <b>{selectedDate}</b>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Show selected delivery date and cake name with qty and price at the top */}

              <div>
                {selectedDate && (
                  <div className="flex justify-between space-y-1 rounded-lg border-2 bg-purple-50 p-3 text-sm text-purple-700">
                    <div>
                      <p className="font-semibold text-black">
                        {product.title}
                      </p>
                      <p>
                        Price:{product?.pricing?.currency}
                        {product?.pricing?.discounted}
                      </p>
                      <p>Delivery Scheduled for: {selectedDate}</p>
                    </div>
                    <div>
                      <p>
                        Qty: <b>{quantity}</b>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* Cake Weight */}
              <div>
                <p className="mb-2 font-semibold">How many pounds?</p>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <div
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex-1 cursor-pointer rounded-full border-2 p-2 text-center ${
                        selectedSize === s
                          ? "border-orange-500 bg-orange-200"
                          : ""
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Flavor */}
              <div>
                <p className="mb-2 font-semibold">Choose your flavor</p>
                <hr />
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {(showAllFlavors ? flavors : flavors.slice(0, 8)).map((f) => (
                    <div
                      key={f}
                      onClick={() => setSelectedFlavor(f)}
                      className={`cursor-pointer rounded-full p-2 text-center ${
                        selectedFlavor === f
                          ? "border-orange-500 bg-orange-200"
                          : ""
                      }`}
                    >
                      {f}
                    </div>
                  ))}
                </div>

                {/* Toggle Button */}
                {flavors.length > 6 && (
                  <button
                    onClick={() => setShowAllFlavors(!showAllFlavors)}
                    className="mt-3 rounded-lg border-2 px-3 py-1 text-sm font-medium text-orange-500"
                  >
                    {showAllFlavors
                      ? "Show Less"
                      : `+${flavors.length - 6} more`}
                  </button>
                )}
              </div>

              {/* Personal Message */}
              <div>
                <p className="mb-2 font-semibold">
                  Add a personal message (optional)
                </p>
                <textarea
                  className="w-full rounded border p-2"
                  placeholder="Write your message"
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                />
              </div>

              {/* Cake Type */}
              <div>
                <p className="mb-2 font-semibold">Cake Type</p>
                <div className="flex gap-2">
                  {types.map((t) => (
                    <div
                      key={t}
                      onClick={() => setCakeType(t)}
                      className={`mb-2 flex-1 cursor-pointer rounded-full border-2 p-2 text-center ${
                        cakeType === t ? "border-orange-500 bg-orange-200" : ""
                      }`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex gap-4">
          {step === 2 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          {step === 1 && (
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {step === 2 && (
            <Button
              className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white"
              onClick={() => {
                handleAddToCart();
              }}
            >
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- PRODUCT DETAILS ---------------- */

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  const productData = productService.getFullProductData(productId);
  const product = productData?.cakeDetails;
  const relatedProducts = productService.getRelatedProducts(productId);

  useEffect(() => {
    if (product?.categoryIds?.length > 0) {
      const firstCategoryId = product.categoryIds[0];
      const foundCategory = categories.find(
        (cat) => cat.id === firstCategoryId,
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
          <img src={allImages[selectedImage]} className="rounded-lg" />

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
          <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>

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
                    Personalize this cake with your preferred flavors, shapes,
                    sizes, and icing colors.
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className={`mt-4 text-gray-600 ${showMore ? "" : "line-clamp-3"}`}>
            {product.description}
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-1 text-orange-500"
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
              The price shown is for a single pound cake in base options. The
              final price might change based on the options you choose.
            </p>
          </div>

          {/* QUANTITY */}
          <div className="mt-6 flex items-center gap-3">
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
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

      {/* DELIVERY + CUSTOMIZATION MODAL */}
      <DeliveryCustomizationModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        addToCart={addToCart}
        product={product}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductDetails;
