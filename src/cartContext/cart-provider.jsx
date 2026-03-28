import CartContext from "./cart-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 🧠 LocalStorage helpers
const getCartFromStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const CartProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // 🟢 GET CART ITEMS
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartFromStorage,
  });

  // 🟢 ADD TO CART
  const addToCartMutation = useMutation({
    mutationFn: (newItem) => {
      const existingCart = getCartFromStorage();
      const itemExists = existingCart.find((item) => item.id === newItem.id);

      const updatedCart = itemExists
        ? existingCart.map((item) =>
            item.id === newItem.id
              ? {
                  ...item,
                  quantity: (item.quantity || 1) + (newItem.quantity || 1),
                }
              : item,
          )
        : [...existingCart, { ...newItem, quantity: newItem.quantity || 1 }];

      saveCartToStorage(updatedCart);
      return updatedCart;
    },
    onSuccess: (updatedCart) => queryClient.setQueryData(["cart"], updatedCart),
  });

  // 🟢 REMOVE FROM CART
  const removeFromCartMutation = useMutation({
    mutationFn: (id) => {
      const updatedCart = getCartFromStorage().filter((item) => item.id !== id);
      saveCartToStorage(updatedCart);
      return updatedCart;
    },
    onSuccess: (updatedCart) => queryClient.setQueryData(["cart"], updatedCart),
  });

  // 🟢 UPDATE QUANTITY
  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }) => {
      const updatedCart = getCartFromStorage().map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
      saveCartToStorage(updatedCart);
      return updatedCart;
    },
    onSuccess: (updatedCart) => queryClient.setQueryData(["cart"], updatedCart),
  });

  // 🟢 CLEAR CART
  const clearCartMutation = useMutation({
    mutationFn: () => {
      saveCartToStorage([]);
      return [];
    },
    onSuccess: () => queryClient.setQueryData(["cart"], []),
  });

  // 🧠 CALCULATIONS
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const deliveryCharge = subtotal > 0 ? 50 : 0;
  const total = subtotal + tax + deliveryCharge;

  // ✅ FINAL STRUCTURE
  const cart = {
    items,
    totalItems,
    subtotal,
    tax,
    deliveryCharge,
    total,
    isLoading,
  };
  const value = {
    cart,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    clearCart: clearCartMutation.mutate,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
