describe('GET /api/users', () => {

   const heroes = [
        {
            name: 'Superman',
            email: 'superman@justiceleague.com',
            password: 'krypton123'
        },
        {
            name: 'Batman',
            email: 'batman@justiceleague.com',
            password: 'batcave456'
        },
        {
            name: 'Wonder Woman',
            email: 'wonderwoman@justiceleague.com',
            password: 'themyscira789'
        },
        {
            name: 'Flash',
            email: 'flash@justiceleague.com',
            password: 'speedforce321'
        },
        {
            name: 'Aquaman',
            email: 'aquaman@justiceleague.com',
            password: 'atlantis654'
        }
    ]

    before(() => {
      heroes.forEach(hero => {
        //cy.task('deleteUser', hero.email);
        cy.postUser(hero);
      });
    });

  it('Deve retornar uma lista de usuários', () => {
    cy.getUsers().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

        heroes.forEach(hero => {
            const found = response.body.find(user => user.email === hero.email);
            expect(found).to.have.property('id');
            expect(found.name).to.eq(hero.name);
            expect(found.email).to.eq(hero.email);
        });
    })
  })
})
