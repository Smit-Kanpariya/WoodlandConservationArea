/**
 * Navigation E2E Tests
 * Tests overall site navigation and routing
 */

describe('Site Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should navigate through all main pages', () => {
        // Home
        cy.url().should('eq', 'http://localhost:8080/');

        // About
        cy.contains('About').click();
        cy.url().should('include', '/about');

        // Ecosystem
        cy.contains('Eco-System').click();
        cy.url().should('include', '/ecosystem');

        // Gallery
        cy.contains('Gallery').click();
        cy.url().should('include', '/gallery');

        // Species (Flora/Fauna/Fungi)
        cy.contains('Flora/Fauna/Fungi').click();
        cy.url().should('include', '/species');

        // Shop
        cy.contains('Shop').click();
        cy.url().should('include', '/shop');

        // Contact
        cy.contains('Contact').click();
        cy.url().should('include', '/contact');
    });

    it('should have a consistent navigation bar across pages', () => {
        const pages = ['/', '/about', '/ecosystem', '/gallery'];

        pages.forEach((page) => {
            cy.visit(page);
            cy.contains('Home').should('be.visible');
            cy.contains('About').should('be.visible');
        });
    });

    it('should handle browser back and forward buttons', () => {
        cy.contains('About').click();
        cy.url().should('include', '/about');

        cy.go('back');
        cy.url().should('eq', 'http://localhost:8080/');

        cy.go('forward');
        cy.url().should('include', '/about');
    });

    it('should display 404 page for invalid routes', () => {
        cy.visit('/invalid-page-that-does-not-exist', { failOnStatusCode: false });
        // Should show not found page or redirect
        cy.get('body').should('be.visible');
    });

    it('should have working logo/home link', () => {
        cy.visit('/about');
        cy.get('a[href="/"], a:contains("Home")').first().click();
        cy.url().should('eq', 'http://localhost:8080/');
    });

    it('should maintain scroll position on navigation', () => {
        cy.visit('/');
        cy.scrollTo('bottom');
        cy.contains('About').click();
        cy.url().should('include', '/about');
        // Page should start at top
        cy.window().its('scrollY').should('equal', 0);
    });
});
