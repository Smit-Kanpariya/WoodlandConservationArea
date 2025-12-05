/**
 * Ecosystem Page E2E Tests
 * Tests the Ecosystem page functionality
 */

describe('Ecosystem Page', () => {
    beforeEach(() => {
        cy.visit('/ecosystem');
    });

    it('should load the ecosystem page successfully', () => {
        cy.url().should('include', '/ecosystem');
    });

    it('should display ecosystem information', () => {
        cy.get('h1, h2').should('exist');
        cy.get('body').should('be.visible');
    });

    it('should have interactive elements', () => {
        // Check for buttons, links, or interactive components
        cy.get('button, a').should('exist');
    });

    it('should scroll through content', () => {
        // Test scrolling functionality
        cy.scrollTo('bottom');
        cy.scrollTo('top');
    });

    it('should navigate to other pages from ecosystem', () => {
        cy.contains('Flora/Fauna/Fungi').click();
        cy.url().should('include', '/species');
    });
});
