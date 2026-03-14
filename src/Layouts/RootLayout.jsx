import { Outlet } from "react-router";
import Footer from "@/components/footer/Footer";
import NavbarWithNavigation from "@/components/navbar-with-navigation";
import DesktopNavigateContent from "@/components/navbar-with-navigation/DesktopNavigateContent";
import { ThemeProvider } from "@/components/Theme";

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className="bg-background flex min-h-screen flex-col transition-colors duration-300 dark:bg-slate-950">
        {/* Sticky Header */}
        <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur dark:bg-slate-950/95">
          <NavbarWithNavigation />
        </header>
        <div className="hidden lg:flex">
          <DesktopNavigateContent />
        </div>

        {/* Main content */}
        <main className="w-full flex-1 transition-colors duration-300">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-border w-full border-t transition-colors duration-300">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>

  );
};

export default RootLayout;
