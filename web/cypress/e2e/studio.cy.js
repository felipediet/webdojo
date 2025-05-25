describe('Studio', () => {
  it('Exemplo do Cypress Studio', () => {
    cy.visit('https://example.cypress.io')
    
    cy.get('h1')
    .should('be.visible')
    .and('have.text', 'Kitchen Sink');
    
  })
})