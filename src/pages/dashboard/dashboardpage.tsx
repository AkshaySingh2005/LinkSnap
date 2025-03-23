import SidebarLayout from "./sidebar_layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/theme-provider";
import { BarChart3, Link, Users } from "lucide-react";
import { DateRangePicker } from "./dateRangePicker";
import { useState } from "react";

const DashboardPage = () => {
  const { theme } = useTheme();
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2025, 1, 15), // Feb 15, 2025
    to: new Date(2025, 2, 12), // Mar 12, 2025
  });

  return (
    <div>
      <SidebarLayout>
        <div
          className={
            theme === "dark"
              ? "bg-[#18181a] flex flex-col gap-6 p-6"
              : "bg-[#f9f9fa] flex flex-col gap-6 p-6"
          }
        >
          {/* Header row with Analytics title and DateRangePicker */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={(range) =>
                setDateRange({ from: range.from!, to: range.to! })
              }
              className="mt-0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  Total Links
                </CardTitle>
                <Link className="h-4 w-4 text-[#7c3aed]" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold pb-2">258</div>
                <p className="text-[1rem] text-muted-foreground">
                  +20% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  Total Clicks
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-[#7c3aed]" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold pb-2">12,546</div>
                <p className="text-[1rem] text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-[#7c3aed]" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold pb-2">4,238</div>
                <p className="text-[1rem] text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your recent link activity will appear here.
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default DashboardPage;
