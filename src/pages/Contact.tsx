import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import AudioButton from "@/components/AudioButton";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (902) 555-0123",
      description: "Call us during business hours for immediate assistance",
      audioText:
        "Phone contact. Call us at +1 (902) 555-0123 during business hours for immediate assistance.",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@wcs.com",
      description: "Send us an email and we'll respond within 24 hours",
      audioText:
        "Email contact. Send us an email at info@wcs.com and we will respond within 24 hours.",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "St. Margaret's Bay Conservation Area",
      description: "Located 45 minutes from downtown Halifax",
      audioText:
        "Visit us at St. Margaret's Bay Conservation Area, located 45 minutes from downtown Halifax.",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Daily: Sunrise to Sunset",
      description: "Office hours: Mon-Fri 9AM-5PM",
      audioText:
        "Hours. The conservation area is open daily from sunrise to sunset. Office hours are Monday through Friday, 9 AM to 5 PM.",
    },
  ];

  const inquiryTypes = [
    "General Information",
    "Visit Planning",
    "Educational Programs",
    "Natural Burial",
    "Conservation Membership",
    "Volunteer Opportunities",
    "Research Collaboration",
    "Media Inquiry",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend service
    alert("Thank you for your message! We'll respond within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/hero-woodland.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                Get In Touch
              </Badge>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Contact <span className="text-primary">Our Team</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Reach out to our conservation team for information about
                visiting, volunteering, educational programs, or any questions
                about our woodland conservation efforts.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button size="lg" className="gap-2">
                  Explore Options
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Visit Our Grounds
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"></div>

      {/* Contact Methods */}
      <section className="relative mb-16 py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/src/assets/pattern.svg')] opacity-5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border/50 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 no-break">
                    {method.title}
                  </h3>
                  <div className="text-xl font-bold text-foreground mb-2 no-break">
                    {method.details}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>
                  <div className="mt-4">
                    <AudioButton
                      text={method.audioText}
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

      {/* Contact Form */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Request More Information
                </h2>
                <p className="text-muted-foreground">
                  Contact us to learn more about our conservation efforts,
                  visiting opportunities, and how you can get involved.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="interest"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    I'm interested in:
                  </label>
                  <select
                    id="interest"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none transition-colors"
                  >
                    <option value="">Select an option</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Your Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none transition-colors"
                    placeholder="Please share any questions or specific information you're looking for..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary/50"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="newsletter"
                      className="text-muted-foreground"
                    >
                      Sign up for our newsletter to receive updates about our
                      conservation efforts and natural burial information.
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Your information will only be used to
                  respond to your inquiry and provide the requested information.
                </p>
              </form>
            </div>
          </motion.div>
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
                  <strong>Conservation Area Emergency:</strong> +1 (902)
                  555-9999
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our conservation area has cellular coverage in most areas.
                  Emergency services are familiar with our location. GPS
                  coordinates are posted at major trail intersections.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Contact;
