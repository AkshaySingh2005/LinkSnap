import SidebarLayout from "./sidebar_header_layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/theme-provider";
import { BarChart3, Link, Users } from "lucide-react";
import { DateRangePicker } from "./dateRangePicker";
import { useState } from "react";
import TopClicks from "./analytics/top_clicks";
import DevicePieChart from "./analytics/device_piechart";
import ClicksLineChart from "./analytics/clicks_linechart";
import ReferrerClicks from "./analytics/refer_clicks";
import TopCountryClicks from "./analytics/top_countries_clicks";

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

          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-5 md:gap-y-8  md:grid-flow-dense">
            {/* First row bg-red-500 */}
            <div className="rounded-lg shadow-2xl min-h-[150px] md:col-span-2">
              <TopClicks />
            </div>
            {/* bg-yellow-500 */}
            <div className=" rounded-lg shadow-2xl h-[120px] md:col-span-2 md:row-span-2">
              <DevicePieChart />
            </div>
            {/* Second row */}
            {/* bg-orange-500 */}
            <div className="rounded-lg shadow-2xl min-h-[160px] md:col-span-2 md:row-span-2">
              <ClicksLineChart />
            </div>
            {/* bg-teal-500 */}
            <div className=" rounded-lg shadow-2xl min-h-[200px] md:col-span-2 md:row-span-2">
              <ReferrerClicks />
            </div>
            {/* Third row */}
            {/* bg-green-500  */}
            <div className="rounded-lg shadow-xl h-[150px] md:col-span-2 ">
              <TopCountryClicks />
            </div>
            
            {/* Fourth row */}
            <div className="bg-indigo-500 rounded-lg shadow-xl h-[250px] md:col-span-2" />
            <div className="bg-blue-500 rounded-lg shadow-xl h-[600px] md:col-span-2 md:row-span-2" />
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div> */}

          {/* <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your recent link activity will appear here.
              </p>
            </CardContent>
          </Card> */}
        </div>
      </SidebarLayout>
    </div>
  );
};

export default DashboardPage;
