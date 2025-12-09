// Component Test by Madhur Sharma (A00477319)
// This test mounts the Login component (which handles Signup), switches to signup mode,
// and verifies the signup form interactions and validations in isolation.

import React from 'react';
import Login from '../../src/pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '../../src/components/ui/toaster';
import { AuthProvider } from '../../src/hooks/useAuth';

describe('Signup Component', () => {
    beforeEach(() => {
        // Mount the component before each test
        cy.mount(
            <BrowserRouter>
                <AuthProvider>
                    <Toaster />
                    <Login />
                </AuthProvider>
            </BrowserRouter>
        );
        // Switch to signup mode
        cy.contains('Need an account? Sign up').click();
    });

    it('displays the signup form correctly', () => {
        cy.contains('Create Account').should('be.visible');
        cy.get('input[id="firstName"]').should('exist');
        cy.get('input[id="lastName"]').should('exist');
        cy.get('input[id="email"]').should('exist');
        cy.get('input[id="password"]').should('exist');
        cy.get('button[type="submit"]').should('contain', 'Sign Up');
    });

    it('validates required fields', () => {
        cy.get('button[type="submit"]').click();
        // Browser validation check
        cy.get('input[id="firstName"]:invalid').should('exist');
        cy.get('input[id="lastName"]:invalid').should('exist');
        cy.get('input[id="email"]:invalid').should('exist');
        cy.get('input[id="password"]:invalid').should('exist');
    });

    it('allows entering user details', () => {
        cy.get('input[id="firstName"]').type('Madhur');
        cy.get('input[id="lastName"]').type('Sharma');
        cy.get('input[id="email"]').type('madhur@example.com');
        cy.get('input[id="password"]').type('password123');

        cy.get('input[id="firstName"]').should('have.value', 'Madhur');
        cy.get('input[id="lastName"]').should('have.value', 'Sharma');
        cy.get('input[id="email"]').should('have.value', 'madhur@example.com');
        cy.get('input[id="password"]').should('have.value', 'password123');
    });

    it('toggles password visibility', () => {
        cy.get('input[id="password"]').type('secret');
        cy.get('input[id="password"]').should('have.attr', 'type', 'password');

        // Click toggle button
        cy.get('button[aria-label*="password"]').click();
        cy.get('input[id="password"]').should('have.attr', 'type', 'text');

        // Click again
        cy.get('button[aria-label*="password"]').click();
        cy.get('input[id="password"]').should('have.attr', 'type', 'password');
    });
});
