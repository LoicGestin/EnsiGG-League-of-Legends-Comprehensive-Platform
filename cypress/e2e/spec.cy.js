describe('search bar test', () => {
  it('champion page redirection with ENTER', () => {
    cy.visit('http://localhost:3001/')


    cy.get('input[placeholder="Search Yourself or a Champion"]')
        .type('kayn{enter}')
        .should('have.value', 'kayn')

    cy.url().should('eq', 'http://localhost:3001/champions/kayn')
  })

  it('# is missing with ENTER',()=>{
    cy.visit('http://localhost:3001/')
    cy.get('input[placeholder="Search Yourself or a Champion"]')
        .type('Sigma Shadowman{enter}')
        .should('have.value', 'Sigma Shadowman')

    cy.contains('p.text-red-500.text-xs', 'Input must contain \'#\' character').should('be.visible')
  })


  it('champion page redirection with click', () => {
    cy.visit('http://localhost:3001/')


    cy.get('input[placeholder="Search Yourself or a Champion"]')
        .type('kayn')
        .should('have.value', 'kayn')

    cy.contains('button', 'ENSI.GG').click()

    cy.url().should('eq', 'http://localhost:3001/champions/kayn')
  })

  it('# is missing with click',()=>{
    cy.visit('http://localhost:3001/')
    cy.get('input[placeholder="Search Yourself or a Champion"]')
        .type('Sigma Shadowman')
        .should('have.value', 'Sigma Shadowman')
    cy.contains('button', 'ENSI.GG').click()
    cy.contains('p', 'Input must contain \'#\' character').should('be.visible')
  })


})


describe('side bar test', () => {
  it('champion page redirection on click', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('a', 'Champions').click()
    cy.url().should('eq', 'http://localhost:3001/champions')
  })
  it('ensi.gg redirection on click', () => {
    cy.visit('http://localhost:3001/champions/')
    cy.contains('a', 'ENSI.GG').click()
    cy.url().should('eq', 'http://localhost:3001/')
  })
})