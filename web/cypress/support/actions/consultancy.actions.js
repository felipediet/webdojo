// - fillConsultancyForm: preenche o formulário de consultoria com os dados fornecidos.
Cypress.Commands.add('fillConsultancyForm', (form) => {
  cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)

  cy.get('#email').type(form.email)

  cy.get('#phone')
    .type(form.phone)
    .should('have.value', form.formatedphone)

  //cy.get('#consultancyType').select('In Company')
  cy.contains('label', 'Tipo de Consultoria')
    .parent()
    .find('select')
    .select(form.consultancyType)

  if (form.personType === 'cpf') {
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
      .type(form.cpf)
      .should('have.value', form.formatedCpf)
  }

  if (form.personType === 'cnpj') {
    cy.contains('span', 'Pessoa Jurídica')
      .parent()
      .find('input')
      .click()
      .should('be.checked')

    cy.contains('span', 'Pessoa Física')
      .parent()
      .find('input')
      .should('not.be.checked')

    cy.contains('label', 'CNPJ')
      .parent()
      .find('input')
      .type(form.cnpj)
      .should('have.value', form.formatedCNPJ)
  }



  //Marca todos os checkboxes

  form.discoveryChannels.forEach((channel) => {
    cy.contains('label', channel)
      //.parent() //Marca todos
      .find('input')
      .check()
      .should('be.checked')
  })

  cy.get('input[type="file"]')
    .selectFile(form.file, { force: true })


  cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
    //cy.get('#details')
    .type(form.details)

  form.techs.forEach((tech) => {
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

  if (form.terms === true) {
    cy.contains('label', 'termos de uso')
      .find('input')
      .check()
      .should('be.checked')
  }

})

// - submmitConsultancyForm: clica no botão de enviar formulário.
Cypress.Commands.add('submmitConsultancyForm', () => {
  cy.contains('button', 'Enviar formulário')
    .should('be.visible')
    .click()
})

// - validateConsultancyForm: valida a mensagem de sucesso após o envio do formulário.
Cypress.Commands.add('validateConsultancyForm', (menu, submenu) => {
  cy.get('.modal', { timeout: 7000 })
    .should('be.visible')
    .find('.modal-content')
    .should('be.visible')
    .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})