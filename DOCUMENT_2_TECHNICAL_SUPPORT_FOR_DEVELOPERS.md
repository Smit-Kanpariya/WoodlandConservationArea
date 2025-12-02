# Technical Support for Developers
## Woodland Conservation Foundation Project

**Version:** 1.0  
**Last Updated:** 2025  
**Purpose:** This document serves as a technical manual for developers working on the Woodland Conservation Foundation project. It covers the tech stack, common development tasks, troubleshooting, and known issues.

---

## Table of Contents

1. [Tech Stack Overview](#tech-stack-overview)
2. [Frontend: Modifying UI Components](#frontend-modifying-ui-components)
3. [Backend: Connecting to the Database](#backend-connecting-to-the-database)
4. [Handling Uploaded Images](#handling-uploaded-images)
5. [Frequently Asked Questions and Troubleshooting](#frequently-asked-questions-and-troubleshooting)
6. [Future Modifications / Known Issues](#future-modifications--known-issues)

---

## 1. Tech Stack Overview

### 1.1 Frontend Technologies

#### React 18.3.1
- **Purpose**: UI library for building the user interface
- **Key Features Used**:
  - Functional components with hooks
  - Context API for authentication state
  - React Router for navigation
- **Entry Point**: `src/main.tsx`
- **Main App Component**: `src/App.tsx`

#### TypeScript 5.8.3
- **Purpose**: Type-safe JavaScript
- **Configuration**: `tsconfig.json`, `tsconfig.app.json`
- **Path Aliases**: `@/*` maps to `src/*` (configured in `vite.config.ts`)

#### Vite 7.1.12
- **Purpose**: Build tool and development server
- **Dev Server**: Runs on port 8080 (configured in `vite.config.ts`)
- **Commands**:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run preview` - Preview production build

#### Tailwind CSS 3.4.17
- **Purpose**: Utility-first CSS framework
- **Configuration**: `tailwind.config.ts`
- **Theme**: Custom color scheme using CSS variables (defined in `src/index.css`)
- **Usage**: Use Tailwind utility classes directly in JSX

#### shadcn/ui
- **Purpose**: Reusable UI component library
- **Location**: `src/components/ui/`
- **Components**: Buttons, dialogs, cards, forms, etc.
- **Customization**: Components can be modified directly in `src/components/ui/`

#### React Router DOM 6.30.1
- **Purpose**: Client-side routing
- **Configuration**: Routes defined in `src/App.tsx`
- **Routes**: See `src/App.tsx` for all available routes

#### Framer Motion 12.23.24
- **Purpose**: Animation library
- **Usage**: Used for page transitions and component animations

#### React Query (@tanstack/react-query) 5.83.0
- **Purpose**: Server state management and data fetching
- **Configuration**: Set up in `src/App.tsx`

### 1.2 Backend Technologies

#### Supabase
- **Purpose**: Backend-as-a-Service (BaaS)
- **Services Used**:
  - **PostgreSQL Database**: User data, photos, likes
  - **Authentication**: User signup, login, session management
  - **Storage**: Image file storage
- **Client Setup**: `src/integrations/supabase/client.ts`
- **Environment Variables Required**:
  - `VITE_SUPABASE_URL`: Your Supabase project URL
  - `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon/public key

#### Express.js (Node.js Server)
- **Purpose**: Backend API server for email functionality
- **Location**: `server/index.js`
- **Port**: 3001 (default) or `process.env.PORT`
- **Endpoints**:
  - `GET /api/health` - Health check
  - `POST /api/burial-request` - Send natural burial inquiry emails
- **Environment Variables Required**:
  - `SMTP_HOST`: SMTP server hostname
  - `SMTP_PORT`: SMTP server port (usually 587 or 465)
  - `SMTP_USER`: SMTP username
  - `SMTP_PASS`: SMTP password
  - `MAIL_TO`: Recipient email address
  - `MAIL_FROM`: Sender email address

### 1.3 Database: Supabase (PostgreSQL)

#### Database Schema

**Tables:**

1. **`photos`** - User-uploaded photos
   - `id` (UUID, Primary Key)
   - `image_url` (TEXT) - Public URL to the image in storage
   - `caption` (TEXT, nullable) - Optional photo caption
   - `uploaded_by` (UUID, Foreign Key to `auth.users`)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

2. **`photo_likes`** - Photo likes (supports anonymous and authenticated users)
   - `id` (UUID, Primary Key)
   - `photo_id` (UUID, Foreign Key to `photos`)
   - `user_id` (UUID, nullable, Foreign Key to `auth.users`)
   - `session_id` (TEXT, nullable) - For anonymous likes
   - `created_at` (TIMESTAMP)

3. **`profiles`** - User profile information
   - `id` (UUID, Primary Key, Foreign Key to `auth.users`)
   - `email` (TEXT)
   - `first_name` (TEXT, nullable)
   - `last_name` (TEXT, nullable)
   - `updated_at` (TIMESTAMP)

**Storage Buckets:**
- **`photos`** - Public bucket for storing uploaded images

**Row Level Security (RLS):**
- Photos: Anyone can view, authenticated users can upload/update/delete their own
- Photo Likes: Anyone can view and add likes (authenticated or anonymous)
- Storage: Public read, authenticated upload, users can manage their own files

#### Accessing the Database

1. **Supabase Dashboard**:
   - Go to your Supabase project dashboard
   - Navigate to "Table Editor" to view/edit data
   - Navigate to "SQL Editor" to run queries
   - Navigate to "Storage" to manage files

2. **From Code**:
   ```typescript
   import { supabase } from '@/integrations/supabase/client';
   
   // Query data
   const { data, error } = await supabase
     .from('photos')
     .select('*')
     .order('created_at', { ascending: false });
   
   // Insert data
   const { error } = await supabase
     .from('photos')
     .insert({
       image_url: 'https://...',
       caption: 'My photo',
       uploaded_by: userId,
     });
   
   // Update data
   const { error } = await supabase
     .from('photos')
     .update({ caption: 'New caption' })
     .eq('id', photoId);
   
   // Delete data
   const { error } = await supabase
     .from('photos')
     .delete()
     .eq('id', photoId);
   ```

### 1.4 Authentication: Supabase Auth

#### How Authentication Works

1. **Sign Up**:
   - Users sign up with email and password
   - Supabase sends confirmation email (if email confirmation is enabled)
   - User metadata (first_name, last_name) is stored in `auth.users` and `profiles` table

2. **Sign In**:
   - Users sign in with email and password
   - Supabase returns a session with access token
   - Session is stored in localStorage
   - Token is automatically refreshed every 55 minutes

3. **Session Management**:
   - Handled by `src/hooks/useAuth.tsx`
   - Provides `user`, `session`, `loading`, `error` state
   - Provides `signUp`, `signIn`, `signOut`, `refreshSession` methods

#### Using Authentication in Components

```typescript
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { user, loading, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;
  
  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

---

## 2. Frontend: Modifying UI Components

### 2.1 Component Structure

#### React Component Pattern

Components in this project follow a consistent structure:

```typescript
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
// Other imports...

interface ComponentProps {
  // Props interface
}

const Component = ({ prop1, prop2 }: ComponentProps) => {
  // 1. State declarations
  const [state, setState] = useState<Type>(initialValue);
  
  // 2. Hooks (useAuth, useRouter, etc.)
  const { user } = useAuth();
  
  // 3. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### 2.2 Adding New UI Components

#### Step 1: Create Component File
Create a new file in `src/components/`:

```typescript
// src/components/MyNewComponent.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface MyNewComponentProps {
  title: string;
  onAction?: () => void;
}

const MyNewComponent = ({ title, onAction }: MyNewComponentProps) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      {onAction && (
        <Button onClick={onAction}>Action</Button>
      )}
    </div>
  );
};

export default MyNewComponent;
```

#### Step 2: Use Component in Pages
```typescript
// src/pages/SomePage.tsx
import MyNewComponent from '@/components/MyNewComponent';

const SomePage = () => {
  return (
    <div>
      <MyNewComponent 
        title="Hello World" 
        onAction={() => console.log('Clicked!')}
      />
    </div>
  );
};
```

### 2.3 Modifying Existing Components

#### Example: Adding a Feature to PhotoUpload

1. **Locate the component**: `src/components/PhotoUpload.tsx`
2. **Understand the current structure**: Read through the component
3. **Make your changes**: Add new state, handlers, or UI elements
4. **Test thoroughly**: Ensure existing functionality still works

```typescript
// Example: Adding image preview before upload
const PhotoUpload = ({ onUploadSuccess }: PhotoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };
  
  return (
    <div>
      {/* Existing code */}
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="max-w-xs" />
      )}
    </div>
  );
};
```

### 2.4 Styling with Tailwind CSS

#### Using Tailwind Classes
```typescript
// Utility classes
<div className="flex items-center justify-between p-4 bg-primary text-white">
  <h1 className="text-2xl font-bold">Title</h1>
  <Button variant="outline">Action</Button>
</div>
```

#### Custom Colors
Colors are defined in `src/index.css` using CSS variables:
- `--primary`: Primary brand color
- `--secondary`: Secondary color
- `--accent`: Accent color
- `--background`: Background color
- `--foreground`: Text color

Use them in Tailwind:
```typescript
<div className="bg-primary text-primary-foreground">
  {/* Content */}
</div>
```

#### Responsive Design
```typescript
// Mobile-first approach
<div className="
  text-sm          // Base (mobile)
  md:text-base     // Medium screens and up
  lg:text-lg       // Large screens and up
  xl:text-xl       // Extra large screens
">
  Responsive text
</div>
```

### 2.5 Using shadcn/ui Components

#### Available Components
All shadcn/ui components are in `src/components/ui/`:
- `button.tsx` - Buttons with variants
- `card.tsx` - Card containers
- `dialog.tsx` - Modal dialogs
- `input.tsx` - Text inputs
- `textarea.tsx` - Multi-line text inputs
- And many more...

#### Using Components
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const MyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click Me</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </CardContent>
    </Card>
  );
};
```

#### Customizing Components
You can modify components directly in `src/components/ui/` to match your design needs.

---

## 3. Backend: Connecting to the Database

### 3.1 Supabase Client Setup

#### Initialization
The Supabase client is initialized in `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
```

#### Using the Client
```typescript
import { supabase } from '@/integrations/supabase/client';

// In your component or hook
const fetchData = async () => {
  const { data, error } = await supabase
    .from('table_name')
    .select('*');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  return data;
};
```

### 3.2 Database Queries

#### SELECT Queries
```typescript
// Get all records
const { data, error } = await supabase
  .from('photos')
  .select('*');

// Get specific columns
const { data, error } = await supabase
  .from('photos')
  .select('id, image_url, caption');

// Filter records
const { data, error } = await supabase
  .from('photos')
  .select('*')
  .eq('uploaded_by', userId)
  .order('created_at', { ascending: false })
  .limit(10);

// Join with related tables
const { data, error } = await supabase
  .from('photos')
  .select(`
    *,
    profiles:uploaded_by (
      email,
      first_name,
      last_name
    )
  `);
```

#### INSERT Queries
```typescript
// Insert single record
const { data, error } = await supabase
  .from('photos')
  .insert({
    image_url: 'https://...',
    caption: 'My photo',
    uploaded_by: userId,
  });

// Insert multiple records
const { data, error } = await supabase
  .from('photos')
  .insert([
    { image_url: 'url1', caption: 'Photo 1', uploaded_by: userId },
    { image_url: 'url2', caption: 'Photo 2', uploaded_by: userId },
  ]);
```

#### UPDATE Queries
```typescript
// Update single record
const { error } = await supabase
  .from('photos')
  .update({ caption: 'New caption' })
  .eq('id', photoId);

// Update multiple records
const { error } = await supabase
  .from('photos')
  .update({ updated_at: new Date().toISOString() })
  .in('id', [id1, id2, id3]);
```

#### DELETE Queries
```typescript
// Delete single record
const { error } = await supabase
  .from('photos')
  .delete()
  .eq('id', photoId);

// Delete multiple records
const { error } = await supabase
  .from('photos')
  .delete()
  .in('id', [id1, id2, id3]);
```

### 3.3 Real-time Subscriptions

#### Subscribe to Changes
```typescript
useEffect(() => {
  const subscription = supabase
    .channel('photos-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // 'INSERT', 'UPDATE', 'DELETE', or '*' for all
        schema: 'public',
        table: 'photos',
      },
      (payload) => {
        console.log('Change received!', payload);
        // Update your state
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### 3.4 Row Level Security (RLS)

#### Understanding RLS Policies

RLS policies control who can access what data. Current policies:

**Photos Table:**
- **SELECT**: Anyone can view photos (`USING (true)`)
- **INSERT**: Authenticated users can upload (`WITH CHECK (auth.uid() = uploaded_by)`)
- **UPDATE**: Users can update their own photos (`USING (auth.uid() = uploaded_by)`)
- **DELETE**: Users can delete their own photos (`USING (auth.uid() = uploaded_by)`)

#### Testing RLS
- Test as authenticated user: Sign in and try operations
- Test as anonymous user: Sign out and try operations
- Verify policies work as expected

#### Modifying RLS Policies
RLS policies are defined in Supabase migrations. To modify:
1. Create a new migration file in `supabase/migrations/`
2. Add your policy changes
3. Apply the migration through Supabase dashboard or CLI

---

## 4. Handling Uploaded Images

### 4.1 Image Upload Flow

#### Step-by-Step Process

1. **User selects file** → File input handler validates file
2. **File validation** → Check type (image/*) and size (max 5-10MB)
3. **Generate unique filename** → `userId/timestamp.extension`
4. **Upload to Supabase Storage** → Upload file to `photos` bucket
5. **Get public URL** → Retrieve public URL for the uploaded file
6. **Save metadata to database** → Insert record in `photos` table with URL

#### Code Example
```typescript
const handleUpload = async (file: File, caption: string, userId: string) => {
  try {
    // 1. Validate file
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }
    
    // 2. Generate filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    // 3. Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, file);
    
    if (uploadError) throw uploadError;
    
    // 4. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName);
    
    // 5. Save to database
    const { error: dbError } = await supabase
      .from('photos')
      .insert({
        image_url: publicUrl,
        caption: caption || null,
        uploaded_by: userId,
      });
    
    if (dbError) throw dbError;
    
    return { success: true };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error };
  }
};
```

### 4.2 Image Storage Location

#### Supabase Storage Bucket
- **Bucket Name**: `photos`
- **Access Level**: Public (anyone can view)
- **Upload Permissions**: Authenticated users only
- **File Structure**: `{userId}/{timestamp}.{extension}`

#### Accessing Images
```typescript
// Get public URL (already stored in database)
const imageUrl = photo.image_url; // e.g., "https://[project].supabase.co/storage/v1/object/public/photos/user123/1234567890.jpg"

// Display in component
<img src={photo.image_url} alt={photo.caption || "Photo"} />
```

### 4.3 Image Retrieval

#### Fetching Images from Database
```typescript
// Get all photos
const { data: photos, error } = await supabase
  .from('photos')
  .select('*')
  .order('created_at', { ascending: false });

// Get user's photos
const { data: userPhotos, error } = await supabase
  .from('photos')
  .select('*')
  .eq('uploaded_by', userId)
  .order('created_at', { ascending: false });
```

#### Displaying Images
```typescript
const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  
  useEffect(() => {
    fetchPhotos();
  }, []);
  
  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    setPhotos(data || []);
  };
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.image_url}
          alt={photo.caption || "Photo"}
          className="w-full h-48 object-cover rounded"
        />
      ))}
    </div>
  );
};
```

### 4.4 Deleting Images

#### Delete from Storage and Database
```typescript
const deletePhoto = async (photoId: string, imageUrl: string, userId: string) => {
  try {
    // Extract file path from URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/photos/user123/file.jpg
    const urlParts = imageUrl.split('/');
    const fileName = urlParts.slice(-2).join('/'); // "user123/file.jpg"
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('photos')
      .remove([fileName]);
    
    if (storageError) throw storageError;
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId)
      .eq('uploaded_by', userId); // Ensure user owns the photo
    
    if (dbError) throw dbError;
    
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error };
  }
};
```

### 4.5 Image Optimization

#### Current Implementation
- Images are stored as uploaded (no automatic optimization)
- Consider implementing:
  - Client-side compression before upload
  - Server-side image resizing/optimization
  - Lazy loading for gallery pages (already implemented with `loading="lazy"`)

#### Adding Image Compression (Example)
```typescript
import imageCompression from 'browser-image-compression';

const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  
  return await imageCompression(file, options);
};

// Use before upload
const compressedFile = await compressImage(selectedFile);
// Then upload compressedFile instead of selectedFile
```

---

## 5. Frequently Asked Questions and Troubleshooting

### 5.1 Common Issues

#### Issue: "Cannot find module '@/...'"
**Solution**: 
- Ensure TypeScript path alias is configured in `tsconfig.json`
- Restart your development server
- Check that the file path is correct

#### Issue: "Supabase client not initialized"
**Solution**:
- Check that environment variables are set:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Create a `.env` file in the project root if it doesn't exist
- Restart the development server after adding environment variables

#### Issue: "Authentication not working"
**Solution**:
- Verify Supabase project is active
- Check that email confirmation is disabled (for development) or handle confirmation flow
- Clear browser localStorage and try again
- Check browser console for error messages

#### Issue: "Images not uploading"
**Solution**:
- Verify storage bucket `photos` exists in Supabase
- Check RLS policies allow authenticated uploads
- Verify file size is under limit (5-10MB)
- Check file type is an image (image/*)
- Check browser console and network tab for errors

#### Issue: "CORS errors"
**Solution**:
- Ensure Supabase CORS settings allow your domain
- Check that API calls are going to the correct Supabase URL
- Verify environment variables are correct

#### Issue: "Type errors in TypeScript"
**Solution**:
- Run `npm run build` to see all type errors
- Check that types are imported correctly
- Update `src/integrations/supabase/types.ts` if database schema changed
- Use `any` temporarily only if necessary (not recommended)

### 5.2 Development Server Issues

#### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change port in vite.config.ts
```

#### Hot Module Replacement (HMR) Not Working
- Save files to trigger HMR
- Check browser console for HMR errors
- Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
- Restart dev server if issues persist

### 5.3 Database Issues

#### Connection Errors
- Verify Supabase project is active
- Check network connectivity
- Verify environment variables are correct
- Check Supabase dashboard for service status

#### RLS Policy Errors
- Review RLS policies in Supabase dashboard
- Test queries as authenticated and anonymous users
- Check policy conditions match your use case

#### Migration Issues
- Review migration files in `supabase/migrations/`
- Apply migrations through Supabase dashboard
- Test migrations on a development database first

### 5.4 Build Issues

#### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### Type Errors in Build
- Fix all TypeScript errors before building
- Use `npm run build` to see all errors at once
- Consider using `// @ts-ignore` sparingly (not recommended)

### 5.5 Performance Issues

#### Slow Page Loads
- Check network tab for slow API calls
- Implement pagination for large data sets
- Use React Query caching
- Optimize images (compress, use appropriate sizes)

#### Memory Leaks
- Clean up subscriptions in `useEffect` return functions
- Remove event listeners on component unmount
- Clear intervals/timeouts

---

## 6. Future Modifications / Known Issues

### 6.1 Known Issues

#### 1. Account Deletion Not Implemented
**Status**: Not implemented  
**Impact**: Users can sign up and log in, but cannot delete their accounts  
**Location**: No account deletion functionality exists  
**Solution**: 
- Add account deletion option in user profile
- Delete user data from `profiles` table
- Delete user's uploaded photos from storage and database
- Use Supabase Admin API to delete auth user: `supabase.auth.admin.deleteUser(userId)`
- Consider soft delete (mark as deleted) vs hard delete

#### 2. Placeholder Images
**Status**: Some placeholder images used  
**Impact**: Some pages/components may show placeholder images instead of real content  
**Location**: Check `public/` folder and image references in components  
**Solution**:
- Replace placeholder images in `public/` folder
- Update image paths in components to use real images
- Ensure all images are optimized for web

#### 3. Map Page Limitations
**Status**: Map interactions disabled  
**Impact**: Users cannot zoom, pan, or interact with the map on the Site Map page  
**Location**: `src/pages/SiteMap.tsx` - MapSettings component disables interactions  
**Solution**:
- Remove or modify the `MapSettings` component to enable interactions
- Consider adding zoom controls and pan functionality
- Test on mobile devices for touch interactions

#### 4. Email Configuration
**Status**: Requires manual setup  
**Impact**: Natural burial request emails won't send without SMTP configuration  
**Location**: `server/index.js` requires environment variables  
**Solution**:
- Set up SMTP credentials in environment variables
- Test email sending functionality
- Consider using Supabase Edge Functions for email instead of Express server

#### 5. Password Reset Flow
**Status**: Partially implemented  
**Impact**: Password reset page exists but may need Supabase configuration  
**Location**: `src/pages/ResetPassword.tsx`  
**Solution**:
- Configure password reset email template in Supabase
- Test the full reset flow
- Ensure redirect URLs are configured correctly

#### 6. Shop Page - No Payment Integration
**Status**: UI only, no payment processing  
**Impact**: Shop page displays products but cannot process purchases  
**Location**: `src/pages/Shop.tsx`  
**Solution**:
- Integrate payment processor (Stripe, PayPal, etc.)
- Add order management system
- Create order tracking functionality

#### 7. Limited Error Handling
**Status**: Basic error handling exists, could be improved  
**Impact**: Some errors may not be user-friendly  
**Solution**:
- Add comprehensive error boundaries
- Improve error messages for users
- Add error logging service (Sentry, etc.)

### 6.2 Recommended Future Enhancements

#### 1. User Profile Management
- Allow users to edit their profile information
- Add profile picture upload
- Display user's uploaded photos on profile

#### 2. Photo Moderation
- Add admin panel for moderating photos
- Implement photo reporting system
- Add ability to flag inappropriate content

#### 3. Search Functionality
- Add search to gallery (by caption, tags)
- Add search to species page
- Implement full-text search in database

#### 4. Notifications
- Email notifications for new features
- In-app notifications for likes, comments (if added)
- Newsletter subscription

#### 5. Analytics
- Add analytics tracking (Google Analytics, etc.)
- Track user engagement
- Monitor error rates

#### 6. Performance Optimizations
- Implement image lazy loading (partially done)
- Add pagination for large lists
- Optimize bundle size
- Implement code splitting

#### 7. Accessibility Improvements
- Ensure all interactive elements are keyboard accessible
- Improve screen reader support
- Add skip navigation links
- Test with accessibility tools

#### 8. Mobile Optimization
- Test and improve mobile experience
- Optimize touch interactions
- Improve mobile navigation

### 6.3 Technical Debt

#### 1. Type Safety
- Some `any` types may exist - should be replaced with proper types
- Database types should be regenerated when schema changes

#### 2. Testing
- Limited test coverage - should add more E2E tests
- Consider adding unit tests for utilities
- Add integration tests for API endpoints

#### 3. Documentation
- Some components lack JSDoc comments
- API endpoints need better documentation
- Database schema should be documented

#### 4. Code Organization
- Some large components could be split into smaller ones
- Consider extracting business logic into custom hooks
- Some duplicate code could be refactored

---

## Additional Resources

### Useful Links
- **Supabase Documentation**: https://supabase.com/docs
- **React Documentation**: https://react.dev
- **TypeScript Documentation**: https://www.typescriptlang.org/docs
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Vite Documentation**: https://vitejs.dev
- **React Router Documentation**: https://reactrouter.com

### Getting Help
- Review existing code for patterns
- Check component documentation
- Consult team members
- Search Supabase/React communities
- Review official documentation

---

**Remember**: When encountering issues, check the browser console, network tab, and Supabase dashboard logs. Most issues can be resolved by understanding the error messages and following the troubleshooting steps above.

