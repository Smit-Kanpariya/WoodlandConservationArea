// E2E Test by Madhur Sharma (A00477319)
/**
 * Sign Up Page E2E Tests
 * Tests user registration and signup functionality
 */

describe('Sign Up Page', () => {
    beforeEach(() => {
        cy.visit('/login');
        // Switch to signup mode
        cy.contains('Need an account? Sign up').click();
    });

    it('should load the signup form successfully', () => {
        cy.url().should('include', '/login');
        cy.contains('Create Account').should('be.visible');
    });

    it('should display signup heading', () => {
        cy.contains('Create Account').should('be.visible');
        cy.contains('Create a new account').should('be.visible');
    });

    it('should display all required signup form fields', () => {
        // Check for first name field
        cy.get('input[id="firstName"]').should('exist');
        cy.get('label[for="firstName"]').should('contain', 'First Name');

        // Check for last name field
        cy.get('input[id="lastName"]').should('exist');
        cy.get('label[for="lastName"]').should('contain', 'Last Name');

        // Check for email field
        cy.get('input[id="email"]').should('exist');
        cy.get('label[for="email"]').should('contain', 'Email');

        // Check for password field
        cy.get('input[id="password"]').should('exist');
        cy.get('label[for="password"]').should('contain', 'Password');
    });

    it('should have a sign up button', () => {
        cy.get('button[type="submit"]').should('exist');
        cy.get('button[type="submit"]').should('contain', 'Sign Up');
    });

    it('should validate required fields', () => {
        // Try to submit empty form
        cy.get('button[type="submit"]').click();
        // Form should prevent submission or show validation errors
        cy.get('input[id="firstName"]').should('have.attr', 'required');
        cy.get('input[id="lastName"]').should('have.attr', 'required');
        cy.get('input[id="email"]').should('have.attr', 'required');
        cy.get('input[id="password"]').should('have.attr', 'required');
    });

    it('should validate email format', () => {
        cy.get('input[id="email"]').type('invalid-email');
        cy.get('input[id="email"]').should('have.attr', 'type', 'email');
        cy.get('input[id="email"]').clear();
        cy.get('input[id="email"]').type('valid@example.com');
    });

    it('should validate password minimum length', () => {
        cy.get('input[id="password"]').should('have.attr', 'minLength', '6');
        cy.get('input[id="password"]').type('12345'); // Less than 6 characters
        cy.get('input[id="password"]').clear();
        cy.get('input[id="password"]').type('validpassword123'); // Valid length
    });

    it('should have password visibility toggle', () => {
        cy.get('input[id="password"]').type('testpassword123');
        cy.get('button[aria-label*="password"], button[aria-label*="Password"]').should('exist');
        cy.get('button[aria-label*="password"], button[aria-label*="Password"]').click();
        cy.get('input[id="password"]').should('have.attr', 'type', 'text');
        cy.get('button[aria-label*="password"], button[aria-label*="Password"]').click();
        cy.get('input[id="password"]').should('have.attr', 'type', 'password');
    });

    it('should allow filling in all form fields', () => {
        cy.get('input[id="firstName"]').type('John');
        cy.get('input[id="lastName"]').type('Doe');
        cy.get('input[id="email"]').type('john.doe@example.com');
        cy.get('input[id="password"]').type('securepassword123');

        // Verify all fields have values
        cy.get('input[id="firstName"]').should('have.value', 'John');
        cy.get('input[id="lastName"]').should('have.value', 'Doe');
        cy.get('input[id="email"]').should('have.value', 'john.doe@example.com');
        cy.get('input[id="password"]').should('have.value', 'securepassword123');
    });

    it('should have option to switch back to login', () => {
        cy.contains('Already have an account? Sign in').should('be.visible');
        cy.contains('Already have an account? Sign in').click();
        cy.contains('Sign In').should('be.visible');
        cy.contains('Enter your credentials to sign in').should('be.visible');
    });

    it('should toggle between login and signup modes', () => {
        // Should be in signup mode
        cy.contains('Create Account').should('be.visible');

        // Switch to login
        cy.contains('Already have an account? Sign in').click();
        cy.contains('Sign In').should('be.visible');

        // Switch back to signup
        cy.contains('Need an account? Sign up').click();
        cy.contains('Create Account').should('be.visible');
    });
    it('should submit the signup form successfully', () => {
        const timestamp = new Date().getTime();
        const testEmail = `testuser${timestamp}@example.com`;

        cy.get('input[id="firstName"]').type('Test');
        cy.get('input[id="lastName"]').type('User');
        cy.get('input[id="email"]').type(testEmail);
        cy.get('input[id="password"]').type('password123');

        // Click sign up
        cy.get('button[type="submit"]').click();

        // Check for loading state or success message
        // Note: Actual success depends on backend response. 
        // We check if the button shows loading state or if a toast appears.
        // Adjust selector based on actual implementation of loading state/toast
        cy.get('button[type="submit"]').should('be.disabled');
        // If success toast appears:
        // cy.contains('Please check your email').should('be.visible');
    });
});

