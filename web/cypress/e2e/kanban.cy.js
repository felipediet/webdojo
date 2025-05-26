describe('Kanban Board', () => {
    it('Deve mover uma tarefa de Todo para Done e atualizaro board', () => {
        cy.visitarPortal()
        cy.fazerLogin('papito@webdojo.com','katana123')
        
        cy.contains('Kanban').click()

        const dataTransfer = new DataTransfer() //Utilizado para transferir dados entre drag e drop

        cy.contains('div[draggable=true]','Documentar API')
            .trigger('dragstart', { dataTransfer })
        
        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)')
            
        cy.get('.column-done')
            .and('include.text', 'Documentar API')
            .and('include.text', 'Criar documentação da API com Swagger')

        cy.get('.column-todo')
            .find('h3')
            .should('have.text', 'To Do (3)')
    })
});