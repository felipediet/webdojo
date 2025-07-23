/// <reference types="cypress" />
import { getTodayDate } from '../support/utils';

describe('Login', () => {
  
  beforeEach(() => {
    cy.visitarPortal()
  })

  it('Deve carregar os campos de login', () => {
    cy.get('#email').should('exist')
    cy.get('#password').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('Deve logar com sucesso', () => {
    cy.fazerLogin('papito@webdojo.com', 'katana123')
    
    cy.url().should('include', '/dashboard')
    
    cy.get('h1').should('contain', 'Dashboard')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date')
      .should('exist')
      .should((cookie)=> {
      expect(cookie.value).to.eq(getTodayDate())
    })

    cy.window().then((win) => {
      const md5Regex = /^[a-fA-F0-9]{32}$/;
      const token = win.localStorage.getItem('token')
      expect(token).to.exist
      expect(token).to.match(md5Regex)
    })


  })

  it('Não deve logar com senha incorreta', () => {
    cy.fazerLogin('papito@webdojo.com', 'katana321')    
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email incorreto', () => {
    cy.fazerLogin('404@webdojo.com', 'katana123')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email e senha incorretos', () => {
    cy.fazerLogin('404@webdojo.com', 'katana321')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

})