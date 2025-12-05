import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2 } from 'lucide-react';
import AuthModal from './AuthModal';

interface PhotoUploadProps {
  onUploadSuccess?: () => void;
}

const PhotoUpload = ({ onUploadSuccess }: PhotoUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    // Reset form when opening the dialog
    setCaption('');
    setSelectedFile(null);
    setIsOpen(true);
  };

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // Reset form when opening the dialog after successful auth
    setCaption('');
    setSelectedFile(null);
    setIsOpen(true);
  };

  // Handle dialog open/close
  const handleOpenChange = (open: boolean) => {
    if (open && !user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsOpen(open);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

      // Save photo record to database
      const { error: dbError } = await supabase
        .from('photos')
        .insert({
          image_url: publicUrl,
          caption: caption.trim() || null,
          uploaded_by: user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: "Photo Uploaded",
        description: "Your photo has been successfully uploaded!",
      });

      // Reset form
      setCaption('');
      setSelectedFile(null);
      setIsOpen(false);
      onUploadSuccess?.();

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to upload photo.";
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button onClick={handleUploadClick} className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Photo
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogDescription>
              Share your nature photography with the community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo">Select Image</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption (optional)</Label>
              <Input
                id="caption"
                placeholder="Add a caption to your photo..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={isUploading}
                maxLength={200}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isUploading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="flex-1"
              >
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default PhotoUpload;