// src/Hooks/cart-context.jsx
import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo, useRef } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  deliveryCharge: 50,
  total: 0,
};

const toNumber = (value) => {
  if (value === undefined || value === null) return 0;
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

const calculateTotals = (items, deliveryCharge) => {
  const subtotal = items.reduce((sum, item) => sum + (toNumber(item.price) * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax + deliveryCharge;

  const result = {
    items,
    subtotal: Number(subtotal.toFixed(2)),
    totalItems,
    tax: Number(tax.toFixed(2)),
    deliveryCharge,
    total: Number(total.toFixed(2)),
  };
  
  console.log('📊 Cart Totals Calculated:', result);
  return result;
};

const cartReducer = (state, action) => {
  console.log('🔄 Reducer Action:', action.type, action.payload);
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action.payload;
      console.log('➕ Adding item to cart:', item);
      
      const existingIndex = state.items.findIndex(i => i.id === item.id);
      console.log('Existing item index:', existingIndex);
      
      let newItems;
      if (existingIndex >= 0) {
        console.log('Item exists, updating quantity');
        newItems = state.items.map((i, idx) =>
          idx === existingIndex 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        console.log('New item, adding to cart');
        newItems = [...state.items, { ...item, quantity: item.quantity || 1 }];
      }
      
      console.log('Updated items array:', newItems);
      const totals = calculateTotals(newItems, state.deliveryCharge);
      return { ...state, ...totals };
    }

    case 'REMOVE_ITEM': {
      const { itemId } = action.payload;
      console.log('🗑️ Removing item with ID:', itemId);
      const newItems = state.items.filter(item => item.id !== itemId);
      console.log('Items after removal:', newItems);
      const totals = calculateTotals(newItems, state.deliveryCharge);
      return { ...state, ...totals };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      console.log('📦 Updating quantity for item:', itemId, 'New quantity:', quantity);
      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      console.log('Items after quantity update:', newItems);
      const totals = calculateTotals(newItems, state.deliveryCharge);
      return { ...state, ...totals };
    }

    case 'UPDATE_ITEM': {
      const { itemId, updates } = action.payload;
      console.log('✏️ Updating item:', itemId, 'Updates:', updates);
      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, ...updates, price: toNumber(updates.price || item.price) } : item
      );
      console.log('Items after update:', newItems);
      const totals = calculateTotals(newItems, state.deliveryCharge);
      return { ...state, ...totals };
    }

    case 'CLEAR_CART': {
      console.log('🧹 Clearing cart');
      const totals = calculateTotals([], state.deliveryCharge);
      return { ...state, ...totals };
    }

    case 'LOAD_CART': {
      console.log('📀 Loading cart from storage:', action.payload);
      const loadedItems = (action.payload || []).map(item => ({
        ...item,
        price: toNumber(item.price)
      }));
      console.log('Loaded items:', loadedItems);
      const totals = calculateTotals(loadedItems, state.deliveryCharge);
      return { ...state, ...totals };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children, productService }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const isInitialLoad = useRef(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    console.log('🚀 CartProvider mounting...');
    try {
      const savedCart = localStorage.getItem('cart');
      console.log('Saved cart from localStorage:', savedCart);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          console.log('📀 Loading saved cart:', parsedCart);
          dispatch({ type: 'LOAD_CART', payload: parsedCart });
        }
      } else {
        console.log('No saved cart found');
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
    isInitialLoad.current = false;
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!isInitialLoad.current) {
      console.log('💾 Saving cart to localStorage...');
      console.log('Current cart items:', state.items);
      try {
        if (state.items.length > 0) {
          localStorage.setItem('cart', JSON.stringify(state.items));
          console.log('✅ Cart saved successfully');
        } else {
          localStorage.removeItem('cart');
          console.log('🗑️ Cart cleared from storage');
        }
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [state.items]);

  const addToCart = useCallback((product, customizations = {}) => {
    console.log('🛒 addToCart called with:', { product, customizations });
    console.log('Product details:', {
      id: product.id || product._id,
      title: product.title,
      price: product.price,
      type: product.type,
      isCustomizable: product.isCustomizable
    });
    
    // Use productService to format product with defaults
    const cartItem = productService?.formatForCart(product, customizations) || {
      id: product.id || product._id,
      title: product.title,
      price: toNumber(product.price),
      image: product.image,
      quantity: 1,
    };
    
    console.log('📦 Formatted cart item:', cartItem);
    console.log('Cart item details:', {
      id: cartItem.id,
      title: cartItem.title,
      price: cartItem.price,
      quantity: cartItem.quantity,
      size: cartItem.size,
      flavor: cartItem.flavor,
      deliveryDate: cartItem.deliveryDate,
      hasCustomizations: !!cartItem.customizations
    });
    
    dispatch({ type: 'ADD_ITEM', payload: { item: cartItem } });
  }, [productService]);

  const removeFromCart = useCallback((itemId) => {
    console.log('❌ removeFromCart called with ID:', itemId);
    if (!itemId) {
      console.warn('No item ID provided to removeFromCart');
      return;
    }
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    console.log('🔄 updateQuantity called:', { itemId, quantity });
    if (!itemId) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  }, []);

  const updateItem = useCallback((itemId, updates) => {
    console.log('✏️ updateItem called:', { itemId, updates });
    if (!itemId) return;
    dispatch({ type: 'UPDATE_ITEM', payload: { itemId, updates } });
  }, []);

  const clearCart = useCallback(() => {
    console.log('🧹 clearCart called');
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback((itemId) => {
    const inCart = state.items.some(item => item.id === itemId);
    console.log(`🔍 Checking if item ${itemId} is in cart:`, inCart);
    return inCart;
  }, [state.items]);

  const contextValue = useMemo(() => {
    console.log('🔄 Cart context value updated');
    return {
      cart: state,
      items: state.items,
      totalItems: state.totalItems,
      subtotal: state.subtotal,
      tax: state.tax,
      deliveryCharge: state.deliveryCharge,
      total: state.total,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateItem,
      clearCart,
      isInCart,
    };
  }, [state, addToCart, removeFromCart, updateQuantity, updateItem, clearCart, isInCart]);

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