// src/layouts/CategoryLayout.jsx
import { Outlet } from "react-router-dom";
import NavbarWithNavigation from "@/root/Components/NavbarWithNavigation";
import Footer from "@/root/Components/Footer/Footer";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import DesktopNavigateContent from "@/root/Components/NavbarWithNavigation/DesktopNavigateContent";

export default function CategoryLayout() {
  return (
    <div>
      <ThemeProvider>
        <div className="sticky top-0 z-50">
          <NavbarWithNavigation />
        </div>
        <div>
          <div className='hidden lg:flex'>

      <DesktopNavigateContent />
      </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col gap-8 lg:flex-row">
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}
