import { AppSidebar } from "@/components/admin/AppSidebar";
import DyBread from "@/components/common/DyBread";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const AdminPanel = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex w-full flex-col">
        <header className="bg-background sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DyBread />
          </div>
        </header>
        <main className="container mx-auto flex-1 px-4 py-6 lg:translate-x-20">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPanel;
