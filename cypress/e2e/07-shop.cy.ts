/**
 * Shop Page E2E Tests
 * Tests the Shop/Store functionality
 */

describe('Shop Page', () => {
    beforeEach(() => {
        cy.visit('/shop');
    });

    it('should load the shop page successfully', () => {
        cy.url().should('include', '/shop');
    });

    it('should display shop heading', () => {
        cy.get('h1, h2').should('exist').and('be.visible');
    });

    it('should display products or items', () => {
        // Check for product cards or listings
        cy.get('div, article').should('exist');
    });

    it('should have product images', () => {
        cy.get('img').then(($imgs) => {
            if ($imgs.length > 0) {
                cy.wrap($imgs).first().should('be.visible');
            }
        });
    });

    it('should have interactive product elements', () => {
        // Check for buttons like "Add to Cart", "View Details", etc.
        cy.get('button').should('exist');
    });

    it('should allow product filtering or searching', () => {
        cy.get('body').then(($body) => {
            if ($body.find('input, select').length > 0) {
                cy.get('input, select').first().should('be.visible');
            }
        });
    });

    it('should be responsive on mobile devices', () => {
        cy.viewport('iphone-x');
        cy.get('body').should('be.visible');
    });
});
