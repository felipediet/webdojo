describe('Hover Example', () => {
    it('Deve mostrar um texto ao passar o mouse', () => {
        cy.visitarPortal()
        cy.fazerLogin('papito@webdojo.com','katana123')
        
        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')
    })
});