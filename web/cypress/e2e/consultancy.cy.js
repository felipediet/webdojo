/// <reference types="cypress" />
//Massa de teste
import { personal, company } from '../fixtures/consultancy.json'

describe('Formulário de Login', () => {

  beforeEach(() => {
    cy.login()
    cy.irPara('Formulários', 'Consultoria')
  })

  it('Deve veririficar os campos obrigatórios', () => {
    cy.contains('button', 'Enviar formulário')
      .should('be.visible')
      .click()

    //Valida campo Nome Completo buscando por Label
    cy.contains('label', 'Nome Completo')
      .parent()
      .find('p')
      .should('be.visible')
      .and('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    //Valida campo Nome Completo buscando pelo ID
    cy.get('#name')
      .parent()
      .contains('p', 'Campo obrigatório')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    //Valida campo Email buscando por Label
    cy.contains('label', 'Email')
      .parent()
      .find('p')
      .should('be.visible')
      .and('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    //Valida campo Email buscando pelo ID
    cy.get('#email')
      .parent()
      .contains('p', 'Campo obrigatório')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    //Valida campo Termos de Uso buscando por Label
    cy.contains('label', 'termos de uso')
      .parent()
      .find('p')
      .should('be.visible')
      .and('have.text', 'Você precisa aceitar os termos de uso')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')
  })

  it('Deve solicitar consultoria individual', () => {

    cy.fillConsultancyForm(personal)
    //Preenche o formulário com os dados da massa de teste
    cy.submmitConsultancyForm()
    //Clica no botão Enviar formulário
    cy.validateConsultancyForm()
    //Valida o formulário

  })

  it('Deve solicitar consultoria In Company', () => {

    cy.fillConsultancyForm(company)
    //Preenche o formulário com os dados da massa de teste
    cy.submmitConsultancyForm()
    //Clica no botão Enviar formulário
    cy.validateConsultancyForm()
    //Valida o formulário

  })


})

