import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeliveryCustomizationModal = ({ isOpen, onClose, addToCart, product, quantity, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSize, setSelectedSize] = useState("1 pound");
  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate");
  const [cakeType, setCakeType] = useState("Normal");
  const [personalMessage, setPersonalMessage] = useState("");
  const [showAllFlavors, setShowAllFlavors] = useState(false);
  
  const queryClient = useQueryClient();

  // Calculate available dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const weekDates = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 2);
    return d.toDateString();
  });

  const sizes = ["1 pound", "2 pound", "3 pound"];
  const flavors = ["Chocolate", "Vanilla", "Butterscotch", "Black Forest", "White Forest", "Strawberry", "Red Velvet", "Pineapple", "Mango", "Blueberry", "Coffee", "Caramel", "Orange", "Lemon", "Hazelnut"];
  const types = ["Eggless", "Less Cream", "Extra Juicy"];

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate(null);
      setSelectedSize("1 pound");
      setSelectedFlavor("Chocolate");
      setCakeType("Normal");
      setPersonalMessage("");
      setShowAllFlavors(false);
    }
  }, [isOpen]);

  // Add to cart mutation with React Query
  const addToCartMutation = useMutation({
    mutationFn: async (cartItem) => {
      // Simulate API call if needed
      return cartItem;
    },
    onSuccess: (cartItem) => {
      addToCart(cartItem);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success("🎉 Customized cake added to cart!");
      if (onSuccess) onSuccess();
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to add to cart. Please try again.");
      console.error("Error adding to cart:", error);
    }
  });

  if (!isOpen) return null;

  const resetModal = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedSize("1 pound");
    setSelectedFlavor("Chocolate");
    setCakeType("Normal");
    setPersonalMessage("");
    setShowAllFlavors(false);
    onClose();
  };

  const handleAddToCart = () => {
    // Calculate price based on size
    let price = Number(product.price?.discount || product.price?.regular || 0);
    if (selectedSize === "2 pound") price *= 2;
    if (selectedSize === "3 pound") price *= 3;
    
    const cartItem = {
      // Complete product info
      ...product,
      id: product._id || product.id,
      _id: product._id || product.id,
      title: product.title,
      name: product.title,
      
      // Price info
      price: price,
      regularPrice: product.price?.regular,
      discountPrice: product.price?.discount,
      currency: product.price?.currency || "$",
      
      // Image
      image: product.images?.[0]?.url || product.image || product.avatar,
      
      // Quantity
      quantity: quantity,
      
      // Customization info
      deliveryDate: selectedDate,
      size: selectedSize,
      flavor: selectedFlavor,
      cakeType: cakeType,
      message: personalMessage,
      
      // Customizations object
      customizations: {
        size: selectedSize,
        flavor: selectedFlavor,
        cakeType: cakeType,
        message: personalMessage,
        deliveryDate: selectedDate,
        isCustomized: true
      },
      
      // Metadata
      customizedAt: new Date().toISOString(),
      isCustomized: true,
      isCustomizable: true,
      
      // Stock info
      stock: product.stock,
      
      // Category info
      categoryId: product.categoryId,
      category: product.category,
      type: product.type,
      
      // Specifications
      specifications: product.specifications,
      features: product.features,
      attributes: product.attributes,
      
      // Rating
      rating: product.rating,
    };
    
    addToCartMutation.mutate(cartItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-175 max-h-[90vh] rounded-xl bg-white p-6 shadow-xl dark:bg-[#111] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">{step === 1 ? "Select Delivery Date" : "Customize Your Cake"}</h2>
          <X className="cursor-pointer" onClick={resetModal} />
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              {[today.toDateString(), tomorrow.toDateString()].map((date, i) => (
                <div 
                  key={date} 
                  onClick={() => setSelectedDate(date)} 
                  className={`w-1/2 cursor-pointer rounded border p-4 text-center transition-all ${
                    selectedDate === date ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "hover:border-purple-300"
                  }`}
                >
                  <p className="text-sm text-gray-500 font-bold">{i === 0 ? "Today" : "Tomorrow"}</p>
                  <p className="text-sm">{date}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2 font-semibold">Select Delivery Date</p>
              <div className="grid grid-cols-4 gap-2">
                {weekDates.map(d => (
                  <div 
                    key={d} 
                    onClick={() => setSelectedDate(d)} 
                    className={`cursor-pointer rounded border p-3 text-center transition-all ${
                      selectedDate === d ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "hover:border-purple-300"
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="rounded-lg bg-purple-50 p-3 text-sm text-purple-700 dark:bg-purple-900/20">
                Delivery: <b>{selectedDate}</b>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {selectedDate && (
              <div className="rounded-lg border-2 p-3">
                <p className="font-semibold">{product.title}</p>
                <p>Price: {product?.price?.currency || "$"}{product?.price?.discount || product?.price?.regular}</p>
                <p>Delivery: {selectedDate} | Qty: {quantity}</p>
              </div>
            )}

            <div>
              <p className="mb-2 font-semibold">Size</p>
              <div className="flex gap-2">
                {sizes.map(s => (
                  <div 
                    key={s} 
                    onClick={() => setSelectedSize(s)} 
                    className={`flex-1 cursor-pointer rounded-full border-2 p-2 text-center transition-all ${
                      selectedSize === s ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" : "hover:border-orange-300"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold">Flavor</p>
              <div className="grid grid-cols-4 gap-2">
                {(showAllFlavors ? flavors : flavors.slice(0, 8)).map(f => (
                  <div 
                    key={f} 
                    onClick={() => setSelectedFlavor(f)} 
                    className={`cursor-pointer rounded-full border-2 p-2 text-center transition-all ${
                      selectedFlavor === f ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" : "hover:border-orange-300"
                    }`}
                  >
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
                  <div 
                    key={t} 
                    onClick={() => setCakeType(t)} 
                    className={`flex-1 cursor-pointer rounded-full border-2 p-2 text-center transition-all ${
                      cakeType === t ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" : "hover:border-orange-300"
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold">Personal Message (optional)</p>
              <textarea 
                className="w-full rounded border p-2 focus:border-orange-500 focus:outline-none" 
                rows="2" 
                placeholder="Write your message..." 
                value={personalMessage} 
                onChange={e => setPersonalMessage(e.target.value)}
                maxLength={200}
              />
              <p className="mt-1 text-right text-xs text-gray-500">{personalMessage.length}/200</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          {step === 2 && <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>}
          <Button variant="outline" onClick={resetModal} className="flex-1">Cancel</Button>
          {step === 1 ? (
            <Button 
              onClick={() => selectedDate ? setStep(2) : toast.warning("Please select a delivery date")} 
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleAddToCart} 
              disabled={addToCartMutation.isPending}
              className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white"
            >
              {addToCartMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryCustomizationModal;