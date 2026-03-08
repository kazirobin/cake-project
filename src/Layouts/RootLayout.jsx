import { Outlet } from "react-router";
import Footer from "@/root/Components/Footer/Footer";
import NavbarWithNavigation from "@/root/Components/NavbarWithNavigation";
import { ThemeProvider } from "@/components/Theme/theme-provider";
<<<<<<< HEAD
import DesktopNavigateContent from "@/root/Components/NavbarWithNavigation/DesktopNavigateContent";
=======
>>>>>>> 667cacc46668ddbfaa30d33bef52ec0fea7611e0

const RootLayout = () => {
  return (
    <ThemeProvider>
<<<<<<< HEAD
      <div className="flex min-h-screen flex-col duration-300">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 w-full">
=======
      <div className="bg-background flex min-h-screen flex-col transition-colors duration-300 dark:bg-slate-950">
        {/* Sticky Header */}
        <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur dark:bg-slate-950/95">
>>>>>>> 667cacc46668ddbfaa30d33bef52ec0fea7611e0
          <NavbarWithNavigation />
        </header>
        <div className="hidden lg:flex">
          <DesktopNavigateContent />
        </div>

        {/* Main content */}
<<<<<<< HEAD
        <main className="container mx-auto flex-1">
=======
        <main className="w-full flex-1 transition-colors duration-300">
>>>>>>> 667cacc46668ddbfaa30d33bef52ec0fea7611e0
          <Outlet />
        </main>

        {/* Footer */}
<<<<<<< HEAD
        <footer>
=======
        <footer className="border-border w-full border-t transition-colors duration-300">
>>>>>>> 667cacc46668ddbfaa30d33bef52ec0fea7611e0
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
