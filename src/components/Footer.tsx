import React from "react";
import { MapPin, Phone, Mail, Leaf, Trees, Mountain, Map, Home, LeafyGreen, Camera, LeafyGreen as LeafyGreenIcon, Map as MapIcon, MessageCircle, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import AudioButton from "./AudioButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "About", path: "/about", icon: <Leaf className="w-4 h-4 mr-2" /> },
    { name: "Eco-System", path: "/ecosystem", icon: <Trees className="w-4 h-4 mr-2" /> },
    { name: "Gallery", path: "/gallery", icon: <Camera className="w-4 h-4 mr-2" /> },
    { name: "Flora/Fauna/Fungi", path: "/species", icon: <LeafyGreenIcon className="w-4 h-4 mr-2" /> },
    { name: "Natural Burial", path: "/burial", icon: <Mountain className="w-4 h-4 mr-2" /> },
    { name: "Shop", path: "/shop", icon: <ShoppingCart className="w-4 h-4 mr-2" /> },
    { name: "Site Map", path: "/map", icon: <MapIcon className="w-4 h-4 mr-2" /> },
    { name: "Contact", path: "/contact", icon: <MessageCircle className="w-4 h-4 mr-2" /> },
  ];

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Woodland Conservation" className="h-12 w-auto" />
              <span className="text-xl font-bold">Woodland Conservation</span>
            </div>
            <p className="text-sm text-primary-foreground/90">
              Preserving and protecting the unique woodland ecosystem of St. Margaret's Bay for future generations through conservation, education, and sustainable practices.
            </p>
            <div className="pt-2">
              <AudioButton
                text="Our Mission. Preserving and protecting the unique woodland ecosystem of St. Margaret's Bay for future generations through conservation, education, and sustainable practices."
                className="w-8 h-8 p-0 text-primary-foreground/80 hover:text-primary-foreground"
                variant="ghost"
                size="sm"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-primary-foreground/20">Quick Links</h3>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-200"
                >
                  {React.cloneElement(item.icon, { className: "w-4 h-4 mr-2 text-primary-foreground/80" })}
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-primary-foreground/20">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-0.5 mr-3 text-accent flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary-foreground/90">Location</p>
                  <a
                    href="https://maps.app.goo.gl/hTn4ejW2inuWHfeB8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    St. Margaret's Bay, Nova Scotia
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 mt-0.5 mr-3 text-accent flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary-foreground/90">Phone</p>
                  <a href="tel:+19025550123" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    +1 (902) 555-0123
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 mt-0.5 mr-3 text-accent flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary-foreground/90">Email</p>
                  <a href="mailto:info@woodlandconservation.ca" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    info@woodlandconservation.ca
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Conservation Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-primary-foreground/20">Conservation Areas</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                <Leaf className="w-4 h-4 mr-2 text-accent" />
                Yellow Birch Grove
              </li>
              <li className="flex items-center text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                <Leaf className="w-4 h-4 mr-2 text-accent" />
                Wetland Sanctuary
              </li>
              <li className="flex items-center text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                <Leaf className="w-4 h-4 mr-2 text-accent" />
                Rewilding Area
              </li>
              <li className="flex items-center text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                <Map className="w-4 h-4 mr-2 text-accent" />
                Historical Sites
              </li>
            </ul>
            <div className="mt-6">
              <AudioButton
                text="Conservation Areas section. Yellow Birch Grove, Wetland Sanctuary, Rewilding Area, Historical Sites"
                className="w-8 h-8 p-0 text-primary-foreground/80 hover:text-primary-foreground"
                variant="ghost"
                size="sm"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-foreground/80">
              © {currentYear} Woodland Conservation. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <span className="sr-only">Privacy Policy</span>
                Privacy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <span className="sr-only">Terms of Service</span>
                Terms
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <span className="sr-only">Accessibility</span>
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
