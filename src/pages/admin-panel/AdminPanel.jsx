import { AppSidebar } from "@/components/app-sidebar";
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
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPanel;
