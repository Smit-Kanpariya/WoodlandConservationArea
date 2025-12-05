import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Camera,
  Download,
  Info,
  ChevronDown,
  ChevronUp,
  X,
  Trash2,
  Maximize2,
} from "lucide-react";
import AudioButton from "@/components/AudioButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: string;
  image_url: string;
  caption: string | null;
  uploaded_by: string | null;
  created_at: string;
  uploaderFirstName?: string | null;
  uploaderLastName?: string | null;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

const PhotoCard = ({
  photo,
  onPreview,
  canDelete,
  onDelete,
}: {
  photo: Photo;
  onPreview: (photo: Photo) => void;
  canDelete?: boolean;
  onDelete?: (photo: Photo) => void;
}) => {
  // Don't render if we don't have a photo
  if (!photo?.id) return null;

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const imageUrl = photo.image_url;
      const filename = photo.caption
        ? `${photo.caption.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.jpg`
        : `woodland_photo_${photo.id}.jpg`;

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error("Error downloading image:", error);
      window.open(photo.image_url, "_blank");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
      onClick={() => onPreview(photo)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={photo.image_url}
          alt={photo.caption || "Woodland conservation photo"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

        {/* Top actions */}
        <div className="absolute top-0 left-0 right-0 flex justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            {photo.caption && (
              <AudioButton
                text={`Photo: ${photo.caption}`}
                className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                variant="ghost"
                size="sm"
              />
            )}
          </div>
          <div className="flex gap-2">
            {canDelete && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="bg-red-500/70 hover:bg-red-600 text-white backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(photo);
                }}
                title="Delete photo"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(photo);
              }}
              title="View full size"
            >
              <Maximize2 className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
              onClick={handleDownload}
              title="Download photo"
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>

        {/* Caption overlay */}
        {photo.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="line-clamp-2 text-sm text-white">{photo.caption}</p>
          </div>
        )}
      </div>

      {/* Mobile caption (always visible on mobile) */}
      {photo.caption && (
        <div className="p-3 sm:hidden">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {photo.caption}
          </p>
        </div>
      )}
    </motion.div>
  );
};

