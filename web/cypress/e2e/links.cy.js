/// <reference types="cypress" />
describe('Links abrindo nova guia/janela', () => {

    beforeEach(() => {
        cy.login()
    })
    
    it('Validando o atributo do link no Instagram', () => {
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .should('have.attr', 'target', '_blank')
    })

    it('Acessa o link de Termos de Uso removendo o Target Blank', () => {
        cy.contains('Formulários').click()
        cy.contains('a','termos de uso')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('1. Aceitação dos Termos')
            .should('be.visible')
    })


});