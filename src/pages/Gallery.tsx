import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Download, Heart } from 'lucide-react';
import AudioButton from '@/components/AudioButton';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Photos', count: 24 },
    { id: 'birch', name: 'Yellow Birch', count: 8 },
    { id: 'wetland', name: 'Wetlands', count: 6 },
    { id: 'wildlife', name: 'Wildlife', count: 7 },
    { id: 'historical', name: 'Historical', count: 3 }
  ];

  // Sample gallery items (in a real app, these would come from a database)
  const galleryItems = [
    { id: 1, title: 'Ancient Yellow Birch', category: 'birch', likes: 12, photographer: 'Nature Lover' },
    { id: 2, title: 'Morning Wetland Mist', category: 'wetland', likes: 8, photographer: 'Conservation Team' },
    { id: 3, title: 'Farmhouse Foundation', category: 'historical', likes: 15, photographer: 'Heritage Society' },
    { id: 4, title: 'Red Squirrel', category: 'wildlife', likes: 20, photographer: 'Wildlife Observer' },
    { id: 5, title: 'Birch Bark Detail', category: 'birch', likes: 6, photographer: 'Macro Enthusiast' },
    { id: 6, title: 'Wetland Reflection', category: 'wetland', likes: 11, photographer: 'Local Photographer' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 flex items-center justify-center">
            Community Gallery
            <AudioButton 
              text="Community Gallery. Share and explore photographs of our woodland conservation area. Upload your own photos to contribute to our visual documentation of this special place."
              className="ml-4"
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Share and explore photographs of our woodland conservation area. 
            Upload your own photos to contribute to our visual documentation of this special place.
          </p>
          
          {/* Upload Button */}
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Upload className="w-5 h-5 mr-2" />
            Upload Your Photos
          </Button>
        </div>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="no-break"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </section>

        {/* Upload Guidelines */}
        <section className="mb-12">
          <Card className="bg-muted/30">
            <CardContent className="p-8">
              <div className="flex items-start">
                <Camera className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    Photo Upload Guidelines
                    <AudioButton 
                      text="Photo Upload Guidelines. Help us maintain a high-quality gallery by following these simple guidelines when uploading your photos."
                      className="ml-2"
                    />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2 no-break">What to Include:</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Wildlife spotted in the conservation area</li>
                        <li>• Seasonal changes in the yellow birch grove</li>
                        <li>• Wetland ecosystem observations</li>
                        <li>• Historical artifacts and foundations</li>
                        <li>• Trail conditions and views</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2 no-break">Technical Requirements:</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• High resolution (minimum 1200px width)</li>
                        <li>• JPG or PNG format</li>
                        <li>• Maximum file size: 10MB</li>
                        <li>• Include location and description</li>
                        <li>• Respect wildlife and habitat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Gallery Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="event-card overflow-hidden">
                <div className="relative">
                  {/* Placeholder for actual image */}
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <AudioButton 
                      text={`Photo titled ${item.title} by ${item.photographer}. ${item.likes} likes.`}
                      className="bg-black/20 hover:bg-black/40"
                      variant="ghost"
                      size="sm"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h3 className="text-white font-medium text-sm mb-1 no-break">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs no-break">
                      by {item.photographer}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                      <Heart className="w-4 h-4 mr-1" />
                      {item.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-primary text-primary-foreground rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
              Help Document Our Conservation Efforts
              <AudioButton 
                text="Help Document Our Conservation Efforts. Your photos help us track changes in the ecosystem, document wildlife sightings, and share the beauty of this special place with others."
                className="ml-4 bg-white/20 hover:bg-white/30"
                variant="ghost"
              />
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              Your photos help us track changes in the ecosystem, document wildlife sightings, 
              and share the beauty of this special place with others.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-3"
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Contributing
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;