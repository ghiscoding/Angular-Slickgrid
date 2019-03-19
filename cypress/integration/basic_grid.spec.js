/// <reference types="Cypress" />

describe('Example - Basic Grid', () => {
  it('should display Basic Grid page', () => {
    cy.visit('http://localhost:4300');
    cy.get('h2').should(($h2) => {
      expect($h2, 'text content').to.have.text('Example 1: Basic Grid');
    });
  });

  it('should have 2 grids of size 800 by 300px', () => {
    cy.get('#slickGridContainer-grid1')
      .should('have.css', 'width', '800px');

    cy.get('#slickGridContainer-grid1 > .slickgrid-container')
      .should('have.css', 'height', '300px');

    cy.get('#slickGridContainer-grid2')
      .should('have.css', 'width', '800px');

    cy.get('#slickGridContainer-grid2 > .slickgrid-container')
      .should('have.css', 'height', '300px');
  });
});
