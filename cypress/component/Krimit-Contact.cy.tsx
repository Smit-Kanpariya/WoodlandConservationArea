// Component Test by Krimit (A00481150)
// This test mounts the Contact component in isolation, scrolls to the form to trigger animations,
// fills out the form fields, and verifies that the input values are correctly updated in the DOM.

import React from 'react';
import Contact from '../../src/pages/Contact';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '../../src/components/ui/toaster';

describe('Contact Page Component', () => {
    it('mounts and allows filling the contact form', () => {
        // Step 1: Mount the component wrapped in Router and Toaster (for toast notifications)
        cy.mount(
            <BrowserRouter>
                <Toaster />
                <Contact />
            </BrowserRouter>
        );

        // Step 2: Check if form exists
        cy.contains('Request More Information').scrollIntoView().should('be.visible');

        // Step 3: Fill out the form
        cy.get('input[name="name"]').type('Component Test User');
        cy.get('input[name="email"]').type('component@test.com');
        cy.get('select[name="subject"]').select('General Information');
        cy.get('textarea[name="message"]').type('This is a test message from component test.');

        // Step 4: Verify values are set
        cy.get('input[name="name"]').should('have.value', 'Component Test User');
        cy.get('select[name="subject"]').should('have.value', 'General Information');

        // Step 5: Submit (Optional - we might not want to actually send emails in component tests, 
        // but we can check if the button is clickable)
        cy.get('button[type="submit"]').should('not.be.disabled');
        // cy.get('button[type="submit"]').click(); 
    });
});
