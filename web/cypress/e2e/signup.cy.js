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

});