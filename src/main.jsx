import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./router/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./AuthContext/AuthProvider";
import { CartProvider } from "./Hooks/cart-context";
<<<<<<< HEAD
=======
import { ToastContainer } from "react-toastify";
>>>>>>> e7ff83551320383b76394b829103f133d8746ded

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
<<<<<<< HEAD
=======
          <ToastContainer />
>>>>>>> e7ff83551320383b76394b829103f133d8746ded
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
