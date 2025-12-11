// E2E Test by Aakarshan Khosla (A00474829)
// This test verifies the core functionality of the shop page, including adding a product to the cart, 
// checking the cart content and total, and then removing the item.

describe('Shop and Cart E2E Test', () => {
  // Define expected values for the first product
  const firstProductName = 'Native Wildflower Seed Mix';
  const firstProductPrice = 24.99; // Price is $24.99

  it('successfully adds item to cart, verifies total, and removes item', () => {
    // Step 1: Visit the Shop page
    cy.visit('/shop');

    // Step 2: Scroll down to the products section to ensure visibility of the first product's button.
    // We use the product grid as the target for scrolling.
    cy.contains('Support Our Conservation Efforts').should('be.visible');
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8').scrollIntoView();

    // Step 3: Find the first product's "Add to Cart" button and click it.
    // It's safer to target the specific product card if possible, or assume the first 'Add to Cart' button is for the first product.
    cy.contains(firstProductName)
      .parents('.event-card') // Get the parent card element
      .find('button') // Find all buttons within the card
      .contains('Add to Cart') // Filter for the 'Add to Cart' button
      .click();

    // Step 4: Verify the 'Added to Cart' toast appears
    cy.contains('Item has been added to your cart.').should('be.visible');

    // Step 5: Verify the cart count on the floating button (should be 1)
    cy.get('.fixed.bottom-6.left-6 .bg-destructive').contains('1').should('be.visible');

    // Step 6: Open the cart sheet by clicking the floating cart button
    cy.get('.fixed.bottom-6.left-6 > button').click();

    // Step 7: Verify the Cart Sheet is open and contains the correct product
    cy.get('.sm\\:max-w-lg').should('be.visible'); // Check for the SheetContent
    cy.contains('Shopping Cart').should('be.visible');
    cy.contains(firstProductName).should('be.visible');

    // Step 8: Verify the total price in the cart sheet
    // Check for the calculated total price: $24.99
    cy.get('.border-t.border-border.pt-4 .text-primary').contains(`$${firstProductPrice.toFixed(2)}`).should('be.visible');

    // Step 9: Remove the item from the cart
    // Target the ghost button with X icon inside the cart item
    cy.get('.sm\\:max-w-lg').find('button.h-8.w-8').first().click();

    // Step 10: Verify the cart is now empty
    cy.contains('Your cart is empty').should('be.visible');

    // Step 11: Close the cart sheet
    cy.get('.sm\\:max-w-lg').find('button').contains('Continue Shopping').click();

    // Step 12: Verify the floating cart button is no longer visible (since cart.length === 0)
    cy.get('.fixed.bottom-6.left-6').should('not.exist');
  });
});