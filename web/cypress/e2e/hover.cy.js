describe('Hover Example', () => {
    
    beforeEach(() => {
        cy.login()
    })

    it('Deve mostrar um texto ao passar o mouse', () => {
        
        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')
    })
});