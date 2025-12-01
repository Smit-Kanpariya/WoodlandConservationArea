import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trees, 
  Droplets, 
  Clock, 
  Leaf, 
  Shield, 
  Droplet, 
  LeafyGreen, 
  Bug, 
  ChevronRight, 
  MapPin 
} from "lucide-react";
import AudioButton from "@/components/AudioButton";
import yellowBirchImage from "@/assets/yellow-birch.jpg";
import wetlandImage from "@/assets/wetland.jpg";
import farmhouseImage from "@/assets/farmhouse-foundation.jpg";

const Ecosystem = () => {
  const ecosystemFeatures = [
    {
      icon: Trees,
      title: "Yellow Birch Forest",
      image: yellowBirchImage,
      description:
        "The majestic yellow birch (Betula alleghaniensis) is a keystone species in our conservation area. These native trees, with their distinctive golden-bronze peeling bark, form the backbone of our forest ecosystem. Thriving in the moist, well-drained soils of mixed forests, they create vital habitat for numerous species.",
      specialFeatures: [
        "Provides critical nesting sites for cavity-dwelling birds like woodpeckers and nuthatches",
        "Supports diverse insect populations that form the base of the forest food web",
        "Hosts a rich understory of native ferns, wildflowers, and fungi",
        "Serves as a seed source for regenerating the Acadian forest",
      ],
      audioText:
        "Yellow Birch Forest. The majestic yellow birch is a keystone species in our conservation area, thriving in the moist, well-drained soils of mixed forests and supporting diverse wildlife.",
    },
    {
      icon: Droplets,
      title: "Wetland Ecosystem",
      image: wetlandImage,
      description:
        "Our protected wetlands are dynamic ecosystems that perform essential ecological functions. These natural water filters improve water quality, control flooding, and provide critical habitat for specialized plants and animals adapted to life in and around water.",
      specialFeatures: [
        "Filters pollutants and sediments from runoff before they reach the bay",
        "Provides breeding habitat for amphibians like wood frogs and spotted salamanders",
        "Supports diverse insect populations, including important pollinators",
        "Acts as a natural sponge, absorbing excess water during heavy rains",
      ],
      audioText:
        "Wetland Ecosystem. Our protected wetlands filter water, prevent floods, and provide essential habitat for amphibians, insects, and aquatic plants.",
    },
    {
      icon: Clock,
      title: "Historical Landscape",
      image: farmhouseImage,
      description:
        "The stone farmhouse foundation and historic wells on the property offer a tangible connection to the area's agricultural past. These artifacts tell the story of early European settlement and the evolving relationship between humans and the land in Nova Scotia.",
      specialFeatures: [
        "Original 19th-century farmhouse foundation built from local stone",
        "Two historic wells that provided water to early settlers",
        "Evidence of traditional land use practices and subsistence farming",
        "Demonstrates the resilience of nature as the forest reclaims the landscape",
      ],
      audioText:
        "Historical Landscape. The stone farmhouse foundation and historic wells connect us to the area's agricultural past and demonstrate nature's resilience.",
    },
  ];

  const conservationStats = [
    {
      value: "150+",
      label: "Protected Acres",
      description: "Total area under active conservation",
    },
    {
      value: "2",
      label: "Wetland Areas",
      description: "Individual wetland habitats preserved",
    },
    {
      value: "300+",
      label: "Tree Species",
      description: "Years of age for our oldest yellow birch",
    },
    {
      value: "1800s",
      label: "Historical Period",
      description: "Era of original settlement",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/hero-woodland.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                Natural Heritage
              </Badge>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                St. Margaret's Bay <span className="text-primary">Ecosystem</span>
                <AudioButton
                  text="St. Margaret's Bay Ecosystem. A unique woodland habitat where nature, history, and conservation meet in Nova Scotia's coastal landscape."
                  className="ml-4 inline-flex"
                />
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Nestled in the heart of Nova Scotia's Acadian Forest region, our conservation area is a living testament to the delicate balance between human history and natural preservation. This unique ecosystem supports remarkable biodiversity while protecting the remnants of early settlement, creating a living classroom for ecological stewardship.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() => {
                    const vh = Math.round(window.visualViewport?.height || window.innerHeight);
                    const isMobile = window.innerWidth < 768; // 768px is Tailwind's 'md' breakpoint
                    const step = Math.round(vh * (isMobile ? 0.8 : 0.9));
                    const current = window.scrollY || window.pageYOffset;
                    const next = (Math.floor(current / step) + 1) * step;
                    const maxTop = document.documentElement.scrollHeight - step;
                    window.scrollTo({ top: Math.min(next, Math.max(0, maxTop)), behavior: "smooth" });
                  }}
                >
                  Explore Habitats
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2"
                  onClick={() => {
                    const vh = Math.round(window.visualViewport?.height || window.innerHeight);
                    const isMobile = window.innerWidth < 768;
                    const step = Math.round(vh * (isMobile ? 3.35 : 2.5));
                    const current = window.scrollY || window.pageYOffset;
                    const next = (Math.floor(current / step) + 1) * step;
                    const maxTop = document.documentElement.scrollHeight - step;
                    window.scrollTo({ top: Math.min(next, Math.max(0, maxTop)), behavior: "smooth" });
                  }}
                >
                  Key Features
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Introduction */}
        <section className="mb-20">
          <div className="bg-muted/20 rounded-xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                A Sanctuary for Nature and History
              </h2>
              <div className="prose prose-lg text-muted-foreground max-w-3xl mx-auto text-left">
                <p className="mb-6">
                  The St. Margaret's Bay conservation area represents a vital piece of Nova Scotia's natural heritage. Our mission is to protect and restore this unique ecosystem, which serves as a refuge for native species and a living connection to our region's past.
                </p>
                <p className="mb-6">
                  This land tells a story of resilience—from the ancient yellow birch trees that have stood for centuries to the stone foundations that whisper of early settlers. Today, we're writing the next chapter through careful conservation and rewilding efforts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="relative py-12 bg-gradient-to-b from-background to-muted/10">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/src/assets/pattern.svg')] opacity-5"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
                Our Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Conservation By The Numbers
              </h2>
              <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Quantifying our commitment to preserving Nova Scotia's precious woodland heritage
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {conservationStats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-card border border-border/50 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                      {index === 0 && <Trees className="w-8 h-8 text-primary" />}
                      {index === 1 && <Droplets className="w-8 h-8 text-primary" />}
                      {index === 2 && <Trees className="w-8 h-8 text-primary" />}
                      {index === 3 && <Clock className="w-8 h-8 text-primary" />}
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2 no-break">
                      {stat.value}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 no-break">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                    <div className="mt-4">
                      <AudioButton
                        text={`${stat.value} ${stat.label}. ${stat.description}`}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center">
              Key Ecosystem Features
              <AudioButton
                text="Key Ecosystem Features section. The special characteristics that define our conservation area."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The special characteristics that define our conservation area
            </p>
          </div>

          <div className="space-y-12">
            {ecosystemFeatures.map((feature, index) => (
              <Card key={index} className="event-card overflow-hidden">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div
                    className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <AudioButton
                        text={feature.audioText}
                        className="bg-black/20 hover:bg-black/40"
                        variant="ghost"
                      />
                    </div>
                  </div>

                  <CardContent
                    className={`p-8 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                        <feature.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground no-break">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3 no-break">
                        Special Features:
                      </h4>
                      <ul className="space-y-2">
                        {feature.specialFeatures.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start text-muted-foreground"
                          >
                            <span className="text-primary mr-2 mt-1">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Conservation Philosophy */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 md:p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="w-16 h-1 bg-primary mb-4 md:mb-0 md:mr-6"></div>
              <h2 className="text-3xl font-bold text-foreground">Our Conservation Philosophy</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground mb-6 text-lg">
                  At the heart of our mission is a commitment to rewilding and preserving the natural landscape of St. Margaret's Bay. Unlike commercial development, which often fragments habitats, our approach focuses on ecological restoration and sustainable coexistence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <Leaf className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Native Species Protection</h3>
                      <p className="text-muted-foreground text-sm">Prioritizing indigenous plants and animals while controlling invasive species</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <Droplet className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Watershed Stewardship</h3>
                      <p className="text-muted-foreground text-sm">Protecting water quality through natural filtration and buffer zones</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Habitat Conservation</h3>
                      <p className="text-muted-foreground text-sm">Maintaining and restoring critical habitats for native wildlife</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg border border-border/50">
                <h3 className="font-semibold text-lg mb-4">Our Conservation Goals</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Restore native plant communities through strategic replanting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Create wildlife corridors to connect fragmented habitats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Monitor and protect sensitive species and ecosystems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Educate the community about sustainable land use practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Balance historical preservation with ecological restoration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Biodiversity Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Biodiversity Highlights</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The rich biodiversity of St. Margaret's Bay is a testament to the health of this ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <LeafyGreen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Native Flora</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Yellow Birch (Betula alleghaniensis)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Red Maple (Acer rubrum)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Eastern Hemlock (Tsuga canadensis)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Various native ferns and wildflowers</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Bug className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fauna</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Red-backed Salamander</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Wood Thrush</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>American Woodcock</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Various bat species</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <LeafyGreen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fungi & More</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Chanterelle mushrooms</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Turkey Tail fungus</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Reindeer lichen</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  <span>Various moss species</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ecosystem;
