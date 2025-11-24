describe('Home Page Test', () => {
  it('should load the home page', () => {
    cy.visit('http://localhost:8080/') 
    cy.contains('Home')               
  })
})
