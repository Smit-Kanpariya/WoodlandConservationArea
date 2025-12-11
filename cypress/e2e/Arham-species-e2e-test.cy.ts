// E2E Test by Muhammad Arham (A00478275)
/**
 * Flora–Fauna–Fungi Page E2E Tests
 * Tests basic page load, search interaction, and tab switching.
 */

describe('Flora–Fauna–Fungi Page', () => {
    beforeEach(() => {
        // Visit the Species page before each test
        cy.visit('/species');
    });

    it('should load the page and allow search interaction', () => {
        // Step 1: Verify the search input is visible (confirms page load)
        cy.get('input[type="search"]').should('be.visible');

        // Step 2: Interact with the search bar (Goes beyond just visiting)
        // Type 'Oak' and verify the value updates
        cy.get('input[type="search"]').type('Oak');
        cy.get('input[type="search"]').should('have.value', 'Oak');

        // Step 3: Clear the search input
        cy.get('input[type="search"]').clear();
    });

    it('should allow switching tabs', () => {
        // Step 1: Click on the 'Fauna' tab
        cy.contains('button', 'Fauna').click();

        // Step 2: Verify the 'Fauna' tab becomes active
        cy.contains('button', 'Fauna').should('have.attr', 'data-state', 'active');

        // Step 3: Click on the 'Fungi' tab and verify it becomes active
        cy.contains('button', 'Fungi').click();
        cy.contains('button', 'Fungi').should('have.attr', 'data-state', 'active');
    });
});