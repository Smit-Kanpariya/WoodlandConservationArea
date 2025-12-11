// Component Test by Muhammad Arham (A00478275)
// This test mounts the Species page in isolation and verifies basic interactions
// like search input typing and tab switching.

import React from 'react';
import Species from '../../src/pages/Species';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '../../src/components/ui/toaster';

describe('Species Page Component', () => {
    it('mounts and allows search and tab interaction', () => {
        // Step 1: Mount the page wrapped in Router and Toaster providers
        cy.mount(
            <BrowserRouter>
                <Toaster />
                <Species />
            </BrowserRouter>
        );

        // Step 2: Verify search input exists and works (Goes beyond mount)
        // Type 'Oak' and verify the input value updates
        cy.get('input[type="search"]').should('be.visible');
        cy.get('input[type="search"]').type('Oak');
        cy.get('input[type="search"]').should('have.value', 'Oak');

        // Step 3: Verify tabs exist and can be clicked
        // Click 'Fauna' tab and check active state
        cy.contains('button', 'Fauna').should('be.visible');
        cy.contains('button', 'Fauna').click();
        cy.contains('button', 'Fauna').should('have.attr', 'data-state', 'active');

        // Click 'Fungi' tab and check active state
        cy.contains('button', 'Fungi').click();
        cy.contains('button', 'Fungi').should('have.attr', 'data-state', 'active');
    });
});