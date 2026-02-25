import { Outlet } from "react-router";
import Footer from "@/root/Components/Footer/Footer";
import NavbarWithNavigation from "@/root/Components/NavbarWithNavigation";
import { ThemeProvider } from '@/components/Theme/theme-provider';

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-amber-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 w-full bg-amber-50/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm transition-colors duration-300">
          <NavbarWithNavigation />
        </header>

        {/* Main content */}
        <main className="flex-1 transition-colors duration-300 container mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="transition-colors duration-300">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;