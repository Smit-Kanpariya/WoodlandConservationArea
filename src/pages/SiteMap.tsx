'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Extend Leaflet types to include tap property
declare module 'leaflet' {
  interface Map {
    tap?: {
      enable: () => void;
      disable: () => void;
      enabled: () => boolean;
    };
  }
}

// Utility functions for feature styling
const getFeatureBackground = (featureType: string): string => {
  switch (featureType.toLowerCase()) {
    case 'trail':
      return 'bg-amber-100 border-amber-300';
    case 'viewpoint':
      return 'bg-blue-100 border-blue-300';
    case 'facility':
      return 'bg-green-100 border-green-300';
    case 'water':
      return 'bg-cyan-100 border-cyan-300';
    default:
      return 'bg-gray-100 border-gray-300';
  }
};

const getFeatureTextColor = (featureType: string): string => {
  switch (featureType.toLowerCase()) {
    case 'trail':
      return 'text-amber-800';
    case 'viewpoint':
      return 'text-blue-800';
    case 'facility':
      return 'text-green-800';
    case 'water':
      return 'text-cyan-800';
    default:
      return 'text-gray-800';
  }
};

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from "@/components/ui/badge";
import { Navigation, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import AudioButton from "@/components/AudioButton";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Map configuration
const mapConfig = {
  center: { lat: 44.6225, lng: -63.920472 },
  zoom: 16,
  areas: {
    // Main site boundary
    siteBorder: [
      [44.6267252, -63.9236383],
      [44.6171265, -63.9075548],
      [44.6159954, -63.9082112],
      [44.6196995, -63.9140457],
      [44.6203791, -63.9140672],
      [44.6206197, -63.9151561],
      [44.6205651, -63.9154160],
      [44.6217831, -63.9173686],
      [44.6219817, -63.9172345],
      [44.6222223, -63.9178805],
      [44.6246191, -63.9215955],
      [44.6253524, -63.9228526],
      [44.6266502, -63.9238271],
      [44.6267252, -63.9236383]
    ],
    // Rewilding area
    rewildingArea: {
      name: "Rewilding Area",
      coordinates: [
        [44.6258752, -63.9221694],
        [44.6253524, -63.9228526],
        [44.6266502, -63.9238271],
        [44.6267252, -63.9236383],
        [44.6258752, -63.9221694]
      ]
    },
    // Yellow Birch area
    yellowBirchArea: {
      name: "Yellow Birch Area",
      coordinates: [
        [44.6247135, -63.9202481],
        [44.6258752, -63.9221694],
        [44.6253524, -63.9228526],
        [44.6241917, -63.9209429],
        [44.6247135, -63.9202481]
      ]
    },
    // Wetland area
    wetlandArea: {
      name: "Wetland Area",
      coordinates: [
        [44.62068196265815, -63.91357210880862],
        [44.62008115188539, -63.91359129291443],
        [44.61978074416757, -63.91255535121347],
        [44.61928916454943, -63.911903091624595],
        [44.61864737378403, -63.91132756845727],
        [44.61822406109886, -63.91100143866255],
        [44.61844254545102, -63.91073286118473],
        [44.61883854624347, -63.91080959760677],
        [44.61898875273391, -63.9107136770789],
        [44.61934378471241, -63.910963070451515],
        [44.61928916454943, -63.91140430487937],
        [44.6195895748107, -63.91182635520195],
        [44.619767089234244, -63.911807171096726],
        [44.61991729332294, -63.91151940951303],
        [44.62012211645387, -63.911576961829894],
        [44.62073658151087, -63.91341863596446],
        [44.62072359289127, -63.91356349564225],
        [44.62068196265815, -63.91357210880862]
      ]
    },
    // Trail path (connecting points in order of the trail)
    trailPath: {
      name: "Nature Trail",
      coordinates: [
        [44.626562, -63.923460],   // trailhead
        [44.626250, -63.923472],   // exercise bar
        [44.626111, -63.922917],   // farmhouse
        [44.626389, -63.923500],   // well1
        [44.625833, -63.922611],   // sitting area
        [44.625528, -63.922000],   // yellow-birch
        [44.625139, -63.921167],   // telephone-2
        [44.624167, -63.919556]    // labyrinth
      ]
    }
  },
  // Points of Interest
  pois: [
    {
      id: "trailhead",
      name: "Trailhead",
      type: "trailhead",
      position: [44.626562, -63.923460],
      icon: '📍',
      description: "Start the 1 km trail here, right behind St. Paul's Church and beside the parking lot.",
      audioSrc: "/audio/trailhead.mp3"
    },
    {
      id: "exercise-bar",
      name: "Exercise Bar",
      type: "exercise",
      position: [44.626250, -63.923472],
      icon: '💪',
      description: "Use this simple bar to stretch or try pull-ups before you head down the trail.",
      audioSrc: null
    },
    {
      id: "farmhouse",
      name: "Farmhouse Foundation",
      type: "historical",
      position: [44.626111, -63.922917],
      icon: '🏠',
      description: "These low stones mark the remains of a small forest cabin that once served a farm family.",
      audioSrc: "/audio/farmhouse.mp3"
    },
    {
      id: "well1",
      name: "Old Historic Well",
      type: "well",
      position: [44.626389, -63.923500],
      icon: '🚰',
      description: "This old well gave water to church neighbors and the few families who lived nearby.",
      audioSrc: "/audio/well1.mp3"
    },
    {
      id: "sitting",
      name: "Sitting Area",
      type: "sitting",
      position: [44.625833, -63.922611],
      icon: '🪑',
      description: "A quiet clearing to rest, listen to the wind, and take in the beauty of nature.",
      audioSrc: "/audio/sitting.mp3"
    },
    {
      id: "telephone-2",
      name: "Second Telephone",
      type: "telephone",
      position: [44.625139, -63.921167],
      icon: '📞',
      description: "This gentle stop offers a wooden phone where visitors can speak to loved ones while feeling close to nature.",
      audioSrc: null
    },
    {
      id: "yellow-birch",
      name: "Coastal Yellow Birch",
      type: "ecosystem",
      position: [44.625528, -63.922000],
      icon: '🌳',
      description: "From here the trail is full of bright yellow birch trees that are easy to spot because of their golden bark.",
      audioSrc: "/audio/yellow-birch.mp3"
    },
    {
      id: "labyrinth",
      name: "Labyrinth",
      type: "feature",
      position: [44.624167, -63.919556],
      icon: '🌀',
      description: "A labyrinth is a winding path you follow to reach the center and find calm.",
      audioSrc: "/audio/labyrinth.mp3"
    },
    {
      id: "yellow-birch",
      name: "Yellow Birch Grove",
      type: "ecosystem",
      position: [44.6225, -63.9195],
      icon: '🌳',
      description: "Ancient yellow birch trees, some over 200 years old",
      audioText: "Yellow Birch Grove. Ancient yellow birch trees, some over 200 years old.",
    },
    {
      id: "wetland1",
      name: "Primary Wetland",
      type: "ecosystem",
      position: [44.6220, -63.9220],
      icon: '💧',
      description: "Main wetland area supporting diverse wildlife",
      audioText: "Primary Wetland. Main wetland area supporting diverse wildlife.",
    },
    {
      id: "sitting-area",
      name: "Sitting Area",
      type: "amenity",
      position: [44.6240, -63.9210],
      icon: '🪑',
      description: "Peaceful rest area with benches",
      audioText: "Sitting Area. Peaceful rest area with benches.",
    },
  ]
};

// Define types for our map configuration
type MapArea = {
  name: string;
  coordinates: [number, number][];
};

interface AudioButtonProps {
  text: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

interface POI {
  id: string;
  name: string;
  type: string;
  position: [number, number];
  icon: string;
  description: string;
  audioSrc?: string | null;
  audioText?: string;
};

type MapConfig = {
  center: { lat: number; lng: number };
  zoom: number;
  areas: {
    siteBorder: [number, number][];
    rewildingArea: MapArea;
    yellowBirchArea: MapArea;
    wetlandArea: MapArea;
    trailPath: MapArea;
  };
  pois: POI[];
};

// Cast our config to the proper type
const typedMapConfig = mapConfig as unknown as MapConfig;

// Component to handle map settings
const MapSettings = () => {
  const map = useMap();
  
  useEffect(() => {
    // Disable all interactions
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.scrollWheelZoom.disable();
    if (map.tap) map.tap.disable();
    
    // Set view to center
    map.setView([typedMapConfig.center.lat, typedMapConfig.center.lng], typedMapConfig.zoom);
  }, [map]);

  return null;
};

const SiteMap = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please ensure location services are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Render area polygons with proper typing
  const renderArea = (area: MapArea, color: string) => (
    <Polygon
      key={area.name}
      positions={area.coordinates}
      pathOptions={{
        color: color,
        weight: 2,
        opacity: 1,
        fillColor: color,
        fillOpacity: 0.2
      }}
    >
      <Tooltip sticky>{area.name}</Tooltip>
    </Polygon>
  );

  // Render the trail path
  const renderTrail = (trail: MapArea) => (
    <Polyline
      key="trail-path"
      positions={trail.coordinates}
      pathOptions={{
        color: '#8B4513',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10'
      }}
    >
      <Tooltip sticky>Nature Trail Path</Tooltip>
    </Polyline>
  );

  const getFeatureColor = (type: string) => {
    switch (type) {
      case "access": return "bg-accent/20 border-accent/70";
      case "historical": return "bg-destructive/20 border-destructive/70";
      case "ecosystem": return "bg-primary/20 border-primary/70";
      case "amenity": return "bg-secondary/20 border-secondary/70";
      default: return "bg-muted/20 border-muted-foreground/70";
    }
  };

  const getFeatureTextColor = (type: string) => {
    switch (type) {
      case "access": return "text-accent-foreground";
      case "historical": return "text-destructive-foreground";
      case "ecosystem": return "text-primary-foreground";
      case "amenity": return "text-secondary-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                Explore Our Conservation Area
              </Badge>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary">Conservation</span> Site Map
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover the various points of interest within our conservation
                area, including trails, historical sites, and natural features
                that make our woodland unique.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          {/* GPS Location Button */}
          <Button
            onClick={getUserLocation}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground mb-8"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Find My Location
          </Button>
        </div>

        {/* Map Legend */}
        <section className="mb-8">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                Map
                <div className="ml-2">
                  <AudioButton 
                    text="Map Legend. Different colored icons represent different types of features on our conservation site." 
                    variant="ghost"
                    className="p-2 h-auto"
                  />
                </div>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-accent/20 rounded-full border border-accent/70 mr-2"></div>
                  <span className="text-sm text-foreground">Access Points</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary/20 rounded-full border border-primary/70 mr-2"></div>
                  <span className="text-sm text-foreground">Ecosystems</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-destructive/20 rounded-full border border-destructive/70 mr-2"></div>
                  <span className="text-sm text-foreground">Historical Sites</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-secondary/20 rounded-full border border-secondary/70 mr-2"></div>
                  <span className="text-sm text-foreground">Amenities</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Map */}
        <section className="mb-12">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[600px] w-full relative">
                <MapContainer
                  center={[mapConfig.center.lat, mapConfig.center.lng]}
                  zoom={mapConfig.zoom}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  dragging={false}
                  doubleClickZoom={false}
                  touchZoom={false}
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <MapSettings />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Site Border */}
                  <Polygon
                    positions={typedMapConfig.areas.siteBorder}
                    pathOptions={{ 
                      color: '#000000',
                      weight: 2,
                      opacity: 1,
                      fillColor: 'var(--primary)',
                      fillOpacity: 0.1
                    }}
                  >
                    <Tooltip sticky>Conservation Area Boundary</Tooltip>
                  </Polygon>
                  
                  {/* Render Areas */}
                  {renderArea(typedMapConfig.areas.rewildingArea, '#4CAF50')}
                  {renderArea(typedMapConfig.areas.yellowBirchArea, '#FFC107')}
                  {renderArea(typedMapConfig.areas.wetlandArea, '#2196F3')}
                  
                  {/* Render Trail */}
                  {renderTrail(typedMapConfig.areas.trailPath)}
                  
                  {/* POI Markers */}
                  {typedMapConfig.pois.map((poi) => (
                    <Marker 
                      key={poi.id}
                      position={poi.position}
                      icon={L.divIcon({
                        html: `<div style="font-size: 24px;">${poi.icon}</div>`,
                        className: 'custom-icon',
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                      })}
                    >
                      <Popup>
                        <div className="text-center">
                          <h3 className="font-bold">{poi.name}</h3>
                          <p className="text-sm">{poi.description}</p>
                          {poi.audioSrc && (
                            <AudioButton 
                              text={poi.audioText || poi.description} 
                              className="mt-2"
                            />
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* POI Markers with selection support */}
                  {typedMapConfig.pois.map((poi) => (
                    <Marker 
                      key={poi.id}
                      position={poi.position}
                      eventHandlers={{
                        click: () => setSelectedFeature(poi.id)
                      }}
                      icon={L.divIcon({
                        html: `<div style="font-size: 24px;">${poi.icon}</div>`,
                        className: 'custom-icon',
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                      })}
                    >
                      <Popup>
                        <div className="text-center">
                          <h3 className="font-bold">{poi.name}</h3>
                          <p className="text-sm">{poi.description}</p>
                          {poi.audioSrc && (
                            <AudioButton 
                              text={poi.audioText || poi.description} 
                              className="mt-2"
                            />
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* User Location Marker */}
                  {userLocation && (
                    <Marker 
                      position={[userLocation.lat, userLocation.lng]}
                      icon={L.divIcon({
                        className: 'user-location-marker',
                        html: '📍',
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32]
                      })}
                    >
                      <Popup>Your Location</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Selected POI Details */}
        {selectedFeature && (
          <section className="mb-12">
            {typedMapConfig.pois
              .filter((poi) => poi.id === selectedFeature)
              .map((poi) => (
                <Card key={poi.id} className="event-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 ${getFeatureBackground(poi.type)} rounded-full flex items-center justify-center border-2 ${getFeatureTextColor(poi.type)} text-xl`}>
                          {poi.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-2xl font-bold text-foreground">
                            {poi.name}
                          </h3>
                          <span className="text-sm text-muted-foreground capitalize">
                            {poi.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {poi.audioSrc && (
                          <AudioButton 
                            text={poi.audioText || poi.description}
                            variant="outline"
                            className="p-2 h-auto"
                          />
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFeature(null)}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {poi.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </section>
        )}

        {/* Map Instructions */}
        <section>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                How to Use This
                <div className="ml-4">
                  <AudioButton 
                    text="How to Use This Map. Click on any colored marker to learn more about that feature. Use the GPS button to find your current location. The map shows all major trails, historical sites, and conservation areas within our property boundaries." 
                    variant="ghost"
                    className="p-2 h-auto bg-white/20 hover:bg-white/30"
                  />
                </div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Interactive Features:</h3>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li>• Click on any marker to learn more about that feature</li>
                    <li>• Use the location button to find your current position</li>
                    <li>• Zoom and pan to explore different areas</li>
                    <li>• View different conservation zones and their boundaries</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Planning Your Visit:</h3>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li>• Start at the trailhead for parking and information</li>
                    <li>• Visit historical sites for educational content</li>
                    <li>• Respect all conservation areas and wildlife habitats</li>
                    <li>• Stay on designated trails</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Visit Us Button */}
          <div className="mt-8 text-center">
            <a 
              href="https://maps.app.goo.gl/hLf36RZKihctRw2f9"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                size="lg" 
                className="gap-2 bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Visit Us
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Get Directions via Google Maps
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

// Add custom CSS for the map
const mapStyles = `
  .leaflet-container {
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  .user-location-marker {
    background: transparent;
    border: none;
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 8px;
    font-family: inherit;
  }
  
  .leaflet-popup-content {
    margin: 12px;
  }
  
  .leaflet-popup-tip {
    background: white;
  }
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = mapStyles;
  document.head.appendChild(styleElement);
}

export default SiteMap;
