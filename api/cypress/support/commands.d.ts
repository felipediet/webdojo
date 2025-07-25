declare namespace Cypress {
  interface Chainable {
    /**
     * Realiza o cadastro de um novo usuário via API.
     * @param user Objeto contendo os dados do usuário (name, email, password).
     */
    postUser(user: object);

    /**
     * Retorna a lista de usuários cadastrados via API.
     */
    getUsers();

    /**
     * Atualiza um usuário existente pelo ID via API.
     * @param originalUserId O ID do usuário a ser atualizado.
     * @param updatedUser Objeto com os novos dados do usuário.
     */
    putUser(originalUserId: number | string, updatedUser: object);
  }
}