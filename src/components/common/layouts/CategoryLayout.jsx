// src/layouts/CategoryLayout.jsx
import { Outlet } from "react-router-dom";
import NavbarWithNavigation from "@/components/common/layouts/header/navbar-with-navigation";
import Footer from "@/components/common/layouts/footer/Footer";
import DesktopNavigateContent from "@/components/common/layouts/header/desktop/DesktopNavigateContent";

export default function CategoryLayout() {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur dark:bg-slate-950/95">
          <NavbarWithNavigation />
        </header>
      </div>
      <div>
        <div className="hidden lg:flex">
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
    </div>
  );
}
