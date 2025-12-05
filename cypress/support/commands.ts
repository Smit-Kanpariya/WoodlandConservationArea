/// <reference types="cypress" />

// ***********************************************
// Custom Commands for Woodland Conservation Area
// ***********************************************

/**
 * Custom command to select elements by data-cy attribute
 * Usage: cy.getByCy('submit-button')
 */
Cypress.Commands.add('getByCy', (selector: string) => {
    return cy.get(`[data-cy="${selector}"]`);
});

/**
 * Custom command to select elements by data-testid attribute
 * Usage: cy.getByTestId('login-form')
 */
Cypress.Commands.add('getByTestId', (selector: string) => {
    return cy.get(`[data-testid="${selector}"]`);
});

/**
 * Custom command to login (if authentication is needed)
 * Usage: cy.login('user@example.com', 'password123')
 */
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('input[type="email"], input[name*="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

/**
 * Custom command to navigate to a specific page
 * Usage: cy.navigateTo('about')
 */
Cypress.Commands.add('navigateTo', (page: string) => {
    cy.visit(`/${page}`);
    cy.url().should('include', `/${page}`);
});

/**
 * Custom command to check if element is in viewport
 * Usage: cy.get('.element').isInViewport()
 */
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
    const rect = subject[0].getBoundingClientRect();

    expect(rect.top).to.be.at.least(0);
    expect(rect.left).to.be.at.least(0);
    expect(rect.bottom).to.be.lessThan(window.innerHeight);
    expect(rect.right).to.be.lessThan(window.innerWidth);

    return subject;
});

/**
 * Custom command to wait for page to be fully loaded
 * Usage: cy.waitForPageLoad()
 */
Cypress.Commands.add('waitForPageLoad', () => {
    cy.window().should('have.property', 'document');
    cy.document().should('have.property', 'readyState', 'complete');
});

// TypeScript declarations for custom commands
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Select element by data-cy attribute
             * @param selector - The data-cy attribute value
             */
            getByCy(selector: string): Chainable<JQuery<HTMLElement>>;

            /**
             * Select element by data-testid attribute
             * @param selector - The data-testid attribute value
             */
            getByTestId(selector: string): Chainable<JQuery<HTMLElement>>;

            /**
             * Login to the application
             * @param email - User email
             * @param password - User password
             */
            login(email: string, password: string): Chainable<void>;

            /**
             * Navigate to a specific page
             * @param page - Page path (without leading slash)
             */
            navigateTo(page: string): Chainable<void>;

            /**
             * Check if element is in viewport
             */
            isInViewport(): Chainable<JQuery<HTMLElement>>;

            /**
             * Wait for page to be fully loaded
             */
            waitForPageLoad(): Chainable<void>;
        }
    }
}

export { };