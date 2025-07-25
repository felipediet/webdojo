describe('DELETE /api/users/:id', () => {

    let userId;

    const user = {
        name: 'User to Delete',
        email: 'user@example.com',
        password: 'password123'
    }

    before(() => {
        cy.task('deleteUser', user.email)
        //Cadastar o usuário original
        cy.postUser(user).then((response) => {
            cy.log(response.body.user.id);
            userId = response.body.user.id;
        });
    })

    context('Quando o usuário não existe', () => {
        it('Deve deletar o usuário pelo ID', () => {
            cy.deleteUser(userId).then((response) => {
                expect(response.status).to.eq(204);
            });

                // Verificar se o usuário foi atualizado
                cy.getUsers().then((response) => {
                    const users = response.body.find(user => user.id === userId);
                    expect(users).to.be.undefined;
                    expect(users).to.not.exist;
                });
            })
})

    context('Quando o usuário não existe', () => {

        let userId;

        const user = {
            name: 'User to Delete Non Existent',
            email: 'user@example.com',
            password: 'password123'
        }

        before(() => {
            cy.task('deleteUser', user.email)
            //Cadastar o usuário original
            cy.postUser(user).then((response) => {
                cy.log(response.body.user.id);
                userId = response.body.user.id;
            });
        })

        it('Deve retornar 404 ao tentar deletar um usuário inexistente com ID FIXO', () => {
            const nonExistentUserId = 337319601; // ID que não existe no banco de dados
        
            cy.deleteUser(nonExistentUserId).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body.error).to.eq('User not found!');
            });
        })


        it('Deve retornar 404 ao tentar deletar um usuário inexistente com ID DINAMICO', () => {

            cy.deleteUser(userId).then((response) => {
                expect(response.status).to.eq(204);
            });

            cy.deleteUser(userId).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body.error).to.eq('User not found!');
            });
        })
    })
})
