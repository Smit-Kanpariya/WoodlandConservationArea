# Woodland Conservation Area - Setup Guide for UGDEV
# Made by Madhur Sharma (A00477319)
## Installation and Deployment Instructions

This document provides complete instructions for setting up the Woodland Conservation Area project on UGDEV or any development server.

---

## Table of Contents

1. [Required Tools](#required-tools)
2. [Getting the Project onto UGDEV](#getting-the-project-onto-ugdev)
3. [Installing Dependencies](#installing-dependencies)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Build Commands](#build-commands)
6. [Run Commands](#run-commands)
7. [Automation Scripts](#automation-scripts)
8. [Quick Reference](#quick-reference)

---

## Required Tools

Before setting up the project, ensure the following tools are installed:

### 1. Node.js
- **Version:** 18 or higher (required)
- **Download:** https://nodejs.org/
- **Verification:** Run `node -v` in terminal
- **Note:** Node.js version 18 or higher is required. The project uses modern JavaScript features and dependencies that require this version.

### 2. npm (Node Package Manager)
- **Comes with:** Node.js (automatically installed)
- **Verification:** Run `npm -v` in terminal
- **Purpose:** Manages project dependencies and scripts

### 3. Git (Version Control)
- **Download:** https://git-scm.com/
- **Verification:** Run `git --version` in terminal
- **Purpose:** Used for cloning the repository

**Note:** Python is NOT required for this project. This is a Node.js-based application.

---

## Getting the Project onto UGDEV

You have two options to get the project onto UGDEV:

### Option A: Git Clone (Recommended)

If the repository is hosted on Git (GitHub, GitLab, Bitbucket, etc.), use git clone:

```bash
git clone <YOUR_REPOSITORY_URL>
cd WoodlandConservationArea
```

Replace `<YOUR_REPOSITORY_URL>` with the actual URL of your git repository.

**Example:**
```bash
git clone https://github.com/username/WoodlandConservationArea.git
cd WoodlandConservationArea
```

### Option B: Manual Upload

If you need to upload the project manually to UGDEV:

1. **Compress the project folder** into a `.zip` or `.tar.gz` file on your local machine
2. **Upload the compressed file** to UGDEV using your preferred method:
   - FTP/SFTP client (FileZilla, WinSCP, etc.)
   - Web-based file manager
   - Command line tools (scp, rsync, etc.)
3. **Extract the archive** on UGDEV:
   ```bash
   unzip WoodlandConservationArea.zip
   # or
   tar -xzf WoodlandConservationArea.tar.gz
   ```
4. **Navigate to the project directory:**
   ```bash
   cd WoodlandConservationArea
   ```

---

## Installing Dependencies

Once you have the project on UGDEV or your local machine, install all required dependencies:

```bash
npm install
```

### What This Command Does:
- Reads the `package.json` file
- Downloads and installs all dependencies listed in `dependencies` and `devDependencies`
- Creates a `node_modules` folder with all required packages
- Installs React, Vite, TypeScript, Tailwind CSS, Cypress, and all other project dependencies

### Important Notes:
- This process may take 2-5 minutes depending on your internet connection
- On UGDEV, ensure you have sufficient disk space (approximately 200-300 MB for node_modules)
- Ensure you have appropriate file permissions on UGDEV
- If installation fails, check that Node.js version is 18 or higher: `node -v`

### Troubleshooting Installation:
- **Permission errors:** Use `sudo npm install` if necessary (UGDEV admin may need to handle this)
- **Network issues:** Check internet connection or proxy settings on UGDEV
- **Version conflicts:** Ensure Node.js version is 18 or higher

---

## Environment Variables Setup

The application requires environment variables to connect to Supabase (database/authentication) and configure the email server. This setup uses `.env.example` files as templates.

### Frontend Environment Variables (.env in root directory)

1. **Locate or create the `.env` file:**
   - Navigate to the root folder of the project (`WoodlandConservationArea/`)
   - Check if `.env.example` exists
   - Create a new file named `.env` (if it doesn't exist)

2. **Copy from `.env.example` or create with this template:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
   VITE_SUPABASE_PROJECT_ID=your-project-id-here
   ```

3. **Fill in your actual Supabase credentials:**
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon/public key
   - `VITE_SUPABASE_PROJECT_ID`: Your Supabase project ID

### Getting Supabase Credentials:

1. Log in to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → Use for `VITE_SUPABASE_URL`
   - **anon/public key** → Use for `VITE_SUPABASE_PUBLISHABLE_KEY`
   - **Project ID** → Use for `VITE_SUPABASE_PROJECT_ID` (found in Settings → General)

### Backend Server Environment Variables (server/.env)

**Note:** Only required if you plan to use the email notification server (for natural burial requests).

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Create `.env` file:**
   - Check if `server/.env.example` exists
   - Create a new file named `.env`

3. **Copy from `server/.env.example` or use this template:**
   ```env
   # Server Configuration
   PORT=3001

   # SMTP Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-specific-password

   # Email Recipients
   MAIL_TO=woodlandconservationsite@gmail.com
   MAIL_FROM=your-email@gmail.com
   ```

4. **Configure the SMTP settings:**
   - `SMTP_HOST`: Your email provider's SMTP server
     - Gmail: `smtp.gmail.com`
     - Outlook: `smtp-mail.outlook.com`
     - Others: Check your email provider's documentation
   - `SMTP_PORT`: SMTP port number
     - `587` for TLS (recommended)
     - `465` for SSL
   - `SMTP_USER`: Your email address
   - `SMTP_PASS`: Your email password or app-specific password
     - For Gmail: Generate an "App Password" in Google Account settings
   - `MAIL_TO`: Email address to receive burial requests
   - `MAIL_FROM`: Email address to send from

### Important Security Notes:
- `.env` files are gitignored and should NEVER be committed to version control
- Keep your credentials secure and never share them publicly
- On UGDEV, ensure file permissions are set correctly (typically `600` or `644`)
- Never commit `.env` files with real credentials

---

## Build Commands

### Build for Production

Creates an optimized, production-ready build:

```bash
npm run build
```

**Output:**
- Creates a `dist/` folder containing the optimized build
- All files are minified and optimized for production
- Ready for deployment to a production server

**Build Contents:**
```
dist/
├── index.html          # Entry HTML file
├── assets/            # Bundled JavaScript, CSS, and other assets
│   ├── index-[hash].js
│   └── index-[hash].css
└── ...                # Other static assets from public/
```

### Development Build

Creates a development build (not minified, useful for debugging):

```bash
npm run build:dev
```

**Use Cases:**
- Debugging production build issues
- Testing build process
- Development deployment

---

## Run Commands

### Start Frontend Development Server

Starts the React development server with hot module replacement:

```bash
npm run dev
```

**Details:**
- Server runs on: **http://localhost:8080** (default)
- Hot Module Replacement (HMR) enabled - changes appear instantly
- Automatically reloads when files change
- Stop server: Press `Ctrl+C` in terminal

**On UGDEV:**
- Ensure port 8080 is available
- May need to configure firewall or port forwarding
- Access via: `http://ugdev-server-name:8080` or configured URL

### Start Backend Server (Optional)

Only required if using email notification functionality:

```bash
cd server
npm install  # Only needed first time or if dependencies changed
node index.js
```

**Alternative (from root directory):**
```bash
# Install server dependencies (if not already done)
cd server && npm install && cd ..

# Run the server
cd server
node index.js
```

**Details:**
- Server runs on: **http://localhost:3001** (default, configurable via `PORT`)
- Handles POST requests to `/api/burial-request`
- Requires `server/.env` with SMTP configuration
- Stop server: Press `Ctrl+C` in terminal

**Note:** The backend server is optional. The frontend can run independently.

### Preview Production Build

Test the production build locally before deployment:

```bash
npm run preview
```

**Details:**
- Serves the build from `dist/` folder
- Typically runs on `http://localhost:4173` (Vite default)
- Simulates production environment

### Other Run Commands

**Linting:**
```bash
npm run lint
```
Checks code quality and catches potential errors using ESLint.

**Testing (Interactive):**
```bash
npm run cypress:open
```
Opens Cypress test runner in interactive mode.

**Testing (Headless):**
```bash
npm run cypress:run
```
Runs all Cypress tests in headless mode (no browser window).

---

## Automation Scripts

This project uses npm scripts defined in `package.json` for all automation. All scripts are run using `npm run <script-name>`.

### Available Scripts:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint code linter |
| `npm run cypress:open` | Open Cypress test runner (interactive) |
| `npm run cypress:run` | Run Cypress tests (headless) |
| `npm run test:e2e` | Alias for `cypress:run` |
| `npm run test:e2e:ui` | Alias for `cypress:open` |

### Notes on Automation:

- **No custom shell scripts:** This project does not use custom shell scripts or other automation tools beyond npm scripts
- **All automation through npm:** All automation is handled through npm scripts defined in `package.json`
- **No external tools required:** No need for additional task runners like Grunt, Gulp, or Make

### Quick Setup Automation:

While there's no single automated setup script, you can set up the project with these sequential commands:

```bash
# 1. Clone the project
git clone <YOUR_REPOSITORY_URL>
cd WoodlandConservationArea

# 2. Install dependencies
npm install

# 3. Set up environment variables (manual step)
# - Create .env in root (copy from .env.example if available)
# - Create server/.env if needed (copy from server/.env.example if available)
# - Fill in your credentials

# 4. Start development server
npm run dev
```

---

## Quick Reference

### Complete Setup Checklist

- [ ] Node.js v18+ installed (`node -v`)
- [ ] Git installed (`git --version`)
- [ ] Project cloned/uploaded to UGDEV
- [ ] Dependencies installed (`npm install`)
- [ ] Frontend `.env` file created with Supabase credentials
- [ ] Backend `server/.env` file created (if using email server)
- [ ] Development server tested (`npm run dev`)
- [ ] Production build tested (`npm run build`)

### Essential Commands Summary

```bash
# Setup
npm install                    # Install dependencies

# Development
npm run dev                    # Start dev server (port 8080)
cd server && node index.js     # Start backend server (port 3001)

# Building
npm run build                  # Production build
npm run build:dev              # Development build
npm run preview                # Preview production build

# Code Quality
npm run lint                   # Run linter

# Testing
npm run cypress:open           # Open test runner
npm run cypress:run            # Run tests headless
```

### Port Information

- **Frontend Dev Server:** 8080 (default)
- **Backend Server:** 3001 (default, configurable)
- **Preview Server:** 4173 (default)

### File Locations

- **Environment Variables (Frontend):** `/.env`
- **Environment Variables (Backend):** `/server/.env`
- **Production Build Output:** `/dist/`
- **Project Configuration:** `/package.json`
- **Source Code:** `/src/`
- **Test Files:** `/cypress/e2e/`

---

## Troubleshooting

### Common Issues

**Node.js version error:**
- Ensure Node.js version 18 or higher is installed
- Check version: `node -v`
- Update if necessary from nodejs.org

**Port already in use:**
- Change port in `vite.config.ts` (frontend) or `server/.env` (backend)
- Or stop the process using the port

**Environment variables not working:**
- Ensure `.env` files are in the correct location (root or server/)
- Restart the server after changing `.env` files
- Check file permissions on UGDEV

**Dependencies installation fails:**
- Check internet connection
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Build fails:**
- Check for TypeScript errors: `npm run lint`
- Ensure all dependencies are installed: `npm install`
- Check Node.js version compatibility

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Project:** Woodland Conservation Area

