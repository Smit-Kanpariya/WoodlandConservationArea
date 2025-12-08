// Component Test by Smit Kanpariya (A00479533)
import React from 'react';
import Navigation from '../../src/components/Navigation';
import { AuthContext } from '../../src/hooks/useAuth';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation Component - Links and Interactions', () => {
  let mockSignOut;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockAuthValue: any;

  beforeEach(() => {
    // Set viewport to desktop by default
    cy.viewport(1280, 720);

    mockSignOut = cy.stub().as('signOutStub').resolves({ error: null });

    // Mock Auth Context Value (default logged out)
    mockAuthValue = {
      user: null,
      session: null,
      loading: false,
      error: null,
      signUp: cy.stub().resolves({ error: null }),
      signIn: cy.stub().resolves({ error: null }),
      signOut: mockSignOut,
      refreshSession: cy.stub().resolves({ error: null }),
    };
  });

  it('renders correctly', () => {
    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Verify Logo is visible
    cy.get('img[alt="Site logo"]').should('be.visible');
  });

  it('displays all navigation links', () => {
    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const links = [
      'About',
      'Eco-System',
      'Gallery',
      'Flora/Fauna/Fungi',
      'Natural Burial',
      'Shop',
      'Site Map',
      'Contact'
    ];

    links.forEach(link => {
      cy.contains(link).should('be.visible');
    });
  });

  it('navigates and updates active state', () => {
    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Click 'About' and verify active styling
    cy.contains('a', 'About').click();

    // In Navigation.tsx, active class adds 'bg-primary'
    cy.contains('a', 'About').should('have.class', 'bg-primary');
    cy.contains('a', 'About').should('have.class', 'text-primary-foreground');
  });

  it('displays logo as home link', () => {
    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    // Verify the logo wraps a link to "/"
    cy.get('a[href="/"]').find('img[alt="Site logo"]').should('exist');
  });

  it('mobile menu interactions', () => {
    cy.viewport('iphone-x');
    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Hamburger menu should be visible
    cy.get('button').find('svg.lucide-menu').should('be.visible');

    // Click to open
    cy.get('button').find('svg.lucide-menu').parent().click();

    // Verify links are now visible in mobile view
    cy.get('.lg\\:hidden').contains('About').should('be.visible');

    // Click a link to close menu/navigate
    cy.get('.lg\\:hidden').contains('About').click();
    // Menu should close? Logic says: onClick={() => setIsOpen(false)}
    // Verify menu closed?
    // cy.contains('About').should('not.be.visible'); // Might need wait or check container
  });
});
