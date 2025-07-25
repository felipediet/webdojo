describe('PUT /api/users/:id', () => {

    let originalUserId;

    const originalUser = {
        name: 'Original User',
        email: 'original@example.com',
        password: 'originalPassword'
    }

    const updatedUser = {
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'updatedPassword'
    }

    before(() => {
        cy.task('deleteUser', originalUser.email);
        cy.task('deleteUser', updatedUser.email);
        //Cadastar o usuário original
        cy.postUser(originalUser).then((response) => {
            cy.log(response.body.user.id);
            originalUserId = response.body.user.id;
            });
    });

    context('Atualização de Usuário', () => {
        it('Deve atualizar um usuário existente', () => {
        
        // Atualizar o usuário
        cy.putUser(originalUserId, updatedUser)
            .then((response) => {
                expect(response.status).to.eq(204);
            });

        // Verificar se o usuário foi atualizado
        cy.getUsers().then((response) => {
        const users = response.body.find(user => user.id === originalUserId);
            expect(users).to.exist;
            expect(users.name).to.eq(updatedUser.name);
            });
        })

        it('Deve retornar 404 e User Not Found ao tentar atualizar um usuário inexistente', () => {
            const nonExistentUserId = 337319601; // ID que não existe no banco de dados
            cy.putUser(nonExistentUserId, updatedUser)
                .then((response) => {
                    expect(response.status).to.eq(404);
                    expect(response.body.error).to.eq('User not found!');
                });
        })
    });

    context('Validação dos campos obrigatórios', () => {

        it('O campo Name deve ser obrigatório', () => {
            const userWithoutName = { ...updatedUser, name: '' };
            cy.putUser(originalUserId, userWithoutName)
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.error).to.eq('The "Name" field is required!');
                });
        });

        it('O campo Email deve ser obrigatório', () => {
            const userWithoutEmail = { ...updatedUser, email: '' };
            cy.putUser(originalUserId, userWithoutEmail)
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.error).to.eq('The "Email" field is required!');
                });
        });

        it('O campo Password deve ser obrigatório', () => {
            const userWithoutPassword = { ...updatedUser, password: '' };
            cy.putUser(originalUserId, userWithoutPassword)
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.error).to.eq('The "Password" field is required!');
                });
        });
    });
    
    context('Quando o usuário não existe', () => {

        let userId;

        const originalUser = {
            name: 'Original User',
            email: 'original@example.com',
            password: 'originalPassword'
        }

        const updatedUser = {
            name: 'Updated User',
            email: 'updated@example.com',
            password: 'updatedPassword'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)

            //Cadastar o usuário original
            cy.postUser(originalUser).then((response) => {
                cy.log(response.body.user.id);
                userId = response.body.user.id;
            });

            cy.task('deleteUser', originalUser.email)
        })


        it('Deve retornar 404 e User Not Found', () => {

            cy.putUser(userId, updatedUser).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body.error).to.eq('User not found!');
            });
        })
    })
})
