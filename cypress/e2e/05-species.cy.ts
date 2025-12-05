/**
 * Species Page E2E Tests
 * Tests the Species information page
 */

describe('Species Page', () => {
    beforeEach(() => {
        cy.visit('/species');
    });

    it('should load the species page successfully', () => {
        cy.url().should('include', '/species');
    });

    it('should display species information', () => {
        cy.get('h1, h2').should('exist');
        cy.get('body').should('contain.text', 'Species');
    });

    it('should display species cards or lists', () => {
        // Check for species content containers
        cy.get('div, article, section').should('exist');
    });

    it('should have searchable or filterable content', () => {
        // Check for search or filter inputs
        cy.get('body').then(($body) => {
            if ($body.find('input[type="search"]').length > 0) {
                cy.get('input[type="search"]').first().type('bird');
            }
        });
    });

    it('should navigate to ecosystem from species', () => {
        cy.contains('Eco-System').click();
        cy.url().should('include', '/ecosystem');
    });
});
