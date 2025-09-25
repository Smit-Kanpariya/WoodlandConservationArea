import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import AudioButton from '@/components/AudioButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (902) 555-0123',
      description: 'Call us during business hours for immediate assistance',
      audioText: 'Phone contact. Call us at +1 (902) 555-0123 during business hours for immediate assistance.'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@woodlandconservation.ca',
      description: 'Send us an email and we\'ll respond within 24 hours',
      audioText: 'Email contact. Send us an email at info@woodlandconservation.ca and we will respond within 24 hours.'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'St. Margaret\'s Bay Conservation Area',
      description: 'Located 45 minutes from downtown Halifax',
      audioText: 'Visit us at St. Margaret\'s Bay Conservation Area, located 45 minutes from downtown Halifax.'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Daily: Sunrise to Sunset',
      description: 'Office hours: Mon-Fri 9AM-5PM',
      audioText: 'Hours. The conservation area is open daily from sunrise to sunset. Office hours are Monday through Friday, 9 AM to 5 PM.'
    }
  ];

  const inquiryTypes = [
    'General Information',
    'Visit Planning',
    'Educational Programs',
    'Natural Burial',
    'Conservation Membership',
    'Volunteer Opportunities',
    'Research Collaboration',
    'Media Inquiry'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend service
    alert('Thank you for your message! We\'ll respond within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            Contact Us
            <AudioButton 
              text="Contact Us. Get in touch with our conservation team for information about visiting, volunteering, educational programs, or any questions about our woodland conservation efforts."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get in touch with our conservation team for information about visiting, volunteering, 
            educational programs, or any questions about our woodland conservation efforts.
          </p>
        </div>

        {/* Contact Methods */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="stats-card text-center">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <AudioButton 
                      text={method.audioText}
                      className="ml-2"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 no-break">
                    {method.title}
                  </h3>
                  <p className="text-primary font-medium mb-2 no-break">
                    {method.details}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="event-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  Send Us a Message
                  <AudioButton 
                    text="Send Us a Message. Fill out this contact form and we will get back to you within 24 hours."
                    className="ml-4"
                  />
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
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
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent" 
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent" 
                        placeholder="(902) 555-0123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Inquiry Type
                      </label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select a topic</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent" 
                      rows={6}
                      placeholder="Tell us about your inquiry, questions, or how we can help you..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Location and Directions */}
            <div className="space-y-8">
              {/* Location Map Placeholder */}
              <Card className="event-card">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/10 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground font-medium">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">Visit our Site Map page for detailed navigation</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      Find Us
                      <AudioButton 
                        text="Find Us. We are located in the St. Margaret's Bay area, approximately 45 minutes southwest of Halifax along scenic coastal routes."
                        className="ml-2"
                      />
                    </h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p className="leading-relaxed">
                        Located in the scenic St. Margaret's Bay area, approximately 45 minutes 
                        southwest of Halifax along scenic coastal routes.
                      </p>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        <span className="no-break">GPS Coordinates available on request</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Directions */}
              <Card className="event-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    Directions
                    <AudioButton 
                      text="Directions. From Halifax, take Highway 3 towards St. Margaret's Bay. Follow signs for the conservation area. Detailed directions will be provided upon booking or inquiry."
                      className="ml-2"
                    />
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-2 no-break">From Halifax:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                        <li>Take Highway 3 (St. Margaret's Bay Road) southwest</li>
                        <li>Continue for approximately 35 km</li>
                        <li>Look for conservation area signs</li>
                        <li>Turn right at the marked entrance</li>
                        <li>Follow the gravel road to the parking area</li>
                      </ol>
                    </div>
                    <div className="bg-muted/30 p-3 rounded">
                      <p className="text-xs text-muted-foreground">
                        <strong>Note:</strong> Detailed directions and GPS coordinates will be provided 
                        upon booking or inquiry. Some areas require 4WD access during certain seasons.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card className="event-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    Quick Information
                    <AudioButton 
                      text="Quick Information. Frequently asked questions and important details about visiting our conservation area."
                      className="ml-2"
                    />
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MessageSquare className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground no-break">Parking Available</p>
                        <p className="text-xs text-muted-foreground">Free parking at the trailhead</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MessageSquare className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground no-break">Accessibility</p>
                        <p className="text-xs text-muted-foreground">Some trails are wheelchair accessible</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MessageSquare className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground no-break">Guided Tours</p>
                        <p className="text-xs text-muted-foreground">Available by appointment</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MessageSquare className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground no-break">Group Visits</p>
                        <p className="text-xs text-muted-foreground">Educational programs for schools</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <Card className="bg-destructive/10 border-destructive/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-destructive mb-4 flex items-center">
                Emergency Contact Information
                <AudioButton 
                  text="Emergency Contact Information. For emergencies while visiting our conservation area, call 911 immediately. For non-emergency assistance, contact our emergency line at +1 (902) 555-9999."
                  className="ml-4"
                />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-foreground mb-2">
                    <strong>For Emergencies:</strong> Call 911 immediately
                  </p>
                  <p className="text-foreground">
                    <strong>Conservation Area Emergency:</strong> +1 (902) 555-9999
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our conservation area has cellular coverage in most areas. Emergency services 
                    are familiar with our location. GPS coordinates are posted at major trail intersections.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;