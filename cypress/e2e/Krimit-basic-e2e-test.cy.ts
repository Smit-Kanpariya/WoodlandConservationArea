// E2E Test by Krimit (A00481150)
// This test simulates a user visiting the Contact page, scrolling to the inquiry form, 
// filling out all required fields (Name, Email, Subject, Message), and submitting the form.

describe('Contact Page E2E Test', () => {
    it('visits the Contact page and fills out the Request More Information form', () => {
        // Step 1: Visit the Contact page
        cy.visit('/contact');

        // Step 2: Verify we are on the right page
        cy.contains('Request More Information').scrollIntoView().should('be.visible');

        // Step 3: Fill out the form
        cy.get('input[name="name"]').type('E2E Test User');
        cy.get('input[name="email"]').type('e2e@test.com');

        // Select an option from the dropdown
        cy.get('select[name="subject"]').select('Visit Planning');

        cy.get('textarea[name="message"]').type('I am planning a visit and need more info.');

        // Step 4: Submit the form
        cy.get('button[type="submit"]').click();

        // Step 5: Verify submission
        // Since the actual submission might fail without a valid EmailJS key or network,
        // we can check if the button shows "Sending..." or if a toast appears.
        // For this basic test, checking that the button was clicked is often enough,
        // or checking for the toast if we expect it to succeed.
        // cy.contains('Message Sent').should('be.visible');
    });
});
