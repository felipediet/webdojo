describe('Gerenciamento de Perfis', () => {

    beforeEach(() => {
        cy.login();
        cy.goTo('Tabela', 'Perfis do GitHub');
    });
    
    it('Deve poder cadastrar um novo perfil do github', () => {
        cy.get('#name').type('Felipe Diet');
        cy.get('#username').type('felipediet1');
        cy.get('#profile').type('QA');
        cy.contains('button', 'Adicionar Perfil').click();

        cy.get('#name').type('Felipe Diet');
        cy.get('#username').type('felipediet2');
        cy.get('#profile').type('QA');
        cy.contains('button', 'Adicionar Perfil').click();

        cy.contains('table tbody tr', 'felipediet2')
            .should('be.visible')
            .as('trProfile');

        cy.get('@trProfile')
            .contains('td','Felipe Diet')
            .should('be.visible');
        
        cy.get('@trProfile')
            .contains('td','felipediet2')
            .should('be.visible');

        cy.get('@trProfile')
            .contains('td','QA')
            .should('be.visible');
    });

    it('Deve poder remover perfil do github', () => {
        
        const profile = {
            name: 'Felipe Diet',
            username: 'felipediet',
            profile: 'QA'
        };

        cy.get('#name').type(profile.name);
        cy.get('#username').type(profile.username);
        cy.get('#profile').type(profile.profile);
        cy.contains('button', 'Adicionar Perfil').click();


        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile');

        cy.get('@trProfile')
            .find('button', 'Remover perfil')
            .should('be.visible')
            .click();

        cy.contains('table tbody tr', profile.username)
            .should('not.exist');
    });

    it('Deve validar o link do github', () => {
        
        const profile = {
            name: 'Felipe Diet',
            username: 'felipediet',
            profile: 'QA'
        };

        cy.get('#name').type(profile.name);
        cy.get('#username').type(profile.username);
        cy.get('#profile').type(profile.profile);
        cy.contains('button', 'Adicionar Perfil').click();

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile');

        cy.get('@trProfile')
            .find('a')
            .should('have.attr', 'href', 'https://github.com/' + profile.username)
            .and('have.attr', 'target', '_blank');
        
    });


});