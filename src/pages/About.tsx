import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Leaf,
  TreePine,
  Globe,
  History,
  HeartHandshake,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Check,
  Users,
  BookOpen,
  LeafyGreen,
  Sprout,
  ChevronDown
} from 'lucide-react';
import AudioButton from '@/components/AudioButton';

const About = () => {
  const navigate = useNavigate();
  const coreValues = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We prioritize eco-conscious practices and minimal environmental impact in all our initiatives.',
      audioText: 'Sustainability. We prioritize eco-conscious practices and minimal environmental impact in all our initiatives.'
    },
    {
      icon: TreePine,
      title: 'Rewilding',
      description: 'Dedicated to restoring native ecosystems and protecting biodiversity in St. Margaret\'s Bay.',
      audioText: 'Rewilding. Dedicated to restoring native ecosystems and protecting biodiversity in St. Margaret\'s Bay.'
    },
    {
      icon: HeartHandshake,
      title: 'Community',
      description: 'Fostering strong connections between people and nature through inclusive participation.',
      audioText: 'Community. Fostering strong connections between people and nature through inclusive participation.'
    },
    {
      icon: Globe,
      title: 'Education',
      description: 'Empowering visitors with knowledge about sustainable living and conservation practices.',
      audioText: 'Education. Empowering visitors with knowledge about sustainable living and conservation practices.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/hero-woodland.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <Leaf className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                About <span className="text-primary">Woodland Conservation</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                The Woodland Conservation Site is dedicated to preserving and restoring the natural environment of
                St. Margaret's Bay, Nova Scotia. Our project aims to rewild the land, protect biodiversity, and
                educate visitors about sustainable living and eco-conscious practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <AudioButton
                  text="About Woodland Conservation. Preserving and restoring the natural environment of St. Margaret's Bay, Nova Scotia."
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium text-base transition-all duration-300"
                />
                <Button
                  variant="outline"
                  className="gap-2 border-2 text-foreground hover:bg-primary/90 hover:text-primary-foreground hover:border-primary px-6 py-3 rounded-full font-medium text-base transition-all duration-300"
                  onClick={() => {
                    const isMobile = window.innerWidth < 768; // Standard breakpoint for mobile
                    window.scrollTo({
                      top: window.innerHeight * (isMobile ? 0.75 : 0.9),
                      behavior: 'smooth'
                    });
                  }}
                >
                  <ChevronDown className="w-4 h-4" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Mission */}
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
                  <LeafyGreen className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Our Mission
                  <AudioButton
                    text="Our Mission. Our mission is to protect and enhance Nova Scotia's woodland ecosystems through education, restoration, and community engagement."
                    className="ml-3 inline-flex"
                  />
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg text-foreground leading-relaxed">
                Our mission is to protect and enhance Nova Scotia's woodland ecosystems through education,
                restoration, and community engagement. We believe in reconnecting people with nature while
                ensuring the long-term health of the environment.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Project Background */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4 text-sm font-medium py-1 px-3 border-primary/20 text-primary bg-primary/5">
                Our Journey
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Story
                <AudioButton
                  text="Our Story. The Woodland Conservation project began as an initiative to restore previously disturbed land in St. Margaret's Bay."
                  className="ml-3 inline-flex"
                />
              </h2>
              <div className="space-y-4 text-foreground">
                <p className="leading-relaxed">
                  The Woodland Conservation project began as an initiative to restore previously disturbed land in
                  St. Margaret's Bay. What started as a student-led conservation effort has grown into a
                  collaborative project involving local conservationists, community members, and volunteers.
                </p>
                <p className="leading-relaxed">
                  The site's historical features, including the remains of an old farmhouse and original wells,
                  serve as a reminder of the land's agricultural past and its ongoing transformation into a
                  thriving natural habitat.
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    "Ecological restoration since 2015",
                    "10+ acres of protected land",
                    "Community-driven initiatives"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-muted/30 border border-border/50"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-[url('/src/assets/farmhouse-foundation.jpg')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                    <History className="w-5 h-5 mr-2 text-primary" />
                    Historical Significance
                  </h3>
                  <p className="text-muted-foreground">
                    The farmhouse foundation and wells date back to the 19th century, offering a tangible connection to the region's agricultural heritage.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Philosophy & Values */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-sm font-medium py-1 px-3 border-primary/20 text-primary bg-primary/5">
              Our Foundation
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Philosophy & Values
              <AudioButton
                text="Our Philosophy and Values. We are guided by principles of sustainability, respect for nature, and community engagement."
                className="ml-3 inline-flex"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Guiding principles that shape our approach to conservation and community engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/30 transition-colors group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-xl font-semibold text-foreground no-break">
                            {value.title}
                          </h3>
                          <AudioButton
                            text={value.audioText}
                            className="ml-2 text-muted-foreground hover:text-foreground"
                          />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Involvement */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-border/50">
            <div className="max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-sm font-medium py-1 px-3 border-primary/20 text-primary bg-primary/5">
                Get Involved
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Join Our Community
                <AudioButton
                  text="Join Our Community. We believe that conservation is a collective effort. Our community is at the heart of everything we do."
                  className="ml-3 inline-flex"
                />
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-background/50 p-6 rounded-xl border border-border/50 h-full">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      Get Involved
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Volunteer for conservation workdays and events",
                        "Contribute to our community photo gallery",
                        "Participate in citizen science projects",
                        "Attend workshops and educational programs"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-background/50 p-6 rounded-xl border border-border/50 h-full">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <Sprout className="w-5 h-5 mr-2 text-primary" />
                      Accessibility
                    </h3>
                    <p className="text-foreground mb-4">
                      We are committed to making our site and programs accessible to everyone. Our website includes:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Audio descriptions of all content",
                        "Adjustable text sizes and high contrast",
                        "Keyboard navigation support"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="relative overflow-hidden rounded-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[url('/src/assets/hero-woodland.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="relative bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
              <div className="text-center">
                <Badge
                  variant="outline"
                  className="mb-4 text-sm font-medium py-1 px-3 border-primary/20 text-primary bg-primary/5"
                >
                  Get In Touch
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Learn More About Our Conservation Work?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Contact us to schedule a visit, volunteer, or support our conservation efforts.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-primary/20 hover:border-primary/30"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-primary/20 hover:border-primary/30"
                  >
                    <Mail className="w-4 h-4" />
                    Email Us
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-primary/20 hover:border-primary/30"
                    onClick={() => navigate('/map')}
                  >
                    <MapPin className="w-4 h-4" />
                    Site Map
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;