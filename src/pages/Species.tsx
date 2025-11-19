import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Leaf,
  Bird,
  Bug,
  Search,
  AlertCircle,
  Mail,
  Calendar,
  MapPin,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AudioButton from "@/components/AudioButton";

interface Species {
  id: number;
  name: string;
  scientificName: string;
  category: "flora" | "fauna" | "fungi";
  status: string;
  description: string;
  habitat: string;
  conservation: string;
  audioText: string;
  lastSighted?: string;
  region?: string;
}

const Species = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Set up refs
  const speciesListRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Simulate loading and focus search input on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    // Focus search input on component mount
    searchInputRef.current?.focus();
    return () => clearTimeout(timer);
  }, []);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToSpeciesList();
  };

  // Handle Enter key press in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      scrollToSpeciesList();
    }
  };

  // Smooth scroll to species list
  const scrollToSpeciesList = () => {
    if (window.innerWidth < 768) { // Mobile
      const vh = Math.round(window.visualViewport?.height || window.innerHeight);
      const current = window.scrollY || window.pageYOffset;
      const target = current + (vh * 1.35); // Scroll down by 1.5 viewport heights
      window.scrollTo({
        top: Math.min(target, document.documentElement.scrollHeight - vh),
        behavior: 'smooth'
      });
    } else { // Desktop - original behavior
      if (speciesListRef.current) {
        window.scrollTo({
          top: speciesListRef.current.offsetTop - 20, // Adjust offset as needed
          behavior: 'smooth'
        });
      }
    }
  };

  const categories = [
    { id: "all", name: "All Species", icon: Search, count: 45 },
    { id: "flora", name: "Flora", icon: Leaf, count: 28 },
    { id: "fauna", name: "Fauna", icon: Bird, count: 12 },
    { id: "fungi", name: "Fungi", icon: Bug, count: 5 },
  ];

  const species: Species[] = [
    {
      id: 1,
      name: "Yellow Birch",
      scientificName: "Betula alleghaniensis",
      category: "flora",
      status: "Common",
      description:
        "Distinctive tree with golden-bronze peeling bark, native to eastern North America. Known for its longevity, with some specimens living over 300 years. The bark was historically used by Indigenous peoples for making canoes and containers.",
      habitat: "Well-drained soils, mixed forests",
      conservation: "Stable",
      audioText:
        "Yellow Birch, scientific name Betula alleghaniensis. A distinctive tree with golden-bronze peeling bark, native to eastern North America. Can live over 300 years. Found in well-drained soils and mixed forests. Conservation status is stable.",
      lastSighted: "October 15, 2025",
      region: "Northeast Trail",
    },
    {
      id: 2,
      name: "Red Squirrel",
      scientificName: "Tamiasciurus hudsonicus",
      category: "fauna",
      status: "Common",
      description:
        "Small, energetic squirrel with reddish-brown fur and a white underbelly. These territorial creatures are known for their distinctive chattering calls and play a crucial role in seed dispersal for coniferous trees.",
      habitat: "Coniferous and mixed forests",
      conservation: "Stable",
      audioText:
        "Red Squirrel, scientific name Tamiasciurus hudsonicus. Small, energetic squirrel with reddish-brown fur. Important seed disperser for coniferous trees. Found in coniferous and mixed forests. Conservation status is stable.",
      lastSighted: "October 28, 2025",
      region: "Pine Ridge Area",
    },
    {
      id: 3,
      name: "Wild Ginger",
      scientificName: "Asarum canadense",
      category: "flora",
      status: "Uncommon",
      description:
        "A low-growing woodland plant with distinctive heart-shaped leaves and unusual burgundy flowers that grow at ground level. The plant has a ginger-like aroma when crushed and was used by Indigenous peoples for medicinal purposes.",
      habitat: "Rich, moist woodland floors",
      conservation: "Monitored",
      audioText:
        "Wild Ginger, scientific name Asarum canadense. Low-growing woodland plant with heart-shaped leaves and hidden burgundy flowers. Found in rich, moist woodland floors. Conservation status is monitored.",
      lastSighted: "May 5, 2025",
      region: "Maple Grove",
    },
    {
      id: 4,
      name: "Oyster Mushroom",
      scientificName: "Pleurotus ostreatus",
      category: "fungi",
      status: "Seasonal",
      description:
        "An edible bracket fungus with a distinctive fan or oyster-shaped cap. These important decomposers grow in shelf-like clusters on dead or dying hardwood trees, playing a vital role in nutrient cycling within the forest ecosystem.",
      habitat: "Dead or dying hardwood trees",
      conservation: "Stable",
      audioText:
        "Oyster Mushroom, scientific name Pleurotus ostreatus. Edible bracket fungus that grows on deciduous trees, helping decompose dead wood. Found on dead or dying hardwood trees. Conservation status is stable.",
      lastSighted: "September 22, 2025",
      region: "Oak Valley",
    },
    {
      id: 5,
      name: "Wood Duck",
      scientificName: "Aix sponsa",
      category: "fauna",
      status: "Migratory",
      description:
        "One of the most colorful North American waterfowl, known for its striking plumage. Males have iridescent green and purple heads with distinctive white markings, while females have subtle gray-brown plumage. They nest in tree cavities near water.",
      habitat: "Wooded wetlands, ponds",
      conservation: "Recovered",
      audioText:
        "Wood Duck, scientific name Aix sponsa. Colorful waterfowl that nests in tree cavities near wetlands. Males have distinctive iridescent plumage. Found in wooded wetlands and ponds. Conservation status is recovered.",
      lastSighted: "October 10, 2025",
      region: "Marshlands",
    },
    {
      id: 6,
      name: "Trillium",
      scientificName: "Trillium grandiflorum",
      category: "flora",
      status: "Protected",
      description:
        "The provincial flower of Ontario, this perennial wildflower is known for its three-petaled white flowers that gradually turn pink with age. It takes up to 17 years to mature and produce flowers, making it particularly vulnerable to disturbance.",
      habitat: "Rich, deciduous forests",
      conservation: "Protected",
      audioText:
        "Trillium, scientific name Trillium grandiflorum. Iconic spring wildflower with three white petals that turn pink with age. Symbol of Ontario. Found in rich, deciduous forests. Conservation status is protected. Please do not pick or disturb this protected species.",
      lastSighted: "May 15, 2025",
      region: "Conservation Area",
    },
  ];

  const filteredSpecies = species.filter((specimen) => {
    const matchesCategory =
      selectedCategory === "all" || specimen.category === selectedCategory;
    
    if (searchQuery === "") {
      return matchesCategory;
    }
    
    const searchLower = searchQuery.toLowerCase().trim();
    const nameWords = specimen.name.toLowerCase().split(/\s+/);
    const scientificNameWords = specimen.scientificName.toLowerCase().split(/\s+/);
    
    // Check if any word in the name or scientific name starts with the search query
    const matchesName = nameWords.some(word => word.startsWith(searchLower));
    const matchesScientificName = scientificNameWords.some(word => word.startsWith(searchLower));
    
    return (
      matchesCategory && 
      (matchesName || matchesScientificName ||
       specimen.name.toLowerCase().includes(searchLower) ||
       specimen.scientificName.toLowerCase().includes(searchLower))
    );
  });


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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "flora":
        return <Leaf className="w-4 h-4 mr-1.5" />;
      case "fauna":
        return <Bird className="w-4 h-4 mr-1.5" />;
      case "fungi":
        return <Bug className="w-4 h-4 mr-1.5" />;
      default:
        return <Search className="w-4 h-4 mr-1.5" />;
    }
  };

  const getConservationIcon = (conservation: string) => {
    switch (conservation.toLowerCase()) {
      case "protected":
        return <Shield className="w-4 h-4 mr-1.5" />;
      case "monitored":
        return <AlertCircle className="w-4 h-4 mr-1.5" />;
      case "recovered":
        return <Shield className="w-4 h-4 mr-1.5" />;
      default:
        return null;
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
                <Leaf className="w-4 h-4 mr-2" />
                Biodiversity Catalog
              </Badge>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Discover Our <span className="text-primary">Woodland Species</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Explore the rich biodiversity of our conservation area. Learn about the native flora, fauna, and fungi that make this ecosystem unique.
              </motion.p>
              
              {/* Search Form */}
              <motion.form 
                className="max-w-2xl mx-auto relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSearchSubmit}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search for a species..."
                      className="pl-10 h-12 text-base"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      aria-label="Search species"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="whitespace-nowrap transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    onClick={scrollToSpeciesList}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div ref={speciesListRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <section className="mb-12">
          <Tabs
            defaultValue="all"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-foreground">
                Browse by Category
              </h2>
              <TabsList className="grid w-full sm:w-auto grid-cols-4">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center justify-center gap-1.5"
                  >
                    {getCategoryIcon(category.id)}
                    {category.name}
                    <span className="ml-1 text-xs opacity-70">
                      ({category.count})
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </section>

        {/* Stats Cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-primary hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Species
                    </p>
                    <h3 className="text-3xl font-bold">45</h3>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Documented in our conservation area
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Endemic Species
                    </p>
                    <h3 className="text-3xl font-bold">12</h3>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Native to this region
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      At Risk
                    </p>
                    <h3 className="text-3xl font-bold">3</h3>
                  </div>
                  <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Species under conservation
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Species Grid */}
        <section className="mb-16">
          {searchQuery && filteredSpecies.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">
                We couldn't find any species matching "{searchQuery}".
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
              >
                Clear search
              </Button>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-6" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredSpecies.length > 0 ? (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSpecies.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        {item.category === "flora" && (
                          <Leaf className="h-16 w-16 text-primary/30" />
                        )}
                        {item.category === "fauna" && (
                          <Bird className="h-16 w-16 text-primary/30" />
                        )}
                        {item.category === "fungi" && (
                          <Bug className="h-16 w-16 text-primary/30" />
                        )}
                        <div className="absolute bottom-4 right-4">
                          <AudioButton
                            text={item.audioText}
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
                              {item.name}
                            </h3>
                            <p className="text-sm italic text-muted-foreground">
                              {item.scientificName}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(item.status)} border-0 capitalize`}
                          >
                            {item.status}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                          {item.description}
                        </p>

                        <div className="mt-auto space-y-3 pt-4 border-t border-border/50">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{item.habitat}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Conservation: </span>
                            <span
                              className={`ml-1 font-medium ${getStatusColor(item.conservation)}`}
                            >
                              {item.conservation}
                            </span>
                          </div>
                          {item.lastSighted && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>Last sighted: {item.lastSighted}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-lg">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No species found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any species matching your search. Try adjusting
                your filters or search term.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/src/assets/pattern.png')] opacity-10"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <Badge
                variant="secondary"
                className="mb-4 text-primary bg-background/80 backdrop-blur-sm"
              >
                Join Our Community
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Become a Citizen Scientist
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-3xl mx-auto">
                Your observations help us track and protect the incredible
                biodiversity of our conservation area. Join our community of
                nature enthusiasts and contribute to important research.
              </p>
              <div className="flex justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="gap-2 group mx-auto"
                >
                  <Link to="/contact" className="flex items-center no-underline">
                    <Mail className="h-5 w-5 group-hover:animate-bounce" />
                    Report a Sighting
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Conservation Status Guide */}
        <section className="mb-16">
          <Card>
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
                    Species protected by law. Harming or disturbing these
                    species is illegal.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="font-medium">Monitored</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Species of special concern that we're actively monitoring
                    for population changes.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="font-medium">Recovered</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Previously at-risk species that have shown significant
                    population recovery.
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
        </section>
      </div>
    </div>
  );
};

export default Species;
