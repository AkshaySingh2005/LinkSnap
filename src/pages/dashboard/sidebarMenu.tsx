import {
  BarChart3,
  Calendar,
  Home,
  Link,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav_user";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Links",
    url: "/dashboard/links",
    icon: Link,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Campaigns",
    url: "/dashboard/campaigns",
    icon: Calendar,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: PieChart,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="flex items-center gap-2 px-4 pt-4">
        <Link className="h-6 w-6 text-[#7c3aed]" />
        <span className="font-semibold text-md">LinkSnap</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="text-[#7c3aed]" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Recent Activity</SidebarGroupLabel>
          <SidebarGroupContent className="px-1">
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser
              user={{
                name: "John Doe",
                email: "john.doe@example.com",
                avatar: "path/to/avatar.jpg",
              }}
            />

            {/* <SidebarMenuButton onClick={handleSignOut}>
              <LogOut className="text-[#7c3aed]" />
              <span>Logout</span>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
