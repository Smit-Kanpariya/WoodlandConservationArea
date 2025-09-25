import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Download, Heart } from 'lucide-react';
import AudioButton from '@/components/AudioButton';
import PhotoUpload from '@/components/PhotoUpload';
import { supabase } from '@/integrations/supabase/client';
import { useLikes } from '@/hooks/useLikes';

interface Photo {
  id: string;
  image_url: string;
  caption: string | null;
  uploaded_by: string | null;
  created_at: string;
}

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const { likes, isLiked, loading, toggleLike } = useLikes(photo.id);

  return (
    <Card className="event-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative group">
        <img
          src={photo.image_url}
          alt={photo.caption || 'Photo'}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <AudioButton 
            text={`Photo: ${photo.caption || 'Untitled'}. ${likes} likes.`}
            className="bg-black/20 hover:bg-black/40"
            variant="ghost"
            size="sm"
          />
        </div>
        {photo.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <h3 className="text-white font-medium text-sm no-break">
              {photo.caption}
            </h3>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`transition-colors duration-200 ${
              isLiked 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-muted-foreground hover:text-red-500'
            }`}
            onClick={toggleLike}
            disabled={loading}
          >
            <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <PhotoUpload onUploadSuccess={fetchPhotos} />
        </div>

        {/* Photo Count */}
        <section className="mb-12 text-center">
          <p className="text-muted-foreground">
            {loading ? 'Loading photos...' : `${photos.length} photos in gallery`}
          </p>
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="event-card overflow-hidden">
                  <div className="w-full h-48 bg-muted animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No photos yet</h3>
              <p className="text-muted-foreground mb-6">Be the first to share a photo of this beautiful conservation area!</p>
              <PhotoUpload onUploadSuccess={fetchPhotos} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          )}
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
            <PhotoUpload onUploadSuccess={fetchPhotos} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;