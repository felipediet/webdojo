describe('Validação de Alertas em JavaScript', () => {

    beforeEach(() => {
        cy.login();
        cy.goTo('Alertas JS', 'JavaScript Alerts');
    });

    it('Deve validar a mensagem de alerta', () => {

        cy.contains('button', 'Mostrar Alert').click();

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!');
        });

        
    });

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        cy.contains('button', 'Mostrar Confirm').click();

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!');
            return true; // Simula a confirmação do diálogo
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!');
        });
    });

    it('Deve confirmar um diálogo e validar a resposta negativa', () => {
        cy.contains('button', 'Mostrar Confirm').click();
        
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!');
            return false; // Simula a negativa do diálogo
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!');
        });
    });

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem', () => {
        
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Felipe Diet');
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Felipe Diet! Boas-vindas ao WebDojo!');
        });

        cy.contains('button', 'Mostrar Prompt').click();
    });

    it('Deve interagir com um prompt, cancelar e validar a mensagem', () => {
        
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns(null); // Simula o cancelamento do prompt
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Ação Cancelada.');
        });

        cy.contains('button', 'Mostrar Prompt').click();
    });


});