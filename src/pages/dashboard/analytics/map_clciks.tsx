import { useTheme } from "@/context/theme-provider";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Map JSON data - Try a different source if the current one isn't working
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Define the MapClickData type
type MapClickData = {
  country: string;
  clicks: number;
  coordinates: [number, number];
};

const sampleData: MapClickData[] = [
  { country: "USA", clicks: 34567, coordinates: [-95.7129, 37.0902] },
  { country: "India", clicks: 28945, coordinates: [78.9629, 20.5937] },
  { country: "Brazil", clicks: 16782, coordinates: [-51.9253, -14.235] },
  { country: "United Kingdom", clicks: 12540, coordinates: [-3.436, 55.3781] },
  { country: "Germany", clicks: 10895, coordinates: [10.4515, 51.1657] },
  { country: "Australia", clicks: 9876, coordinates: [133.7751, -25.2744] },
  { country: "Japan", clicks: 8765, coordinates: [138.2529, 36.2048] },
  { country: "Canada", clicks: 7654, coordinates: [-106.3468, 56.1304] },
  { country: "France", clicks: 6543, coordinates: [2.2137, 46.2276] },
  { country: "Mexico", clicks: 5432, coordinates: [-102.5528, 23.6345] },
];

const MapClicks = () => {
  const { theme } = useTheme();
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [position, setPosition] = useState({
    coordinates: [0, 0] as [number, number],
    zoom: 1.2, // Starting with lower zoom
  });

  // Calculate marker sizes based on click count
  const maxClicks = Math.max(...sampleData.map((d) => d.clicks));
  const markerScale = scaleLinear().domain([0, maxClicks]).range([4, 20]);

  // Theme-aware styles
  const mapStyles = {
    default: {
      fill: theme === "dark" ? "#2A2A2E" : "#E4E6EF",
      outline: "none",
    },
    hover: {
      fill: theme === "dark" ? "#3A3A42" : "#D4D6DF",
      outline: "none",
      stroke: theme === "dark" ? "#4A4A52" : "#CCC",
      strokeWidth: 0.5,
    },
    pressed: {
      fill: theme === "dark" ? "#3A3A42" : "#D4D6DF",
      outline: "none",
    },
  };

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 0.2) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  return (
    <div className="h-full">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-lg">Clicks + Scans by locations</CardTitle>
          <div className="absolute top-2 right-2 z-10 flex flex-row gap-2">
            <button
              onClick={handleZoomIn}
              className="bg-background border border-border p-1 rounded-md hover:bg-accent text-sm"
              aria-label="Zoom in"
            >
              ➕
            </button>
            <button
              onClick={handleZoomOut}
              className="bg-background border border-border p-1 rounded-md hover:bg-accent text-sm"
              aria-label="Zoom out"
            >
              ➖
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-grow relative">
          {/* Zoom controls */}

          {/* Tooltip */}
          {tooltipContent && (
            <div className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm text-foreground p-2 rounded shadow-md border text-sm">
              {tooltipContent}
            </div>
          )}

          {/* Map Container */}
          <div className="w-full h-full" style={{ minHeight: "240px" }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 100, // Lower scale for wider view
                center: [0, 10], // Adjusted center to fit better
              }}
              style={{
                width: "100%",
                height: "100%",
                minHeight: "240px",
              }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                maxZoom={4}
                minZoom={0.2} // Allow zooming out further
                onMoveEnd={(pos) => setPosition(pos)}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={mapStyles}
                        onMouseEnter={() => {
                          // Access name properly based on the map data source
                          const name =
                            geo.properties?.name ||
                            geo.properties?.NAME ||
                            "Unknown";
                          setTooltipContent(name);
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Markers for click data */}
                {sampleData.map(({ country, coordinates, clicks }) => (
                  <Marker key={country} coordinates={coordinates}>
                    <circle
                      r={markerScale(clicks) / position.zoom}
                      fill={`${
                        theme === "dark"
                          ? "rgba(124, 58, 237, 0.7)"
                          : "rgba(124, 58, 237, 0.8)"
                      }`}
                      stroke="#7c3aed"
                      strokeWidth={1}
                      onMouseEnter={() => {
                        setTooltipContent(
                          `${country}: ${clicks.toLocaleString()} clicks`
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                    />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          <div className="absolute bottom-1 left-2 text-xs text-muted-foreground">
            Circle size represents click volume
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapClicks;
