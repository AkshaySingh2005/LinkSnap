import React from "react";

declare module "react-simple-maps" {
  interface GeographyProps {
    geography: any;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: (event: React.MouseEvent, geo: any) => void;
    onMouseLeave?: (event: React.MouseEvent, geo: any) => void;
    onClick?: (event: React.MouseEvent, geo: any) => void;
  }

  interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: any[] }) => React.ReactNode;
  }

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  }

  interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    onMoveStart?: (position: any) => void;
    onMove?: (position: any) => void;
    onMoveEnd?: (position: any) => void;
  }

  interface MarkerProps {
    coordinates: [number, number];
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const Marker: React.FC<MarkerProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
}

declare module "d3-scale" {
  export function scaleLinear(): {
    domain: (domain: number[]) => any;
    range: (range: number[]) => any;
  };
}
