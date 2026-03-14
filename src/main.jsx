import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./router/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./AuthContext/AuthProvider";
import { CartProvider } from "./Hooks/cart-context";
import { ToastContainer } from "react-toastify";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/theme/ThemeProvider";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <ToastContainer />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
