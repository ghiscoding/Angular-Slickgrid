describe('Example 10 - Multiple Grids with Row Selection', () => {
  const titles = ['', 'Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example 10 title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/selection`);
    cy.get('h2').should('contain', 'Example 10: Multiple Grids with Row Selection');
  });

  it('should have 2 grids of size 800 by 200px', () => {
    cy.get('#slickGridContainer-grid1')
      .should('have.css', 'width', '800px');

    cy.get('#slickGridContainer-grid1 > .slickgrid-container')
      .should('have.css', 'height', '200px');

    cy.get('#slickGridContainer-grid2')
      .should('have.css', 'width', '800px');

    cy.get('#slickGridContainer-grid2 > .slickgrid-container')
      .should('have.css', 'height', '200px');
  });

  it('should have exact Titles on 1st grid', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => {
        expect($child.text()).to.eq(titles[index]);
      });
  });

  it('should have 2 rows pre-selected in 2nd grid', () => {
    cy.get('[data-test=grid2-selections]').should('contain', 'Task 0,Task 2');

    cy.get('#grid2')
      .find('.slick-row')
      .children()
      .filter('.slick-cell-checkboxsel.selected.true')
      .should('have.length', 2);
  });

  it('should have 0 rows selected in 2nd grid after typing in a search filter', () => {
    cy.get('#grid2')
      .find('.filter-title')
      .type('Task 1');

    cy.get('#grid2')
      .find('.slick-row')
      .should('not.have.length', 0);

    cy.get('[data-test=grid2-selections]').should('contain', '');

    cy.get('#grid2')
      .find('.slick-row')
      .children()
      .filter('.slick-cell-checkboxsel.selected.true')
      .should('have.length', 0);
  });
});
