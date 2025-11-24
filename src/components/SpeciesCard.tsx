import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Calendar, Leaf, Bird, Bug } from "lucide-react";
import AudioButton from "@/components/AudioButton";
import { Species } from "@/data/speciesData";
import { motion } from "framer-motion";

interface SpeciesCardProps {
  species: Species;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "protected":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "monitored":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    case "recovered":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "common":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "uncommon":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "seasonal":
      return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
    case "migratory":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  const [imageError, setImageError] = useState(false);

  const getFallbackIcon = () => {
    switch (species.category) {
      case "flora":
        return <Leaf className="h-16 w-16 text-primary/30" />;
      case "fauna":
        return <Bird className="h-16 w-16 text-primary/30" />;
      case "fungi":
        return <Bug className="h-16 w-16 text-primary/30" />;
      default:
        return <Leaf className="h-16 w-16 text-primary/30" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="event-card h-full flex flex-col">
        <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
          {!imageError ? (
            <img
              src={species.image}
              alt={species.name}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/10 to-accent/10">
              {getFallbackIcon()}
            </div>
          )}
          <div className="absolute bottom-4 right-4">
            <AudioButton
              text={species.audioText}
              variant="outline"
              size="sm"
              className="rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm"
            />
          </div>
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {species.name}
              </h3>
              <p className="text-sm italic text-muted-foreground">
                {species.scientificName}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`${getStatusColor(species.status)} border-0 capitalize`}
            >
              {species.status}
            </Badge>
          </div>

          <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
            {species.description}
          </p>

          <div className="mt-auto space-y-3 pt-4 border-t border-border/50">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{species.habitat}</span>
            </div>
            <div className="flex items-center text-sm">
              <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Conservation: </span>
              <span
                className={`ml-1 font-medium ${getStatusColor(species.conservation)}`}
              >
                {species.conservation}
              </span>
            </div>
            {species.lastSighted && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Last sighted: {species.lastSighted}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SpeciesCard;
