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
      
      const processedPayload = {
        ...payload,
        price: ensureNumber(payload.price)
      };
      
      const existingItemIndex = state.items.findIndex(item => {
        if (processedPayload.customizations) {
          return item.id === processedPayload.id && 
                 JSON.stringify(item.customizations) === JSON.stringify(processedPayload.customizations);
        }
        return item.id === processedPayload.id;
      });

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (processedPayload.quantity || 1) }
            : item
        );
      } else {
        updatedItems = [...state.items, { 
          ...processedPayload, 
          quantity: processedPayload.quantity || 1,
          addedAt: new Date().toISOString()
        }];
      }

      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case 'REMOVE_FROM_CART': {
      const { id, customizations } = action.payload;
      
      const updatedItems = state.items.filter(item => {
        if (customizations) {
          return !(item.id === id && 
                   JSON.stringify(item.customizations) === JSON.stringify(customizations));
        }
        return item.id !== id;
      });
      
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity, customizations } = action.payload;
      
      const updatedItems = state.items.map(item => {
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

    case 'UPDATE_ITEM': {
      const { id, customizations, updates } = action.payload;
      
      const updatedItems = state.items.map(item => {
        const isMatch = customizations 
          ? item.id === id && JSON.stringify(item.customizations) === JSON.stringify(customizations)
          : item.id === id;
        
        if (isMatch) {
          return {
            ...item,
            ...updates,
            customizations: {
              ...item.customizations,
              ...(updates.customizations || {})
            },
            price: updates.price !== undefined ? ensureNumber(updates.price) : item.price
          };
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

const ensureNumber = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') return parseFloat(price) || 0;
  if (typeof price === 'object' && price !== null) {
    const priceValue = price.discount || price.regular || price.discounted || 0;
    return typeof priceValue === 'string' ? parseFloat(priceValue) || 0 : priceValue || 0;
  }
  return 0;
};

const calculateCartTotals = (state) => {
  const subtotal = state.items.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 
                  (typeof item.price === 'string' ? parseFloat(item.price) || 0 : 0);
    return sum + (price * item.quantity);
  }, 0);
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.1;
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
  }, [getItem]);

  useEffect(() => {
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
  }, [state.items, setItem]);

  const addToCart = useCallback((product) => {
    const price = ensureNumber(product.price);
    
    let image = product.image || product.avatar;
    if (!image && product.images) {
      const primaryImage = product.images.find(img => img.isPrimary);
      image = primaryImage?.url || product.images[0]?.url;
    }
    image = image || 'https://www.dummyimage.com/100/1d19e8/fff.png';

    const cartItem = {
      id: product.id || product._id,
      _id: product._id || product.id,
      title: product.title,
      price: price,
      image: image,
      quantity: product.quantity || 1,
      customizations: product.customizations || null,
      type: product.type || 'regular',
      stock: product.stock || 0,
      slug: product.slug,
      ...(product.customizations || {})
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  }, []);

  const removeFromCart = useCallback((itemId, customizations = null) => {
    dispatch({ 
      type: 'REMOVE_FROM_CART', 
      payload: { id: itemId, customizations } 
    });
  }, []);

  const updateQuantity = useCallback((itemId, quantity, customizations = null) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: itemId, quantity, customizations } 
    });
  }, []);

  const updateItem = useCallback((itemId, customizations, updates) => {
    dispatch({ 
      type: 'UPDATE_ITEM', 
      payload: { id: itemId, customizations, updates } 
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const updateDeliveryCharge = useCallback((charge) => {
    dispatch({ type: 'UPDATE_DELIVERY_CHARGE', payload: charge });
  }, []);

  const isInCart = useCallback((itemId, customizations = null) => {
    return state.items.some(item => {
      if (customizations) {
        return item.id === itemId && 
               JSON.stringify(item.customizations) === JSON.stringify(customizations);
      }
      return item.id === itemId;
    });
  }, [state.items]);

  const getItemCount = useCallback(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const getSubtotal = useCallback(() => {
    return state.subtotal;
  }, [state.subtotal]);

  const getTotal = useCallback(() => {
    return state.total;
  }, [state.total]);

  const getItemsByType = useCallback(() => {
    return {
      regular: state.items.filter(item => !item.customizations),
      customizable: state.items.filter(item => item.customizations)
    };
  }, [state.items]);

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
  }, [state.items]);

  const contextValue = React.useMemo(() => ({
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItem,
    clearCart,
    updateDeliveryCharge,
    isInCart,
    getItemCount,
    getSubtotal,
    getTotal,
    getItemsByType,
    getItemsByDeliveryDate,
  }), [
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItem,
    clearCart,
    updateDeliveryCharge,
    isInCart,
    getItemCount,
    getSubtotal,
    getTotal,
    getItemsByType,
    getItemsByDeliveryDate,
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