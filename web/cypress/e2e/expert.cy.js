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

    it('Salvar o DOM com o objeto do tipo TOAST', () => {
        cy.fazerLogin('papito@webdojo.com', 'katana321')

        // cy.wait(2500)

        // cy.document().then((doc) => {
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
        // })
        //Localizar dentro do arquivo HTML o objeto do tipo TOAST pelo texto do mesmo

        //cy.get('[data-sonner-toaster="true"] div[class=title]')
            // .should('be.visible')
            // .should('have.text', 'Acesso negado! Tente novamente.')
        
        //cy.get('[data-sonner-toaster="true"] .title')
            // .should('be.visible')
            // .should('have.text', 'Acesso negado! Tente novamente.')

        cy.get('[data-sonner-toaster="true"]')
            .should('be.visible')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')
    });

});
