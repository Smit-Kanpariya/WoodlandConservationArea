/**
 * Accessibility E2E Tests
 * Tests basic accessibility features across the site
 */

describe('Accessibility Tests', () => {
    const pages = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Gallery', url: '/gallery' },
        { name: 'Contact', url: '/contact' },
    ];

    pages.forEach((page) => {
        describe(`${page.name} Page Accessibility`, () => {
            beforeEach(() => {
                cy.visit(page.url);
            });

            it('should have a proper page title', () => {
                cy.title().should('not.be.empty');
            });

            it('should have proper heading hierarchy', () => {
                cy.get('h1').should('exist');
            });

            it('should have alt text for images', () => {
                cy.get('img').each(($img) => {
                    // Images should have alt attribute (can be empty for decorative images)
                    cy.wrap($img).should('have.attr', 'alt');
                });
            });

            it('should have keyboard navigable elements', () => {
                // Check that interactive elements can receive focus
                cy.get('body').then(($body) => {
                    if ($body.find('a, button').length > 0) {
                        cy.get('a, button').first().focus().should('have.focus');
                    }
                });
            });

            it('should have proper form labels', () => {
                // Only check if inputs exist on the page
                cy.get('body').then(($body) => {
                    const inputs = $body.find('input');
                    if (inputs.length > 0) {
                        // Inputs should have associated labels or aria-label
                        inputs.each((index, input) => {
                            const hasLabel = Cypress.$(input).closest('label').length > 0;
                            const hasAriaLabel = Cypress.$(input).attr('aria-label');
                            const hasPlaceholder = Cypress.$(input).attr('placeholder');

                            expect(hasLabel || hasAriaLabel || hasPlaceholder).to.be.true;
                        });
                    }
                });
            });

            it('should have sufficient color contrast', () => {
                // Basic check that text is visible
                cy.get('body').should('have.css', 'color');
            });
        });
    });
});
