import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const playTextToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      // Toggle behavior: if already speaking, stop; otherwise start
      const synth = window.speechSynthesis;
      if (synth.speaking) {
        synth.cancel();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synth.speak(utterance);
    }
  };

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Eco-System", path: "/ecosystem" },
    { name: "Gallery", path: "/gallery" },
    { name: "Flora/Fauna/Fungi", path: "/species" },
    { name: "Natural Burial", path: "/burial" },
    { name: "eCommerce", path: "/shop" },
    { name: "Site Map", path: "/map" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Site logo"
                className="h-16 w-auto"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-6 flex items-center space-x-4 flex-nowrap overflow-x-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 rounded-md text-sm font-medium whitespace-nowrap break-keep inline-flex items-center h-10 transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-1 ml-auto">
            <Button
              onClick={() =>
                playTextToSpeech("Woodland Conservation - St. Margaret's Bay")
              }
              variant="ghost"
              size="icon"
              className="p-0"
              aria-label="Text to Speech"
              title="Text to Speech"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              variant="outline"
              size="sm"
              className="whitespace-nowrap break-keep"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </Button>

            <div className="lg:hidden">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="outline"
                size="sm"
              >
                {isOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
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
                    `block px-3 py-2 rounded-md text-base font-medium whitespace-nowrap break-keep transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="px-3">
                <Button
                  onClick={() =>
                    playTextToSpeech(
                      "Woodland Conservation - St. Margaret's Bay"
                    )
                  }
                  variant="ghost"
                  size="icon"
                  aria-label="Text to Speech"
                  title="Text to Speech"
                  className="w-10 h-10"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
