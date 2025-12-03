import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AudioButton from "@/components/AudioButton";

const MapLegend: React.FC = () => {
  return (
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
  );
};

export default MapLegend;
