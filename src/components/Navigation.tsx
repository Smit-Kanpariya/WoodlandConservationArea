import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const playTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Eco-System', path: '/ecosystem' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Flora/Fauna/Fungi', path: '/species' },
    { name: 'Natural Burial', path: '/burial' },
    { name: 'eCommerce', path: '/shop' },
    { name: 'Site Map', path: '/map' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">WC</span>
              </div>
              <span className="text-foreground font-semibold text-lg no-break">
                Woodland Conservation
              </span>
            </NavLink>

            {/* Text to Speech Button */}
            <Button
              onClick={() => playTextToSpeech("Woodland Conservation - St. Margaret's Bay")}
              className="text-speech-button"
              size="sm"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Text to Speech</span>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium no-break transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              variant="outline"
              size="sm"
              className="no-break"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </Button>

            <div className="lg:hidden">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="outline"
                size="sm"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border border-border rounded-lg mt-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium no-break transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;