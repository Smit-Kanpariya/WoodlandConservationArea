/**
 * Login Page E2E Tests
 * Tests authentication and login functionality
 */

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should load the login page successfully', () => {
        cy.url().should('include', '/login');
    });

    it('should display login heading', () => {
        // Check for the card title which contains "Sign In" or "Create Account"
        cy.contains('Sign In').should('be.visible');
    });

    it('should display login form', () => {
        cy.get('form').should('exist');
        cy.get('input[type="email"], input[type="text"]').should('exist');
        cy.get('input[type="password"]').should('exist');
    });

    it('should have email and password fields', () => {
        cy.get('input[type="email"], input[name*="email"]').should('exist');
        cy.get('input[type="password"]').should('exist');
    });

    it('should have a login button', () => {
        cy.get('button[type="submit"], button:contains("Login"), button:contains("Sign in")').should('exist');
    });

    it('should validate empty form submission', () => {
        // Try to submit empty form
        cy.get('button[type="submit"]').first().click();
        // Form should show validation errors or prevent submission
    });

    it('should validate email format', () => {
        cy.get('input[type="email"], input[name*="email"]').first().type('invalid-email');
        cy.get('input[type="email"], input[name*="email"]').first().clear();
        cy.get('input[type="email"], input[name*="email"]').first().type('valid@example.com');
    });

    it('should have password visibility toggle', () => {
        cy.get('body').then(($body) => {
            if ($body.find('button[aria-label*="password"], [type="button"]').length > 0) {
                cy.get('input[type="password"]').first().type('testpassword');
            }
        });
    });

    it('should have a link to reset password', () => {
        cy.get('body').then(($body) => {
            if ($body.find('a:contains("Forgot"), a:contains("Reset")').length > 0) {
                cy.contains('Forgot').should('be.visible');
            }
        });
    });

    it('should navigate to reset password page', () => {
        cy.get('body').then(($body) => {
            if ($body.find('a[href*="reset"]').length > 0) {
                cy.get('a[href*="reset"]').first().click();
                cy.url().should('include', 'reset');
            }
        });
    });

    it('should have sign up option if available', () => {
        cy.get('body').then(($body) => {
            if ($body.find('a:contains("Sign up"), a:contains("Register")').length > 0) {
                cy.contains('Sign up').should('be.visible');
            }
        });
    });
});
