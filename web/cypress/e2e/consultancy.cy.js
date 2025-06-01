/// <reference types="cypress" />

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
        .and('have.css','color', 'rgb(248, 113, 113)')
      
      //Valida campo Nome Completo buscando pelo ID
      cy.get('#name')
        .parent()  
        .contains('p', 'Campo obrigatório')
        .should('be.visible')
        .and('have.class', 'text-red-400')
        .and('have.css','color', 'rgb(248, 113, 113)')
      
      //Valida campo Email buscando por Label
      cy.contains('label', 'Email')
        .parent()
        .find('p')
        .should('be.visible')
        .and('have.text', 'Campo obrigatório')
        .and('have.class', 'text-red-400')
        .and('have.css','color', 'rgb(248, 113, 113)')

      //Valida campo Email buscando pelo ID
      cy.get('#email')
        .parent()
        .contains('p', 'Campo obrigatório')
        .should('be.visible')
        .and('have.class', 'text-red-400')
        .and('have.css','color', 'rgb(248, 113, 113)')

      //Valida campo Termos de Uso buscando por Label
      cy.contains('label', 'termos de uso')
        .parent()
        .find('p')
        .should('be.visible')
        .and('have.text', 'Você precisa aceitar os termos de uso')
        .and('have.class', 'text-red-400')
        .and('have.css','color', 'rgb(248, 113, 113)')
  })

  it('Deve solicitar consultoria individual', () => {  
    //Massa de teste
      const consultancyForm = {
        name: 'Felipe Diet',
        email: 'fefola@gmail.com',
        phone: '11999999999',
        formatedphone: '(11) 99999-9999',
        consultancyType: 'Individual',
        personType: 'cpf',
        cpf: '34743406897',
        formatedCpf: '347.434.068-97',
        discoveryChannels: ['Instagram', 'YouTube', 'LinkedIn', 'Indicação de Amigo', 'Udemy'],
        file: './cypress/support/PDF_Upload.pdf',
        details: 'Preciso de uma consultoria para entender melhor o funcionamento do Cypress.',
        techs: ['Cypress', 'Playwright', 'Node'],
        terms: true,
      }
           
      cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)

      cy.get('#email').type(consultancyForm.email)
      
      cy.get('#phone')
        .type(consultancyForm.phone)
        .should('have.value', consultancyForm.formatedphone)

      //cy.get('#consultancyType').select('In Company')
      cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(consultancyForm.consultancyType)

      if (consultancyForm.personType === 'cpf') {
        cy.contains('span', 'Pessoa Física')
          .parent()
          .find('input')
          .click()
          .should('be.checked')

        cy.contains('span', 'Pessoa Jurídica')
          .parent()
          .find('input')
          .should('not.be.checked')
      } 
      
      if (consultancyForm.personType === 'cnpj') {
        cy.contains('span', 'Pessoa Jurídica')
          .parent()
          .find('input')
          .should('not.be.checked')

        cy.contains('span', 'Pessoa Física')
          .parent()
          .find('input')
          .click()
          .should('be.checked')
      }

      cy.contains('label', 'CPF')
        .parent()
        .find('input')
        .type(consultancyForm.cpf)
        .should('have.value', consultancyForm.formatedCpf)

      //Marca todos os checkboxes
      
      
      consultancyForm.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
          //.parent() //Marca todos
          .find('input')
          .check()
          .should('be.checked')
      })

      cy.get('input[type="file"]')
        .selectFile(consultancyForm.file, { force: true })
      
      
      cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      //cy.get('#details')
        .type(consultancyForm.details)

      consultancyForm.techs.forEach((tech) => {
        cy.contains('label', 'Tecnologias')
          .parent()
          .find('input[placeholder="Digite uma tecnologia e pressione Enter"]')
          .type(tech)
            .type('{enter}')
        
        cy.contains('label', 'Tecnologias')
          .parent()
          .contains('span', tech)
          .should('be.visible')
      })

        //Opcao 1
        // cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        //   .type('Cypress')
        //     .type('{enter}')
        
        //   cy.contains('label', 'Tecnologias')
        //     .parent()
        //     .contains('span', 'Cypress')
        //     .should('be.visible')
        
        // cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        //   .type('Playwright')
        //     .type('{enter}')
        
        //   cy.contains('label', 'Tecnologias')
        //     .parent()
        //     .contains('span', 'Playwright')
        //     .should('be.visible')

        //Opcao 2
        // techs.forEach((tech) => {
        //   cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        //     .type(tech)
        //       .type('{enter}')
          
        //     cy.contains('label', 'Tecnologias')
        //       .parent()
        //       .contains('span', tech)
        //       .should('be.visible')
        // })
      
        if (consultancyForm.terms === true) {
      cy.contains('label', 'termos de uso')
          .find('input')
          .check()
          .should('be.checked')
      }
      
      cy.contains('button', 'Enviar formulário')
        .should('be.visible')
        .click()

      cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        
  })

    it('Deve solicitar consultoria In Company', () => {  
    //Massa de teste
      const consultancyForm = {
        name: 'Felipe Diet',
        email: 'fefola@gmail.com',
        phone: '11999999999',
        formatedphone: '(11) 99999-9999',
        consultancyType: 'In Company',
        personType: 'cnpj',
        cnpj: '84012785000102',
        formatedCNPJ: '84.012.785/0001-02',
        discoveryChannels: ['Instagram', 'YouTube', 'LinkedIn', 'Indicação de Amigo', 'Udemy'],
        file: './cypress/support/PDF_Upload.pdf',
        details: 'Preciso de uma consultoria para entender melhor o funcionamento do Cypress.',
        techs: ['Cypress', 'Playwright', 'Node'],
        terms: true,
      }
           
      cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)

      cy.get('#email').type(consultancyForm.email)
      
      cy.get('#phone')
        .type(consultancyForm.phone)
        .should('have.value', consultancyForm.formatedphone)

      cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(consultancyForm.consultancyType)

      if (consultancyForm.personType === 'cpf') {
        cy.contains('span', 'Pessoa Física')
          .parent()
          .find('input')
          .click()
          .should('be.checked')

        cy.contains('span', 'Pessoa Jurídica')
          .parent()
          .find('input')
          .should('not.be.checked')
      } 
      
      if (consultancyForm.personType === 'cnpj') {
        cy.contains('span', 'Pessoa Jurídica')
          .parent()
          .find('input')
          .click()
          .should('be.checked')

        cy.contains('span', 'Pessoa Física')
          .parent()
          .find('input')
          .should('not.be.checked')
      }

      cy.contains('label', 'CNPJ')
        .parent()
        .find('input')
        .type(consultancyForm.cnpj)
        .should('have.value', consultancyForm.formatedCNPJ)

      //Marca todos os checkboxes
      
      
      consultancyForm.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
          //.parent() //Marca todos
          .find('input')
          .check()
          .should('be.checked')
      })

      cy.get('input[type="file"]')
        .selectFile(consultancyForm.file, { force: true })
      
      
      cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      //cy.get('#details')
        .type(consultancyForm.details)

      consultancyForm.techs.forEach((tech) => {
        cy.contains('label', 'Tecnologias')
          .parent()
          .find('input[placeholder="Digite uma tecnologia e pressione Enter"]')
          .type(tech)
            .type('{enter}')
        
        cy.contains('label', 'Tecnologias')
          .parent()
          .contains('span', tech)
          .should('be.visible')
      })

        
        if (consultancyForm.terms === true) {
      cy.contains('label', 'termos de uso')
          .find('input')
          .check()
          .should('be.checked')
      }
      
      cy.contains('button', 'Enviar formulário')
        .should('be.visible')
        .click()

      cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        
  })


})

