import React, { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  image_url: string;
  caption: string | null;
  uploaded_by: string | null;
  created_at: string;
}

const ImageCarousel = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    // Set up auto-scroll if enabled and photos are available
    if (isAutoScrolling && photos.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }, 4000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [isAutoScrolling, photos.length]);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  if (photos.length === 0) {
    return (
      <div className="w-full h-64 bg-muted/20 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No photos uploaded yet</p>
      </div>
    );
  }

  // Calculate the transform offset based on currentIndex
  // Each photo container is 272px wide (256px photo + 16px margin)
  const photoWidth = 256; // w-64 = 16rem = 256px
  const photoMargin = 16; // mx-2 = 0.5rem on each side = 8px each = 16px total
  const photoTotalWidth = photoWidth + photoMargin;
  // Calculate offset: move by one photo width at a time
  // Clamp to prevent scrolling beyond the last visible photo
  const containerPadding = 16; // px-4 = 1rem = 16px
  const maxScrollOffset = Math.max(0, (photos.length - 1) * photoTotalWidth);
  const calculatedOffset = currentIndex * photoTotalWidth;
  const transformOffset = Math.min(calculatedOffset, maxScrollOffset);

  return (
    <div className="relative w-full bg-muted/20 pb-12 overflow-hidden group">
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-64 items-center px-4"
        style={{ 
          width: `${photos.length * photoTotalWidth}px`,
          transform: `translateX(-${transformOffset}px)`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={carouselRef}
      >
        {photos.map((photo, index) => (
          <div key={photo.id} className="h-64 w-64 flex-shrink-0 mx-2 relative">
            <img
              src={photo.image_url}
              alt={photo.caption || `Photo ${index + 1}`}
              className="h-full w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator - positioned below the carousel */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex % photos.length
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoScrolling(true);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
