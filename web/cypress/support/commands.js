/// <reference types="Cypress" />

// Comandos customizados para facilitar a automação de testes:

// - visitarPortal: acessa o portal na resolução padrão de 1440x900.
Cypress.Commands.add('visitarPortal', () => {
cy.viewport(1440, 900)
cy.visit('http://localhost:3000')
})


// - fazerLogin: realiza login preenchendo email e senha e clicando no botão 'Entrar'.
Cypress.Commands.add('fazerLogin', (email, password) => {
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.contains('button','Entrar').click()

    //cy.contains('button','Entrar').click()
    //cy.get('button[type="submit"]').click() //Alternativa para o click
    //cy.get('button').contains('Entrar').click() //Alternativa para o click
})

// - irPara: navega para uma página clicando em um botão específico
Cypress.Commands.add('irPara', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
    .should('be.visible')
    .click()
 
    cy.contains('h1', pageTitle)
        .should('be.visible')
})

