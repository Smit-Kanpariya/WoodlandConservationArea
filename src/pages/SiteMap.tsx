import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Home,
  Trees,
  Droplets,
  Clock,
  Compass,
  Map as MapIcon,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import AudioButton from "@/components/AudioButton";

const SiteMap = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showUserPosition, setShowUserPosition] = useState(false);

  // Site boundaries and features (in a real app, these would be actual GPS coordinates)
  const siteFeatures = [
    {
      id: "trailhead",
      name: "Trailhead",
      type: "access",
      position: { x: 15, y: 20 },
      icon: MapPin,
      description: "Main entrance and parking area for conservation trails",
      audioText:
        "Trailhead. Main entrance and parking area for conservation trails.",
    },
    {
      id: "farmhouse",
      name: "Farmhouse Foundation",
      type: "historical",
      position: { x: 40, y: 35 },
      icon: Home,
      description: "Archaeological remains of the original 1800s farmhouse",
      audioText:
        "Farmhouse Foundation. Archaeological remains of the original 1800s farmhouse. Click for more historical information.",
    },
    {
      id: "well1",
      name: "Historic Well #1",
      type: "historical",
      position: { x: 45, y: 40 },
      icon: Clock,
      description: "Original well from the farming settlement period",
      audioText:
        "Historic Well Number 1. Original well from the farming settlement period.",
    },
    {
      id: "well2",
      name: "Historic Well #2",
      type: "historical",
      position: { x: 38, y: 50 },
      icon: Clock,
      description: "Secondary well structure, partially preserved",
      audioText:
        "Historic Well Number 2. Secondary well structure, partially preserved.",
    },
    {
      id: "sitting-area",
      name: "Sitting Area",
      type: "amenity",
      position: { x: 55, y: 45 },
      icon: MapPin,
      description: "Peaceful rest area with benches overlooking the wetland",
      audioText:
        "Sitting Area. Peaceful rest area with benches overlooking the wetland.",
    },
    {
      id: "yellow-birch",
      name: "Yellow Birch Grove",
      type: "ecosystem",
      position: { x: 70, y: 25 },
      icon: Trees,
      description: "Ancient yellow birch trees, some over 200 years old",
      audioText:
        "Yellow Birch Grove. Ancient yellow birch trees, some over 200 years old.",
    },
    {
      id: "wetland1",
      name: "Primary Wetland",
      type: "ecosystem",
      position: { x: 25, y: 60 },
      icon: Droplets,
      description: "Main wetland area supporting diverse wildlife",
      audioText:
        "Primary Wetland. Main wetland area supporting diverse wildlife.",
    },
    {
      id: "wetland2",
      name: "Secondary Wetland",
      type: "ecosystem",
      position: { x: 65, y: 70 },
      icon: Droplets,
      description: "Smaller wetland connected to the primary system",
      audioText:
        "Secondary Wetland. Smaller wetland connected to the primary system.",
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowUserPosition(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your location. Please ensure location services are enabled."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getFeatureColor = (type: string) => {
    switch (type) {
      case "access":
        return "text-accent";
      case "historical":
        return "text-destructive";
      case "ecosystem":
        return "text-primary";
      case "amenity":
        return "text-secondary-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getFeatureBackground = (type: string) => {
    switch (type) {
      case "access":
        return "bg-accent/20";
      case "historical":
        return "bg-destructive/20";
      case "ecosystem":
        return "bg-primary/20";
      case "amenity":
        return "bg-secondary/40";
      default:
        return "bg-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/hero-woodland.jpg')] bg-cover bg-center opacity-10"></div>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button size="lg" className="gap-2">
                  Explore Options
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Visit Our Grounds
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            Interactive Site Map
            <AudioButton
              text="Interactive Site Map. Explore our conservation area with this interactive map showing trails, historical sites, and key ecosystem features. Use the GPS button to find your current location on the map."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our conservation area with this interactive map showing
            trails, historical sites, and key ecosystem features.
          </p>

          {/* GPS Location Button */}
          <Button
            onClick={getUserLocation}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Navigation className="w-5 h-5 mr-2" />
            "YOU ARE HERE" - Find My Location
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
                  <div className="w-4 h-4 bg-accent/20 rounded-full mr-2"></div>
                  <span className="text-sm text-foreground no-break">
                    Access Points
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary/20 rounded-full mr-2"></div>
                  <span className="text-sm text-foreground no-break">
                    Ecosystems
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-destructive/20 rounded-full mr-2"></div>
                  <span className="text-sm text-foreground no-break">
                    Historical Sites
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-secondary/40 rounded-full mr-2"></div>
                  <span className="text-sm text-foreground no-break">
                    Amenities
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Map */}
        <section className="mb-12">
          <Card className="event-card overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/5 h-96 md:h-[500px]">
                {/* North Arrow */}
                <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3 shadow-md">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <MapIcon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">N</span>
                </div>

                {/* Site Boundary */}
                <div className="absolute inset-4 border-2 border-dashed border-primary/40 rounded-lg">
                  <div className="absolute -top-6 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Conservation Area Boundary
                  </div>
                </div>

                {/* Rewilding Area */}
                <div
                  className="absolute bg-primary/10 border border-primary/30 rounded-lg"
                  style={{
                    left: "20%",
                    top: "25%",
                    width: "45%",
                    height: "35%",
                  }}
                >
                  <div className="absolute -top-5 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Rewilding Area
                  </div>
                </div>

                {/* Yellow Birch Area */}
                <div
                  className="absolute bg-accent/10 border border-accent/30 rounded-lg"
                  style={{
                    left: "60%",
                    top: "15%",
                    width: "30%",
                    height: "25%",
                  }}
                >
                  <div className="absolute -top-5 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                    Yellow Birch Area
                  </div>
                </div>

                {/* Wetland Areas */}
                <div
                  className="absolute bg-blue-100 border border-blue-300 rounded-full"
                  style={{
                    left: "20%",
                    top: "55%",
                    width: "15%",
                    height: "20%",
                  }}
                ></div>
                <div
                  className="absolute bg-blue-100 border border-blue-300 rounded-full"
                  style={{
                    left: "60%",
                    top: "65%",
                    width: "12%",
                    height: "15%",
                  }}
                ></div>

                {/* Feature Markers */}
                {siteFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                      hoveredFeature === feature.id ? "scale-125" : "scale-100"
                    }`}
                    style={{
                      left: `${feature.position.x}%`,
                      top: `${feature.position.y}%`,
                    }}
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    onClick={() => setSelectedFeature(feature.id)}
                  >
                    <div
                      className={`w-8 h-8 ${getFeatureBackground(feature.type)} rounded-full flex items-center justify-center border-2 border-white shadow-md hover:shadow-lg`}
                    >
                      <feature.icon
                        className={`w-4 h-4 ${getFeatureColor(feature.type)}`}
                      />
                    </div>

                    {/* Tooltip on hover */}
                    {hoveredFeature === feature.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {feature.name}
                      </div>
                    )}
                  </div>
                ))}

                {/* User Location Marker */}
                {showUserPosition && userLocation && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{
                      left: "50%", // Simulated position - in real app, would calculate from GPS
                      top: "40%",
                    }}
                  >
                    <div className="relative">
                      <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                        YOU ARE HERE
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feature Details */}
        {selectedFeature && (
          <section className="mb-12">
            {siteFeatures
              .filter((feature) => feature.id === selectedFeature)
              .map((feature) => (
                <Card key={feature.id} className="event-card">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 ${getFeatureBackground(feature.type)} rounded-full flex items-center justify-center mr-4`}
                        >
                          <feature.icon
                            className={`w-6 h-6 ${getFeatureColor(feature.type)}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground no-break">
                            {feature.name}
                          </h3>
                          <span className="text-sm text-muted-foreground capitalize">
                            {feature.type} Feature
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AudioButton
                          text={`${feature.audioText} ${feature.id === "farmhouse" ? "The farmhouse was built in the 1850s by the Morrison family, who farmed this land for three generations. The foundation stones were quarried locally and show evidence of traditional building techniques of the era." : ""}`}
                        />
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

                    {/* Additional historical information for farmhouse */}
                    {feature.id === "farmhouse" && (
                      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2 no-break">
                          Historical Information
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          The farmhouse was built in the 1850s by the Morrison
                          family, who farmed this land for three generations.
                          The foundation stones were quarried locally and show
                          evidence of traditional building techniques of the
                          era. Archaeological surveys have revealed artifacts
                          including pottery fragments, metal tools, and evidence
                          of a root cellar.
                        </p>
                      </div>
                    )}
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
                  <h3 className="font-semibold mb-3 no-break">
                    Interactive Features:
                  </h3>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li>
                      • Click on any marker to learn more about that feature
                    </li>
                    <li>
                      • Use the "YOU ARE HERE" button to find your GPS location
                    </li>
                    <li>• Hover over markers for quick feature names</li>
                    <li>• Map shows all major trails and conservation areas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 no-break">
                    Planning Your Visit:
                  </h3>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li>
                      • Start at the trailhead for parking and information
                    </li>
                    <li>• Visit historical sites for educational content</li>
                    <li>
                      • Use sitting areas for rest and wildlife observation
                    </li>
                    <li>• Respect wetland boundaries and wildlife habitats</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SiteMap;
