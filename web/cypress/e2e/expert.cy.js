describe('Expert Tests', () => {
    beforeEach(() => {
        cy.visitarPortal();
    });

  it('Deve manipular o valor de um campo', () => {
    cy.log('todo')

    cy.get('#email').invoke('val', 'felipe@test.com')

    cy.get('#password').invoke('attr', 'type', 'text')
        .type('katana123')
    cy.contains('button', 'Entrar')
        .invoke('hide')
        .should('not.be.visible')

    cy.contains('button', 'Entrar')
        .invoke('show')
        .should('be.visible')

  });

});
