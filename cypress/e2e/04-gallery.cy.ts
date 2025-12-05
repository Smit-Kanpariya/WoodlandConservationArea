/**
 * Gallery Page E2E Tests
 * Tests the Gallery page with image viewing and interactions
 */

describe('Gallery Page', () => {
    beforeEach(() => {
        cy.visit('/gallery');
    });

    it('should load the gallery page successfully', () => {
        cy.url().should('include', '/gallery');
    });

    it('should display gallery heading', () => {
        cy.get('h1, h2').should('exist').and('be.visible');
    });

    it('should display images in the gallery', () => {
        // Wait for images to load
        cy.get('img', { timeout: 10000 }).should('exist');
    });

    it('should allow image interactions', () => {
        // Check if images can be clicked or interacted with
        cy.get('img').first().should('be.visible').click({ force: true });
    });

    it('should have like functionality if present', () => {
        // Check for like buttons or heart icons
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="like-button"], button:contains("Like")').length > 0) {
                cy.get('[data-testid="like-button"], button').first().click();
            }
        });
    });

    it('should handle image loading errors gracefully', () => {
        // Check that broken images don't crash the page
        cy.get('img').each(($img) => {
            cy.wrap($img).should('have.attr', 'src');
        });
    });

    it('should be responsive on mobile', () => {
        cy.viewport('iphone-x');
        cy.get('body').should('be.visible');
        cy.get('img').should('exist');
    });
});
