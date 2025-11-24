import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Leaf,
  Bird,
  Bug,
  Search,
  AlertCircle,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { speciesData } from "@/data/speciesData";
import SpeciesCard from "@/components/SpeciesCard";
import ConservationGuide from "@/components/ConservationGuide";

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

  // Calculate dynamic stats
  const totalSpecies = speciesData.length;
  // Assuming "Endemic" isn't explicitly tracked in the current data model, 
  // we'll count species with specific regions for now or keep it as a placeholder logic
  // For this example, let's say all species with a specific region listed are "endemic" to the park
  const endemicCount = speciesData.filter(s => s.region).length; 
  const atRiskCount = speciesData.filter(s => ["Protected", "Monitored"].includes(s.status)).length;

  const categories = [
    { id: "all", name: "All Species", icon: Search, count: totalSpecies },
    { id: "flora", name: "Flora", icon: Leaf, count: speciesData.filter(s => s.category === "flora").length },
    { id: "fauna", name: "Fauna", icon: Bird, count: speciesData.filter(s => s.category === "fauna").length },
    { id: "fungi", name: "Fungi", icon: Bug, count: speciesData.filter(s => s.category === "fungi").length },
  ];

  const filteredSpecies = speciesData.filter((specimen) => {
    const matchesCategory =
      selectedCategory === "all" || specimen.category === selectedCategory;
    
    if (searchQuery === "") {
      return matchesCategory;
    }
    
    const searchLower = searchQuery.toLowerCase().trim();
    
    // Improved search logic: check if search string is included in name or scientific name
    return (
      matchesCategory && 
      (specimen.name.toLowerCase().includes(searchLower) ||
       specimen.scientificName.toLowerCase().includes(searchLower))
    );
  });

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
                    <h3 className="text-3xl font-bold">{totalSpecies}</h3>
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
                    <h3 className="text-3xl font-bold">{endemicCount}</h3>
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
                    <h3 className="text-3xl font-bold">{atRiskCount}</h3>
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
                  <SpeciesCard key={item.id} species={item} />
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
          <ConservationGuide />
        </section>
      </div>
    </div>
  );
};

export default Species;
