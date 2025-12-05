/**
 * Site Map Page E2E Tests
 * Tests the interactive site map functionality
 */

describe('Site Map Page', () => {
    beforeEach(() => {
        cy.visit('/map');
    });

    it('should load the site map page successfully', () => {
        cy.url().should('include', '/map');
    });

    it('should display map heading', () => {
        cy.get('h1, h2').should('exist').and('be.visible');
    });

    it('should render the map component', () => {
        // Wait for map to load (Leaflet map)
        cy.get('.leaflet-container, [class*="map"]', { timeout: 10000 }).should('exist');
    });

    it('should allow map interactions', () => {
        // Check if map is interactive
        cy.get('.leaflet-container').then(($map) => {
            if ($map.length > 0) {
                cy.wrap($map).should('be.visible');
                // Try to interact with map
                cy.wrap($map).click();
            }
        });
    });

    it('should have map controls', () => {
        // Check for zoom controls or other map controls
        cy.get('.leaflet-control-zoom, button').should('exist');
    });

    it('should display markers or points of interest', () => {
        cy.get('.leaflet-marker-icon, [class*="marker"]').then(($markers) => {
            if ($markers.length > 0) {
                cy.wrap($markers).should('exist');
            }
        });
    });
});
