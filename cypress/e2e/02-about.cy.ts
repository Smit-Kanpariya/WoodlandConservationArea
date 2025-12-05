/**
 * About Page E2E Tests
 * Tests the About page content and functionality
 */

describe('About Page', () => {
    beforeEach(() => {
        cy.visit('/about');
    });

    it('should load the about page successfully', () => {
        cy.url().should('include', '/about');
    });

    it('should display page heading', () => {
        cy.get('h1, h2').should('exist').and('be.visible');
    });

    it('should have readable content', () => {
        // Check that there's text content on the page
        cy.get('body').should('contain.text', 'Woodland');
    });

    it('should allow navigation back to home', () => {
        cy.contains('Home').click();
        cy.url().should('eq', 'http://localhost:8080/');
    });

    it('should display images if present', () => {
        // Check if images exist and are loaded
        cy.get('img').then(($imgs) => {
            if ($imgs.length > 0) {
                cy.wrap($imgs).first().should('be.visible');
            }
        });
    });
});
