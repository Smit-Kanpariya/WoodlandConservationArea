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
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Home, Trees, Droplets, Clock, ChevronRight, Map as MapIcon } from "lucide-react";
import { motion } from "framer-motion";
import AudioButton from "@/components/AudioButton";

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
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Map configuration
const mapConfig = {
  center: { lat: 44.623917, lng: -63.920472 },
  zoom: 17,
  areas: {
    siteBorder: [
      [44.6267252, -63.9236383] as [number, number],
      [44.6171265, -63.9075548] as [number, number],
      [44.6159954, -63.9082112] as [number, number],
      [44.6196995, -63.9140457] as [number, number],
      [44.6203791, -63.9140672] as [number, number],
      [44.6206197, -63.9151561] as [number, number],
      [44.6205651, -63.9154160] as [number, number],
      [44.6217831, -63.9173686] as [number, number],
      [44.6219817, -63.9172345] as [number, number],
      [44.6222223, -63.9178805] as [number, number],
      [44.6246191, -63.9215955] as [number, number],
      [44.6253524, -63.9228526] as [number, number],
      [44.6266502, -63.9238271] as [number, number],
      [44.6267252, -63.9236383] as [number, number]
    ],
    rewildingArea: [
      [44.6258752, -63.9221694] as [number, number],
      [44.6253524, -63.9228526] as [number, number],
      [44.6266502, -63.9238271] as [number, number],
      [44.6267252, -63.9236383] as [number, number],
      [44.6258752, -63.9221694] as [number, number]
    ],
    yellowBirchArea: [
      [44.6247135, -63.9202481] as [number, number],
      [44.6258752, -63.9221694] as [number, number],
      [44.6253524, -63.9228526] as [number, number]
    ]
  },
  features: [
    {
      id: "trailhead",
      name: "Trailhead",
      type: "access",
      position: [44.6245, -63.9200],
      icon: '📍',
      description: "Main entrance and parking area for conservation trails",
      audioText: "Trailhead. Main entrance and parking area for conservation trails.",
    },
    {
      id: "farmhouse",
      name: "Farmhouse Foundation",
      type: "historical",
      position: [44.6235, -63.9210],
      icon: '🏠',
      description: "Archaeological remains of the original 1800s farmhouse",
      audioText: "Farmhouse Foundation. Archaeological remains of the original 1800s farmhouse.",
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
    map.setView([mapConfig.center.lat, mapConfig.center.lng], mapConfig.zoom);
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
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            Interactive Site Map
            <AudioButton
              text="Interactive Site Map. Explore our conservation area with this interactive map showing trails, historical sites, and key ecosystem features. Use the GPS button to find your current location on the map."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            Explore our conservation area with this interactive map showing
            trails, historical sites, and key ecosystem features.
          </p>

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
                Map Legend
                <AudioButton
                  text="Map Legend. Different colored icons represent different types of features on our conservation site."
                  className="ml-2"
                />
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
              <div className="h-[500px] w-full relative">
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
                    positions={mapConfig.areas.siteBorder}
                    pathOptions={{ 
                      color: 'var(--primary)',
                      fillColor: 'var(--primary)',
                      fillOpacity: 0.1,
                      weight: 2
                    }}
                  />
                  
                  {/* Rewilding Area */}
                  <Polygon
                    positions={mapConfig.areas.rewildingArea}
                    pathOptions={{ 
                      color: 'var(--accent)',
                      fillColor: 'var(--accent)',
                      fillOpacity: 0.2,
                      weight: 2
                    }}
                  />
                  
                  {/* Yellow Birch Area */}
                  <Polygon
                    positions={mapConfig.areas.yellowBirchArea}
                    pathOptions={{ 
                      color: 'var(--secondary-foreground)',
                      fillColor: 'var(--secondary-foreground)',
                      fillOpacity: 0.2,
                      weight: 2
                    }}
                  />

                  {/* Feature Markers */}
                  {mapConfig.features.map((feature) => (
                    <Marker 
                      key={feature.id} 
                      position={feature.position as [number, number]}
                      eventHandlers={{
                        click: () => setSelectedFeature(feature.id)
                      }}
                    >
                      <Popup>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-sm text-muted-foreground">{feature.description}</div>
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

        {/* Selected Feature Details */}
        {selectedFeature && (
          <section className="mb-12">
            {mapConfig.features
              .filter((feature) => feature.id === selectedFeature)
              .map((feature) => (
                <Card key={feature.id} className="event-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 ${getFeatureBackground(feature.type.split(' ')[0])} rounded-full flex items-center justify-center border-2 ${getFeatureTextColor(feature.type.split(' ')[0])} text-xl`}>
                          {feature.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-2xl font-bold text-foreground">
                            {feature.name}
                          </h3>
                          <span className="text-sm text-muted-foreground capitalize">
                            {feature.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AudioButton text={feature.audioText} />
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
                      {feature.description}
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
                How to Use This Map
                <AudioButton
                  text="How to Use This Map. Click on any colored marker to learn more about that feature. Use the GPS button to find your current location. The map shows all major trails, historical sites, and conservation areas within our property boundaries."
                  className="ml-4 bg-white/20 hover:bg-white/30"
                  variant="ghost"
                />
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
