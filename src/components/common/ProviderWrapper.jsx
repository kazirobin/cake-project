import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/common/Theme/ThemeProvider";
import AuthProvider from "@/context/auth/auth-provider";
import { CartProvider } from "@/context/cart/cart-context";
import { Toaster } from "@/components/ui/sonner";
const queryClient = new QueryClient();

function ProviderWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            {children}
            <ToastContainer />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default ProviderWrapper;
