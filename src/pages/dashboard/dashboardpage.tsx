import SidebarLayout from "./sidebar_header_layout";
import { useTheme } from "@/context/theme-provider";
import { DateRangePicker } from "./dateRangePicker";
import { useState, useEffect } from "react";
import TopClicks from "./analytics/top_clicks";
import DevicePieChart from "./analytics/device_piechart";
import ClicksLineChart from "./analytics/clicks_linechart";
import ReferrerClicks from "./analytics/refer_clicks";
import TopCountryClicks from "./analytics/top_countries_clicks";
import { ChartNoAxesCombined, GripHorizontal } from "lucide-react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MapClicks from "./analytics/map_clciks";
import ClicksTableLocation from "./analytics/clicks_tables";

// Create a responsive grid layout with width provider
const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2025, 1, 15),
    to: new Date(2025, 2, 12),
  });

  // This effect ensures the grid renders properly after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Define layouts for different breakpoints
  const layouts = {
    lg: [
      { i: "topClicks", x: 0, y: 0, w: 2, h: 2.5, static: false },
      { i: "deviceChart", x: 2, y: 0, w: 2, h: 4.9, static: false },
      { i: "lineChart", x: 0, y: 2, w: 2, h: 6.2, static: false },
      { i: "referrerClicks", x: 2, y: 4, w: 2, h: 6, static: false },
      { i: "countryClicks", x: 0, y: 6, w: 2, h: 2.5, static: false },
      { i: "map", x: 0, y: 8, w: 2, h: 6, static: false },
      { i: "table", x: 2, y: 8, w: 2, h: 9.5, static: false },
    ],
    md: [
      { i: "topClicks", x: 0, y: 0, w: 2, h: 2.4, static: false },
      { i: "deviceChart", x: 2, y: 0, w: 2, h: 4.8, static: false },
      { i: "lineChart", x: 0, y: 2, w: 2, h: 5.4, static: false },
      { i: "referrerClicks", x: 2, y: 4, w: 2, h: 5.2, static: false },
      { i: "countryClicks", x: 0, y: 6, w: 2, h: 2.4, static: false },
      { i: "map", x: 0, y: 8, w: 2, h: 5, static: false },
      { i: "table", x: 2, y: 8, w: 2, h: 9.4, static: false },
    ],
    sm: [
      { i: "topClicks", x: 0, y: 0, w: 1, h: 2, static: false },
      { i: "deviceChart", x: 1, y: 0, w: 1, h: 4, static: false },
      { i: "lineChart", x: 0, y: 2, w: 1, h: 4, static: false },
      { i: "referrerClicks", x: 1, y: 4, w: 1, h: 4, static: false },
      { i: "countryClicks", x: 0, y: 6, w: 1, h: 2, static: false },
      { i: "map", x: 1, y: 8, w: 1, h: 3, static: false },
      { i: "table", x: 0, y: 8, w: 1, h: 6, static: false },
    ],
  };

  // Function to save layout changes
  // const handleLayoutChange = (layout, layouts) => {
  //   // Optional: Save layouts to localStorage
  //   localStorage.setItem("dashboard-layouts", JSON.stringify(layouts));
  // };

  // Custom card component with drag handle
  const DraggableCard: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return (
      <Card className="w-full h-full overflow-hidden">
        <CardHeader className="pl-3 pb-1 pt-3 flex flex-row items-center space-y-0 gap-2">
          {/* Drag handle with grip icon */}
          <div className="drag-handle flex items-center cursor-grab active:cursor-grabbing">
            <GripHorizontal className="h-5 w-5 text-[#7c3aed]" />
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0 overflow-auto">{children}</CardContent>
      </Card>
    );
  };

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
            <div className="flex flex-row gap-2 items-center ml-4">
              <h1 className="text-2xl font-bold">Analytics</h1>
              <ChartNoAxesCombined className="text-[#7c3aed]" />
            </div>

            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={(range) =>
                setDateRange({ from: range.from!, to: range.to! })
              }
              className="mt-0"
            />
          </div>

          {/* CSS to style drag handles - Note the important .react-grid-item selector */}
          <style jsx global>{`
            .react-grid-item.react-grid-placeholder {
              background: #7c3aed40 !important;
              border-radius: 0.5rem;
            }

            /* Override default drag handle */
            .react-draggable-dragging {
              z-index: 100;
              box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
                0 8px 10px -6px rgb(0 0 0 / 0.1);
            }
          `}</style>

          {/* React Grid Layout - only render once mounted for proper sizing */}
          {mounted && (
            <ResponsiveGridLayout
              className="layout"
              layouts={layouts}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
              rowHeight={80}
              margin={[16, 16]}
              isDraggable={true}
              isResizable={false} // Disable resizing
              // onLayoutChange={handleLayoutChange}
              draggableHandle=".drag-handle" // Use our custom drag handle
            >
              <div key="topClicks" className="transition-shadow">
                <DraggableCard>
                  <TopClicks />
                </DraggableCard>
              </div>

              <div key="deviceChart">
                <DraggableCard>
                  <DevicePieChart />
                </DraggableCard>
              </div>

              <div key="lineChart">
                <DraggableCard>
                  <ClicksLineChart />
                </DraggableCard>
              </div>

              <div key="referrerClicks">
                <DraggableCard>
                  <ReferrerClicks />
                </DraggableCard>
              </div>

              <div key="countryClicks">
                <DraggableCard>
                  <TopCountryClicks />
                </DraggableCard>
              </div>

              <div key="map">
                <DraggableCard>
                  <MapClicks />
                </DraggableCard>
              </div>

              <div key="table">
                <DraggableCard>
                  <ClicksTableLocation />
                </DraggableCard>
              </div>
            </ResponsiveGridLayout>
          )}
        </div>
      </SidebarLayout>
    </div>
  );
};

export default DashboardPage;
