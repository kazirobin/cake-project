import * as React from "react";
import {
  Cake,
  LayoutDashboard,
  Package,
  PackagePlus,
  ShieldUser,
  ShoppingBag,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "UG Cake",
      logo: Cake,
      plan: "Admin Panel",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin-panel",
      icon: LayoutDashboard,
    },
    {
      title: "All Products",
      url: "/admin-panel/all-products",
      icon: Package,
    },
    {
      title: "Add Product",
      url: "/admin-panel/add-product",
      icon: PackagePlus,
    },
    {
      title: "Moderators",
      url: "/admin-panel/moderators",
      icon: ShieldUser,
    },
    {
      title: "Orders",
      url: "/admin-panel/orders",
      icon: ShoppingBag,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
