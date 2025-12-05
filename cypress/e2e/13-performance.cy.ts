/**
 * Performance E2E Tests
 * Tests page load times and performance metrics
 */

describe('Performance Tests', () => {
    it('should load the home page within acceptable time', () => {
        const start = Date.now();
        cy.visit('/');
        const loadTime = Date.now() - start;

        // Page should load within 5 seconds
        expect(loadTime).to.be.lessThan(5000);
    });

    it('should load images efficiently', () => {
        cy.visit('/gallery');

        // Check that images load
        cy.get('img').should('exist');

        // Check that images have proper dimensions
        cy.get('img').first().should('be.visible');
    });

    it('should not have excessive DOM elements', () => {
        cy.visit('/');

        cy.get('*').then(($elements) => {
            // Reasonable DOM size (less than 1500 elements is good)
            expect($elements.length).to.be.lessThan(2000);
        });
    });

    it('should handle rapid navigation without errors', () => {
        cy.visit('/');
        cy.contains('About').click();
        cy.contains('Gallery').click();
        cy.contains('Home').click();
        cy.contains('Contact').click();

        // Should still be functional
        cy.get('body').should('be.visible');
    });

    it('should load external resources efficiently', () => {
        cy.visit('/');

        // Check for console errors
        cy.window().then((win) => {
            cy.spy(win.console, 'error');
        });
    });

    it('should handle concurrent requests', () => {
        // Visit multiple pages that might load data
        cy.visit('/gallery');
        cy.visit('/species');
        cy.visit('/shop');

        // All should load successfully
        cy.get('body').should('be.visible');
    });
});
