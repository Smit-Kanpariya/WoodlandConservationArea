import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trees, Droplets, Mountain, Clock } from 'lucide-react';
import AudioButton from '@/components/AudioButton';
import yellowBirchImage from '@/assets/yellow-birch.jpg';
import wetlandImage from '@/assets/wetland.jpg';
import farmhouseImage from '@/assets/farmhouse-foundation.jpg';

const Ecosystem = () => {
  const ecosystemFeatures = [
    {
      icon: Trees,
      title: 'Yellow Birch Grove',
      image: yellowBirchImage,
      description: 'The centerpiece of our conservation area features ancient yellow birch trees with their characteristic golden-bronze peeling bark. These trees can live for over 300 years and provide critical habitat for numerous species.',
      specialFeatures: [
        'Ancient trees over 200 years old',
        'Distinctive peeling bark ecosystem',
        'Critical nesting sites for cavity-dwelling birds',
        'Understory of native ferns and wildflowers'
      ],
      audioText: 'Yellow Birch Grove. The centerpiece of our conservation area features ancient yellow birch trees with their characteristic golden-bronze peeling bark. These trees can live for over 300 years and provide critical habitat for numerous species.'
    },
    {
      icon: Droplets,
      title: 'Wetland Sanctuary',
      image: wetlandImage,
      description: 'Our protected wetland areas serve as natural water filtration systems and provide essential habitat for amphibians, waterfowl, and aquatic plants. These ecosystems are crucial for maintaining local biodiversity.',
      specialFeatures: [
        'Natural water filtration system',
        'Breeding grounds for amphibians',
        'Migratory bird stopover point',
        'Native cattails and water lilies'
      ],
      audioText: 'Wetland Sanctuary. Our protected wetland areas serve as natural water filtration systems and provide essential habitat for amphibians, waterfowl, and aquatic plants. These ecosystems are crucial for maintaining local biodiversity.'
    },
    {
      icon: Clock,
      title: 'Historical Artifacts',
      image: farmhouseImage,
      description: 'Archaeological evidence of the original farming settlement includes the stone farmhouse foundation and two historic wells. These artifacts provide insight into early settlement patterns and land use.',
      specialFeatures: [
        'Original farmhouse stone foundation',
        'Two preserved historic wells',
        'Evidence of 19th-century farming practices',
        'Archaeological interpretation site'
      ],
      audioText: 'Historical Artifacts. Archaeological evidence of the original farming settlement includes the stone farmhouse foundation and two historic wells. These artifacts provide insight into early settlement patterns and land use.'
    }
  ];

  const conservationStats = [
    { value: '150+', label: 'Protected Acres', description: 'Total area under active conservation' },
    { value: '12', label: 'Wetland Areas', description: 'Individual wetland habitats preserved' },
    { value: '300+', label: 'Tree Species', description: 'Years of age for our oldest yellow birch' },
    { value: '1800s', label: 'Historical Period', description: 'Era of original settlement' }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            Ecosystem Overview
            <AudioButton 
              text="Ecosystem Overview. Discover the unique features that make St. Margaret's Bay woodland ecosystem special, including yellow birch groves, wetland areas, and historical artifacts."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the unique features that make St. Margaret's Bay woodland ecosystem 
            special and worthy of conservation protection.
          </p>
        </div>

        {/* Quick Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {conservationStats.map((stat, index) => (
              <Card key={index} className="stats-card">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-2">
                    <AudioButton 
                      text={`${stat.value} ${stat.label}. ${stat.description}`}
                    />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1 no-break">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2 no-break">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
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
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
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
                  
                  <CardContent className={`p-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
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
                          <li key={itemIndex} className="flex items-start text-muted-foreground">
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

        {/* Conservation Importance */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
              Why This Ecosystem Matters
              <AudioButton 
                text="Why This Ecosystem Matters. The St. Margaret's Bay woodland represents a unique intersection of natural and cultural heritage. The combination of ancient yellow birch trees, pristine wetlands, and historical artifacts creates an irreplaceable landscape that tells the story of both human settlement and natural succession."
                className="ml-4 bg-white/20 hover:bg-white/30"
                variant="ghost"
              />
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed mb-8">
              The St. Margaret's Bay woodland represents a unique intersection of natural and cultural heritage. 
              The combination of ancient yellow birch trees, pristine wetlands, and historical artifacts creates 
              an irreplaceable landscape that tells the story of both human settlement and natural succession.
            </p>
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              By protecting this ecosystem, we preserve not only biodiversity but also the historical narrative 
              of Nova Scotia's rural heritage for future generations to study, appreciate, and learn from.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ecosystem;