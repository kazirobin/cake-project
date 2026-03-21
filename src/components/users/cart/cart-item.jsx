import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Heart, Edit2, Sparkles, Package, Coffee, Cake, Calendar, MessageSquare, Smartphone, HardDrive, Cpu } from "lucide-react";
import CartEdit from "./cart-edit";

const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleWishlist, onUpdateItem }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "$0.00";
    return `$${Number(amount).toFixed(2)}`;
  };

  const safePrice = (price) => {
    if (price === null || price === undefined) return 0;
    if (typeof price === 'number') return price;
    if (typeof price === 'string') return parseFloat(price) || 0;
    return 0;
  };

  const itemPrice = safePrice(item.price);
  const totalPrice = itemPrice * (item.quantity || 1);
  
  // Get value from multiple possible sources
  const getValue = (key) => {
    // Check in order of priority
    return item.customizations?.[key] || 
           item[key] || 
           item.attributes?.[key] || 
           null;
  };

  // Check if ANY property exists (always true for products with properties)
  const hasAnyProperties = () => {
    const propertyKeys = ['size', 'flavor', 'cakeType', 'message', 'deliveryDate', 'color', 'storage', 'ram'];
    return propertyKeys.some(key => {
      const val = getValue(key);
      return val && val !== '' && val !== null && val !== undefined;
    });
  };

  const hasProperties = hasAnyProperties();

  const handleIncrement = () => {
    if (!isUpdating) {
      setIsUpdating(true);
      onUpdateQuantity(item.id, item.quantity + 1, item.customizations);
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1 && !isUpdating) {
      setIsUpdating(true);
      onUpdateQuantity(item.id, item.quantity - 1, item.customizations);
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const handleRemove = () => {
    onRemove(item.id, item.customizations);
  };

  const handleSaveToWishlist = () => {
    onToggleWishlist?.(item);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleUpdateItem = (updatedItem) => {
    if (onUpdateItem) {
      onUpdateItem(updatedItem);
    }
    setShowEditModal(false);
  };

  const productType = item.type || 'bakery';

  // ALWAYS render all properties that exist in the item
  const renderAllProperties = () => {
    const properties = [];
    
    // Get all values
    const size = getValue('size');
    const flavor = getValue('flavor');
    const cakeType = getValue('cakeType');
    const color = getValue('color');
    const storage = getValue('storage');
    const ram = getValue('ram');
    const message = getValue('message');
    const deliveryDate = getValue('deliveryDate');
    
    // Size - show if exists
    if (size) {
      properties.push(
        <p key="size" className="flex items-center gap-1">
          <Package className="h-3 w-3" />
          <span className="font-medium">Size:</span> {size}
        </p>
      );
    }
    
    // Flavor - show if exists
    if (flavor) {
      properties.push(
        <p key="flavor" className="flex items-center gap-1">
          <Coffee className="h-3 w-3" />
          <span className="font-medium">Flavor:</span> {flavor}
        </p>
      );
    }
    
    // Cake Type - show if exists
    if (cakeType) {
      properties.push(
        <p key="cakeType" className="flex items-center gap-1">
          <Cake className="h-3 w-3" />
          <span className="font-medium">Type:</span> {cakeType}
        </p>
      );
    }
    
    // Color - show if exists (electronics)
    if (color) {
      properties.push(
        <p key="color" className="flex items-center gap-1">
          <Smartphone className="h-3 w-3" />
          <span className="font-medium">Color:</span> {color}
        </p>
      );
    }
    
    // Storage - show if exists (electronics)
    if (storage) {
      properties.push(
        <p key="storage" className="flex items-center gap-1">
          <HardDrive className="h-3 w-3" />
          <span className="font-medium">Storage:</span> {storage}
        </p>
      );
    }
    
    // RAM - show if exists (electronics)
    if (ram) {
      properties.push(
        <p key="ram" className="flex items-center gap-1">
          <Cpu className="h-3 w-3" />
          <span className="font-medium">RAM:</span> {ram}
        </p>
      );
    }
    
    // Message - show if exists
    if (message) {
      properties.push(
        <p key="message" className="flex items-start gap-1 italic line-clamp-1">
          <MessageSquare className="mt-0.5 h-3 w-3 flex-shrink-0" />
          <span>"{message}"</span>
        </p>
      );
    }
    
    // Delivery Date - show if exists
    if (deliveryDate) {
      const formattedDate = new Date(deliveryDate).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
      properties.push(
        <p key="deliveryDate" className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          📅 Delivery: {formattedDate}
        </p>
      );
    }
    
    return properties;
  };

  const propertyList = renderAllProperties();

  return (
    <>
      <CartEdit isOpen={showEditModal} onClose={() => setShowEditModal(false)} item={item} onUpdate={handleUpdateItem} />

      <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800">
        <div className="p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            {/* Image */}
            <div className="relative h-32 w-full sm:h-24 sm:w-24 flex-shrink-0">
              <img
                src={item.image || 'https://www.dummyimage.com/96x96/1d19e8/fff.png'}
                alt={item.title || 'Product'}
                className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => e.target.src = "https://www.dummyimage.com/96x96/1d19e8/fff.png"}
              />
              {/* Show badge if ANY properties exist */}
              {propertyList.length > 0 && (
                <div className="absolute -top-1 -right-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 shadow-lg">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                    {item.title || 'Product'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {productType === 'electronics' ? 'Electronics' : 'Bakery'} • SKU: {item.sku || `PROD-${item.id}`}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:bg-blue-50" onClick={handleEditClick} title="Edit">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={handleRemove} title="Remove">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* ALL Properties Display - ALWAYS SHOWS if properties exist */}
              {propertyList.length > 0 && (
                <div className="mb-2 mt-1 rounded-md bg-gray-50 p-2 dark:bg-gray-700/50">
                  <div className="space-y-1 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                    {propertyList}
                  </div>
                </div>
              )}

              {/* Mobile Price */}
              <div className="mt-2 sm:hidden">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Unit Price:</span>
                  <span className="font-bold text-orange-600">{formatCurrency(itemPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total:</span>
                  <span className="text-lg font-bold text-orange-600">{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="mt-3 space-y-3 sm:mt-4">
                <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                  <span className="text-xs text-gray-600 sm:text-sm">Quantity:</span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button variant="outline" size="icon" onClick={handleDecrement} disabled={item.quantity <= 1 || isUpdating} className="h-7 w-7 border-gray-300 sm:h-8 sm:w-8">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="min-w-[30px] text-center text-sm font-medium">{item.quantity || 1}</span>
                    <Button variant="outline" size="icon" onClick={handleIncrement} disabled={isUpdating} className="h-7 w-7 border-gray-300 sm:h-8 sm:w-8">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-xs text-gray-500 sm:hidden">@ {formatCurrency(itemPrice)}</span>
                </div>

                <div className="hidden sm:flex sm:items-center sm:gap-2">
                  <span className="text-sm text-gray-600">{formatCurrency(itemPrice)} each</span>
                </div>

                <div className="flex gap-2 sm:justify-end">
                  <Button variant="ghost" size="sm" onClick={handleSaveToWishlist} className="flex-1 text-gray-600 hover:text-red-500 sm:flex-none">
                    <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="ml-1 text-xs sm:text-sm">Save for later</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Total */}
            <div className="hidden sm:flex sm:flex-col sm:items-end sm:justify-center">
              <span className="text-xl font-bold text-orange-600">{formatCurrency(totalPrice)}</span>
              <span className="mt-1 text-xs text-gray-500">{formatCurrency(itemPrice)} each</span>
            </div>
          </div>

          {/* Stock Warning */}
          {item.stock && item.stock < 10 && (
            <div className="mt-3 rounded-md bg-orange-50 p-2 dark:bg-orange-900/20">
              <p className="text-xs text-orange-600">⚡ Only {item.stock} left in stock - order soon!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItem;