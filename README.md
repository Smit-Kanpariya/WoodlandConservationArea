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
- **Testing:** Comprehensive End-to-End (E2E) testing setup with Cypress.
- **Backend Integration:** Supabase client is configured (requires your own Supabase project credentials if you plan to use it).

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your computer:

1.  **Node.js** (Version 18 or higher)
    *   [Download Node.js](https://nodejs.org/)
    *   Verify installation: `node -v`
2.  **npm** (Node Package Manager - comes with Node.js)
    *   Verify installation: `npm -v`
3.  **Git** (Version control)
    *   [Download Git](https://git-scm.com/)

---

## 🚀 Installation Guide

Follow these steps to get the project running on your local machine:

### 1. Clone the Repository
Open your terminal (Command Prompt, PowerShell, or Terminal) and run:
```bash
git clone <YOUR_REPOSITORY_URL>
```
*Replace `<YOUR_REPOSITORY_URL>` with the actual URL of this git repo.*

### 2. Navigate to the Project Directory
```bash
cd WoodlandConservationArea
```

### 3. Install Dependencies
This command downloads and installs all the required libraries listed in `package.json` (React, Tailwind, Cypress, etc.):
```bash
npm install
```
### 4. Configure Environment Variables
The application needs to connect to the Supabase backend. You need to create a configuration file for this.

1.  In the root folder (`WoodlandConservationArea/`), create a new file named `.env`.
2.  Copy and paste the following code into the `.env` file:

```env
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
```

*Note: You will need to fill in these values with your specific project details if you are connecting to your own Supabase instance. Ask your team lead for these keys if you don't have them.*

### 5. Setting up the Contact Form (Email Service)
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

### Start Development Server
To work on the project, start the local development server:
```bash
npm run dev
```
*   The app will be available at: **http://localhost:8080**
*   The server supports "Hot Module Replacement" (HMR), so changes you make to the code will instantly appear in the browser.

### Build for Production
To create an optimized build for deployment:
```bash
npm run build
```
*   The output will be in the `dist/` folder.

### Preview Production Build
To test the production build locally:
```bash
npm run preview
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

*Documentation updated on December 4, 2025*
