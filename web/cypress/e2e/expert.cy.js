import { faker } from '@faker-js/faker';
import _ from 'lodash';

describe('Expert Tests', () => {
    beforeEach(() => {
        cy.visitarPortal();
    });

    it('Deve manipular o valor de um campo', () => {

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

    it('Não deve logar com senha inválida - Validação de Toast com 5 segundos', () => {
        cy.fazerLogin('papito@webdojo.com', 'katana321')

        cy.get('[data-sonner-toaster="true"]')
            .should('be.visible')
            .as('toast')
        
        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    });

    it('Simulando a tecla TAB com cy.press', () => {

        cy.get('body').press('Tab')
        cy.get('#email')
            .should('be.focused')

        cy.get('#email').type('papito@webdojo.com')

        cy.get('#email').press('Tab')
        
        cy.focused()
            .should('have.attr', 'id', 'password')

        // cy.get('#password')
        //     .should('be.focused')
        
        cy.get('#password').type('katana123')
        
        //cy.get('#submit').click()

    })

    it('Não deve logar com senha inválida - Utilizando tecla ENTER ao submeter form', () => {

        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('katana321{Enter}')

        //https://docs.cypress.io/api/commands/type

        cy.get('[data-sonner-toaster="true"]')
            .should('be.visible')
            .as('toast')
        
        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    });

    it.only('Deve realizar uma carga de dados fake utilizando FAKER e LODASH', () => {
        cy.log('todo')
        
        _.times(10, () => {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            const password = 'pwd123';

            cy.log(name)
            cy.log(email)
            cy.log(password)
        });
    });


});
