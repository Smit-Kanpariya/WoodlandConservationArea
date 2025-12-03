import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Trees,
  MapPin,
  Phone,
  Mail,
  Leaf,
  Info,
  Shield,
  ChevronRight,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import AudioButton from "@/components/AudioButton";

const NaturalBurial = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const scrollToOptions = () => {
    if (scrollTargetRef.current) {
      const offset = window.innerHeight * 2.35; // Scroll down by 2 viewport heights
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  const markerOptions = [
    {
      name: "Native Stone Marker",
      description: "Locally sourced fieldstone with simple engraving",
      price: "From $350",
      features: [
        "Weather-resistant engraving",
        "Blends with natural landscape",
        "Minimal environmental impact",
      ],
    },
    {
      name: "Wooden Memorial",
      description: "Sustainably harvested local wood marker",
      price: "From $200",
      features: [
        "Biodegradable over time",
        "Hand-carved options",
        "Returns to earth naturally",
      ],
    },
    {
      name: "Tree Memorial",
      description: "Native tree planted as living memorial",
      price: "From $150",
      features: [
        "Living memorial that grows",
        "Contributes to ecosystem",
        "Long-lasting tribute",
      ],
    },
    {
      name: "No Marker",
      description: "Return to earth without permanent marking",
      price: "No additional cost",
      features: [
        "Completely natural",
        "GPS coordinates provided",
        "Minimal environmental impact",
      ],
    },
  ];

  const containerOptions = [
    {
      name: "Biodegradable Shroud",
      description: "Natural fiber shroud that decomposes completely",
      price: "From $150",
      eco: "Fastest decomposition",
    },
    {
      name: "Wooden Casket",
      description: "Locally crafted from sustainable wood",
      price: "From $800",
      eco: "Sustainable materials",
    },
    {
      name: "Woven Basket",
      description: "Handwoven from natural materials",
      price: "From $400",
      eco: "Traditional craft methods",
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
                Natural Return
              </Badge>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary">Natural Burial</span> Services
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Return to the earth in harmony with nature in our dedicated
                conservation burial ground, where your final resting place
                contributes to the preservation of this woodland ecosystem.
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
                  onClick={scrollToOptions}
                >
                  Explore Options
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="gap-2"
                >
                  <Link to="/map" className="flex items-center no-underline">
                    <MapPin className="w-4 h-4" />
                    Visit Our Grounds
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll target for the Explore Options button */}
      <div ref={scrollTargetRef}></div>

      {/* CTA Section */}
      <motion.section
        className="relative overflow-hidden rounded-2xl my-16 bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-primary/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('/src/assets/hero-woodland.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Learn More About Natural Burial?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Contact us to schedule a consultation or tour of our
                conservation burial grounds. Our compassionate team is here to
                answer all your questions about natural burial options.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <Phone className="w-4 h-4" />
                  (902) 555-0199
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-primary/20 hover:border-primary/30"
                >
                  <Mail className="w-4 h-4" />
                  info@woodlandconservation.ca
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Definition Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-muted/30 border-primary/20 hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Leaf className="w-5 h-5" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  What is Natural Burial?
                </CardTitle>
                <div className="ml-auto">
                  <AudioButton
                    text="What is Natural Burial? Natural burial is an environmentally sustainable way of caring for the dead that allows the body to decompose naturally in the earth, contributing nutrients to the soil and supporting the forest ecosystem."
                    size="sm"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Natural burial is an environmentally sustainable way of caring
                for the dead that allows the body to decompose naturally in the
                earth, contributing nutrients to the soil and supporting the
                forest ecosystem.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Key Principles
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "No embalming chemicals",
                      "Biodegradable materials only",
                      "Shallow burial (3-4 feet)",
                      "Minimal landscape disturbance",
                      "Conservation land protection",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Environmental Benefits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Protects groundwater",
                      "Preserves natural habitat",
                      "Reduces carbon footprint",
                      "Supports wildlife",
                      "Creates living memorial",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Marker Options */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-sm font-medium py-1 px-3 border-primary/20 text-primary bg-primary/5"
            >
              Memorialization
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Memorial Marker Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from various environmentally appropriate ways to mark your
              loved one's resting place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {markerOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow border-primary/10">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {option.name}
                      </h3>
                      <AudioButton
                        text={`${option.name}. ${option.description}. Price ${option.price}.`}
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {option.description}
                    </p>
                    <div className="text-primary font-semibold mb-4 text-lg">
                      {option.price}
                    </div>
                    <ul className="space-y-2 mt-2">
                      {option.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <span className="text-primary mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full border-primary/20 hover:border-primary/30"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Container Options */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-sm font-medium py-1 px-3 border-primary/20 text-primary bg-primary/5"
            >
              Eco-Friendly Options
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Body Container Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All containers are made from natural, biodegradable materials that
              return to the earth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {containerOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow border-primary/10 group">
                  <div className="p-1 bg-gradient-to-r from-primary/5 to-primary/10 h-1.5 rounded-t-lg w-0 group-hover:w-full transition-all duration-500"></div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        {option.name}
                      </h3>
                      <AudioButton
                        text={`${option.name}. ${option.description}. Price ${option.price}. Environmental feature: ${option.eco}.`}
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      {option.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-primary font-semibold text-lg">
                        {option.price}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {option.eco}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full border-primary/20 hover:border-primary/30"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Family Plot Options */}
        <section className="mb-16">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                Family Plot Options
                <AudioButton
                  text="Family Plot Options. Create a lasting family legacy in our conservation burial ground with dedicated family areas."
                  className="ml-4 bg-white/20 hover:bg-white/30"
                  variant="ghost"
                />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 no-break">
                    Available Options:
                  </h3>
                  <ul className="space-y-3 text-primary-foreground/90">
                    <li className="flex items-start">
                      <Trees className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Adjacent burial sites for family members</span>
                    </li>
                    <li className="flex items-start">
                      <Trees className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Shared memorial tree or garden area</span>
                    </li>
                    <li className="flex items-start">
                      <Trees className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Reserved plots for future family members</span>
                    </li>
                    <li className="flex items-start">
                      <Trees className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                      <span>GPS coordinates for easy location</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 no-break">
                    Pricing Structure:
                  </h3>
                  <div className="space-y-3 text-primary-foreground/90">
                    <div className="flex justify-between items-center">
                      <span>Single plot</span>
                      <span className="font-semibold">$1,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Family plot (4 sites)</span>
                      <span className="font-semibold">$4,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Extended family (8 sites)</span>
                      <span className="font-semibold">$7,000</span>
                    </div>
                    <div className="text-sm mt-4 text-primary-foreground/80">
                      Prices include perpetual care and conservation easement
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Process Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-0.5">
            <div className="bg-background rounded-2xl p-1">
              <Card className="border-0 bg-transparent">
                <CardHeader className="text-center pt-12 pb-8 px-4 sm:px-6">
                  <Badge
                    variant="outline"
                    className="mb-4 text-sm font-medium py-1 px-3 border-primary/20 text-primary bg-primary/5 mx-auto"
                  >
                    Our Process
                  </Badge>
                  <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    The Natural Burial Process
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A respectful, eco-friendly approach that honors both your
                    loved one and the environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-12 px-4 sm:px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Initial Consultation",
                        description:
                          "Meet with our burial coordinator to discuss your wishes and learn about the process.",
                        icon: <Phone className="w-5 h-5" />,
                      },
                      {
                        title: "Site Selection",
                        description:
                          "Choose a burial location within our conservation area that speaks to you.",
                        icon: <MapPin className="w-5 h-5" />,
                      },
                      {
                        title: "Preparation",
                        description:
                          "We guide you through the necessary preparations and documentation.",
                        icon: <Info className="w-5 h-5" />,
                      },
                      {
                        title: "The Service",
                        description:
                          "A personalized ceremony that honors your loved one and nature.",
                        icon: <Heart className="w-5 h-5" />,
                      },
                      {
                        title: "Natural Return",
                        description:
                          "The body returns to the earth, contributing to the ecosystem.",
                        icon: <Leaf className="w-5 h-5" />,
                      },
                      {
                        title: "Living Memorial",
                        description:
                          "The site becomes part of the protected conservation area in perpetuity.",
                        icon: <Shield className="w-5 h-5" />,
                      },
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="h-full bg-background p-6 rounded-xl border border-border hover:border-primary/20 transition-colors group-hover:shadow-sm">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            {step.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                            <span className="text-primary mr-2">
                              0{index + 1}.
                            </span>{" "}
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Family Plot Options */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Badge
                  variant="outline"
                  className="mb-4 text-sm font-medium py-1 px-3 border-primary/20 text-primary bg-primary/5"
                >
                  Family Plots
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Family Burial Plots
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Create a lasting family legacy while preserving nature
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Family Burial Areas
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We offer dedicated family burial areas where multiple
                    generations can rest together in harmony with nature. These
                    plots allow families to create a natural memorial space that
                    will be preserved in perpetuity.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          Conservation-Focused
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Plots are designed to minimize environmental impact
                          and support local ecosystems
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          Native Landscaping
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Only native plants and natural materials are used for
                          landscaping
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          Perpetual Care
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Plots are maintained according to conservation
                          principles forever
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Conservation Guidelines
                  </h3>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Only biodegradable materials are permitted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Grave markers must be flush with the ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Native plants are encouraged for landscaping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>No permanent structures or non-native plants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Minimal ground disturbance during interments</span>
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <Info className="w-4 h-4 inline-block mr-1.5 text-primary" />
                      All family plots are subject to our conservation easement
                      requirements to ensure the long-term protection of the
                      land.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default NaturalBurial;
