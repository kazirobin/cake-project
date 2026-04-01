import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/AuthContext/AuthProvider";
import { CartProvider } from "@/components/cart/CartContext/cart-context";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";

const ProviderWrapper = ({ children }) => {
  const queryClient = new QueryClient();

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
};

export default ProviderWrapper;
