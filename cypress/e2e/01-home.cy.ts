/**
 * Home Page E2E Tests
 * Tests the main landing page functionality
 */

describe('Home Page', () => {
    beforeEach(() => {
        // Visit the home page before each test
        cy.visit('/');
    });

    it('should load the home page successfully', () => {
        // Check that the page loaded
        cy.url().should('eq', 'http://localhost:8080/');
    });

    it('should display the main navigation', () => {
        // Check for navigation links
        cy.contains('Home').should('be.visible');
        cy.contains('About').should('be.visible');
        cy.contains('Eco-System').should('be.visible');
        cy.contains('Gallery').should('be.visible');
    });

    it('should have a visible header/hero section', () => {
        // Check for main heading or hero content
        cy.get('h1').should('exist');
    });

    it('should navigate to About page when clicking About link', () => {
        cy.contains('About').click();
        cy.url().should('include', '/about');
    });

    it('should navigate to Gallery page when clicking Gallery link', () => {
        cy.contains('Gallery').click();
        cy.url().should('include', '/gallery');
    });

    it('should be responsive', () => {
        // Test mobile viewport
        cy.viewport('iphone-x');
        cy.get('body').should('be.visible');

        // Test tablet viewport
        cy.viewport('ipad-2');
        cy.get('body').should('be.visible');

        // Test desktop viewport
        cy.viewport(1920, 1080);
        cy.get('body').should('be.visible');
    });
});
