# Coding Standards and Guidelines
## Woodland Conservation Foundation Project

**Version:** 1.0  
**Last Updated:** 2025  
**Purpose:** This document provides comprehensive coding standards, best practices, and guidelines for developers working on the Woodland Conservation Foundation project.

---

## Table of Contents

1. [Project Structure and Organization](#project-structure-and-organization)
2. [Coding Conventions](#coding-conventions)
3. [Code Documentation Practices](#code-documentation-practices)
4. [Contributing and Modifying Code](#contributing-and-modifying-code)
5. [Testing and Debugging](#testing-and-debugging)

---

## 1. Project Structure and Organization

### 1.1 Folder Structure

The project follows a modular, feature-based structure:

```
WoodlandConservationArea/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # shadcn/ui component library
│   │   └── [Component].tsx # Feature-specific components
│   ├── pages/              # Page-level components (routes)
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # Third-party service integrations
│   │   └── supabase/       # Supabase client and types
│   ├── lib/                # Utility functions and helpers
│   ├── data/               # Static data and constants
│   ├── assets/             # Images, fonts, and static files
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Public static assets
├── server/                 # Express.js backend server
├── supabase/               # Supabase configuration and migrations
│   └── migrations/         # Database migration files
├── cypress/                # End-to-end tests
│   └── e2e/               # Test specifications
└── [config files]         # Vite, TypeScript, Tailwind, etc.
```

### 1.2 Component Organization

**Components** (`src/components/`):
- **UI Components** (`ui/`): Reusable UI primitives from shadcn/ui (buttons, dialogs, cards, etc.)
- **Feature Components**: Domain-specific components (e.g., `PhotoUpload.tsx`, `SpeciesCard.tsx`, `WeatherWidget.tsx`)
- **Layout Components**: Structural components (`Layout.tsx`, `Navigation.tsx`, `Footer.tsx`)

**Pages** (`src/pages/`):
- Each file represents a route/page in the application
- Pages should be self-contained and import components from `src/components/`
- Examples: `Home.tsx`, `Gallery.tsx`, `Species.tsx`, `Contact.tsx`

**Hooks** (`src/hooks/`):
- Custom React hooks for shared logic
- Examples: `useAuth.tsx`, `useLikes.tsx`, `use-toast.ts`
- Hooks should be prefixed with `use` and follow React hook naming conventions

**Integrations** (`src/integrations/`):
- Third-party service clients and configurations
- Currently contains Supabase client setup
- Environment variables should be accessed here, not directly in components

### 1.3 File Naming Conventions

- **Components**: PascalCase (e.g., `PhotoUpload.tsx`, `SpeciesCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.tsx`, `useLikes.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Pages**: PascalCase matching route names (e.g., `Home.tsx`, `Gallery.tsx`)
- **Constants/Data**: camelCase (e.g., `speciesData.ts`)

### 1.4 Import Organization

Imports should be organized in the following order:

1. React and React-related imports
2. Third-party library imports
3. Internal component imports (using `@/` alias)
4. Type imports
5. Relative imports (if any)

Example:
```typescript
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { Photo } from '@/types';
```

---

## 2. Coding Conventions

### 2.1 Naming Conventions

#### Variables and Functions
- Use **camelCase** for variables and functions
- Use descriptive names that indicate purpose
- Boolean variables should start with `is`, `has`, `should`, or `can` (e.g., `isLoading`, `hasError`)

```typescript
// Good
const [isUploading, setIsUploading] = useState(false);
const fetchPhotos = async () => { /* ... */ };
const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };

// Bad
const [uploading, setUploading] = useState(false);
const getPhotos = async () => { /* ... */ };
const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
```

#### Components
- Use **PascalCase** for component names
- Component names should be nouns or noun phrases
- Match the file name exactly

```typescript
// Good
const PhotoUpload = () => { /* ... */ };
const SpeciesCard = ({ species }: { species: Species }) => { /* ... */ };

// Bad
const photoUpload = () => { /* ... */ };
const Species = () => { /* ... */ };
```

#### Constants
- Use **UPPER_SNAKE_CASE** for true constants (values that never change)
- Use **camelCase** for configuration objects that might be modified

```typescript
// Good
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000;

// Good for config objects
const mapConfig = {
  center: { lat: 44.623917, lng: -63.920472 },
  zoom: 17,
};
```

#### Types and Interfaces
- Use **PascalCase** for types and interfaces
- Interface names should be descriptive nouns
- Props interfaces can be named `[Component]Props`

```typescript
// Good
interface Photo {
  id: string;
  image_url: string;
  caption: string | null;
}

interface PhotoUploadProps {
  onUploadSuccess?: () => void;
}

// Bad
interface photo { /* ... */ }
interface props { /* ... */ }
```

### 2.2 Formatting Guidelines

#### Indentation
- Use **2 spaces** for indentation (no tabs)
- Configure your editor to show whitespace and use 2-space indentation

#### Line Length
- Maximum line length: **100 characters**
- Break long lines at logical points (after operators, before function parameters)
- Use template literals for long strings

```typescript
// Good
const description = 
  "This is a very long description that needs to be broken " +
  "across multiple lines for readability.";

// Also good (template literal)
const description = `
  This is a very long description that needs to be broken
  across multiple lines for readability.
`;
```

#### Whitespace
- Use single spaces around operators and after commas
- No trailing whitespace at the end of lines
- Add blank lines between logical sections of code
- Use blank lines to separate imports from code

```typescript
// Good
const sum = a + b;
const items = [1, 2, 3, 4];

function calculateTotal(items: number[]): number {
  return items.reduce((sum, item) => sum + item, 0);
}

// Bad
const sum=a+b;
const items=[1,2,3,4];
function calculateTotal(items:number[]):number{return items.reduce((sum,item)=>sum+item,0);}
```

#### Semicolons
- **Always use semicolons** to terminate statements
- This is enforced by ESLint and helps prevent ASI (Automatic Semicolon Insertion) issues

#### Quotes
- Use **single quotes** for string literals (when possible)
- Use **double quotes** for JSX attributes (React convention)
- Use **backticks** for template literals

```typescript
// Good
const message = 'Hello, world!';
const element = <div className="container">Content</div>;
const greeting = `Hello, ${name}!`;

// Bad
const message = "Hello, world!";
const element = <div className='container'>Content</div>;
```

### 2.3 TypeScript Guidelines

#### Type Safety
- Always define types for function parameters and return values
- Use interfaces for object shapes
- Avoid `any` type; use `unknown` if the type is truly unknown
- Use type assertions sparingly and only when necessary

```typescript
// Good
interface User {
  id: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// Bad
function getUser(id: any): any {
  // ...
}
```

#### Optional Properties
- Use `?` for optional properties in interfaces
- Use `| null` or `| undefined` when a value can be null/undefined

```typescript
// Good
interface Photo {
  id: string;
  caption: string | null;
  uploaded_by?: string;
}

// Bad
interface Photo {
  id: string;
  caption: string; // What if it's null?
  uploaded_by: string; // What if it's optional?
}
```

#### Type Imports
- Use `import type` for type-only imports to improve build performance

```typescript
// Good
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Bad
import { User, Session, supabase } from '@supabase/supabase-js';
```

### 2.4 React-Specific Conventions

#### Component Structure
- Use functional components with hooks (no class components)
- Define components as arrow functions or regular functions
- Keep components focused and single-purpose

```typescript
// Good
const PhotoCard = ({ photo }: { photo: Photo }) => {
  return <div>{/* ... */}</div>;
};

// Also good
function PhotoCard({ photo }: { photo: Photo }) {
  return <div>{/* ... */}</div>;
}
```

#### Hooks
- Always call hooks at the top level of components (not inside loops, conditions, or nested functions)
- Use the `use` prefix for custom hooks
- Extract complex logic into custom hooks

```typescript
// Good
const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    fetchPhotos();
  }, []);
  
  // ...
};

// Bad
const Gallery = () => {
  if (someCondition) {
    const [photos, setPhotos] = useState<Photo[]>([]); // ❌
  }
  // ...
};
```

#### Props
- Use destructuring for props
- Define prop types using TypeScript interfaces
- Use default parameters for optional props

```typescript
// Good
interface PhotoCardProps {
  photo: Photo;
  onPreview?: (photo: Photo) => void;
}

const PhotoCard = ({ photo, onPreview }: PhotoCardProps) => {
  // ...
};

// Bad
const PhotoCard = (props: any) => {
  const photo = props.photo;
  // ...
};
```

#### State Management
- Use `useState` for local component state
- Use `useContext` for shared state (e.g., authentication)
- Consider React Query (`@tanstack/react-query`) for server state
- Avoid prop drilling; use context or state management libraries when needed

### 2.5 Commenting Standards

#### When to Comment
- **Complex logic**: Explain why, not what
- **Business rules**: Document domain-specific requirements
- **Workarounds**: Explain temporary solutions or known issues
- **API interactions**: Document expected behavior and error handling

#### Comment Format
- Use **JSDoc-style comments** for functions and components
- Use **inline comments** sparingly for complex logic
- Keep comments up-to-date with code changes

```typescript
/**
 * Uploads a photo to Supabase Storage and saves metadata to the database.
 * 
 * @param file - The image file to upload (max 5MB)
 * @param caption - Optional caption for the photo
 * @param userId - The ID of the user uploading the photo
 * @returns Promise that resolves when upload is complete
 * @throws Error if upload fails or file is invalid
 */
const uploadPhoto = async (
  file: File,
  caption: string | null,
  userId: string
): Promise<void> => {
  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size exceeds 5MB limit');
  }
  
  // Generate unique filename to prevent collisions
  const fileName = `${userId}/${Date.now()}.${file.name.split('.').pop()}`;
  
  // ... rest of implementation
};
```

#### Component Documentation
- Document component purpose, props, and usage examples
- Include any special considerations or limitations

```typescript
/**
 * PhotoUpload Component
 * 
 * Allows authenticated users to upload photos to the gallery.
 * Handles file validation, upload to Supabase Storage, and database record creation.
 * 
 * @example
 * ```tsx
 * <PhotoUpload onUploadSuccess={() => refetchPhotos()} />
 * ```
 */
const PhotoUpload = ({ onUploadSuccess }: PhotoUploadProps) => {
  // ...
};
```

#### Inline Comments
- Use inline comments for non-obvious logic
- Avoid stating the obvious
- Use `//` for single-line comments
- Use `/* */` for multi-line comments (rarely needed)

```typescript
// Good
// Token refresh interval set to 55 minutes to refresh before 1-hour expiration
const TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000;

// Calculate visible photos based on screen size
const isMobile = window.innerWidth < 768;
const visibleCount = isMobile ? 3 : 8;

// Bad
// Set loading to true
setLoading(true);

// This is a variable
const photos = [];
```

---

## 3. Code Documentation Practices

### 3.1 Documentation Tools

This project uses:
- **TypeScript**: Type annotations serve as inline documentation
- **JSDoc comments**: For function and component documentation
- **README.md**: High-level project documentation
- **Inline comments**: For complex logic explanations

### 3.2 Writing Documentation

#### Function Documentation
- Include a brief description
- Document all parameters with `@param`
- Document return values with `@returns`
- Document exceptions with `@throws`
- Include usage examples when helpful

```typescript
/**
 * Fetches photos from the database, ordered by creation date (newest first).
 * 
 * @param limit - Maximum number of photos to retrieve (optional)
 * @returns Promise resolving to an array of Photo objects
 * @throws Error if database query fails
 * 
 * @example
 * ```ts
 * const photos = await fetchPhotos(10);
 * console.log(`Retrieved ${photos.length} photos`);
 * ```
 */
async function fetchPhotos(limit?: number): Promise<Photo[]> {
  // ...
}
```

#### Component Documentation
- Document component purpose and usage
- List all props with types and descriptions
- Include usage examples
- Note any special requirements or limitations

```typescript
/**
 * SpeciesCard Component
 * 
 * Displays information about a species (flora, fauna, or fungi) in a card format.
 * Includes image, name, category, description, and audio button for accessibility.
 * 
 * @param species - The species data to display
 * @param onSelect - Optional callback when card is clicked
 * 
 * @example
 * ```tsx
 * <SpeciesCard 
 *   species={birchSpecies} 
 *   onSelect={(s) => navigate(`/species/${s.id}`)}
 * />
 * ```
 */
const SpeciesCard = ({ species, onSelect }: SpeciesCardProps) => {
  // ...
};
```

#### API Documentation
- Document API endpoints in the server code
- Include request/response formats
- Document error responses
- Note authentication requirements

```typescript
/**
 * POST /api/burial-request
 * 
 * Sends an email notification for natural burial information requests.
 * 
 * @route POST /api/burial-request
 * @body {string} name - Requester's name (required)
 * @body {string} email - Requester's email (required)
 * @body {string} phone - Requester's phone (optional)
 * @body {string} message - Request message (required)
 * @returns {object} { ok: true } on success
 * @throws 400 if required fields are missing
 * @throws 500 if email sending fails
 */
app.post('/api/burial-request', async (req, res) => {
  // ...
});
```

### 3.3 Maintaining Documentation

- **Update documentation when code changes**: If you modify a function's behavior, update its documentation
- **Review documentation during code reviews**: Ensure new code is properly documented
- **Remove outdated comments**: Delete comments that no longer apply
- **Keep examples current**: Update examples if API or usage patterns change

---

## 4. Contributing and Modifying Code

### 4.1 Development Workflow

#### Setting Up for Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example` if available)
4. Start the development server: `npm run dev`
5. Start the backend server (if needed): `cd server && npm install && npm start`

#### Making Changes
1. Create a feature branch from `main` (or current development branch)
2. Make your changes following these guidelines
3. Test your changes locally
4. Run linting: `npm run lint`
5. Write or update tests if applicable
6. Commit your changes with descriptive messages
7. Push to your branch and create a pull request

### 4.2 Code Review Process

#### Before Submitting
- Ensure code follows all conventions in this document
- Run `npm run lint` and fix any errors
- Test your changes thoroughly
- Update documentation if needed
- Check that your changes don't break existing functionality

#### Pull Request Guidelines
- **Clear title**: Summarize what the PR does
- **Description**: Explain the changes and why they were made
- **Screenshots**: Include screenshots for UI changes
- **Testing**: Describe how you tested the changes
- **Breaking changes**: Clearly mark any breaking changes

#### Review Checklist
Reviewers should check:
- Code follows project conventions
- Types are properly defined
- Error handling is appropriate
- Documentation is updated
- Tests are included (if applicable)
- No console.logs or debug code left in
- Performance considerations are addressed

### 4.3 Adding New Features

#### Planning
1. **Understand requirements**: Clarify what needs to be built
2. **Design the solution**: Plan the component structure and data flow
3. **Check existing patterns**: Look for similar features to maintain consistency
4. **Consider edge cases**: Plan for error states and edge cases

#### Implementation Steps
1. **Create components**: Start with UI components if needed
2. **Add data layer**: Set up database queries or API calls
3. **Connect components**: Wire up data flow
4. **Add error handling**: Handle loading, error, and empty states
5. **Test thoroughly**: Test happy path and error cases
6. **Update documentation**: Document new components and features

#### Example: Adding a New Page
```typescript
// 1. Create the page component
// src/pages/NewPage.tsx
const NewPage = () => {
  return <div>New Page Content</div>;
};

export default NewPage;

// 2. Add the route in App.tsx
import NewPage from "./pages/NewPage";

<Route path="new-page" element={<NewPage />} />

// 3. Add navigation link if needed
// src/components/Navigation.tsx
{ name: "New Page", path: "/new-page" }
```

### 4.4 Modifying Existing Features

#### Best Practices
- **Understand the current implementation**: Read existing code thoroughly
- **Maintain backward compatibility**: Don't break existing functionality
- **Update related code**: Update tests, documentation, and related components
- **Follow existing patterns**: Match the style and structure of existing code
- **Incremental changes**: Make small, focused changes rather than large refactors

#### Refactoring Guidelines
- **Test first**: Ensure existing tests pass before refactoring
- **Small steps**: Refactor in small, incremental changes
- **Preserve behavior**: Maintain the same external behavior
- **Update tests**: Update or add tests to cover refactored code
- **Document changes**: Note why the refactoring was done

### 4.5 Backward Compatibility

#### API Changes
- **Version APIs**: If changing API contracts, consider versioning
- **Deprecation warnings**: Warn users before removing features
- **Migration guides**: Provide steps for upgrading

#### Database Changes
- **Use migrations**: Always use Supabase migrations for schema changes
- **Test migrations**: Test migrations on a copy of production data
- **Backward compatible queries**: Ensure queries work with old and new schemas during transition

#### Component Changes
- **Maintain prop interfaces**: Don't remove required props without a major version
- **Add new optional props**: Prefer adding optional props over changing required ones
- **Deprecation notices**: Document deprecated props and provide alternatives

---

## 5. Testing and Debugging

### 5.1 Testing Framework

This project uses **Cypress** for end-to-end testing.

#### Test Structure
- Tests are located in `cypress/e2e/`
- Each test file should test a specific feature or page
- Use descriptive test names that explain what is being tested

#### Writing Tests
```typescript
// cypress/e2e/gallery.cy.ts
describe('Gallery Page', () => {
  it('should display photos from the database', () => {
    cy.visit('/gallery');
    cy.contains('Community Photos');
    // Add assertions for photo display
  });

  it('should allow authenticated users to upload photos', () => {
    // Login first
    cy.visit('/login');
    // ... login steps
    
    cy.visit('/gallery');
    cy.contains('Upload Photo').click();
    // ... upload steps
  });
});
```

#### Running Tests
```bash
# Run Cypress tests in headless mode
npx cypress run

# Open Cypress test runner
npx cypress open
```

### 5.2 Testing Guidelines

#### What to Test
- **User flows**: Critical user journeys (login, upload, browse)
- **Error handling**: How the app handles errors gracefully
- **Edge cases**: Empty states, loading states, network failures
- **Accessibility**: Keyboard navigation, screen reader compatibility

#### Test Coverage Goals
- Aim for coverage of critical user paths
- Focus on features that have business impact
- Test error scenarios, not just happy paths

### 5.3 Debugging

#### Browser DevTools
- Use React DevTools for component inspection
- Use Network tab to debug API calls
- Use Console for error messages and logging
- Use Application tab to inspect localStorage and sessionStorage

#### Debugging Tips
1. **Check the console**: Look for error messages and warnings
2. **Inspect network requests**: Verify API calls are correct
3. **Use breakpoints**: Set breakpoints in browser DevTools
4. **Check state**: Use React DevTools to inspect component state
5. **Verify environment variables**: Ensure `.env` variables are set correctly

#### Logging
- Use `console.log` sparingly during development
- Remove or comment out debug logs before committing
- Use proper error logging in production (consider a logging service)
- Use `console.error` for actual errors

```typescript
// Good - for development
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Good - for errors
try {
  // ...
} catch (error) {
  console.error('Error uploading photo:', error);
  // Handle error
}

// Bad - left in production code
console.log('User data:', user);
console.log('Photos:', photos);
```

### 5.4 Error Handling

#### Client-Side Error Handling
- Always handle promise rejections (use try/catch with async/await)
- Provide user-friendly error messages
- Show loading states during async operations
- Handle network errors gracefully

```typescript
// Good
const fetchPhotos = async () => {
  try {
    setLoading(true);
    const { data, error } = await supabase
      .from('photos')
      .select('*');
    
    if (error) throw error;
    setPhotos(data || []);
  } catch (error) {
    console.error('Error fetching photos:', error);
    toast({
      title: "Error",
      description: "Failed to load photos. Please try again.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

// Bad
const fetchPhotos = async () => {
  const { data } = await supabase.from('photos').select('*');
  setPhotos(data); // No error handling!
};
```

#### Server-Side Error Handling
- Validate input data
- Return appropriate HTTP status codes
- Provide meaningful error messages
- Log errors for debugging

```typescript
// Good
app.post('/api/burial-request', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, message' 
      });
    }
    
    // Process request...
    res.json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});
```

### 5.5 Code Quality Tools

#### ESLint
- Configuration: `eslint.config.js`
- Run linting: `npm run lint`
- Fix auto-fixable issues: ESLint will suggest fixes
- Follow linting rules; they enforce code quality

#### TypeScript
- Type checking happens during build
- Fix type errors before committing
- Use strict type checking where possible

#### Pre-commit Checks
- Consider setting up pre-commit hooks to run linting and tests
- This ensures code quality before commits

---

## Additional Resources

### Useful Commands
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Testing
npx cypress open        # Open Cypress test runner
npx cypress run         # Run Cypress tests

# Database
# Run Supabase migrations through Supabase dashboard or CLI
```

### Key Technologies
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Supabase**: Backend (database, auth, storage)
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library
- **React Router**: Routing
- **Cypress**: E2E testing

### Getting Help
- Review existing code for patterns and examples
- Check component documentation in code
- Consult team members or project maintainers
- Refer to official documentation for libraries used

---

**Remember**: Code is read more often than it's written. Write code that is clear, maintainable, and follows these standards. When in doubt, prioritize readability and consistency over cleverness.

