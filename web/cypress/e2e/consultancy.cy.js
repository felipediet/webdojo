/// <reference types="cypress" />
//Massa de teste
import { personal, company } from '../fixtures/consultancy.json'

describe('Formulário de Login', () => {

  beforeEach(() => {
    cy.login()
    cy.goTo('Formulários', 'Consultoria')
  })

  it('Deve veririficar os campos obrigatórios', () => {
    cy.submmitConsultancyForm()
    //Clica no botão Enviar formulário

    const requiredFields = [
      {label: 'Nome Completo', message: 'Campo obrigatório'},
      {label: 'Email', message: 'Campo obrigatório'},
      {label: 'termos de uso', message: 'Você precisa aceitar os termos de uso'}
    ]

    requiredFields.forEach(({label,message}) => {
      //Valida campo Nome Completo buscando por Label
      cy.contains('label', label)
        .parent()
        .find('p')
        .should('be.visible')
        .and('have.text', message)
        .and('have.class', 'text-red-400')
        .and('have.css', 'color', 'rgb(248, 113, 113)')
    })

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

