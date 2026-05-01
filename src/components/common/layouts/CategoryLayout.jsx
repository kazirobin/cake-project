// src/layouts/CategoryLayout.jsx
import { Outlet } from "react-router-dom";
<<<<<<< HEAD:src/components/common/layouts/CategoryLayout.jsx
import NavbarWithNavigation from "@/components/common/layouts/header/navbar-with-navigation";
import Footer from "@/components/common/layouts/footer/Footer";
import DesktopNavigateContent from "@/components/common/layouts/header/desktop/DesktopNavigateContent";
=======
>>>>>>> 7ed81a6a461cddbe19db9026c483f04919ab8b1f:src/components/layouts/CategoryLayout.jsx

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
