import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, Target, Heart } from 'lucide-react';
import AudioButton from '@/components/AudioButton';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Environmental Stewardship',
      description: 'We are committed to preserving the natural ecosystem while educating visitors about sustainable practices.',
      audioText: 'Environmental Stewardship. We are committed to preserving the natural ecosystem while educating visitors about sustainable practices.'
    },
    {
      icon: Users,
      title: 'Community Engagement',
      description: 'Building strong partnerships with local communities to ensure long-term conservation success.',
      audioText: 'Community Engagement. Building strong partnerships with local communities to ensure long-term conservation success.'
    },
    {
      icon: Target,
      title: 'Scientific Research',
      description: 'Supporting ongoing research to better understand and protect our woodland ecosystems.',
      audioText: 'Scientific Research. Supporting ongoing research to better understand and protect our woodland ecosystems.'
    },
    {
      icon: Heart,
      title: 'Heritage Preservation',
      description: 'Honoring the historical significance of the land while protecting it for future generations.',
      audioText: 'Heritage Preservation. Honoring the historical significance of the land while protecting it for future generations.'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            About Our Conservation Initiative
            <AudioButton 
              text="About Our Conservation Initiative. Learn about our mission to preserve the woodland ecosystem of St. Margaret's Bay."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dedicated to preserving the unique woodland ecosystem of St. Margaret's Bay through 
            conservation, education, and community engagement.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              Our Mission
              <AudioButton 
                text="Our Mission. To protect and preserve the natural woodland environment of St. Margaret's Bay while providing educational opportunities for visitors to learn about conservation, local ecology, and sustainable practices. We are committed to maintaining the historical significance of the land, including the farmhouse foundation and wells, while creating a space for reflection, learning, and connection with nature."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              To protect and preserve the natural woodland environment of St. Margaret's Bay while 
              providing educational opportunities for visitors to learn about conservation, local ecology, 
              and sustainable practices.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              We are committed to maintaining the historical significance of the land, including the 
              farmhouse foundation and wells, while creating a space for reflection, learning, and 
              connection with nature.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center">
              Our Core Values
              <AudioButton 
                text="Our Core Values section. The principles that guide our conservation efforts."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our conservation efforts and community engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="event-card">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <h3 className="text-xl font-semibold text-foreground no-break">
                          {value.title}
                        </h3>
                        <AudioButton 
                          text={value.audioText}
                          className="ml-2"
                        />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conservation Approach */}
        <section className="mb-16">
          <div className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              Our Conservation Approach
              <AudioButton 
                text="Our Conservation Approach. We employ a holistic approach to woodland conservation that balances environmental protection with educational outreach and historical preservation."
                className="ml-4"
              />
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 no-break">
                  Environmental Protection
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="leading-relaxed">Protecting critical yellow birch habitats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="leading-relaxed">Maintaining wetland ecosystems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="leading-relaxed">Monitoring biodiversity and species health</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="leading-relaxed">Implementing sustainable land management practices</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 no-break">
                  Community Education
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="leading-relaxed">Guided nature walks and educational programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="leading-relaxed">Workshops on sustainable practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="leading-relaxed">Historical interpretation of heritage sites</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="leading-relaxed">Volunteer opportunities for all ages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center justify-center">
              Land History & Heritage
              <AudioButton 
                text="Land History and Heritage. This land has a rich history dating back to the original farming settlement in the 1800s. The remnants of the farmhouse foundation and original wells tell the story of early settlers who worked this land for generations."
                className="ml-4"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              This land has a rich history dating back to the original farming settlement in the 1800s. 
              The remnants of the farmhouse foundation and original wells tell the story of early settlers 
              who worked this land for generations. Today, we honor their legacy while ensuring the land's 
              natural heritage is preserved for future generations to enjoy and learn from.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;