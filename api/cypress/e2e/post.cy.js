import {faker} from '@faker-js/faker';

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {
    
    // Gera dados aleatórios para o novo usuário
    const newUser = {
      name: 'Wolverine',
      email: 'wolverine@xmen.com',
      password: 'pwd123'
    };

    cy.task('deleteUser', newUser.email);
    //Usar cy.log('Body:', JSON.stringify(response.body));
    //Se usar cy.request

    cy.postUser(newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('User successfully registered!');
      expect(response.body.user.id).to.match(/^[-]?\d+$/);
      expect(response.body.user.name).to.eq(newUser.name);
      expect(response.body.user.email).to.eq(newUser.email);
    });
  });

  it('Não deve cadastrar com email já existente', () => {
    
    // Gera dados aleatórios para o novo usuário
    const newUser = {
      name: 'Cyclops',
      email: 'cyclops@xmen.com',
      password: 'pwd123'
    };

    cy.task('deleteUser', newUser.email);
    //Usar cy.log('Body:', JSON.stringify(response.body));
    //Se usar cy.request

    cy.postUser(newUser).then((response) => {
      expect(response.status).to.eq(201);
    });

    cy.postUser(newUser).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Email is already in use!');
    });
  });

  it('O campo Name deve ser obrigatório', () => {    

    // Gera dados aleatórios para o novo usuário
    const newUser = {
      email: 'storm@xmen.com',
      password: 'pwd123'
    };

    cy.postUser(newUser).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('The \"Name\" field is required!');
    });
  });

  it('O campo Email deve ser obrigatório', () => {

    // Gera dados aleatórios para o novo usuário
    const newUser = {
      name: 'jeangrey',
      password: 'pwd123'
    };

    cy.postUser(newUser).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('The \"Email\" field is required!');
    });
  });

  it('O campo Password deve ser obrigatório', () => {

    // Gera dados aleatórios para o novo usuário
    const newUser = {
      name: 'Xavier',
      email: 'xavier@xmen.com'
    };

    cy.postUser(newUser).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('The \"Password\" field is required!');
    });
  });

  it('Não deve prosseguir com o JSON mal formatado', () => {

    // Gera dados aleatórios para o novo usuário
    const newUser = `{
      name: faker.person.fullName()
      email: faker.internet.email()
      password: 'pwd123'
    };`

    //Usar cy.log('Body:', JSON.stringify(response.body));
    //Se usar cy.request

    cy.postUser(newUser).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Invalid JSON payload');
    });
  });
});