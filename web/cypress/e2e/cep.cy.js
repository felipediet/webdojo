describe('CEP', () => {

    beforeEach(() => {
        cy.login();
        cy.goTo('Integração', 'Consulta de CEP');
    });

    it('Deve validar a consulta de CEP', () => {
        const profile = {
            cep: '13203-630',
            logradouro: 'Avenida Samuel Martins',
            bairro: 'Jardim do Lago',
            cidade: 'Jundiaí',
            uf: 'SP'
        };
        cy.get('#cep').type(profile.cep);
        
        cy.contains('button', 'Buscar').click();

        cy.get('#street')
            .should('have.value', profile.logradouro);
        
        cy.get('#neighborhood')
            .should('have.value', profile.bairro);
        
        cy.get('#city')
            .should('have.value', profile.cidade);

        cy.get('#state')
            .should('have.value', profile.uf);
    });


});