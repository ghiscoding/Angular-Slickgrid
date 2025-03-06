describe('Home Page', () => {
  it('should display Home Page', () => {
    cy.visit(`${Cypress.config('baseUrl')}/home`);

    cy.get('h2').should('have.text', 'Angular-Slickgrid - Demo Site');
  });
});
