// E2E Test by Smit Kanpariya (A00479533)

describe('User Login Flow', () => {
  it('should handle invalid login attempt', () => {
    // Visit the login page at '/login'
    cy.visit('/login');

    // Type "testuser@example.com" into the email input field
    cy.get('#email')
      .should('be.visible')
      .type('testuser@example.com');

    // Type "password123" into the password input field
    cy.get('#password')
      .should('be.visible')
      .type('password123');

    // Click the login/submit button
    cy.get('button[type="submit"]')
      .should('be.visible')
      .click();

    // With invalid credentials, we should stay on the login page
    cy.wait(2000); 
    cy.url().should('include', '/login');

    // Optional: Verify error message is displayed (if app displays one)
    // cy.contains(/error|failed|invalid/i).should('be.visible'); 
  });
});
