// cart-item.jsx
import React, { useState } from 'react';
import { Edit2, Trash2, Package, Coffee, Cake, Calendar, MessageSquare, Smartphone, HardDrive, Cpu, Sparkles, Truck } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove, onEdit }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const itemTotal = item.price * item.quantity;
  const isLowStock = item.stock > 0 && item.stock < 10;
  
  // Check if this item has custom values (not default)
  const hasCustomizations = item.customizations && Object.keys(item.customizations).length > 0;
  
  // Check if this is a customizable product type
  const isCustomizableProduct = item.isCustomizable || item.attributes?.customizable === true;
  
  // Get all properties to display
  const getProperties = () => {
    const props = [];
    
    // Size (show for all products that have size)
    if (item.size) {
      props.push({ icon: Package, label: 'Size', value: item.size });
    }
    
    // Flavor (show for bakery products)
    if (item.flavor) {
      props.push({ icon: Coffee, label: 'Flavor', value: item.flavor });
    }
    
    // Cake Type (show for bakery products)
    if (item.cakeType) {
      props.push({ icon: Cake, label: 'Cake Type', value: item.cakeType });
    }
    
    // Delivery Date (show for all products)
    if (item.deliveryDate) {
      const date = new Date(item.deliveryDate);
      props.push({ icon: Calendar, label: 'Delivery', value: date.toLocaleDateString() });
    }
    
    // Message (show if exists)
    if (item.message) {
      props.push({ icon: MessageSquare, label: 'Message', value: item.message, isMessage: true });
    }
    
    // Electronics properties
    if (item.color) {
      props.push({ icon: Smartphone, label: 'Color', value: item.color });
    }
    
    if (item.storage) {
      props.push({ icon: HardDrive, label: 'Storage', value: item.storage });
    }
    
    if (item.ram) {
      props.push({ icon: Cpu, label: 'RAM', value: item.ram });
    }
    
    return props;
  };

  const handleIncrement = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    await onUpdateQuantity(item.id, item.quantity + 1);
    setIsUpdating(false);
  };

  const handleDecrement = async () => {
    if (isUpdating || item.quantity <= 1) return;
    setIsUpdating(true);
    await onUpdateQuantity(item.id, item.quantity - 1);
    setIsUpdating(false);
  };

  const properties = getProperties();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
      {/* Image */}
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-24 h-24 object-cover rounded"
        onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
      />
      
      {/* Details */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            {item.brand && <p className="text-sm text-gray-500">{item.brand}</p>}
            
            {/* Status badges */}
            <div className="flex items-center gap-2 mt-1">
              {hasCustomizations && (
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-purple-600">Customized</span>
                </div>
              )}
              {!hasCustomizations && item.deliveryDate && (
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">Ready to Ship</span>
                </div>
              )}
            </div>
          </div>
          <p className="font-bold text-lg text-orange-600">${itemTotal.toFixed(2)}</p>
        </div>
        
        {/* Properties - Always show if they exist */}
        {properties.length > 0 && (
          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-1">
            {properties.map((prop, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <prop.icon className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-600 dark:text-gray-300">{prop.label}:</span>
                <span className={prop.isMessage ? "italic text-gray-500" : "text-gray-700 dark:text-gray-200"}>
                  {prop.value}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1 || isUpdating}
              className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={isUpdating}
              className="w-8 h-8 border rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
          
          <div className="flex gap-2">
            {isCustomizableProduct && onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="flex items-center gap-1 px-3 py-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
            )}
            <button
              onClick={() => onRemove(item.id)}
              className="flex items-center gap-1 px-3 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Remove</span>
            </button>
          </div>
        </div>
        
        {/* Price Info */}
        <div className="mt-2 text-right">
          <p className="text-xs text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
        </div>
        
        {/* Stock Warning */}
        {isLowStock && (
          <p className="mt-2 text-xs text-orange-600">Only {item.stock} left in stock!</p>
        )}
      </div>
    </div>
  );
};

export default CartItem;