import {faker} from '@faker-js/faker';

describe('POST /api/users/register', () => {
  it.only('Deve cadastrar um novo usuário', () => {
    
    // Gera dados aleatórios para o novo usuário
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'pwd123'
    };

    //Usar cy.log('Body:', JSON.stringify(response.body));
    //Se usar cy.request

    cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('User successfully registered!');
      expect(response.body.user.id).to.match(/^[-]?\d+$/);
      expect(response.body.user.name).to.eq(newUser.name);
      expect(response.body.user.email).to.eq(newUser.email);
    });
  });


  it('Deve retornar erro ao cadastrar um usuário já existente', () => {    
    cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.include('Email is already in use!');
    });
  });
});