describe('Validação de Alertas em JavaScript', () => {

    beforeEach(() => {
        cy.login();
        cy.goTo('Alertas JS', 'JavaScript Alerts');
    });

    it.skip('Deve validar a mensagem de alerta', () => {

        cy.contains('button', 'Mostrar Alert').click();

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!');
        });

        
    });

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        cy.contains('button', 'Mostrar Confirm').click();

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!');
            return true; // Simula a confirmação do diálogo
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!');
        });
    });

    it('Deve confirmar um diálogo e validar a resposta negativa', () => {
        cy.contains('button', 'Mostrar Confirm').click();
        
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!');
            return false; // Simula a negativa do diálogo
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!');
        });
    });


});