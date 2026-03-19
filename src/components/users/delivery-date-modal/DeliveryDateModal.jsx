import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
  const [showAllFlavors, setShowAllFlavors] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate");
  const [cakeType, setCakeType] = useState("Normal");
  const [personalMessage, setPersonalMessage] = useState("");

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
    // Reset state when closing
    setStep(1);
    setSelectedDate(null);
    setShowCustomDates(false);
    setSelectedSize("1lb");
    setShowAllFlavors(false);
    setSelectedFlavor("Chocolate");
    setCakeType("Normal");
    setPersonalMessage("");
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.pricing.discounted,
      image: product.avatar,
      quantity,
      deliveryDate: selectedDate,
      size: selectedSize,
      flavor: selectedFlavor,
      cakeType,
      personalMessage,
    };
    addToCart(cartItem);
    handleCancel();
    alert("Added to cart!");
  };

  const handleAddToCartClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      window.location.href = "/login";
    } else {
      handleAddToCart();
    }
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
                        selectedDate === date ? "border-purple-500 " : ""
                      }`}
                    >
                      <p className="text-sm text-gray-500">
                        {i === 0 ? (
                          <div className="flex justify-center space-x-2">
                            <img
                              src="/icons/calendar.png"
                              width="20px"
                              alt="calendar"
                            />
                            <p className="font-bold">Today</p>
                          </div>
                        ) : (
                          <div className="flex justify-center space-x-2">
                            <img
                              src="/icons/tomorrow.png"
                              width="20px"
                              alt="tomorrow"
                            />
                            <p className="font-bold">Tomorrow</p>
                          </div>
                        )}
                      </p>
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
                    alt="agenda"
                  />
                  <p className="mb-2 font-semibold">Select Delivery Date</p>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {weekDates.map((d) => (
                    <div
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`flex-1 cursor-pointer rounded border p-3 text-center ${
                        selectedDate === d ? "border-purple-500 " : ""
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
                  className="cursor-pointer"
                  onClick={() => setShowCustomDates(!showCustomDates)}
                >
                  <img
                    src="/icons/agenda.png"
                    width="20px"
                    className="mr-1 inline-block"
                    alt="agenda"
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
                <div className="rounded-lg p-3 text-sm text-purple-700">
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
                  <div className="flex justify-between space-y-1 rounded-lg border-2 p-3 text-sm text-purple-700">
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
                        selectedSize === s ? "border-orange-500" : ""
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
                      className={`cursor-pointer rounded-full border-2 p-2 text-center transition-all ${
                        selectedFlavor === f
                          ? "border-orange-500 "
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
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
                        cakeType === t ? "border-orange-500" : ""
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
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 cursor-pointer"
            >
              Back
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 cursor-pointer"
          >
            Cancel
          </Button>
          {step === 1 && (
            <Button
              className="flex-1 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {step === 2 && (
            <Button
              className="cursor-pointer flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white"
              onClick={handleAddToCartClick}
            >
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryCustomizationModal;
