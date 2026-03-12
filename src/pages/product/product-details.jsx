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

/* ---------------- MULTI-STEP DELIVERY + CUSTOMIZATION MODAL ---------------- */

const DeliveryCustomizationModal = ({
  isOpen,
  onClose,
  addToCart,
  product,
  quantity,
}) => {
  const [step, setStep] = useState(1);

  // Delivery selection
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCustomDates, setShowCustomDates] = useState(false);

  // Customization selection
  const [selectedSize, setSelectedSize] = useState("1lb");
  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate");
  const [cakeType, setCakeType] = useState("Normal");
  const [personalMessage, setPersonalMessage] = useState("");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const weekDates = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 2);
    return d.toDateString();
  });

  const sizes = ["1lb", "2lb", "3lb"];
  const flavors = ["Chocolate", "Vanilla", "Butterscotch"];
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
    alert("Added to cart!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[700px] rounded-xl bg-white dark:bg-[#111] shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {step === 1
              ? "Select Delivery Date"
              : "Customize Your Cake"}
          </h2>
          <X className="cursor-pointer" onClick={handleCancel} />
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              {/* Today / Tomorrow */}
              <div className="flex gap-4">
                {[today.toDateString(), tomorrow.toDateString()].map(
                  (date) => (
                    <div
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`cursor-pointer p-4 border rounded w-1/2 text-center ${
                        selectedDate === date
                          ? "border-purple-500 bg-purple-50"
                          : ""
                      }`}
                    >
                      {date}
                    </div>
                  )
                )}
              </div>

              {/* This week */}
              <div>
                <p className="font-semibold mb-2">This Week</p>
                <div className="flex gap-2">
                  {weekDates.map((d) => (
                    <div
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`cursor-pointer p-2 border rounded flex-1 text-center ${
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
              <div>
                <p
                  className="cursor-pointer text-blue-500"
                  onClick={() => setShowCustomDates(!showCustomDates)}
                >
                  Pick another date {showCustomDates ? "▲" : "▼"}
                </p>
                {showCustomDates && (
                  <input
                    type="date"
                    className="border p-2 rounded w-full mt-2"
                    onChange={(e) =>
                      setSelectedDate(e.target.value)
                    }
                  />
                )}
              </div>

              {selectedDate && (
                <div className="p-3 rounded-lg bg-purple-50 text-purple-700 text-sm">
                  Delivery Scheduled for: <b>{selectedDate}</b>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Cake Weight */}
              <div>
                <p className="font-semibold mb-2">How many pounds?</p>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <div
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`cursor-pointer p-4 border rounded flex-1 text-center ${
                        selectedSize === s
                          ? "border-orange-500 bg-orange-50"
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
                <p className="font-semibold mb-2">Choose your flavor</p>
                <div className="flex gap-2">
                  {flavors.map((f) => (
                    <div
                      key={f}
                      onClick={() => setSelectedFlavor(f)}
                      className={`cursor-pointer p-4 border rounded flex-1 text-center ${
                        selectedFlavor === f
                          ? "border-orange-500 bg-orange-50"
                          : ""
                      }`}
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Message */}
              <div>
                <p className="font-semibold mb-2">
                  Add a personal message (optional)
                </p>
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Write your message"
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                />
              </div>

              {/* Cake Type */}
              <div>
                <p className="font-semibold mb-2">Cake Type</p>
                <div className="flex gap-2">
                  {types.map((t) => (
                    <div
                      key={t}
                      onClick={() => setCakeType(t)}
                      className={`cursor-pointer p-4 border rounded flex-1 text-center ${
                        cakeType === t
                          ? "border-orange-500 bg-orange-50"
                          : ""
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
        <div className="flex gap-4 mt-6">
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
              onClick={handleAddToCart}
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
            {product.pricing.currency}{product.pricing.discounted}
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

          <p className={`mt-4 text-gray-600 ${showMore ? "" : "line-clamp-3"}`}>
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
              onClick={() => setIsFavorite(!isFavorite)}
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