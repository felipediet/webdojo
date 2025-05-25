/// <reference types="cypress" />

describe('Login', () => {
  
  it('Deve carregar os campos de login', () => {
    cy.visitarPortal()
    cy.get('#email').should('exist')
    cy.get('#password').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('Deve logar com sucesso', () => {
    cy.visitarPortal()
    cy.fazerLogin('papito@webdojo.com', 'katana123')
    
    cy.url().should('include', '/dashboard')
    
    cy.get('h1').should('contain', 'Dashboard')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

  it('Não deve logar com senha incorreta', () => {
    cy.visitarPortal()
    cy.fazerLogin('papito@webdojo.com', 'katana321')    
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email incorreto', () => {
    cy.visitarPortal()
    cy.fazerLogin('404@webdojo.com', 'katana123')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email e senha incorretos', () => {
    cy.visitarPortal()
    cy.fazerLogin('404@webdojo.com', 'katana321')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

})