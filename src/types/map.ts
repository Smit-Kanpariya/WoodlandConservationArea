export type LatLng = [number, number];

export interface RawMapData {
  center: { lat: number; lng: number; zoom: number };
  nearbyThresholdMeters: number;
  talkingTreesMeters: number;
  pollIntervalSeconds: number;
  areas: {
    siteBorder: LatLng[];
    rewildingArea: LatLng[];
    yellowBirchArea: LatLng[];
    wetlandArea: LatLng[];
  };
  pois: Array<{
    id: string;
    type: string;
    name: string;
    hoverText?: string;
    clickText?: string;
    lat: number;
    lng: number;
    audioSrc?: string | null;
  }>;
}

export type MapArea = {
  name: string;
  coordinates: LatLng[];
};

export interface POI {
  id: string;
  name: string;
  type: string;
  position: LatLng;
  icon: string;
  description: string;
  audioSrc?: string | null;
  audioText?: string;
}

export type MapConfig = {
  center: { lat: number; lng: number };
  zoom: number;
  areas: {
    siteBorder: LatLng[];
    rewildingArea: MapArea;
    yellowBirchArea: MapArea;
    wetlandArea: MapArea;
    trailPath: MapArea;
  };
  pois: POI[];
};
