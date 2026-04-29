// contexts/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],  // This must be an array
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  deliveryCharge: 50,
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }
      
      // Calculate totals
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax + state.deliveryCharge;
      
      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
        tax,
        total
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax + state.deliveryCharge;
      
      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
        tax,
        total
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax + state.deliveryCharge;
      
      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
        tax,
        total
      };
    }
    
    case 'UPDATE_ITEM': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      );
      
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax + state.deliveryCharge;
      
      return {
        ...state,
        items: newItems,
        totalItems,
        subtotal,
        tax,
        total
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        totalItems: 0,
        subtotal: 0,
        tax: 0,
        total: 0
      };
    }
    
    case 'LOAD_CART': {
      const loadedItems = action.payload.items || [];
      
      const totalItems = loadedItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = loadedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax + state.deliveryCharge;
      
      return {
        ...state,
        items: loadedItems,
        totalItems,
        subtotal,
        tax,
        total
      };
    }
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          dispatch({ type: 'LOAD_CART', payload: { items: parsedCart } });
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
      console.log(state.items)
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [state.items]);

  const addToCart = (product) => {
    console.log(product)
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateItem = (id, updates) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart: state,
      items: state.items,  // Make sure items is always an array
      totalItems: state.totalItems,
      subtotal: state.subtotal,
      tax: state.tax,
      deliveryCharge: state.deliveryCharge,
      total: state.total,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};