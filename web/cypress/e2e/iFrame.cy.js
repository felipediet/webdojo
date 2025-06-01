/// <reference types="cypress" />

describe('iFrame', () => {
   
    beforeEach(() => {
        cy.login()
    })

  it('Deve poder tocar o video de exemplo no Iframe', () => {
        cy.contains('Video').click()

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body') //Acessa o corpo do primeiro iframe localizado
            .then(cy.wrap) //Envolve o corpo do iframe em um objeto jQuery
            .as('iFramePlayer') //Dá um alias para o iframe

        cy.get('@iFramePlayer')
            .find('.play-button') //Localiza o botão de play
            .click() //Clica no botão de play

        cy.get('@iFramePlayer')
            .find('.pause-button') //Localiza o botão de pause
            .should('be.visible') //Verifica se o botão existe
        


  })
})