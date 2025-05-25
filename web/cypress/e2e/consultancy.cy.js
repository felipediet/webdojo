/// <reference types="Cypress" />

describe('Formuçãrio de Login', () => {
   
  it('Deve veririficar os campos obrigatórios', () => {
      cy.visitarPortal()
      cy.fazerLogin('papito@webdojo.com','katana123')
      cy.irPara('Formulários', 'Consultoria')

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

  it.only('Deve solicitar consultoria individual', () => {
      cy.visitarPortal()
      cy.fazerLogin('papito@webdojo.com','katana123')
      cy.irPara('Formulários', 'Consultoria')

      // cy.get('#name')
      //   .should('be.visible')
      //   .type('Felipe Diet')
           
      cy.get('input[placeholder="Digite seu nome completo"]').type('Felipe Diet')

      cy.get('#email').type('fefola@gmail.com')
      
      cy.get('#phone')
        .type('11999999999')
        .should('have.value', '(11) 99999-9999')

      //cy.get('#consultancyType').select('In Company')
      cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select('Individual')

      cy.contains('span', 'Pessoa Física')
        .parent()
        .find('input')
        .click()
        .should('be.checked')

      cy.contains('span', 'Pessoa Jurídica')
        .parent()
        .find('input')
        .should('not.be.checked')
      
      cy.contains('label', 'CPF')
        .parent()
        .find('input')
        .type('34743406897')
        .should('have.value', '347.434.068-97')

      //Marca todos os checkboxes
      const discoveryChannels = ['Instagram', 'YouTube', 'LinkedIn', 'Indicação de Amigo', 'Udemy']
      
      discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
          //.parent() //Marca todos
          .find('input')
          .check()
          .should('be.checked')
      })

      cy.get('input[type="file"]')
        .selectFile('./cypress/support/PDF_Upload.pdf', { force: true })
      
      
      cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      //cy.get('#details')
        .type('Preciso de uma consultoria para entender melhor o funcionamento do Cypress.')

      const techs = ['Cypress', 'Playwright', 'Node']

      techs.forEach((tech) => {
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
      
      cy.contains('label', 'termos de uso')
          .find('input')
          .check()
          .should('be.checked')
      
      cy.contains('button', 'Enviar formulário')
        .should('be.visible')
        .click()

      cy.get('.modal')
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  })



})

