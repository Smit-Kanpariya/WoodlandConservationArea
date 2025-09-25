import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trees, Droplets, MapPin, Camera, Leaf, Users } from 'lucide-react';
import AudioButton from '@/components/AudioButton';
import TypingText from '@/components/TypingText';
import heroImage from '@/assets/hero-woodland.jpg';
import yellowBirchImage from '@/assets/yellow-birch.jpg';
import wetlandImage from '@/assets/wetland.jpg';
import farmhouseImage from '@/assets/farmhouse-foundation.jpg';

const Home = () => {
  const statistics = [
    { icon: Trees, value: '150+', label: 'Protected Acres', description: 'Acres of pristine woodland under conservation' },
    { icon: Droplets, value: '12', label: 'Wetland Areas', description: 'Critical wetland habitats preserved' },
    { icon: Leaf, value: '200+', label: 'Species Documented', description: 'Flora, fauna, and fungi species cataloged' },
    { icon: Users, value: '500+', label: 'Community Members', description: 'Active supporters and volunteers' }
  ];

  const featuredAreas = [
    {
      title: 'Yellow Birch Grove',
      description: 'Ancient yellow birch trees with distinctive peeling bark, creating a unique canopy ecosystem.',
      image: yellowBirchImage,
      audioText: 'Yellow Birch Grove. Ancient yellow birch trees with distinctive peeling bark, creating a unique canopy ecosystem.'
    },
    {
      title: 'Wetland Sanctuary',
      description: 'Pristine wetland areas supporting diverse wildlife and serving as natural water filtration systems.',
      image: wetlandImage,
      audioText: 'Wetland Sanctuary. Pristine wetland areas supporting diverse wildlife and serving as natural water filtration systems.'
    },
    {
      title: 'Historical Foundation',
      description: 'Archaeological remnants of the original farmhouse and wells, preserving local heritage.',
      image: farmhouseImage,
      audioText: 'Historical Foundation. Archaeological remnants of the original farmhouse and wells, preserving local heritage.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="hero-overlay absolute inset-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 no-break">
              Experience{' '}
              <TypingText 
                words={['Peace', 'Excitement', 'Nature', 'Community']}
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
            Preserve and explore the unique woodland ecosystem of St. Margaret's Bay
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
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
              Conservation Impact
              <AudioButton 
                text="Conservation Impact section. Our statistics showing the scope of our conservation efforts."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our commitment to preserving Nova Scotia's woodland heritage
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="stats-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <AudioButton 
                      text={`${stat.value} ${stat.label}. ${stat.description}`}
                      className="ml-2"
                    />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2 no-break">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2 no-break">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Areas Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
              Featured Conservation Areas
              <AudioButton 
                text="Featured Conservation Areas. Explore our key protected habitats and historical sites."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the unique ecosystems and historical significance of our protected lands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAreas.map((area, index) => (
              <Card key={index} className="event-card">
                <div className="relative">
                  <img 
                    src={area.image} 
                    alt={area.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <AudioButton 
                      text={area.audioText}
                      className="bg-black/20 hover:bg-black/40"
                      variant="ghost"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg mb-1 no-break">
                      {area.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      Locate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Camera className="w-4 h-4 mr-2" />
                      Gallery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center justify-center">
            Join Our Conservation Efforts
            <AudioButton 
              text="Join Our Conservation Efforts. Help us preserve this unique woodland ecosystem for future generations."
              className="ml-4 bg-white/20 hover:bg-white/30"
              variant="ghost"
            />
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
            Help us preserve this unique woodland ecosystem for future generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-3"
            >
              Become a Member
            </Button>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
            >
              Plan a Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;