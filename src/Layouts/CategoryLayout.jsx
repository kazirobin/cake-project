// src/layouts/CategoryLayout.jsx
import { Outlet } from "react-router-dom";
import NavbarWithNavigation from "@/root/Components/NavbarWithNavigation";
import Footer from "@/root/Components/Footer/Footer";
import { ThemeProvider } from "@/components/Theme/theme-provider";

export default function CategoryLayout() {
  return (
    <div>
      <ThemeProvider>
        <div>
          <NavbarWithNavigation />
        </div>
        <div className="container mx-auto px-4 py-8">
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
