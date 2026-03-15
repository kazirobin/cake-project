import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Calendar, Minus, Plus, ShoppingCart } from "lucide-react";

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
      price: product.pricing.discounted, // you can add dynamic price based on size
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
              {/* Select delivery date */}
             

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

export default DeliveryCustomizationModal;