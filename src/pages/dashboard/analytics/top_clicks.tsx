import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MousePointerClick } from "lucide-react";

const TopClicks = () => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">
            Top performing clicks by date
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[100px]">
          <div className="flex flex-row text-xl font-bold pb-2 pt-2">
            <MousePointerClick className="mr-1" />
            February 28, 2025 : ‎ <span className="text-[#7c3aed]"> 12,546</span>
          </div>
          <p className="text-[1rem] text-muted-foreground">
            +12% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopClicks;
