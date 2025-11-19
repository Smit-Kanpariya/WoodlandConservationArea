import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Heart,
  Star,
  Package,
  Truck,
  Shield,
  X,
  Search,
  ShoppingBag,
  ChevronRight,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AudioButton from "@/components/AudioButton";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const shopContentRef = React.useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollDownOnePage = () => {
    const isMobile = window.innerWidth < 768;
    const scrollMultiplier = isMobile ? 1.36 : 1.2; 
    window.scrollBy({
      top: window.innerHeight * scrollMultiplier,
      behavior: 'smooth'
    });
  };
  const { toast } = useToast();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Native Wildflower Seed Mix",
      category: "Seeds & Plants",
      price: 24.99,
      description:
        "Carefully selected mix of native Nova Scotia wildflower seeds, perfect for supporting local pollinators.",
      features: [
        "100% native species",
        "Pollinator-friendly",
        "Easy to grow",
        "50g package",
      ],
      rating: 4.8,
      inStock: true,
      audioText:
        "Native Wildflower Seed Mix, $24.99. Carefully selected mix of native Nova Scotia wildflower seeds, perfect for supporting local pollinators.",
    },
    {
      id: 2,
      name: "Yellow Birch Syrup",
      category: "Local Products",
      price: 32.5,
      description:
        "Artisanal syrup made from yellow birch sap, harvested sustainably from our conservation area.",
      features: [
        "Sustainably harvested",
        "Small batch production",
        "Unique flavor profile",
        "250ml bottle",
      ],
      rating: 4.9,
      inStock: true,
      audioText:
        "Yellow Birch Syrup, $32.50. Artisanal syrup made from yellow birch sap, harvested sustainably from our conservation area.",
    },
    {
      id: 3,
      name: "Conservation Guided Tour",
      category: "Experiences",
      price: 45.0,
      description:
        "Expert-led 2-hour guided tour of our conservation area, including historical sites and wildlife spotting.",
      features: [
        "Expert naturalist guide",
        "2-hour duration",
        "Small group size",
        "All weather gear provided",
      ],
      rating: 5.0,
      inStock: true,
      audioText:
        "Conservation Guided Tour, $45.00. Expert-led 2-hour guided tour of our conservation area, including historical sites and wildlife spotting.",
    },
    {
      id: 4,
      name: "Handcrafted Birch Bark Basket",
      category: "Crafts",
      price: 89.99,
      description:
        "Traditional basket woven from sustainably collected birch bark by local Indigenous artisans.",
      features: [
        "Handcrafted by local artisans",
        "Sustainable materials",
        "Traditional techniques",
        'Medium size (8" x 6")',
      ],
      rating: 4.7,
      inStock: false,
      audioText:
        "Handcrafted Birch Bark Basket, $89.99. Traditional basket woven from sustainably collected birch bark by local Indigenous artisans. Currently out of stock.",
    },
    {
      id: 5,
      name: "Conservation Membership",
      category: "Memberships",
      price: 75.0,
      description:
        "Annual membership supporting our conservation efforts with exclusive benefits and updates.",
      features: [
        "Free guided tours",
        "Quarterly newsletter",
        "Member events",
        "Tax receipt eligible",
      ],
      rating: 4.9,
      inStock: true,
      audioText:
        "Conservation Membership, $75.00 annually. Supporting our conservation efforts with exclusive benefits and updates.",
    },
    {
      id: 6,
      name: "Woodland Photography Workshop",
      category: "Experiences",
      price: 125.0,
      description:
        "Full-day photography workshop focused on capturing the beauty of woodland ecosystems.",
      features: [
        "Professional instruction",
        "Equipment provided",
        "Light refreshments",
        "All skill levels welcome",
      ],
      rating: 4.8,
      inStock: true,
      audioText:
        "Woodland Photography Workshop, $125.00. Full-day photography workshop focused on capturing the beauty of woodland ecosystems.",
    },
  ];

  const categories = [
    "All Products",
    "Seeds & Plants",
    "Local Products",
    "Experiences",
    "Crafts",
    "Memberships",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart.",
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((id) => id !== productId));
  };

  // Handle search submission with smooth scroll
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shopContentRef.current) {
      window.scrollTo({
        top: shopContentRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login/signup page if not logged in
      navigate("/login");
      toast({
        title: "Login Required",
        description: "Please log in or sign up to proceed with checkout.",
      });
      return;
    }

    // Proceed with checkout logic
    toast({
      title: "Checkout",
      description: "Proceeding to secure checkout...",
    });
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, productId) => {
        const product = products.find((p) => p.id === productId);
        return total + (product?.price || 0);
      }, 0)
      .toFixed(2);
  };

  const getCartItems = () => {
    return cart
      .map((productId) => {
        const product = products.find((p) => p.id === productId);
        const quantity = cart.filter((id) => id === productId).length;
        return { product, quantity };
      })
      .filter(
        (item, index, array) =>
          array.findIndex(
            (arrItem) => arrItem.product?.id === item.product?.id
          ) === index
      );
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
                Conservation Shop
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Support Our <span className="text-primary">Conservation</span>{" "}
                Efforts
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Purchase sustainable products, experiences, and memberships that
                directly contribute to protecting our woodland ecosystem.
              </p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={scrollDownOnePage}
                >
                  Shop Now
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-6 z-50">
          <Button
            onClick={() => setShowCart(true)}
            size="lg"
            className="relative h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
              {cart.length}
            </span>
          </Button>
        </div>
      )}

      {/* Cart Sheet */}
      <Sheet open={showCart} onOpenChange={setShowCart}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Shopping Cart
            </SheetTitle>
            <SheetDescription>
              {cart.length === 0
                ? "Your cart is empty"
                : `${cart.length} item${cart.length > 1 ? "s" : ""} in your cart`}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            {getCartItems().length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Start adding items to your cart
                </p>
                <Button onClick={() => setShowCart(false)} variant="outline">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {getCartItems().map(
                    ({ product, quantity }) =>
                      product && (
                        <Card key={product.id} className="border-border/50">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                <Package className="w-8 h-8 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                                      {product.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mb-2">
                                      {product.category}
                                    </p>
                                    <div className="flex items-center gap-3">
                                      <span className="text-sm font-medium text-primary">
                                        ${product.price}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        × {quantity}
                                      </span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFromCart(product.id)}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0 flex-shrink-0"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="mt-2 text-sm font-medium text-foreground">
                                  Subtotal: $
                                  {(product.price * quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                  )}
                </div>

                <div className="border-t border-border pt-4 space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold text-foreground">
                    <span>Total:</span>
                    <span className="text-primary">${getTotalPrice()}</span>
                  </div>
                  <Button
                    onClick={() => {
                      handleCheckout();
                      setShowCart(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
                    size="lg"
                  >
                    Proceed to Checkout
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => setShowCart(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefits Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="stats-card">
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 no-break">
                  Local & Sustainable
                </h3>
                <p className="text-sm text-muted-foreground">
                  All products sourced locally with minimal environmental impact
                </p>
              </CardContent>
            </Card>
            <Card className="stats-card">
              <CardContent className="p-6 text-center">
                <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 no-break">
                  Carbon Neutral Shipping
                </h3>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly packaging and carbon-offset delivery options
                </p>
              </CardContent>
            </Card>
            <Card className="stats-card">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 no-break">
                  100% Conservation Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  All proceeds directly support our conservation initiatives
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="no-break"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="event-card">
                <div className="relative">
                  {/* Product Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <AudioButton
                      text={product.audioText}
                      className="bg-black/20 hover:bg-black/40"
                      variant="ghost"
                      size="sm"
                    />
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-accent mr-1" />
                      {product.rating}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 no-break">
                    {product.name}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2 no-break">
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-xs text-muted-foreground flex items-start"
                        >
                          <span className="text-primary mr-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      ${product.price}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="p-2">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        size="sm"
                        className={
                          product.inStock ? "" : "opacity-50 cursor-not-allowed"
                        }
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Message */}
        <section>
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
              Every Purchase Makes a Difference
              <AudioButton
                text="Every Purchase Makes a Difference. When you shop with us, 100% of proceeds go directly toward conservation efforts, habitat restoration, and educational programs."
                className="ml-4 bg-white/20 hover:bg-white/30"
                variant="ghost"
              />
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              When you shop with us, 100% of proceeds go directly toward
              conservation efforts, habitat restoration, and educational
              programs that protect this unique woodland ecosystem.
            </p>
          </div>
        </section>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Shop;
