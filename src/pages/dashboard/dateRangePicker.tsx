import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/context/theme-provider";

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  className?: string;
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  className,
}: DateRangePickerProps) {
  const { theme } = useTheme();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "h-10 px-4 py-2 w-auto min-w-[240px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
              theme === "dark"
                ? "bg-[#242427] hover:bg-[#2a2a2d] border-[#333336]"
                : "bg-white hover:bg-gray-50 border-gray-200"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-[#7c3aed]" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, yyyy")} -{" "}
                  {format(dateRange.to, "LLL dd, yyyy")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "w-auto p-0",
            theme === "dark"
              ? "bg-[#242427] border-[#333336]"
              : "bg-[#f9f9fa] border-gray-200"
          )}
          align="end"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => range && onDateRangeChange(range)}
            numberOfMonths={2}
            className={theme === "dark" ? "bg-[#242427]" : "bg-white"}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
