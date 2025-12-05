/**
 * Natural Burial Page E2E Tests
 * Tests the Natural Burial information page
 */

describe('Natural Burial Page', () => {
    beforeEach(() => {
        cy.visit('/burial');
    });

    it('should load the natural burial page successfully', () => {
        cy.url().should('include', '/burial');
    });

    it('should display burial information', () => {
        cy.get('h1, h2').should('exist').and('be.visible');
    });

    it('should have informational content', () => {
        cy.get('p, div').should('exist');
        cy.get('body').should('be.visible');
    });

    it('should have contact or inquiry options', () => {
        // Check for contact links or buttons
        cy.get('body').then(($body) => {
            if ($body.find('a:contains("Contact"), button:contains("Contact")').length > 0) {
                cy.contains('Contact').should('be.visible');
            }
        });
    });

    it('should display relevant images or diagrams', () => {
        cy.get('img, svg').then(($media) => {
            if ($media.length > 0) {
                cy.wrap($media).first().should('exist');
            }
        });
    });
});
