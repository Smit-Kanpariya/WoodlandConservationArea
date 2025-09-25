import React from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';
import AudioButton from './AudioButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              Contact Information
              <AudioButton 
                text="Contact Information section"
                className="ml-2"
                variant="ghost"
              />
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="no-break">St. Margaret's Bay, Nova Scotia</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="no-break">+1 (902) 555-0123</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="no-break">info@woodlandconservation.ca</span>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              Our Mission
              <AudioButton 
                text="Our Mission section. Preserving and protecting the unique woodland ecosystem of St. Margaret's Bay for future generations through conservation, education, and sustainable practices."
                className="ml-2"
                variant="ghost"
              />
            </h3>
            <p className="text-sm leading-relaxed">
              Preserving and protecting the unique woodland ecosystem of St. Margaret's Bay 
              for future generations through conservation, education, and sustainable practices.
            </p>
          </div>

          {/* Conservation Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              Conservation Areas
              <AudioButton 
                text="Conservation Areas section. Yellow Birch Grove, Wetland Sanctuary, Rewilding Area, Historical Sites"
                className="ml-2"
                variant="ghost"
              />
            </h3>
            <ul className="text-sm space-y-2">
              <li className="no-break">• Yellow Birch Grove</li>
              <li className="no-break">• Wetland Sanctuary</li>
              <li className="no-break">• Rewilding Area</li>
              <li className="no-break">• Historical Sites</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm flex items-center justify-center">
            <span className="no-break">
              © {currentYear} Woodland Conservation Initiative. Made with
            </span>
            <Heart className="w-4 h-4 mx-1 text-accent" />
            <span className="no-break">for nature preservation.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;