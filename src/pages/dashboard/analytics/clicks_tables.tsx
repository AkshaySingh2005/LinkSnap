import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    ArrowUpDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MapPin,
    Search,
    X,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import { useState, useEffect } from "react";
  
  // Define interfaces/types for better type safety
  interface LocationData {
    id: string;
    country: string;
    clicks: number;
    percentage: number;
  }
  
  interface TableState {
    sorting: "asc" | "desc" | null;
    searchQuery: string;
    filteredData: LocationData[];
    showSerialNumbers: boolean;
    showCountry: boolean;
    showClicks: boolean;
    showPercentage: boolean;
    currentPage: number;
    pageSize: number;
  }
  
  // Expanded sample data with more countries
  const sampleData: LocationData[] = [
    { id: "us", country: "United States", clicks: 34567, percentage: 17.4 },
    { id: "in", country: "India", clicks: 28945, percentage: 14.6 },
    { id: "br", country: "Brazil", clicks: 16782, percentage: 8.5 },
    { id: "gb", country: "United Kingdom", clicks: 12540, percentage: 6.3 },
    { id: "de", country: "Germany", clicks: 10895, percentage: 5.5 },
    { id: "au", country: "Australia", clicks: 9876, percentage: 5.0 },
    { id: "jp", country: "Japan", clicks: 8765, percentage: 4.4 },
    { id: "ca", country: "Canada", clicks: 7654, percentage: 3.9 },
    { id: "fr", country: "France", clicks: 6543, percentage: 3.3 },
    { id: "mx", country: "Mexico", clicks: 5432, percentage: 2.7 },
    { id: "it", country: "Italy", clicks: 4987, percentage: 2.5 },
    { id: "es", country: "Spain", clicks: 4532, percentage: 2.3 },
    { id: "kr", country: "South Korea", clicks: 4321, percentage: 2.2 },
    { id: "ru", country: "Russia", clicks: 3987, percentage: 2.0 },
    { id: "nl", country: "Netherlands", clicks: 3654, percentage: 1.8 },
    { id: "sa", country: "Saudi Arabia", clicks: 3456, percentage: 1.7 },
    { id: "za", country: "South Africa", clicks: 3210, percentage: 1.6 },
    { id: "sg", country: "Singapore", clicks: 2987, percentage: 1.5 },
    { id: "se", country: "Sweden", clicks: 2876, percentage: 1.4 },
    { id: "ch", country: "Switzerland", clicks: 2765, percentage: 1.4 },
    { id: "ar", country: "Argentina", clicks: 2654, percentage: 1.3 },
    { id: "tr", country: "Turkey", clicks: 2543, percentage: 1.3 },
    { id: "id", country: "Indonesia", clicks: 2432, percentage: 1.2 },
    { id: "my", country: "Malaysia", clicks: 2321, percentage: 1.2 },
    { id: "th", country: "Thailand", clicks: 2210, percentage: 1.1 },
    { id: "pl", country: "Poland", clicks: 2109, percentage: 1.1 },
    { id: "ua", country: "Ukraine", clicks: 1987, percentage: 1.0 },
    { id: "ph", country: "Philippines", clicks: 1876, percentage: 0.9 },
    { id: "dk", country: "Denmark", clicks: 1765, percentage: 0.9 },
    { id: "at", country: "Austria", clicks: 1654, percentage: 0.8 },
  ];
  
  // Constants
  const ACCENT_COLOR = "#7c3aed";
  const DEFAULT_PAGE_SIZE = 10;
  
  const ClicksTableLocation = () => {
    // Use the interface for state
    const [tableState, setTableState] = useState<TableState>({
      sorting: "desc",
      searchQuery: "",
      filteredData: sampleData,
      showSerialNumbers: true,
      showCountry: true,
      showClicks: true,
      showPercentage: true,
      currentPage: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  
    const {
      sorting,
      searchQuery,
      filteredData,
      showSerialNumbers,
      showCountry,
      showClicks,
      showPercentage,
      currentPage,
      pageSize,
    } = tableState;
  
    // Apply search filter and sorting
    useEffect(() => {
      let result = [...sampleData];
  
      // Apply search filter
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        result = result.filter((item) =>
          item.country.toLowerCase().includes(lowerQuery)
        );
      }
  
      // Apply sorting
      if (sorting === "asc") {
        result.sort((a, b) => a.clicks - b.clicks);
      } else if (sorting === "desc") {
        result.sort((a, b) => b.clicks - a.clicks);
      }
  
      setTableState((prev) => ({
        ...prev,
        filteredData: result,
        currentPage: 1, // Reset to first page whenever filter changes
      }));
    }, [searchQuery, sorting]);
  
    const pageCount = Math.ceil(filteredData.length / pageSize);
  
    // Calculate the current page data
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);
  
    // Handle sort button click
    const handleSort = () => {
      const newSorting =
        sorting === "desc" ? "asc" : sorting === "asc" ? null : "desc";
      setTableState((prev) => ({ ...prev, sorting: newSorting }));
    };
  
    // Pagination controls
    const goToPage = (page: number) => {
      const safePage = Math.max(1, Math.min(page, pageCount));
      setTableState((prev) => ({ ...prev, currentPage: safePage }));
    };
  
    const goToFirstPage = () => goToPage(1);
    const goToPreviousPage = () => goToPage(currentPage - 1);
    const goToNextPage = () => goToPage(currentPage + 1);
    const goToLastPage = () => goToPage(pageCount);
  
    // Handle page size change
    const handlePageSizeChange = (value: string) => {
      const newSize = parseInt(value);
      setTableState((prev) => ({ 
        ...prev, 
        pageSize: newSize,
        currentPage: 1 // Reset to first page when changing page size
      }));
    };
  
    // Clear search
    const clearSearch = () => {
      setTableState((prev) => ({ ...prev, searchQuery: "" }));
    };
  
    // Column visibility handlers
    const handleColumnVisibilityChange = (
      column: keyof Pick<TableState, "showSerialNumbers" | "showCountry" | "showClicks" | "showPercentage">,
      value: boolean
    ) => {
      setTableState((prev) => ({ ...prev, [column]: value }));
    };
  
    return (
      <Card className="w-full h-full">
        <CardHeader className="px-5 py-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" style={{ color: ACCENT_COLOR }} />
              Clicks by Location
            </CardTitle>
            <CardDescription>
              Geographic distribution of link clicks
            </CardDescription>
          </div>
  
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
  
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={showSerialNumbers}
                onCheckedChange={(checked) => 
                  handleColumnVisibilityChange("showSerialNumbers", checked)
                }
              >
                No.
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showCountry}
                onCheckedChange={(checked) => 
                  handleColumnVisibilityChange("showCountry", checked)
                }
              >
                Country
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showClicks}
                onCheckedChange={(checked) => 
                  handleColumnVisibilityChange("showClicks", checked)
                }
              >
                Clicks
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPercentage}
                onCheckedChange={(checked) => 
                  handleColumnVisibilityChange("showPercentage", checked)
                }
              >
                Percentage
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
  
        <div className="px-5 pb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setTableState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-8 pr-10 h-9"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
  
        <CardContent className="px-0 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                {showSerialNumbers && (
                  <TableHead className="w-[10%] pl-5 text-[#7c3aed]">No.</TableHead>
                )}
                {showCountry && (
                  <TableHead
                    className={`${showSerialNumbers ? "w-[40%]" : "w-[50%] pl-5"} text-[#7c3aed]`}
                  >
                    Country
                  </TableHead>
                )}
                {showClicks && (
                  <TableHead
                    className={`${showSerialNumbers ? "w-[25%]" : "w-[25%]"}`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8 data-[state=open]:bg-accent text-[#7c3aed]"
                      onClick={handleSort}
                    >
                      Clicks
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {showPercentage && (
                  <TableHead
                    className={`text-right ${
                      showSerialNumbers ? "w-[25%]" : "w-[25%]"
                    } pr-5 text-[#7c3aed]`}
                  >
                    %
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((row, index) => (
                  <TableRow key={row.id}>
                    {showSerialNumbers && (
                      <TableCell className="pl-5">
                        {startIndex + index + 1}
                      </TableCell>
                    )}
                    {showCountry && (
                      <TableCell
                        className={`font-medium ${
                          !showSerialNumbers ? "pl-5" : ""
                        }`}
                      >
                        {row.country}
                      </TableCell>
                    )}
                    {showClicks && (
                      <TableCell>{row.clicks.toLocaleString()}</TableCell>
                    )}
                    {showPercentage && (
                      <TableCell className="text-right pr-5">
                        {row.percentage.toFixed(1)}%
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      (showSerialNumbers ? 1 : 0) +
                      (showCountry ? 1 : 0) +
                      (showClicks ? 1 : 0) +
                      (showPercentage ? 1 : 0)
                    }
                    className="h-24 text-center"
                  >
                    No results found for "{searchQuery}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableCaption className="px-5 pb-3 pt-2 text-left">
              {filteredData.length > 0
                ? `Showing ${startIndex + 1}-${endIndex} of ${
                    filteredData.length
                  } countries`
                : "No matching countries found"}
            </TableCaption>
          </Table>
  
          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-5 py-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                {filteredData.length > 0
                  ? `Page ${currentPage} of ${pageCount}`
                  : "0 results"}
              </p>
              {filteredData.length > 0 && (
                <Select
                  value={pageSize.toString()}
                  onValueChange={handlePageSizeChange}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue>{pageSize}</SelectValue>
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[5, 10, 15, 20, 25, 30].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
  
            {filteredData.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goToNextPage}
                  disabled={currentPage === pageCount}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goToLastPage}
                  disabled={currentPage === pageCount}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default ClicksTableLocation;