const PhotoUploadDialog = ({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleOpenChange = (open: boolean) => {
    if (!user && open) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload photos",
        action: (
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        ),
      });
      return;
    }
    setIsOpen(open);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload photos",
        action: (
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        ),
      });
    } else {
      setIsOpen(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload photos",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("photos").getPublicUrl(filePath);

      // Save photo metadata to database
      const { error } = await supabase.from("photos").insert([
        {
          image_url: publicUrl,
          caption: caption || null,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your photo has been uploaded to the gallery.",
      });

      onUploadSuccess();
      setIsOpen(false);
      setFile(null);
      setCaption("");
      setPreviewUrl("");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Error uploading photo",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2 group" onClick={handleTriggerClick}>
          <Upload className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
          Share Your Photos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Camera className="w-6 h-6 text-primary" />
            Upload to Gallery
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="photo-upload" className="text-sm font-medium">
                Choose a photo
              </Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer"
                disabled={isUploading}
              />
              <p className="text-xs text-muted-foreground">
                JPG or PNG, max 10MB
              </p>
            </div>

            {previewUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="relative w-full h-48 rounded-md overflow-hidden border">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="caption" className="text-sm font-medium">
                Add a caption (optional)
              </Label>
              <Textarea
                id="caption"
                placeholder="Tell us about this photo..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={isUploading}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!file || isUploading}>
              {isUploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const PHOTOS_PER_PAGE = 0; // Will be set in useEffect
  const { user } = useAuth();
  const { toast } = useToast();
  const isOwner = user?.email === "wecodeforfood25@gmail.com";

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show a one-time admin login message when the owner logs in
  useEffect(() => {
    if (!user) return;

    const isOwnerUser = user.email === "wecodeforfood25@gmail.com";
    const alreadyShown = sessionStorage.getItem("adminWelcomeShown");

    if (isOwnerUser && !alreadyShown) {
      toast({
        title: "Admin logged in",
        description: "You are logged in with the owner account.",
      });
      sessionStorage.setItem("adminWelcomeShown", "true");
    }
  }, [user, toast]);

  useEffect(() => {
    // Set initial visible count based on screen size
    const isMobile = window.innerWidth < 768;
    setVisibleCount(isMobile ? 3 : 8);

    // Handle window resize
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      setVisibleCount((prev) =>
        isMobileNow ? Math.min(3, photos.length) : Math.min(8, photos.length)
      );
    };

    window.addEventListener("resize", handleResize);
    fetchPhotos();

    return () => window.removeEventListener("resize", handleResize);
  }, [photos.length]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const photosData = (data || []) as Photo[];

      // Collect unique uploader IDs so we can fetch their names from profiles
      const uploaderIds = Array.from(
        new Set(
          photosData
            .map((p) => p.uploaded_by)
            .filter((id): id is string => Boolean(id))
        )
      );

      let profilesById: Record<string, { first_name: string | null; last_name: string | null }> = {};

      if (uploaderIds.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: profiles, error: profilesError } = await (supabase.from as any)("profiles")
          .select("id, first_name, last_name")
          .in("id", uploaderIds);

        if (profilesError) {
          console.error("Error fetching uploader profiles:", profilesError);
        } else if (profiles) {
          profilesById = profiles.reduce(
            (acc: Record<string, { first_name: string | null; last_name: string | null }>, profile: Profile) => {
              acc[profile.id] = {
                first_name: profile.first_name ?? null,
                last_name: profile.last_name ?? null,
              };
              return acc;
            },
            {} as Record<string, { first_name: string | null; last_name: string | null }>
          );
        }
      }

      const photosWithNames: Photo[] = photosData.map((photo) => {
        const profile = photo.uploaded_by ? profilesById[photo.uploaded_by] : undefined;
        return {
          ...photo,
          uploaderFirstName: profile?.first_name ?? null,
          uploaderLastName: profile?.last_name ?? null,
        };
      });

      setPhotos(photosWithNames);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photo: Photo) => {
    try {
      const { error } = await supabase
        .from("photos")
        .delete()
        .eq("id", photo.id);

      if (error) {
        console.error("Error deleting photo:", error);
        return;
      }

      // Refresh photos after successful delete
      await fetchPhotos();
    } catch (err) {
      console.error("Unexpected error deleting photo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/hero-woodland.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <Camera className="w-4 h-4 mr-2" />
                Community Gallery
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Share Your <span className="text-primary">Woodland</span>{" "}
                Moments
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Contribute to our growing collection of conservation area
                photographs and help document the beauty of our natural
                heritage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <PhotoUploadDialog onUploadSuccess={fetchPhotos} />
                <Button
                  variant="outline"
                  className="gap-2 group"
                  onClick={() => {
                    const isShowing = !showGuidelines;
                    setShowGuidelines(isShowing);
                    if (isShowing) {
                      const vh = Math.round(
                        window.visualViewport?.height || window.innerHeight
                      );
                      const isMobile = window.innerWidth < 768;
                      const step = Math.round(vh * (isMobile ? 0.75 : 0.85));
                      const current = window.scrollY || window.pageYOffset;
                      const next = (Math.floor(current / step) + 1) * step;
                      const maxTop =
                        document.documentElement.scrollHeight - step;
                      window.scrollTo({
                        top: Math.min(next, Math.max(0, maxTop)),
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {showGuidelines ? (
                    <>
                      <ChevronUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                      Hide Guidelines
                    </>
                  ) : (
                    <>
                      <Info className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                      View Guidelines
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Gallery Stats */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground">
            {loading ? "Loading..." : `Community Photos (${photos.length})`}
          </h2>
          <p className="text-sm text-muted-foreground">
            {!loading && photos.length > 0 && "Scroll to explore more"}
          </p>
        </div>

        {/* Guidelines Section */}
        <AnimatePresence>
          {showGuidelines && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <Card className="border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Info className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                        Photo Submission Guidelines
                        <AudioButton
                          text="Photo Upload Guidelines. Help us maintain a high-quality gallery by following these simple guidelines when uploading your photos."
                          className="ml-2"
                        />
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-medium text-foreground mb-3 text-base flex items-center">
                            <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">
                              1
                            </span>
                            What to Photograph
                          </h4>
                          <ul className="space-y-2 pl-8">
                            {[
                              "Wildlife and their habitats",
                              "Seasonal changes in the landscape",
                              "Wetland and forest ecosystems",
                              "Historical sites and artifacts",
                              "Trail conditions and scenic views",
                              "Conservation efforts and projects",
                            ].map((item) => (
                              <li
                                key={item}
                                className="relative before:content-['•'] before:absolute before:-left-4 before:text-primary"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-3 text-base flex items-center">
                            <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">
                              2
                            </span>
                            Technical Requirements
                          </h4>
                          <ul className="space-y-2 pl-8">
                            {[
                              "High resolution (min 1200px width)",
                              "JPG or PNG format only",
                              "Max file size: 10MB per photo",
                              "Clear, well-composed images",
                              "Accurate location and description",
                              "Respect wildlife and natural habitats",
                            ].map((item) => (
                              <li
                                key={item}
                                className="relative before:content-['•'] before:absolute before:-left-4 before:text-primary"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-border/50">
                        <h4 className="font-medium text-foreground mb-3 text-base flex items-center">
                          <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">
                            3
                          </span>
                          Best Practices
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-1">
                              Lighting
                            </div>
                            <p className="text-muted-foreground text-sm">
                              Shoot during golden hour for best natural lighting
                            </p>
                          </div>
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-1">
                              Composition
                            </div>
                            <p className="text-muted-foreground text-sm">
                              Use the rule of thirds for balanced photos
                            </p>
                          </div>
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-1">
                              Ethics
                            </div>
                            <p className="text-muted-foreground text-sm">
                              Maintain a safe distance from wildlife
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden group">
                  <div className="w-full aspect-square bg-muted/50 animate-pulse rounded-lg" />
                </Card>
              ))}
            </div>
          ) : photos.length > 0 ? (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {photos.slice(0, visibleCount).map((photo) => (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      onPreview={setSelectedPhoto}
                      canDelete={
                        isOwner || (user?.id !== undefined && user.id === photo.uploaded_by)
                      }
                      onDelete={handleDeletePhoto}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
              {visibleCount < photos.length && (
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => {
                      const isMobile = window.innerWidth < 768;
                      const increment = isMobile ? 3 : 8;
                      setVisibleCount((prev) =>
                        Math.min(prev + increment, photos.length)
                      );
                    }}
                    variant="outline"
                    className="px-8 py-6 text-base"
                  >
                    Load More Photos
                  </Button>
                </div>
              )}
              {visibleCount > PHOTOS_PER_PAGE && (
                <div className="mt-4 text-center">
                  <Button
                    onClick={() => {
                      const isMobile = window.innerWidth < 768;
                      setVisibleCount(isMobile ? 3 : 8);
                    }}
                    variant="outline"
                    className="px-8 py-6 text-base"
                  >
                    Show Less
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-border/50 rounded-xl bg-background/50">
              <div className="mx-auto h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                No photos yet
              </h3>
              <p className="mt-1 text-muted-foreground max-w-md mx-auto">
                Be the first to share your photos of the conservation area.
              </p>
              <div className="mt-6">
                <PhotoUploadDialog onUploadSuccess={fetchPhotos} />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Lightbox Preview */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20 rounded-full"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
              <img
                src={selectedPhoto.image_url}
                alt={selectedPhoto.caption || "Full size preview"}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              {(selectedPhoto.caption || selectedPhoto.uploaderFirstName || selectedPhoto.uploaderLastName) && (
                <div className="mt-4 text-center space-y-1">
                  {selectedPhoto.caption && (
                    <p className="text-white text-lg font-medium">
                      {selectedPhoto.caption}
                    </p>
                  )}
                  {(selectedPhoto.uploaderFirstName || selectedPhoto.uploaderLastName) && (
                    <p className="text-sm text-white/80">
                      Uploaded by {""}
                      {[selectedPhoto.uploaderFirstName, selectedPhoto.uploaderLastName]
                        .filter(Boolean)
                        .join(" ")}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
