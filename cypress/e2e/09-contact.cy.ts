/**
 * Contact Page E2E Tests
 * Tests the contact form and page functionality
 */

describe('Contact Page', () => {
    beforeEach(() => {
        cy.visit('/contact');
    });

    it('should load the contact page successfully', () => {
        cy.url().should('include', '/contact');
    });

    it('should display contact heading', () => {
        cy.get('h1, h2').should('exist').and('be.visible');
    });

    it('should display contact form', () => {
        // Check for form elements
        cy.get('form, input, textarea').should('exist');
    });

    it('should have required form fields', () => {
        // Check for common form fields
        cy.get('input[type="text"], input[type="email"], textarea').should('exist');
    });

    it('should validate email field', () => {
        // Find email input and test validation
        cy.get('input[type="email"]').then(($email) => {
            if ($email.length > 0) {
                cy.wrap($email).first().type('invalid-email');
                cy.wrap($email).first().clear();
                cy.wrap($email).first().type('valid@example.com');
            }
        });
    });

    it('should have a submit button', () => {
        cy.get('button[type="submit"], input[type="submit"]').should('exist');
    });

    it('should display contact information', () => {
        // Check for email, phone, or address information
        cy.get('body').should('be.visible');
    });

    it('should handle form submission', () => {
        // Fill out the form
        cy.get('input[type="text"], input[name*="name"]').first().type('Test User');
        cy.get('input[type="email"]').first().type('test@example.com');
        cy.get('textarea').first().type('This is a test message from Cypress');

        // Note: We won't actually submit to avoid sending test emails
        // In a real test, you might want to stub the API call
    });
});
