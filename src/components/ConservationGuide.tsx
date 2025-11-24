import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Shield } from "lucide-react";

const ConservationGuide = () => {
  return (
    <Card className="event-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Understanding Conservation Status
        </CardTitle>
        <CardDescription>
          Learn what each conservation status means for our local species
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="font-medium">Protected</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Species protected by law. Harming or disturbing these species is
              illegal.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span className="font-medium">Monitored</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Species of special concern that we're actively monitoring for
              population changes.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="font-medium">Recovered</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Previously at-risk species that have shown significant population
              recovery.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="font-medium">Common</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Species that are currently abundant and not at risk in our
              conservation area.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConservationGuide;
