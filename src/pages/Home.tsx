import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trees, Droplets, MapPin, Camera, Leaf, Users } from "lucide-react";
import AudioButton from "@/components/AudioButton";
import TypingText from "@/components/TypingText";
import ImageCarousel from "@/components/ImageCarousel";
import heroImage from "@/assets/hero-woodland.jpg";
import yellowBirchImage from "@/assets/yellow-birch.jpg";
import wetlandImage from "@/assets/wetland.jpg";
import farmhouseImage from "@/assets/farmhouse-foundation.jpg";

const Home = () => {
  const statistics = [
    {
      icon: Trees,
      value: "150+",
      label: "Protected Acres",
      description: "Acres of pristine woodland under conservation",
    },
    {
      icon: Droplets,
      value: "12",
      label: "Wetland Areas",
      description: "Critical wetland habitats preserved",
    },
    {
      icon: Leaf,
      value: "200+",
      label: "Species Documented",
      description: "Flora, fauna, and fungi species cataloged",
    },
    {
      icon: Users,
      value: "500+",
      label: "Community Members",
      description: "Active supporters and volunteers",
    },
  ];

  const featuredAreas = [
    {
      title: "Yellow Birch Grove",
      description:
        "Ancient yellow birch trees with distinctive peeling bark, creating a unique canopy ecosystem.",
      image: yellowBirchImage,
      audioText:
        "Yellow Birch Grove. Ancient yellow birch trees with distinctive peeling bark, creating a unique canopy ecosystem.",
    },
    {
      title: "Wetland Sanctuary",
      description:
        "Pristine wetland areas supporting diverse wildlife and serving as natural water filtration systems.",
      image: wetlandImage,
      audioText:
        "Wetland Sanctuary. Pristine wetland areas supporting diverse wildlife and serving as natural water filtration systems.",
    },
    {
      title: "Historical Foundation",
      description:
        "Archaeological remnants of the original farmhouse and wells, preserving local heritage.",
      image: farmhouseImage,
      audioText:
        "Historical Foundation. Archaeological remnants of the original farmhouse and wells, preserving local heritage.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="hero-overlay absolute inset-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 no-break">
              Experience{" "}
              <TypingText
                words={["Peace", "Excitement", "Nature", "Community"]}
                className="text-accent"
                typingSpeed={120}
                deletingSpeed={80}
                pauseDuration={1500}
              />
            </h1>
            <AudioButton
              text="Experience Conservation. Preserve and explore the unique woodland ecosystem of St. Margaret's Bay"
              className="ml-4 bg-white/20 hover:bg-white/30"
              variant="ghost"
            />
          </div>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Preserve and explore the unique woodland ecosystem of St. Margaret's
            Bay
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold rounded-full"
          >
            Explore Conservation Areas
          </Button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/src/assets/pattern.svg')] opacity-5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Our Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Conservation By The Numbers
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quantifying our commitment to preserving Nova Scotia's precious
              woodland heritage
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border/50 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                    <stat.icon className="w-8 h-8 text-primary" />
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

      {/* Community Photos Section */}
      <section className="relative py-20 bg-background">
        <div className="absolute inset-0 bg-[url('/src/assets/woodland-pattern.png')] opacity-[0.03] bg-repeat"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Community Spotlight
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Through The Lens Of Our Community
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Capturing the beauty of our conservation areas through the eyes of
              those who cherish them most
            </p>
          </div>

          <div className="relative mb-16">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl -z-10"></div>
            <div className="relative bg-card border border-border/30 rounded-xl p-1">
              <ImageCarousel />
            </div>
          </div>

          <div className="text-center">
            <Link to="/gallery">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full font-medium text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                <Camera className="w-5 h-5 mr-2" />
                Share Your Photos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Areas Section */}
      <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Explore
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Conservation Areas
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the diverse ecosystems and rich history of our protected
              lands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAreas.map((area, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-card border border-border/50"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <div className="absolute top-4 right-4">
                      <AudioButton
                        text={area.audioText}
                        variant="ghost"
                        size="sm"
                        className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {area.title}
                    </h3>
                    <div className="w-12 h-1 bg-accent mb-3"></div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Map
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 hover:text-primary/90 px-8 py-6 text-base font-medium rounded-full border-2 transition-all duration-300 hover:shadow-md"
            >
              View All Conservation Areas
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
