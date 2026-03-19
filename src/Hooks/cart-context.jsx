import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';
import useLocalStorage from './use-local-storage';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  deliveryCharge: 50,
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { payload } = action;
      
      // Ensure price is a number in the payload
      const processedPayload = {
        ...payload,
        price: ensureNumber(payload.price)
      };
      
      // Check if item exists with same customizations (for customizable products)
      const existingItemIndex = state.items.findIndex(item => {
        // For customizable products, check both id and customizations
        if (processedPayload.customizations) {
          return item.id === processedPayload.id && 
                 JSON.stringify(item.customizations) === JSON.stringify(processedPayload.customizations);
        }
        // For regular products, just check id
        return item.id === processedPayload.id;
      });

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Update quantity for existing item
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (processedPayload.quantity || 1) }
            : item
        );
      } else {
        // Add new item with all properties
        updatedItems = [...state.items, { 
          ...processedPayload, 
          quantity: processedPayload.quantity || 1,
          addedAt: new Date().toISOString() // Track when item was added
        }];
      }

      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case 'REMOVE_FROM_CART': {
      const { id, customizations } = action.payload;
      
      // Find item with matching id and customizations
      const updatedItems = state.items.filter(item => {
        if (customizations) {
          // For customizable items, match both id and customizations
          return !(item.id === id && 
                   JSON.stringify(item.customizations) === JSON.stringify(customizations));
        }
        // For regular items, just match id
        return item.id !== id;
      });
      
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity, customizations } = action.payload;
      
      const updatedItems = state.items.map(item => {
        // Check if this is the item to update
        const isMatch = customizations 
          ? item.id === id && JSON.stringify(item.customizations) === JSON.stringify(customizations)
          : item.id === id;
        
        if (isMatch) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      });
      
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case 'CLEAR_CART':
      return {
        ...initialState,
        items: [],
      };

    case 'LOAD_CART': {
      // Ensure all prices in loaded items are numbers
      const loadedItems = (action.payload || []).map(item => ({
        ...item,
        price: ensureNumber(item.price)
      }));
      
      return calculateCartTotals({ 
        ...state, 
        items: loadedItems 
      });
    }

    case 'UPDATE_DELIVERY_CHARGE':
      return calculateCartTotals({ 
        ...state, 
        deliveryCharge: action.payload 
      });

    default:
      return state;
  }
};

// Helper function to ensure price is a number
const ensureNumber = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') return parseFloat(price) || 0;
  if (typeof price === 'object' && price !== null) {
    // Handle price object with discount or regular
    const priceValue = price.discount || price.regular || price.discounted || 0;
    return typeof priceValue === 'string' ? parseFloat(priceValue) || 0 : priceValue || 0;
  }
  return 0;
};

const calculateCartTotals = (state) => {
  const subtotal = state.items.reduce((sum, item) => {
    // Ensure price is a number (should already be, but double-check)
    const price = typeof item.price === 'number' ? item.price : 
                  (typeof item.price === 'string' ? parseFloat(item.price) || 0 : 0);
    return sum + (price * item.quantity);
  }, 0);
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax + state.deliveryCharge;

  return {
    ...state,
    subtotal: Number(subtotal.toFixed(2)),
    totalItems,
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { getItem, setItem } = useLocalStorage();
  const isInitialMount = useRef(true);
  const isLoadingFromStorage = useRef(false);

  // Load cart from localStorage on mount - ONLY ONCE
  useEffect(() => {
    if (isInitialMount.current) {
      isLoadingFromStorage.current = true;
      try {
        const savedCart = getItem('guestCart');
        if (savedCart && Array.isArray(savedCart)) {
          dispatch({ type: 'LOAD_CART', payload: savedCart });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      } finally {
        isLoadingFromStorage.current = false;
        isInitialMount.current = false;
      }
    }
  }, [getItem]); // Only depend on getItem

  // Save cart to localStorage whenever it changes - but skip the initial load
  useEffect(() => {
    // Skip if this is the initial load from storage
    if (isLoadingFromStorage.current || isInitialMount.current) {
      return;
    }
    
    try {
      if (state.items.length > 0) {
        setItem('guestCart', state.items);
      } else {
        localStorage.removeItem('guestCart');
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items, setItem]); // Only depend on state.items and setItem

  // Memoize functions to prevent unnecessary re-renders
  const addToCart = useCallback((product) => {
    // Ensure price is a number
    const price = ensureNumber(product.price);
    
    // Get image URL
    let image = product.image || product.avatar;
    if (!image && product.images) {
      const primaryImage = product.images.find(img => img.isPrimary);
      image = primaryImage?.url || product.images[0]?.url;
    }
    image = image || 'https://via.placeholder.com/100';

    const cartItem = {
      id: product.id || product._id,
      _id: product._id || product.id,
      title: product.title,
      price: price, // Now guaranteed to be a number
      image: image,
      quantity: product.quantity || 1,
      customizations: product.customizations || null,
      type: product.type || 'regular',
      stock: product.stock || 0,
      slug: product.slug,
      // Add any customization fields directly for easy access
      ...(product.customizations || {})
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  }, []); // No dependencies needed

  const removeFromCart = useCallback((itemId, customizations = null) => {
    dispatch({ 
      type: 'REMOVE_FROM_CART', 
      payload: { id: itemId, customizations } 
    });
  }, []); // No dependencies needed

  const updateQuantity = useCallback((itemId, quantity, customizations = null) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: itemId, quantity, customizations } 
    });
  }, []); // No dependencies needed

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []); // No dependencies needed

  const updateDeliveryCharge = useCallback((charge) => {
    dispatch({ type: 'UPDATE_DELIVERY_CHARGE', payload: charge });
  }, []); // No dependencies needed

  // Check if item is in cart
  const isInCart = useCallback((itemId, customizations = null) => {
    return state.items.some(item => {
      if (customizations) {
        return item.id === itemId && 
               JSON.stringify(item.customizations) === JSON.stringify(customizations);
      }
      return item.id === itemId;
    });
  }, [state.items]); // Depends on state.items

  // Get cart item count
  const getItemCount = useCallback(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]); // Depends on state.items

  // Get cart subtotal
  const getSubtotal = useCallback(() => {
    return state.subtotal;
  }, [state.subtotal]); // Depends on state.subtotal

  // Get cart total
  const getTotal = useCallback(() => {
    return state.total;
  }, [state.total]); // Depends on state.total

  // Group items by type (regular vs customizable)
  const getItemsByType = useCallback(() => {
    return {
      regular: state.items.filter(item => !item.customizations),
      customizable: state.items.filter(item => item.customizations)
    };
  }, [state.items]); // Depends on state.items

  // Get items grouped by delivery date (for customizable items)
  const getItemsByDeliveryDate = useCallback(() => {
    const grouped = {};
    state.items.forEach(item => {
      if (item.customizations?.deliveryDate) {
        const date = item.customizations.deliveryDate;
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
      }
    });
    return grouped;
  }, [state.items]); // Depends on state.items

  // Calculate total savings
  const getTotalSavings = useCallback(() => {
    // This would require original price data - implement if needed
    return 0;
  }, []); // No dependencies needed

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateDeliveryCharge,
    isInCart,
    getItemCount,
    getSubtotal,
    getTotal,
    getItemsByType,
    getItemsByDeliveryDate,
    getTotalSavings,
  }), [
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateDeliveryCharge,
    isInCart,
    getItemCount,
    getSubtotal,
    getTotal,
    getItemsByType,
    getItemsByDeliveryDate,
    getTotalSavings,
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};