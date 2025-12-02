# Technical Support for Clients' Tech Team
## Woodland Conservation Foundation Project

**Version:** 1.0  
**Last Updated:** 2025  
**Purpose:** This document provides a high-level technical overview for the client's technical team, focusing on maintenance, administration, and troubleshooting without deep technical implementation details.

---

## Table of Contents

1. [General Project Overview](#general-project-overview)
2. [Email Setup and Notifications](#email-setup-and-notifications)
3. [Database Access (Supabase)](#database-access-supabase)
4. [Managing Images and Media](#managing-images-and-media)
5. [System Maintenance and Common Administrative Tasks](#system-maintenance-and-common-administrative-tasks)
6. [How to Access and Review Logs](#how-to-access-and-review-logs)
7. [Basic Troubleshooting Guide](#basic-troubleshooting-guide)

---

## 1. General Project Overview

### 1.1 Project Purpose

The Woodland Conservation Foundation website is a platform for:
- Showcasing conservation area information
- Allowing users to upload and view photos of the conservation area
- Providing information about species, ecosystems, and natural burial services
- Enabling user registration and authentication
- Displaying an interactive site map

### 1.2 High-Level Architecture

**Frontend (Client-Side)**
- Built with React and TypeScript
- Runs in users' web browsers
- Communicates with Supabase for data and authentication
- Hosted on a web server (deployment platform)

**Backend Services**
- **Supabase**: Provides database, user authentication, and file storage
- **Express.js Server**: Handles email notifications (optional, for natural burial requests)

**Database**
- PostgreSQL database hosted on Supabase
- Stores user accounts, photos, and related data

**File Storage**
- Supabase Storage for uploaded images
- Public folder for static website assets

### 1.3 Key Areas to Know

**User Management**
- Users can sign up and log in through the website
- User data is stored in Supabase
- Authentication is handled automatically by Supabase

**Photo Gallery**
- Users can upload photos (requires login)
- Photos are stored in Supabase Storage
- Photo metadata (captions, uploader info) is stored in the database

**Content Management**
- Most content is hardcoded in React components
- Some content (photos, user data) comes from the database
- To change static content, code files need to be modified

---

## 2. Email Setup and Notifications

### 2.1 Email Configuration Overview

The system sends emails for:
- **Natural Burial Information Requests**: When users submit the natural burial inquiry form
- **Password Reset**: When users request password resets (handled by Supabase)
- **Email Confirmation**: When users sign up (if enabled in Supabase)

### 2.2 Setting Up Email for Natural Burial Requests

The natural burial request emails are sent through an Express.js server. To configure:

1. **Obtain SMTP Credentials**
   - You'll need SMTP server details from your email provider (Gmail, SendGrid, etc.)
   - Required information:
     - SMTP Host (e.g., `smtp.gmail.com`)
     - SMTP Port (usually 587 or 465)
     - SMTP Username (your email address)
     - SMTP Password (app-specific password if using Gmail)

2. **Set Environment Variables**
   - Create a `.env` file in the `server/` directory (or set in your hosting environment)
   - Add the following variables:
     ```
     SMTP_HOST=your-smtp-host.com
     SMTP_PORT=587
     SMTP_USER=your-email@example.com
     SMTP_PASS=your-app-password
     MAIL_TO=woodlandconservationsite@gmail.com
     MAIL_FROM=your-email@example.com
     PORT=3001
     ```

3. **Test Email Sending**
   - Submit a test natural burial request through the website
   - Check that the email is received at the `MAIL_TO` address
   - Check server logs for any errors

### 2.3 Email Reply Configuration

- **Reply-To Address**: Set to the user's email (automatically configured)
- **From Address**: Set via `MAIL_FROM` environment variable
- **Recipient**: Set via `MAIL_TO` environment variable

### 2.4 Supabase Email Configuration

For password reset and email confirmation emails:

1. **Access Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to **Authentication** → **Email Templates**
   - Customize email templates if needed

2. **Configure Email Provider**
   - Go to **Project Settings** → **Auth**
   - Configure SMTP settings if you want to use custom SMTP
   - Otherwise, Supabase uses their default email service

3. **Email Redirect URLs**
   - In **Authentication** → **URL Configuration**
   - Set site URL and redirect URLs for:
     - Email confirmation redirect
     - Password reset redirect

---

## 3. Database Access (Supabase)

### 3.1 Accessing Supabase Dashboard

1. **Login**
   - Go to https://supabase.com
   - Log in with your Supabase account credentials
   - Select your project

2. **Dashboard Sections**
   - **Table Editor**: View and edit database tables
   - **SQL Editor**: Run custom SQL queries
   - **Authentication**: Manage users and authentication settings
   - **Storage**: Manage uploaded files
   - **Logs**: View system logs and errors

### 3.2 Viewing User Data

#### Method 1: Through Authentication Section
1. Go to **Authentication** → **Users**
2. View list of all registered users
3. See user email, creation date, last sign-in
4. Click on a user to see detailed information

#### Method 2: Through Table Editor
1. Go to **Table Editor**
2. Select `profiles` table
3. View user profile information (first name, last name, email)

### 3.3 Managing Users

#### Viewing User Information
- **Authentication** → **Users**: See all users with email, sign-up date, last sign-in
- **Table Editor** → `profiles`: See user profile details

#### Adding Users (Manual)
1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create New User**
3. Enter email and password
4. User will receive email to confirm (if email confirmation is enabled)

#### Updating User Information
1. Go to **Table Editor** → `profiles`
2. Find the user by email or ID
3. Click on the row to edit
4. Update fields (first_name, last_name, etc.)
5. Click **Save**

#### Deleting Users
**Note**: Account deletion is not implemented in the website UI. To delete manually:

1. **Delete User Data**:
   - Go to **Table Editor** → `photos`
   - Filter by `uploaded_by` = user's ID
   - Delete user's photos (or they'll be deleted automatically if CASCADE is set)
   - Go to **Table Editor** → `profiles`
   - Delete user's profile record

2. **Delete Auth User**:
   - Go to **Authentication** → **Users**
   - Find the user
   - Click **More Options** → **Delete User**
   - Confirm deletion

**Warning**: Deleting a user will also delete their uploaded photos (if CASCADE is configured).

#### Resetting User Passwords
1. Go to **Authentication** → **Users**
2. Find the user
3. Click **More Options** → **Reset Password**
4. User will receive password reset email

### 3.4 Viewing Database Tables

#### Main Tables

**`photos` Table**
- Contains all uploaded photos
- Columns:
  - `id`: Unique photo ID
  - `image_url`: URL to the image file
  - `caption`: Photo caption (optional)
  - `uploaded_by`: User ID who uploaded
  - `created_at`: Upload timestamp
  - `updated_at`: Last update timestamp

**`profiles` Table**
- User profile information
- Columns:
  - `id`: User ID (matches auth.users)
  - `email`: User email
  - `first_name`: First name (optional)
  - `last_name`: Last name (optional)
  - `updated_at`: Last update timestamp

**`photo_likes` Table**
- Tracks likes on photos
- Columns:
  - `id`: Like ID
  - `photo_id`: Photo that was liked
  - `user_id`: User who liked (if authenticated)
  - `session_id`: Session ID (if anonymous)
  - `created_at`: Like timestamp

### 3.5 Running SQL Queries

1. Go to **SQL Editor**
2. Click **New Query**
3. Write your SQL query
4. Click **Run** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

**Example Queries:**

```sql
-- Get all photos with user information
SELECT 
  p.*,
  pr.email,
  pr.first_name,
  pr.last_name
FROM photos p
LEFT JOIN profiles pr ON p.uploaded_by = pr.id
ORDER BY p.created_at DESC;

-- Count photos per user
SELECT 
  pr.email,
  COUNT(p.id) as photo_count
FROM profiles pr
LEFT JOIN photos p ON pr.id = p.uploaded_by
GROUP BY pr.id, pr.email
ORDER BY photo_count DESC;

-- Get recent sign-ups
SELECT 
  email,
  created_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;
```

---

## 4. Managing Images and Media

### 4.1 Accessing Uploaded Images

#### Through Supabase Storage
1. Go to **Storage** in Supabase dashboard
2. Click on **`photos`** bucket
3. Browse folders (organized by user ID)
4. View, download, or delete images

#### Through Database
1. Go to **Table Editor** → `photos`
2. View `image_url` column to see image URLs
3. Click URL to view image in browser

### 4.2 Removing Images

#### Remove Single Image
1. **Delete from Database**:
   - Go to **Table Editor** → `photos`
   - Find the photo record
   - Click **Delete** (trash icon)
   - Confirm deletion

2. **Delete from Storage** (if not automatically deleted):
   - Go to **Storage** → `photos` bucket
   - Navigate to the file
   - Click **Delete**

#### Remove Multiple Images
1. Go to **Table Editor** → `photos`
2. Select multiple rows (checkboxes)
3. Click **Delete Selected**
4. Confirm deletion

#### Remove All Images from a User
1. Go to **SQL Editor**
2. Run query:
   ```sql
   DELETE FROM photos 
   WHERE uploaded_by = 'USER_ID_HERE';
   ```
   (Replace `USER_ID_HERE` with actual user ID)

### 4.3 Replacing Images

#### Replace Image File (Keep Same Record)
1. Go to **Storage** → `photos` bucket
2. Find the image file
3. Click **Upload** to replace (or delete and upload new)
4. Update `image_url` in database if URL changed

#### Update Image Caption
1. Go to **Table Editor** → `photos`
2. Find the photo
3. Click on `caption` field
4. Edit the caption
5. Click **Save**

### 4.4 Uploading New Images Manually

1. **Upload to Storage**:
   - Go to **Storage** → `photos` bucket
   - Click **Upload File**
   - Select image file
   - Choose folder (user ID) or create new folder

2. **Get Public URL**:
   - Click on uploaded file
   - Copy the **Public URL**

3. **Add to Database**:
   - Go to **Table Editor** → `photos`
   - Click **Insert Row**
   - Fill in:
     - `image_url`: Paste the public URL
     - `caption`: Add caption (optional)
     - `uploaded_by`: User ID (optional, can be null)
   - Click **Save**

### 4.5 Managing Static Website Images

Static images (logo, hero images, etc.) are in the `public/` folder:
- **Location**: Project root → `public/` folder
- **Access**: Through file system or code repository
- **To Replace**: 
  1. Delete old image file
  2. Add new image with same filename, OR
  3. Update image paths in code files

**Common Static Images**:
- `/logo.png` - Website logo
- `/1.png`, `/2.png`, etc. - Product images for shop
- Images in `src/assets/` - Used in components

---

## 5. System Maintenance and Common Administrative Tasks

### 5.1 Regular Maintenance Tasks

#### Weekly Tasks
- **Review User Sign-ups**: Check for spam or suspicious accounts
- **Monitor Photo Uploads**: Ensure appropriate content
- **Check Error Logs**: Review Supabase logs for errors

#### Monthly Tasks
- **Review Database Size**: Check storage usage in Supabase
- **Clean Up Old Data**: Remove old test data if needed
- **Update Content**: Review and update static content if needed
- **Backup Check**: Verify backups are working (Supabase handles this automatically)

### 5.2 Managing User Accounts

#### Approving/Rejecting Sign-ups
- Currently, all sign-ups are automatic (no approval required)
- To manually approve: Review in **Authentication** → **Users**
- To reject/delete: Delete user account (see Section 3.3)

#### Handling User Issues
- **Forgot Password**: Users can reset via "Reset Password" link
- **Account Locked**: Check **Authentication** → **Users** for locked accounts
- **Email Not Received**: Check Supabase email settings and spam folder

### 5.3 Changing Website Content

#### Static Content (Text, Images)
- Most content is in React component files (`src/pages/`)
- To change:
  1. Locate the file (e.g., `src/pages/About.tsx`)
  2. Edit the text/content
  3. Save and rebuild the website
  4. Deploy updated version

#### Dynamic Content (Database)
- Photos: Manage through Supabase (see Section 4)
- User data: Manage through Supabase (see Section 3)

### 5.4 Server Downtime or Issues

#### If Website is Down
1. **Check Hosting Platform**
   - Verify hosting service is operational
   - Check deployment status
   - Review hosting platform logs

2. **Check Supabase Status**
   - Go to https://status.supabase.com
   - Verify all services are operational
   - Check Supabase dashboard for errors

3. **Check Domain/DNS**
   - Verify domain is pointing to correct server
   - Check DNS records if recently changed

#### If Database is Unavailable
1. Check Supabase dashboard for service status
2. Review Supabase logs for errors
3. Contact Supabase support if needed
4. Check database connection settings

#### If Email Not Sending
1. **Check SMTP Settings**:
   - Verify environment variables are set correctly
   - Test SMTP credentials
   - Check server logs for errors

2. **Check Supabase Email**:
   - Verify email templates are configured
   - Check email provider settings in Supabase
   - Review email logs in Supabase dashboard

### 5.5 Security Considerations

#### User Data Protection
- User passwords are hashed (not stored in plain text)
- Authentication handled by Supabase (secure)
- Database has Row Level Security (RLS) enabled

#### Regular Security Checks
- Review user accounts for suspicious activity
- Check for unauthorized photo uploads
- Monitor error logs for security issues
- Keep dependencies updated (handled during deployment)

---

## 6. How to Access and Review Logs

### 6.1 Supabase Logs

#### Accessing Logs
1. Go to Supabase dashboard
2. Navigate to **Logs** (in left sidebar)
3. Select log type:
   - **API Logs**: API request/response logs
   - **Postgres Logs**: Database query logs
   - **Auth Logs**: Authentication event logs
   - **Storage Logs**: File upload/download logs

#### Understanding Logs
- **Timestamp**: When the event occurred
- **Level**: Error, Warning, Info
- **Message**: Description of what happened
- **Metadata**: Additional context (user ID, IP address, etc.)

#### Common Log Messages
- **200 OK**: Successful request
- **401 Unauthorized**: Authentication failed
- **403 Forbidden**: Permission denied
- **500 Internal Server Error**: Server error

### 6.2 Application Logs

#### Browser Console (For Frontend Issues)
1. Open website in browser
2. Press `F12` (or right-click → Inspect)
3. Go to **Console** tab
4. Look for error messages (red text)

#### Server Logs (For Backend Issues)
- If using a hosting platform, check platform's log viewer
- For Express server, logs appear in terminal/console where server is running
- Check for error messages related to email sending

### 6.3 Error Monitoring

#### Common Errors to Watch For
- **Database Connection Errors**: Check Supabase status
- **Authentication Errors**: Check user credentials and Supabase auth settings
- **Storage Errors**: Check file size limits and storage quota
- **Email Errors**: Check SMTP configuration

#### Interpreting Errors
- **Error Messages**: Usually descriptive of the problem
- **Stack Traces**: Show where error occurred (for developers)
- **Error Codes**: HTTP status codes (404 = not found, 500 = server error)

---

## 7. Basic Troubleshooting Guide

### 7.1 Website Not Loading

**Steps to Troubleshoot:**
1. Check if website URL is correct
2. Try refreshing the page (hard refresh: `Ctrl+Shift+R` / `Cmd+Shift+R`)
3. Clear browser cache
4. Try different browser
5. Check hosting platform status
6. Verify domain DNS settings

### 7.2 Users Cannot Log In

**Steps to Troubleshoot:**
1. Verify Supabase is operational (check status page)
2. Check if user exists in **Authentication** → **Users**
3. Try resetting user's password
4. Check browser console for errors
5. Verify email confirmation is not blocking login (if enabled)

### 7.3 Photos Not Displaying

**Steps to Troubleshoot:**
1. Check if photos exist in **Storage** → `photos` bucket
2. Verify `image_url` in database is correct
3. Check if image URLs are accessible (try opening in browser)
4. Check browser console for image loading errors
5. Verify storage bucket is set to "Public"

### 7.4 Photos Not Uploading

**Steps to Troubleshoot:**
1. Verify user is logged in
2. Check file size (must be under 5-10MB)
3. Check file type (must be image file)
4. Check browser console for errors
5. Verify storage bucket exists and has correct permissions
6. Check Supabase storage logs

### 7.5 Emails Not Sending

**Steps to Troubleshoot:**
1. **For Natural Burial Requests**:
   - Check Express server is running
   - Verify SMTP environment variables are set
   - Check server logs for errors
   - Test SMTP credentials

2. **For Password Reset/Confirmation**:
   - Check Supabase email settings
   - Verify email templates are configured
   - Check Supabase email logs
   - Verify redirect URLs are correct

### 7.6 Database Queries Failing

**Steps to Troubleshoot:**
1. Check Supabase dashboard for service status
2. Verify database connection
3. Check RLS policies (may be blocking access)
4. Review SQL Editor for query syntax errors
5. Check database logs for detailed error messages

### 7.7 Performance Issues

**Steps to Troubleshoot:**
1. Check Supabase dashboard for service status
2. Review database query performance
3. Check for large numbers of photos (may need pagination)
4. Verify images are optimized
5. Check hosting platform performance metrics

### 7.8 Quick Fixes

#### Clear Browser Cache
- Chrome/Edge: `Ctrl+Shift+Delete` → Clear cache
- Firefox: `Ctrl+Shift+Delete` → Clear cache
- Safari: `Cmd+Option+E` → Clear cache

#### Check API Status
- Supabase: https://status.supabase.com
- Your hosting platform status page

#### Restart Services
- If you have access to server: Restart Express server
- Supabase services restart automatically (no action needed)

---

## Quick Reference

### Important URLs
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Supabase Status**: https://status.supabase.com
- **Project Repository**: (Your Git repository URL)

### Key Contacts
- **Supabase Support**: Available through Supabase dashboard
- **Hosting Platform Support**: (Your hosting provider's support)
- **Development Team**: (Contact information for technical issues)

### Common Tasks Checklist
- [ ] Check Supabase status
- [ ] Review error logs
- [ ] Verify environment variables
- [ ] Test email sending
- [ ] Check user accounts
- [ ] Review photo uploads
- [ ] Monitor database usage

---

**Note**: For complex technical issues or code changes, contact your development team. This guide covers administrative and maintenance tasks that can be performed through the Supabase dashboard and basic troubleshooting.

