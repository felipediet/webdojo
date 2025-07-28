import { faker } from '@faker-js/faker';
import _ from 'lodash';

describe('Cadastro', () => {

  beforeEach(() => {
    cy.goToSignup()
    cy.intercept('POST', 'http://localhost:3333/api/users/register', {
      statusCode: 201,
      body: {
        email: "felipe.diet@example.com",
        name: "Felipe Diet",
        password: "katana123",
        message: 'Usuário cadastrado com sucesso!'
      }
    }).as('postSignUp')
  })
    
    it('Deve cadastrar um novo usuário', () => {
      cy.get('#name').type('Felipe Diet')
      cy.get('#email').type('felipe.diet@example.com')
      cy.get('#password').type('katana123')
      cy.contains('button', 'Criar conta').click()

        cy.wait('@postSignUp').then((interception) => {
            expect(interception.response.statusCode).to.eq(201)
            expect(interception.response.body.message).to.eq('Usuário cadastrado com sucesso!')
        })

        cy.contains('Conta criada com sucesso!')
            .should('be.visible')
    })

  _.times(5, () => {
      it('Deve cadastrar um novo usuário utilizando FAKER e LODASH', () => {
              const name = faker.person.fullName();
              const email = faker.internet.email();
              const password = 'pwd123';

              // cy.log(name)
              // cy.log(email)
              // cy.log(password)

              cy.get('#name').type(name)
              cy.get('#email').type(email)
              cy.get('#password').type(password)
              cy.contains('button', 'Criar conta').click()

              cy.wait('@postSignUp').then((interception) => {
                  expect(interception.response.statusCode).to.eq(201)
                  expect(interception.response.body.message).to.eq('Usuário cadastrado com sucesso!')
              })

              cy.contains('Conta criada com sucesso!')
                  .should('be.visible')
      });
  });

});