import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
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
                className="ml-2 w-10 h-10 p-0"
                variant="ghost"
                size="sm"
              />
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap break-keep">St. Margaret's Bay, Nova Scotia</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="tel:+19025550123" className="whitespace-nowrap break-keep underline-offset-4 hover:underline">
                  +1 (902) 555-0123
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="mailto:info@woodlandconservation.ca" className="whitespace-nowrap break-keep underline-offset-4 hover:underline">
                  info@woodlandconservation.ca
                </a>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              Our Mission
              <AudioButton 
                text="Our Mission section. Preserving and protecting the unique woodland ecosystem of St. Margaret's Bay for future generations through conservation, education, and sustainable practices."
                className="ml-2 w-10 h-10 p-0"
                variant="ghost"
                size="sm"
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
                className="ml-2 w-10 h-10 p-0"
                variant="ghost"
                size="sm"
              />
            </h3>
            <ul className="text-sm space-y-2 list-disc pl-5">
              <li className="whitespace-nowrap break-keep">Yellow Birch Grove</li>
              <li className="whitespace-nowrap break-keep">Wetland Sanctuary</li>
              <li className="whitespace-nowrap break-keep">Rewilding Area</li>
              <li className="whitespace-nowrap break-keep">Historical Sites</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-center whitespace-nowrap break-keep">
            © {currentYear} Woodland Conservation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;