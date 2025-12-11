// Component Test by Aakarshan Khosla (A00474829)
// This test mounts the Shop component and verifies that selecting a category filter 
// correctly updates the displayed product list to show only matching products.

import React from 'react';
import Shop from '../../src/pages/Shop'; // Adjust path as necessary
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '../../src/components/ui/toaster';
import { AuthContext } from '../../src/hooks/useAuth';

describe('Shop Component - Category Filtering', () => {

    // Define the category to test and expected product names
    const testCategory = 'Experiences';
    const expectedProductNames = [
        'Conservation Guided Tour',
        'Woodland Photography Workshop'
    ];
    const unexpectedProductName = 'Native Wildflower Seed Mix'; // Product from a different category

    beforeEach(() => {
        // Mock Auth Context Value - must be created inside beforeEach to use cy.stub()
        const mockAuthValue = {
            user: null,
            session: null,
            loading: false,
            error: null,
            signUp: cy.stub().resolves({ error: null }),
            signIn: cy.stub().resolves({ error: null }),
            signOut: cy.stub().resolves({ error: null }),
            refreshSession: cy.stub().resolves({ error: null }),
        };

        // Step 1: Mount the component wrapped in AuthContext, Router and Toaster
        // BrowserRouter is necessary for the useNavigate hook used inside Shop.tsx
        // AuthContext is necessary for the useAuth hook used inside Shop.tsx
        cy.mount(
            <AuthContext.Provider value={mockAuthValue}>
                <BrowserRouter>
                    <Toaster />
                    <Shop />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Step 2: Ensure the product section is loaded and visible
        cy.contains('Support Our Conservation Efforts').should('be.visible');
        cy.contains('All Products').should('be.visible');
    });

    it('should filter products correctly when an Experiences category is selected', () => {
        // Step 3: Click the target category button ('Experiences')
        cy.contains('button', testCategory).click();

        // Step 4: Verify the selected category button is active (using variant="default" styling)
        // Check for the class that indicates the default/active button style (usually text-primary-foreground and bg-primary)
        cy.contains('button', testCategory)
            .should('have.class', 'bg-primary')
            .and('have.class', 'text-primary-foreground');

        // Step 5: Verify that ONLY the expected products are visible
        // Check for all expected products
        expectedProductNames.forEach(productName => {
            cy.contains('h3', productName).should('be.visible');
        });

        // Step 6: Verify that products from other categories are NOT visible
        // Check for a product not in the 'Experiences' category
        cy.contains('h3', unexpectedProductName).should('not.exist');

        // Step 7: Click 'All Products' and verify all products are visible again
        cy.contains('button', 'All Products').click();
        cy.contains('h3', unexpectedProductName).should('be.visible');
        cy.contains('h3', expectedProductNames[0]).should('be.visible');
    });

    it('should show all products by default and upon selecting "All Products"', () => {
        // Initially, 'All Products' should be selected and all products visible
        cy.contains('button', 'All Products')
            .should('have.class', 'bg-primary');

        // Check if a representative product from a specific category is visible
        cy.contains('h3', unexpectedProductName).should('be.visible');
        cy.contains('h3', expectedProductNames[0]).should('be.visible');
    });
});