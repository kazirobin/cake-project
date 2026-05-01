// src/layouts/CategoryLayout.jsx
import { Outlet } from "react-router-dom";
import NavbarWithNavigation from "@/components/common/layouts/header/navbar-with-navigation";
import Footer from "@/components/common/layouts/footer/Footer";
import DesktopNavigateContent from "@/components/common/layouts/header/desktop/DesktopNavigateContent";

export default function CategoryLayout() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-8 lg:flex-row">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
