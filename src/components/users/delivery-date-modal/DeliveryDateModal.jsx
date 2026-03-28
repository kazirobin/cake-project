import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const DeliveryCustomizationModal = ({ isOpen, onClose, addToCart, product, quantity }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSize, setSelectedSize] = useState("1lb");
  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate");
  const [cakeType, setCakeType] = useState("Normal");
  const [personalMessage, setPersonalMessage] = useState("");
  const [showAllFlavors, setShowAllFlavors] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const weekDates = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 2);
    return d.toDateString();
  });

  const sizes = ["1lb", "2lb", "3lb"];
  const flavors = ["Chocolate", "Vanilla", "Butterscotch", "Black Forest", "White Forest", "Strawberry", "Red Velvet", "Pineapple", "Mango", "Blueberry", "Coffee", "Caramel", "Orange", "Lemon", "Hazelnut"];
  const types = ["Eggless", "Less Cream", "Extra Juicy"];

  if (!isOpen) return null;

  const resetModal = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedSize("1lb");
    setSelectedFlavor("Chocolate");
    setCakeType("Normal");
    setPersonalMessage("");
    setShowAllFlavors(false);
    onClose();
  };

  const handleAddToCart = () => {
    const price = Number(product.pricing?.discounted || product.pricing?.regular || 0);
    
    addToCart({
      id: product.id,
      title: product.title,
      price,
      image: product.avatar,
      quantity,
      deliveryDate: selectedDate,
      size: selectedSize,
      flavor: selectedFlavor,
      cakeType,
      message: personalMessage,
      customizations: { size: selectedSize, flavor: selectedFlavor, cakeType, message: personalMessage, deliveryDate: selectedDate }
    });
    
    resetModal();
    toast.success("🎉 Added to cart!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[700px] max-h-[90vh] rounded-xl bg-white p-6 shadow-xl dark:bg-[#111] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">{step === 1 ? "Select Delivery Date" : "Customize Your Cake"}</h2>
          <X className="cursor-pointer" onClick={resetModal} />
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              {[today.toDateString(), tomorrow.toDateString()].map((date, i) => (
                <div key={date} onClick={() => setSelectedDate(date)} className={`w-1/2 cursor-pointer rounded border p-4 text-center ${selectedDate === date ? "border-purple-500" : ""}`}>
                  <p className="text-sm text-gray-500 font-bold">{i === 0 ? "Today" : "Tomorrow"}</p>
                  <p className="text-sm">{date}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2 font-semibold">Select Delivery Date</p>
              <div className="grid grid-cols-4 gap-2">
                {weekDates.map(d => (
                  <div key={d} onClick={() => setSelectedDate(d)} className={`cursor-pointer rounded border p-3 text-center ${selectedDate === d ? "border-purple-500" : ""}`}>
                    {d}
                  </div>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="rounded-lg p-3 text-sm text-purple-700">
                Delivery: <b>{selectedDate}</b>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {selectedDate && (
              <div className="rounded-lg border-2 p-3">
                <p className="font-semibold">{product.title}</p>
                <p>Price: {product?.pricing?.currency}{product?.pricing?.discounted}</p>
                <p>Delivery: {selectedDate} | Qty: {quantity}</p>
              </div>
            )}

            <div>
              <p className="mb-2 font-semibold">Size</p>
              <div className="flex gap-2">
                {sizes.map(s => (
                  <div key={s} onClick={() => setSelectedSize(s)} className={`flex-1 cursor-pointer rounded-full border-2 p-2 text-center ${selectedSize === s ? "border-orange-500" : ""}`}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold">Flavor</p>
              <div className="grid grid-cols-4 gap-2">
                {(showAllFlavors ? flavors : flavors.slice(0, 8)).map(f => (
                  <div key={f} onClick={() => setSelectedFlavor(f)} className={`cursor-pointer rounded-full border-2 p-2 text-center ${selectedFlavor === f ? "border-orange-500" : ""}`}>
                    {f}
                  </div>
                ))}
              </div>
              {flavors.length > 8 && (
                <button onClick={() => setShowAllFlavors(!showAllFlavors)} className="mt-2 text-orange-500 text-sm">
                  {showAllFlavors ? "Show Less" : `+${flavors.length - 8} more`}
                </button>
              )}
            </div>

            <div>
              <p className="mb-2 font-semibold">Cake Type</p>
              <div className="flex gap-2">
                {types.map(t => (
                  <div key={t} onClick={() => setCakeType(t)} className={`flex-1 cursor-pointer rounded-full border-2 p-2 text-center ${cakeType === t ? "border-orange-500" : ""}`}>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold">Personal Message (optional)</p>
              <textarea className="w-full rounded border p-2" rows="2" placeholder="Write your message..." value={personalMessage} onChange={e => setPersonalMessage(e.target.value)} />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          {step === 2 && <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>}
          <Button variant="outline" onClick={resetModal} className="flex-1">Cancel</Button>
          {step === 1 ? (
            <Button onClick={() => selectedDate ? setStep(2) : alert("Select a date")} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
              Next
            </Button>
          ) : (
            <Button onClick={handleAddToCart} className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryCustomizationModal;