# Woodland Conservation Area Project

> A modern web platform for preserving and showcasing the natural beauty of woodland areas, built for the Woodland Conservation Foundation.

## 👋 To Future Students & Developers

Welcome! This project has been set up as a robust foundation for the Woodland Conservation Area platform. It is designed to be scalable, maintainable, and easy to extend.

**Your Mission:**
You are tasked with continuing the development of this application. The core infrastructure, design system, and testing framework are already in place. You will likely be adding new features, refining the UI, or integrating backend services.

**Current State:**
- **Frontend:** Complete React + Vite setup with TypeScript.
- **Styling:** Tailwind CSS with shadcn/ui components for a premium look.
- **Maps:** Interactive maps using Leaflet.
- **Audio:** Enhanced Text-to-Speech using online natural voices with fallback.
- **Testing:** Comprehensive End-to-End (E2E) testing setup with Cypress.
- **Backend Integration:** Supabase client is configured (requires your own Supabase project credentials if you plan to use it).

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your computer:

1.  **Node.js** (Version 18 or higher)
    *   [Download Node.js](https://nodejs.org/)
    *   Verify installation: `node -v`
    *   **Note:** Node.js version 18 or higher is required. The project uses modern JavaScript features and dependencies that require this version.
2.  **npm** (Node Package Manager - comes with Node.js)
    *   Verify installation: `npm -v`
    *   npm is automatically installed with Node.js
3.  **Git** (Version control)
    *   [Download Git](https://git-scm.com/)
    *   Verify installation: `git --version`

---

## 🚀 Installation Guide

This guide will help you set up the project on UGDEV or your local development environment.

### 1. Getting the Project

You have two options to get the project onto your system:

#### Option A: Git Clone (Recommended)
If the repository is hosted on Git (GitHub, GitLab, etc.), use git clone:

```bash
git clone <YOUR_REPOSITORY_URL>
cd WoodlandConservationArea
```

*Replace `<YOUR_REPOSITORY_URL>` with the actual URL of this git repo.*

#### Option B: Manual Upload (For UGDEV or restricted environments)
If you need to upload the project manually:

1. Compress the project folder into a `.zip` or `.tar.gz` file
2. Upload the compressed file to UGDEV using your preferred method (FTP, SFTP, web interface, etc.)
3. Extract the archive on UGDEV:
   ```bash
   unzip WoodlandConservationArea.zip
   # or
   tar -xzf WoodlandConservationArea.tar.gz
   ```
4. Navigate to the project directory:
   ```bash
   cd WoodlandConservationArea
   ```

### 2. Install Dependencies

Once you have the project on your system, install all required dependencies:

```bash
npm install
```

This command will:
- Read the `package.json` file
- Download and install all dependencies listed in `dependencies` and `devDependencies`
- Create a `node_modules` folder with all required packages
- Install React, Vite, TypeScript, Tailwind CSS, Cypress, and all other project dependencies

**Note:** This process may take a few minutes depending on your internet connection. On UGDEV, ensure you have sufficient disk space and appropriate permissions.

### 3. Configure Environment Variables

The application requires environment variables to connect to Supabase and configure the email server. Follow these steps:

#### Frontend Environment Variables (.env in root directory)

1.  In the root folder (`WoodlandConservationArea/`), create a new file named `.env`.
2.  Copy and paste the following code into the `.env` file:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
VITE_SUPABASE_PROJECT_ID=your-project-id-here
```

3. Replace the placeholder values with your actual Supabase credentials:
   - `VITE_SUPABASE_URL`: Your Supabase project URL (found in Supabase Dashboard → Settings → API)
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon/public key (found in Supabase Dashboard → Settings → API)
   - `VITE_SUPABASE_PROJECT_ID`: Your Supabase project ID (found in Supabase Dashboard → Settings → General)

**Getting Supabase Credentials:**
- Log in to [Supabase Dashboard](https://supabase.com/dashboard)
- Select your project
- Navigate to Settings → API
- Copy the required values

*Note: You will need to fill in these values with your specific project details if you are connecting to your own Supabase instance. Ask your team lead for these keys if you don't have them.*

#### Backend Server Environment Variables (server/.env)

If you plan to use the email notification server (for natural burial requests):

1. Navigate to the `server/` directory
2. Create a file named `.env`
3. Copy the contents from `server/.env.example` (if it exists) or use the following template:

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

4. Configure the SMTP settings:
   - `SMTP_HOST`: Your email provider's SMTP server (e.g., `smtp.gmail.com` for Gmail)
   - `SMTP_PORT`: SMTP port (usually `587` for TLS or `465` for SSL)
   - `SMTP_USER`: Your email address
   - `SMTP_PASS`: Your email password or app-specific password (for Gmail, use an App Password)
   - `MAIL_TO`: Email address to receive burial requests
   - `MAIL_FROM`: Email address to send from

**Important Notes:**
- The `.env` files are gitignored and should never be committed to version control
- Keep your credentials secure and never share them publicly
- On UGDEV, ensure file permissions are set correctly for `.env` files

### 4. Setting up the Contact Form (Email Service)
The "Contact Us" page is set up to send emails using a free service called **EmailJS**. This allows the form to work instantly without needing complex server code.

**How it works right now:**
Currently, it is configured with a test account using these details:
*   **Service ID:** `service_4x4duj4`
*   **Template ID:** `template_owew8nx`
*   **Public Key:** `Z5R7CrPNBLeaMJKeP`

**How to make emails send to YOU:**
If you want to receive the contact form submissions in your own inbox, follow these simple steps:

1.  **Sign up:** Go to [EmailJS.com](https://www.emailjs.com/) and create a free account.
2.  **Add a Service:**
    *   Click "Email Services" -> "Add New Service".
    *   Choose "Gmail" (or your preferred provider) and connect your account.
    *   Copy your new **Service ID** (it looks like `service_xxxxx`).
3.  **Create a Template:**
    *   Click "Email Templates" -> "Create New Template".
    *   Design the email subjects/body. Use `{{name}}`, `{{email}}`, and `{{message}}` to show the user's input.
    *   Copy your **Template ID** (it looks like `template_xxxxx`).
4.  **Get your Public Key:**
    *   Click on your name/avatar in the top right -> "Account".
    *   Copy the **Public Key** (it looks like a random string of letters/numbers).
5.  **Update the Code:**
    *   Open the file: `src/pages/Contact.tsx`.
    *   Scroll down to around line 85 (inside the `handleSubmit` function).
    *   Replace the existing IDs with your new ones.

---

## 💻 Running the Application

### Start Frontend Development Server

To start the development server for the React frontend:

```bash
npm run dev
```

**Details:**
- The app will be available at: **http://localhost:8080** (or the next available port if 8080 is occupied)
- The server supports "Hot Module Replacement" (HMR), so changes you make to the code will instantly appear in the browser without requiring a full page refresh
- The development server runs in watch mode and automatically reloads when files change
- To stop the server, press `Ctrl+C` in the terminal

**On UGDEV:**
- Ensure port 8080 is available and not blocked by firewall rules
- You may need to configure port forwarding or proxy settings depending on your UGDEV setup
- Access the application using your UGDEV server URL (e.g., `http://ugdev-server-name:8080`)

### Start Backend Server (Optional)

If you need to use the email notification functionality for natural burial requests, start the Express server:

```bash
cd server
npm install  # Only needed if server dependencies aren't installed
node index.js
```

Or from the root directory:
```bash
# Install server dependencies first (if not already done)
cd server && npm install && cd ..

# Run the server (you'll need to set up server/.env first)
cd server
node index.js
```

**Details:**
- The backend server runs on port **3001** by default (configurable via `PORT` environment variable)
- The server handles POST requests to `/api/burial-request` for sending email notifications
- Ensure the `server/.env` file is configured with SMTP credentials before running
- To stop the server, press `Ctrl+C` in the terminal

**Note:** The backend server is optional and only required if you need email functionality. The frontend can run independently.

### Build Commands

#### Build for Production

To create an optimized production build of the frontend:

```bash
npm run build
```

**Details:**
- Creates an optimized, minified production build
- The output will be in the `dist/` folder
- This build is ready for deployment to a production server
- All assets are optimized and bundled for best performance
- The build process includes TypeScript compilation, CSS processing, and asset optimization

**Build Output:**
```
dist/
├── index.html          # Entry HTML file
├── assets/            # Bundled JavaScript, CSS, and other assets
│   ├── index-[hash].js
│   └── index-[hash].css
└── ...                # Other static assets from public/
```

#### Development Build

To create a development build (useful for debugging production builds):

```bash
npm run build:dev
```

**Details:**
- Creates a build in development mode (not minified)
- Useful for debugging production build issues
- Output is still in the `dist/` folder

### Preview Production Build

To test the production build locally before deployment:

```bash
npm run preview
```

**Details:**
- Serves the production build from the `dist/` folder
- Useful for testing the production build locally
- Typically runs on `http://localhost:4173` (Vite default preview port)
- This simulates how the application will behave in production

### Other Available Commands

#### Linting

To check code quality and catch potential errors:

```bash
npm run lint
```

**Details:**
- Runs ESLint to check for code style and potential issues
- Follows the project's ESLint configuration in `eslint.config.js`
- Fix issues before committing code

#### Testing Commands

See the [Testing with Cypress](#-testing-with-cypress) section below for detailed testing instructions.

### Automation Scripts

This project uses npm scripts defined in `package.json` for automation. All available scripts can be run using `npm run <script-name>`:

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code linter
- `npm run cypress:open` - Open Cypress test runner (interactive mode)
- `npm run cypress:run` - Run Cypress tests (headless mode)
- `npm run test:e2e` - Alias for `cypress:run`
- `npm run test:e2e:ui` - Alias for `cypress:open`

**Note:** This project does not use custom shell scripts or other automation tools beyond npm scripts. All automation is handled through npm scripts defined in `package.json`.

**Quick Start Automation (One Command Setup):**

While there's no single automated setup script, you can set up the project with these sequential commands:

```bash
# 1. Clone/Get the project
git clone <YOUR_REPOSITORY_URL>
cd WoodlandConservationArea

# 2. Install dependencies
npm install

# 3. Set up environment variables (manual step - copy from .env.example)
# Create .env in root and server/.env if needed

# 4. Start development server
npm run dev
```

---

## 🧪 Testing with Cypress

This project uses **Cypress** for End-to-End (E2E) testing. This ensures that critical flows (like navigation, login, forms) work as expected.

### Option A: Interactive Mode (Recommended for Development)
This opens the Cypress Test Runner, where you can see tests run in real-time.
```bash
npm run cypress:open
```
1.  Select **E2E Testing**.
2.  Choose a browser (e.g., Chrome).
3.  Click on a test file (e.g., `01-home.cy.ts`) to run it.

### Option B: Headless Mode (For CI/CD or Quick Checks)
Runs all tests in the command line without opening a browser window.
```bash
npm run cypress:run
```

### Test Files Location
All test files are located in: `cypress/e2e/`
*   `01-home.cy.ts`: Tests the home page.
*   `03-ecosystem.cy.ts`: Tests the ecosystem page.
*   `05-species.cy.ts`: Tests the species page.
*   `10-login.cy.ts`: Tests the login functionality.
*   `11-navigation.cy.ts`: Tests site-wide navigation.
*   `12-accessibility.cy.ts`: Checks for basic accessibility compliance.

---

## 📂 Project Structure

Here is a quick overview of the important folders:

```
WoodlandConservationArea/
├── src/
│   ├── components/      # Reusable UI components (Buttons, Nav, Footer)
│   │   ├── ui/          # shadcn/ui library components
│   │   └── map/         # Map-related components
│   ├── pages/           # Main page components (Home, About, Contact)
│   ├── data/            # Static data files (e.g., map.json)
│   ├── hooks/           # Custom React hooks (e.g., useAuth)
│   ├── lib/             # Utility functions and helpers
│   └── types/           # TypeScript type definitions
├── cypress/
│   ├── e2e/             # Test files (*.cy.ts)
│   └── support/         # Cypress support files and custom commands
├── public/              # Static assets (images, logos)
└── package.json         # Project configuration and dependencies
```

---

## 📦 Key Technologies & Packages

This project relies on the following major technologies. You don't need to install these individually; `npm install` handles them all.

*   **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
*   **Maps:** [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Testing:** [Cypress](https://www.cypress.io/)
*   **Backend/Auth:** [Supabase](https://supabase.com/) (Client installed)
*   **State Management:** [TanStack Query](https://tanstack.com/query/latest)

---

## ❓ Troubleshooting

**"Cannot find name 'describe' or 'it'" in Cypress files:**
*   This is a TypeScript editor issue.
*   **Fix:** Open `cypress/tsconfig.json` (it is already configured correctly) and restart your IDE's TypeScript server.
*   VS Code: `Ctrl+Shift+P` -> "TypeScript: Restart TS Server".

**Map not loading:**
*   Ensure `src/data/map.json` exists and is valid JSON.
*   Check if the Leaflet CSS is imported in `index.html` or `main.tsx`.

**Login not working:**
*   The project is set up for Supabase Auth. Ensure you have created the `.env` file as described in the "Configure Environment Variables" section above.

---

##  Image Attribution

Several images on the website have been sourced from:

1. **"Natural History of the French Village Conservation Woodland - A Report to the French Village Conservation Woodland Committee"**
   - Authors: David Patriquin, Jess Lewis, Livy Fraser, Liam Holwell, Rohan Kariyawansa
   - Date: November 2021

2. **iNaturalist.org**

**Note:** The images are being used for educational purposes exclusively and will be individually cited before the general public views them.

---

## 📋 Quick Setup Reference for UGDEV

**Complete setup steps at a glance:**

1. **Get the project:**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd WoodlandConservationArea
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Create `.env` in root directory (copy from `.env.example` if available)
   - Create `server/.env` if using email server (copy from `server/.env.example` if available)
   - Fill in Supabase credentials and SMTP settings

4. **Run the application:**
   ```bash
   # Frontend
   npm run dev
   
   # Backend (optional, in separate terminal)
   cd server && node index.js
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

**Required Tools:**
- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git (for cloning)

**Key Commands:**
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Code linting
- `npm run cypress:open` - Open test runner
- `npm run cypress:run` - Run tests headless

---

*Documentation updated on December 11, 2025*
