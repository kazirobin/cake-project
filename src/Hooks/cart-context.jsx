import React, { createContext, useContext, useReducer, useEffect } from 'react';
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
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case 'CLEAR_CART':
      return {
        ...initialState,
        items: [],
      };

    case 'LOAD_CART':
      return calculateCartTotals({ ...state, items: action.payload });

    default:
      return state;
  }
};

const calculateCartTotals = (state) => {
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax + state.deliveryCharge;

  return {
    ...state,
    subtotal,
    totalItems,
    tax,
    total,
  };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const savedCart = getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0) {
      setItem('cart', state.items);
    } else {
      localStorage.removeItem('cart');
    }
  }, [state.items]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
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