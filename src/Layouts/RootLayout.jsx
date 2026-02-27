import { Outlet } from "react-router";
import Footer from "@/root/Components/Footer/Footer";
import NavbarWithNavigation from "@/root/Components/NavbarWithNavigation";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import DesktopNavigateContent from "@/root/Components/NavbarWithNavigation/DesktopNavigateContent";

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col duration-300">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 w-full">
          <NavbarWithNavigation />
        </header>
        <div className="hidden lg:flex">
          <DesktopNavigateContent />
        </div>

        {/* Main content */}
        <main className="container mx-auto flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
