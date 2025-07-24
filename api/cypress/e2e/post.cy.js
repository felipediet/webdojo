import {faker} from '@faker-js/faker';

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {
    
    // Gera dados aleatórios para o novo usuário
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'pwd123'
    };

    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });


  it('Deve retornar erro ao cadastrar um usuário já existente', () => {    
    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.include('Email já está em uso!');
    });
  });
});