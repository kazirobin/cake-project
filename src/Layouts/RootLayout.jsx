import { Outlet } from "react-router";
import Footer from "@/root/Components/Footer/Footer";
import NavbarWithNavigation from "@/root/Components/NavbarWithNavigation";
import { ThemeProvider } from '@/components/Theme/theme-provider';

const RootLayout = () => {
  return (
    <div className="bg-amber-50">
      <ThemeProvider>
        <div className="container mx-auto">
          <header>
            <NavbarWithNavigation />
           
          </header>
          <main>
            <Outlet />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default RootLayout;
