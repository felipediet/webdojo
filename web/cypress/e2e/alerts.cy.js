describe('Validação de Alertas em JavaScript', () => {

    beforeEach(() => {
        cy.login();
        cy.goTo('Alertas JS', 'JavaScript Alerts');
    });

    it('Deve validar a mensagem de alerta', () => {

        cy.contains('button', 'Mostrar Alert').click();

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!');
        });

        
    });



});