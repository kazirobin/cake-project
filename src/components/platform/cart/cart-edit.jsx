// CartEdit.jsx - আপডেটেড ভার্সন
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Package, Coffee, Cake, Calendar, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const CartEdit = ({ isOpen, onClose, item, onUpdate }) => {
  const [customizations, setCustomizations] = useState({
    size: "1kg",
    flavor: "Chocolate",
    cakeType: "Normal",
    deliveryDate: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Helper function to format date to YYYY-MM-DD
  const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString) return "";
    try {
      // If it's already in YYYY-MM-DD format
      if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return dateString;
      }
      // Convert Date object or string to YYYY-MM-DD
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      return "";
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  useEffect(() => {
    if (item) {
      setCustomizations({
        size: item.customizations?.size || item.size || "1kg",
        flavor: item.customizations?.flavor || item.flavor || "Chocolate",
        cakeType: item.customizations?.cakeType || item.cakeType || "Normal",
        deliveryDate: formatDateToYYYYMMDD(item.customizations?.deliveryDate || item.deliveryDate || ""),
        message: item.customizations?.message || item.message || "",
      });
    }
  }, [item]);

  if (!isOpen) return null;
  if (!item) return null;

  const sizeOptions = ["0.5kg", "1kg", "1.5kg", "2kg", "3kg"];
  const flavorOptions = [
    "Chocolate", "Vanilla", "Strawberry", "Red Velvet", 
    "Butterscotch", "Black Forest", "Pineapple", "Mango"
  ];
  const cakeTypeOptions = ["Normal", "Eggless", "Less Cream", "Extra Juicy"];

  const validateForm = () => {
    const newErrors = {};
    if (!customizations.size) newErrors.size = "Please select a size";
    if (!customizations.flavor) newErrors.flavor = "Please select a flavor";
    if (!customizations.cakeType) newErrors.cakeType = "Please select a cake type";
    if (!customizations.deliveryDate) {
      newErrors.deliveryDate = "Please select a delivery date";
    } else {
      const selectedDate = new Date(customizations.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.deliveryDate = "Delivery date cannot be in the past";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsUpdating(true);
    
    try {
      // Calculate new price based on size if needed
      let newPrice = item.price;
      if (customizations.size !== item.size) {
        const basePrice = item.originalPrice || item.price;
        const sizeMultiplier = customizations.size === "1kg" ? 1 : 
                              customizations.size === "1.5kg" ? 1.5 : 
                              customizations.size === "2kg" ? 2 : 
                              customizations.size === "3kg" ? 3 : 1;
        newPrice = basePrice * sizeMultiplier;
      }
      
      const updatedItem = {
        ...item,
        price: newPrice,
        customizations: {
          ...item.customizations,
          size: customizations.size,
          flavor: customizations.flavor,
          cakeType: customizations.cakeType,
          deliveryDate: customizations.deliveryDate,
          message: customizations.message,
        },
        size: customizations.size,
        flavor: customizations.flavor,
        cakeType: customizations.cakeType,
        deliveryDate: customizations.deliveryDate,
        message: customizations.message,
        updatedAt: new Date().toISOString()
      };
      
      await onUpdate(updatedItem);
      toast.success(`${item?.title || "Item"} updated successfully!`);
      onClose();
    } catch (error) {
      toast.error("Failed to update item. Please try again.");
      console.error("Error updating item:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  // Format display date for showing in UI
  const getDisplayDate = (dateString) => {
    if (!dateString) return "Not selected";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl dark:bg-gray-800">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit {item?.title?.split(" ").slice(0, 3).join(" ") || "Item"}
              </h2>
            </div>
            <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] space-y-5 overflow-y-auto p-4">
          {/* Size */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Package className="h-4 w-4" /> Size <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setCustomizations({ ...customizations, size })}
                  className={`rounded-lg border p-2 text-center text-sm transition ${
                    customizations.size === size
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {errors.size && <p className="mt-1 text-xs text-red-500">{errors.size}</p>}
          </div>

          {/* Flavor */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Coffee className="h-4 w-4" /> Flavor <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {flavorOptions.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setCustomizations({ ...customizations, flavor })}
                  className={`rounded-lg border p-2 text-center text-sm transition ${
                    customizations.flavor === flavor
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
            {errors.flavor && <p className="mt-1 text-xs text-red-500">{errors.flavor}</p>}
          </div>

          {/* Cake Type */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Cake className="h-4 w-4" /> Cake Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cakeTypeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => setCustomizations({ ...customizations, cakeType: type })}
                  className={`rounded-lg border p-2 text-center text-sm transition ${
                    customizations.cakeType === type
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.cakeType && <p className="mt-1 text-xs text-red-500">{errors.cakeType}</p>}
          </div>

          {/* Delivery Date */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Calendar className="h-4 w-4" /> Delivery Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={customizations.deliveryDate}
              onChange={(e) => setCustomizations({ ...customizations, deliveryDate: e.target.value })}
              min={getMinDate()}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            {customizations.deliveryDate && (
              <p className="mt-1 text-xs text-green-600">
                Selected: {getDisplayDate(customizations.deliveryDate)}
              </p>
            )}
            {errors.deliveryDate && <p className="mt-1 text-xs text-red-500">{errors.deliveryDate}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <MessageSquare className="h-4 w-4" /> Personal Message
            </label>
            <textarea
              value={customizations.message}
              onChange={(e) => setCustomizations({ ...customizations, message: e.target.value })}
              placeholder="Write your message here..."
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              rows={3}
              maxLength={200}
            />
            <p className="mt-1 text-right text-xs text-gray-500">{customizations.message.length}/200</p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">Cancel</Button>
            <Button 
              onClick={handleUpdate} 
              disabled={isUpdating}
              className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isUpdating ? "Updating..." : "Update Item"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartEdit;