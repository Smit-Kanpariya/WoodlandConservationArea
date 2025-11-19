import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Volume2,
  LogIn,
  LogOut,
  User,
  Mail,
  Calendar,
  Clock,
  LogOut as LogOutIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Successfully signed out");
      setIsProfileOpen(false);
      navigate("/login");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getUserInitials = (email: string) => {
    return email ? email.substring(0, 2).toUpperCase() : "U";
  };

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
    { name: "Shop", path: "/shop" },
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
                    `px-3 rounded-md text-[16px] font-medium whitespace-nowrap break-keep inline-flex items-center h-10 transition-colors ${
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

            {user ? (
              <div className="hidden lg:flex items-center space-x-1">
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title="View profile"
                    onClick={() => setIsProfileOpen(true)}
                  >
                    <User className="h-4 w-4" />
                  </Button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-popover text-popover-foreground text-sm rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="font-medium truncate">{user.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start rounded-none"
                      onClick={() => setIsProfileOpen(true)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start rounded-none"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap break-keep"
                title="Log in/ Sign up"
                onClick={() => navigate("/login")}
              >
                Log in/Sign in
              </Button>
            )}

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
                  key={`mobile-${item.name}`}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
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
              {/* Mobile Auth Buttons */}
              {user ? (
                <div className="flex space-x-2 px-3 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 justify-start"
                    onClick={() => {
                      navigate("/profile");
                      setIsOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span className="truncate max-w-[120px]">
                      {user.email?.split("@")[0]}
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start mx-3 mb-2"
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Log In / Sign Up
                </Button>
              )}
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

      {/* User Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              User Profile
            </DialogTitle>
            <DialogDescription>
              View and manage your account details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url}
                  alt={user?.email}
                />
                <AvatarFallback className="text-2xl">
                  {getUserInitials(user?.email || "")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {user?.user_metadata?.full_name || "User"}
                </h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.created_at ? formatDate(user.created_at) : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Sign In</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.last_sign_in_at
                      ? formatDate(user.last_sign_in_at)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
                Close
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navigation;
