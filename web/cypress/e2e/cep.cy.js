import addresses from '../fixtures/cep.json';

describe('CEP', () => {

    beforeEach(() => {
        cy.login();
        cy.goTo('Integração', 'Consulta de CEP');
    });

    addresses.forEach((address, index) => {
        it(`Deve validar a consulta de CEP - Conjunto ${index + 1}`, () => {

            cy.intercept(
                'GET'
                ,`https://viacep.com.br/ws/${address.cep}/json/`,{
                statusCode: 200,
                body: {
                        cep: address.cep,
                        logradouro: address.street,
                        bairro: address.neighborhood,
                        localidade: address.city,
                        uf: address.state
                    } // Mockando a resposta da API com os dados do endereço os dados da massa de teste devem ser ajustado conforme o que retorna na requisição, caso constrário a aplicação não vai entender
            }).as('getCepIntercept'); // Intercepta a requisição para o CEP e cria um alias para a interceptação

            cy.get('#cep').type(address.cep);

            cy.contains('button', 'Buscar').click();

            cy.wait('@getCepIntercept'); // Aguarda a requisição ser interceptada

            cy.get('#street')
                .should('have.value', address.street);
            
            cy.get('#neighborhood')
                .should('have.value', address.neighborhood);
            
            cy.get('#city')
                .should('have.value', address.city);

            cy.get('#state')
                .should('have.value', address.state);
        });
    });


});