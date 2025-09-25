import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Trees, MapPin, Phone, Mail } from 'lucide-react';
import AudioButton from '@/components/AudioButton';

const NaturalBurial = () => {
  const markerOptions = [
    {
      name: 'Native Stone Marker',
      description: 'Locally sourced fieldstone with simple engraving',
      price: 'From $350',
      features: ['Weather-resistant engraving', 'Blends with natural landscape', 'Minimal environmental impact']
    },
    {
      name: 'Wooden Memorial',
      description: 'Sustainably harvested local wood marker',
      price: 'From $200',
      features: ['Biodegradable over time', 'Hand-carved options', 'Returns to earth naturally']
    },
    {
      name: 'Tree Memorial',
      description: 'Native tree planted as living memorial',
      price: 'From $150',
      features: ['Living memorial that grows', 'Contributes to ecosystem', 'Long-lasting tribute']
    },
    {
      name: 'No Marker',
      description: 'Return to earth without permanent marking',
      price: 'No additional cost',
      features: ['Completely natural', 'GPS coordinates provided', 'Minimal environmental impact']
    }
  ];

  const containerOptions = [
    {
      name: 'Biodegradable Shroud',
      description: 'Natural fiber shroud that decomposes completely',
      price: 'From $150',
      eco: 'Fastest decomposition'
    },
    {
      name: 'Wooden Casket',
      description: 'Locally crafted from sustainable wood',
      price: 'From $800',
      eco: 'Sustainable materials'
    },
    {
      name: 'Woven Basket',
      description: 'Handwoven from natural materials',
      price: 'From $400',
      eco: 'Traditional craft methods'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            Natural Burial
            <AudioButton 
              text="Natural Burial. Return to the earth in harmony with nature in our dedicated conservation burial ground, where your final resting place contributes to the preservation of this woodland ecosystem."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Return to the earth in harmony with nature in our dedicated conservation burial ground, 
            where your final resting place contributes to the preservation of this woodland ecosystem.
          </p>
        </div>

        {/* Definition Section */}
        <section className="mb-16">
          <Card className="bg-muted/30">
            <CardContent className="p-8">
              <div className="flex items-start">
                <Heart className="w-8 h-8 text-primary mr-6 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                    What is Natural Burial?
                    <AudioButton 
                      text="What is Natural Burial? Natural burial is an environmentally sustainable way of caring for the dead that allows the body to decompose naturally in the earth, contributing nutrients to the soil and supporting the forest ecosystem."
                      className="ml-4"
                    />
                  </h2>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Natural burial is an environmentally sustainable way of caring for the dead that 
                    allows the body to decompose naturally in the earth, contributing nutrients to the 
                    soil and supporting the forest ecosystem.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 no-break">Key Principles:</h3>
                      <ul className="text-muted-foreground space-y-2">
                        <li>• No embalming chemicals</li>
                        <li>• Biodegradable materials only</li>
                        <li>• Shallow burial (3-4 feet)</li>
                        <li>• Minimal landscape disturbance</li>
                        <li>• Conservation land protection</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 no-break">Environmental Benefits:</h3>
                      <ul className="text-muted-foreground space-y-2">
                        <li>• Protects groundwater</li>
                        <li>• Preserves natural habitat</li>
                        <li>• Reduces carbon footprint</li>
                        <li>• Supports wildlife</li>
                        <li>• Creates living memorial</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Marker Options */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center">
              Memorial Marker Options
              <AudioButton 
                text="Memorial Marker Options. Choose from various environmentally appropriate ways to mark your loved one's resting place."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from various environmentally appropriate ways to mark your loved one's resting place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {markerOptions.map((option, index) => (
              <Card key={index} className="event-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground no-break">
                      {option.name}
                    </h3>
                    <AudioButton 
                      text={`${option.name}. ${option.description}. Price ${option.price}.`}
                      size="sm"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {option.description}
                  </p>
                  <div className="text-primary font-semibold mb-4 no-break">
                    {option.price}
                  </div>
                  <ul className="space-y-1">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-muted-foreground flex items-start">
                        <span className="text-primary mr-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Container Options */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center">
              Body Container Options
              <AudioButton 
                text="Body Container Options. All containers are made from natural, biodegradable materials that return to the earth."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All containers are made from natural, biodegradable materials that return to the earth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {containerOptions.map((option, index) => (
              <Card key={index} className="event-card">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground no-break">
                      {option.name}
                    </h3>
                    <AudioButton 
                      text={`${option.name}. ${option.description}. Price ${option.price}. Environmental feature: ${option.eco}.`}
                    />
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {option.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold no-break">
                      {option.price}
                    </span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {option.eco}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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
                  <h3 className="text-lg font-semibold mb-4 no-break">Available Options:</h3>
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
                  <h3 className="text-lg font-semibold mb-4 no-break">Pricing Structure:</h3>
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

        {/* Contact Form */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center">
              Request More Information
              <AudioButton 
                text="Request More Information. Contact us to learn more about natural burial options and to schedule a visit to our conservation burial ground."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contact us to learn more about natural burial options and to schedule a visit to our conservation burial ground
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="event-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 no-break">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <span className="text-foreground no-break">+1 (902) 555-0123</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <span className="text-foreground no-break">burial@woodlandconservation.ca</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3" />
                    <span className="text-foreground">St. Margaret's Bay Conservation Area</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Button size="lg" className="w-full">
                    Schedule a Visit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="event-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 no-break">
                  Information Request Form
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent" 
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent" 
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent" 
                      placeholder="(902) 555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent" 
                      rows={4}
                      placeholder="Tell us about your specific needs or questions..."
                    />
                  </div>
                  <Button size="lg" className="w-full">
                    Send Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NaturalBurial;