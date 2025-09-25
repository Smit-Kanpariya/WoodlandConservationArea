import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Bird, Bug, Search } from 'lucide-react';
import AudioButton from '@/components/AudioButton';

const Species = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Species', icon: Search, count: 45 },
    { id: 'flora', name: 'Flora', icon: Leaf, count: 28 },
    { id: 'fauna', name: 'Fauna', icon: Bird, count: 12 },
    { id: 'fungi', name: 'Fungi', icon: Bug, count: 5 }
  ];

  const species = [
    {
      id: 1,
      name: 'Yellow Birch',
      scientificName: 'Betula alleghaniensis',
      category: 'flora',
      status: 'Common',
      description: 'Distinctive tree with golden-bronze peeling bark, native to eastern North America. Can live over 300 years.',
      habitat: 'Well-drained soils, mixed forests',
      conservation: 'Stable',
      audioText: 'Yellow Birch, scientific name Betula alleghaniensis. Distinctive tree with golden-bronze peeling bark, native to eastern North America. Can live over 300 years. Found in well-drained soils and mixed forests. Conservation status is stable.'
    },
    {
      id: 2,
      name: 'Red Squirrel',
      scientificName: 'Tamiasciurus hudsonicus',
      category: 'fauna',
      status: 'Common',
      description: 'Small, energetic squirrel with reddish-brown fur. Important seed disperser for coniferous trees.',
      habitat: 'Coniferous and mixed forests',
      conservation: 'Stable',
      audioText: 'Red Squirrel, scientific name Tamiasciurus hudsonicus. Small, energetic squirrel with reddish-brown fur. Important seed disperser for coniferous trees. Found in coniferous and mixed forests. Conservation status is stable.'
    },
    {
      id: 3,
      name: 'Wild Ginger',
      scientificName: 'Asarum canadense',
      category: 'flora',
      status: 'Uncommon',
      description: 'Low-growing woodland plant with heart-shaped leaves and hidden burgundy flowers.',
      habitat: 'Rich, moist woodland floors',
      conservation: 'Monitored',
      audioText: 'Wild Ginger, scientific name Asarum canadense. Low-growing woodland plant with heart-shaped leaves and hidden burgundy flowers. Found in rich, moist woodland floors. Conservation status is monitored.'
    },
    {
      id: 4,
      name: 'Oyster Mushroom',
      scientificName: 'Pleurotus ostreatus',
      category: 'fungi',
      status: 'Seasonal',
      description: 'Edible bracket fungus that grows on deciduous trees, helping decompose dead wood.',
      habitat: 'Dead or dying hardwood trees',
      conservation: 'Stable',
      audioText: 'Oyster Mushroom, scientific name Pleurotus ostreatus. Edible bracket fungus that grows on deciduous trees, helping decompose dead wood. Found on dead or dying hardwood trees. Conservation status is stable.'
    },
    {
      id: 5,
      name: 'Wood Duck',
      scientificName: 'Aix sponsa',
      category: 'fauna',
      status: 'Migratory',
      description: 'Colorful waterfowl that nests in tree cavities near wetlands. Males have distinctive iridescent plumage.',
      habitat: 'Wooded wetlands, ponds',
      conservation: 'Recovered',
      audioText: 'Wood Duck, scientific name Aix sponsa. Colorful waterfowl that nests in tree cavities near wetlands. Males have distinctive iridescent plumage. Found in wooded wetlands and ponds. Conservation status is recovered.'
    },
    {
      id: 6,
      name: 'Trillium',
      scientificName: 'Trillium grandiflorum',
      category: 'flora',
      status: 'Protected',
      description: 'Iconic spring wildflower with three white petals that turn pink with age. Symbol of Ontario.',
      habitat: 'Rich, deciduous forests',
      conservation: 'Protected',
      audioText: 'Trillium, scientific name Trillium grandiflorum. Iconic spring wildflower with three white petals that turn pink with age. Symbol of Ontario. Found in rich, deciduous forests. Conservation status is protected.'
    }
  ];

  const filteredSpecies = selectedCategory === 'all' 
    ? species 
    : species.filter(item => item.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'protected': return 'text-destructive';
      case 'monitored': return 'text-accent';
      case 'recovered': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            Flora, Fauna & Fungi
            <AudioButton 
              text="Flora, Fauna and Fungi. Discover the diverse species that call our woodland conservation area home. From ancient yellow birch trees to migratory birds and native wildflowers."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the diverse species that call our woodland conservation area home. 
            From ancient yellow birch trees to migratory birds and native wildflowers.
          </p>
        </div>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="no-break"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </section>

        {/* Species Information */}
        <section className="mb-12">
          <Card className="bg-muted/30">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                About Our Species Documentation
                <AudioButton 
                  text="About Our Species Documentation. Our ongoing research and documentation efforts help us understand the biodiversity of this unique ecosystem and track changes over time."
                  className="ml-2"
                />
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our ongoing research and documentation efforts help us understand the biodiversity 
                of this unique ecosystem and track changes over time. Each species plays a crucial 
                role in maintaining the ecological balance of our woodland conservation area.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">28</div>
                  <div className="text-sm font-medium text-foreground no-break">Flora Species</div>
                  <div className="text-xs text-muted-foreground">Trees, shrubs, wildflowers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">12</div>
                  <div className="text-sm font-medium text-foreground no-break">Fauna Species</div>
                  <div className="text-xs text-muted-foreground">Birds, mammals, amphibians</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">5</div>
                  <div className="text-sm font-medium text-foreground no-break">Fungi Species</div>
                  <div className="text-xs text-muted-foreground">Mushrooms, bracket fungi</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Species Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecies.map((item) => (
              <Card key={item.id} className="event-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1 no-break">
                        {item.name}
                      </h3>
                      <p className="text-sm italic text-muted-foreground mb-2">
                        {item.scientificName}
                      </p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-primary/10 ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <AudioButton 
                      text={item.audioText}
                      className="ml-2"
                    />
                  </div>

                  {/* Placeholder for species image */}
                  <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-md mb-4 flex items-center justify-center">
                    {item.category === 'flora' && <Leaf className="w-8 h-8 text-primary" />}
                    {item.category === 'fauna' && <Bird className="w-8 h-8 text-primary" />}
                    {item.category === 'fungi' && <Bug className="w-8 h-8 text-primary" />}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-foreground no-break">Habitat: </span>
                      <span className="text-xs text-muted-foreground">{item.habitat}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-foreground no-break">Conservation: </span>
                      <span className={`text-xs ${getStatusColor(item.conservation)}`}>
                        {item.conservation}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Participation */}
        <section className="mt-16">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
              Contribute to Species Research
              <AudioButton 
                text="Contribute to Species Research. Help us document and monitor the species in our conservation area by reporting sightings, submitting photos, and participating in citizen science initiatives."
                className="ml-4 bg-white/20 hover:bg-white/30"
                variant="ghost"
              />
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              Help us document and monitor the species in our conservation area by reporting sightings, 
              submitting photos, and participating in citizen science initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-3"
              >
                Report a Sighting
              </Button>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
              >
                Join Research Program
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Species;