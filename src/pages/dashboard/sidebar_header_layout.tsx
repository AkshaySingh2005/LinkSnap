import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebarMenu";
//import { useTheme } from "@/context/theme-provider";
import ModeToggle from "@/components/myComponents/mode-toggle";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Sidebar with content */}
      <div className="relative z-10">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex items-center p-4 border-b">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-2">Dashboard</h1>
              <div className="flex-1 " />
              <Button className="mr-6">
                <Sparkles className="h-6 w-6 text-[#7c3aed]" />
                Upgarde to Pro
              </Button>
              <Avatar className="mr-6">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ModeToggle />
            </div>

            <div className="flex-1">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
