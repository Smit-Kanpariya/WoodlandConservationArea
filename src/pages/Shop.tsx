import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star, Package, Truck, Shield } from 'lucide-react';
import AudioButton from '@/components/AudioButton';

const Shop = () => {
  const [cart, setCart] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: 'Native Wildflower Seed Mix',
      category: 'Seeds & Plants',
      price: 24.99,
      description: 'Carefully selected mix of native Nova Scotia wildflower seeds, perfect for supporting local pollinators.',
      features: ['100% native species', 'Pollinator-friendly', 'Easy to grow', '50g package'],
      rating: 4.8,
      inStock: true,
      audioText: 'Native Wildflower Seed Mix, $24.99. Carefully selected mix of native Nova Scotia wildflower seeds, perfect for supporting local pollinators.'
    },
    {
      id: 2,
      name: 'Yellow Birch Syrup',
      category: 'Local Products',
      price: 32.50,
      description: 'Artisanal syrup made from yellow birch sap, harvested sustainably from our conservation area.',
      features: ['Sustainably harvested', 'Small batch production', 'Unique flavor profile', '250ml bottle'],
      rating: 4.9,
      inStock: true,
      audioText: 'Yellow Birch Syrup, $32.50. Artisanal syrup made from yellow birch sap, harvested sustainably from our conservation area.'
    },
    {
      id: 3,
      name: 'Conservation Guided Tour',
      category: 'Experiences',
      price: 45.00,
      description: 'Expert-led 2-hour guided tour of our conservation area, including historical sites and wildlife spotting.',
      features: ['Expert naturalist guide', '2-hour duration', 'Small group size', 'All weather gear provided'],
      rating: 5.0,
      inStock: true,
      audioText: 'Conservation Guided Tour, $45.00. Expert-led 2-hour guided tour of our conservation area, including historical sites and wildlife spotting.'
    },
    {
      id: 4,
      name: 'Handcrafted Birch Bark Basket',
      category: 'Crafts',
      price: 89.99,
      description: 'Traditional basket woven from sustainably collected birch bark by local Indigenous artisans.',
      features: ['Handcrafted by local artisans', 'Sustainable materials', 'Traditional techniques', 'Medium size (8" x 6")'],
      rating: 4.7,
      inStock: false,
      audioText: 'Handcrafted Birch Bark Basket, $89.99. Traditional basket woven from sustainably collected birch bark by local Indigenous artisans. Currently out of stock.'
    },
    {
      id: 5,
      name: 'Conservation Membership',
      category: 'Memberships',
      price: 75.00,
      description: 'Annual membership supporting our conservation efforts with exclusive benefits and updates.',
      features: ['Free guided tours', 'Quarterly newsletter', 'Member events', 'Tax receipt eligible'],
      rating: 4.9,
      inStock: true,
      audioText: 'Conservation Membership, $75.00 annually. Supporting our conservation efforts with exclusive benefits and updates.'
    },
    {
      id: 6,
      name: 'Woodland Photography Workshop',
      category: 'Experiences',
      price: 125.00,
      description: 'Full-day photography workshop focused on capturing the beauty of woodland ecosystems.',
      features: ['Professional instruction', 'Equipment provided', 'Light refreshments', 'All skill levels welcome'],
      rating: 4.8,
      inStock: true,
      audioText: 'Woodland Photography Workshop, $125.00. Full-day photography workshop focused on capturing the beauty of woodland ecosystems.'
    }
  ];

  const categories = ['All Products', 'Seeds & Plants', 'Local Products', 'Experiences', 'Crafts', 'Memberships'];
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const filteredProducts = selectedCategory === 'All Products' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            Conservation Shop
            <AudioButton 
              text="Conservation Shop. Support our conservation efforts by purchasing sustainable products, experiences, and memberships that directly contribute to protecting our woodland ecosystem."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Support our conservation efforts by purchasing sustainable products, experiences, and memberships 
            that directly contribute to protecting our woodland ecosystem.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="stats-card">
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 no-break">Local & Sustainable</h3>
                <p className="text-sm text-muted-foreground">
                  All products sourced locally with minimal environmental impact
                </p>
              </CardContent>
            </Card>
            <Card className="stats-card">
              <CardContent className="p-6 text-center">
                <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 no-break">Carbon Neutral Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly packaging and carbon-offset delivery options
                </p>
              </CardContent>
            </Card>
            <Card className="stats-card">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 no-break">100% Conservation Support</h3>
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
                variant={selectedCategory === category ? 'default' : 'outline'}
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
                    <h4 className="text-sm font-medium text-foreground mb-2 no-break">Features:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start">
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="p-2"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        size="sm"
                        className={product.inStock ? '' : 'opacity-50 cursor-not-allowed'}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shopping Cart Summary */}
        {cart.length > 0 && (
          <section className="mb-16">
            <Card className="bg-accent/10 border-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingCart className="w-6 h-6 text-accent mr-3" />
                    <span className="text-lg font-semibold text-foreground">
                      {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline">
                      View Cart
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Checkout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

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
              When you shop with us, 100% of proceeds go directly toward conservation efforts, 
              habitat restoration, and educational programs that protect this unique woodland ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-3"
              >
                Learn About Our Impact
              </Button>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
              >
                Become a Member
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;