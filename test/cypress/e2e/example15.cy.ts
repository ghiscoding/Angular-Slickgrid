describe('Example 15 - Column Span & Header Grouping', () => {
  // NOTE:  everywhere there's a * 2 is because we have a top+bottom (frozen rows) containers even after Unfreeze Columns/Rows
  const fullPreTitles = ['', 'Common Factor', 'Period', 'Analysis'];
  const fullTitles = ['#', 'Title', 'Duration', 'Start', 'Finish', '% Complete', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/colspan`);
    cy.get('h2').should('contain', 'Example 15: Column Span & Header Grouping');
  });

  it('should have exact Column Pre-Header & Column Header Titles in the grid', () => {
    cy.get('#grid2')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullPreTitles[index]));

    cy.get('#grid2')
      .find('.slick-header-columns:nth(1)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should have a frozen grid on page load with 3 columns on the left and 4 columns on the right', () => {
    cy.get('#grid2').find('[style="top: 0px;"]').should('have.length', 2);
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"]').children().should('have.length', 3);
    cy.get('#grid2').find('.grid-canvas-right > [style="top: 0px;"]').children().should('have.length', 4);

    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(0)').should('contain', '0');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(1)').should('contain', 'Task 0');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(2)').should('contain', '5 days');

    cy.get('#grid2').find('.grid-canvas-right > [style="top: 0px;"] > .slick-cell:nth(0)').should('contain', '01/01/2009');
    cy.get('#grid2').find('.grid-canvas-right > [style="top: 0px;"] > .slick-cell:nth(1)').should('contain', '01/05/2009');
  });

  it('should have exact Column Pre-Header & Column Header Titles in the grid', () => {
    cy.get('#grid2')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullPreTitles[index]));

    cy.get('#grid2')
      .find('.slick-header-columns:nth(1)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should click on the "Remove Frozen Columns" button to switch to a regular grid without frozen columns and expect 7 columns on the left container', () => {
    cy.contains('Remove Frozen Columns').click({ force: true });

    cy.get('#grid2').find('[style="top: 0px;"]').should('have.length', 1);
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"]').children().should('have.length', 7);

    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(0)').should('contain', '0');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(1)').should('contain', 'Task 0');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(2)').should('contain', '5 days');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(3)').should('contain', '01/01/2009');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(4)').should('contain', '01/05/2009');
  });

  it('should have exact Column Pre-Header & Column Header Titles in the grid', () => {
    cy.get('#grid2')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullPreTitles[index]));

    cy.get('#grid2')
      .find('.slick-header-columns:nth(1)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should click on the "Set 3 Frozen Columns" button to switch frozen columns grid and expect 3 frozen columns on the left and 4 columns on the right', () => {
    cy.contains('Set 3 Frozen Columns').click({ force: true });

    cy.get('#grid2').find('[style="top: 0px;"]').should('have.length', 2);
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"]').children().should('have.length', 3);
    cy.get('#grid2').find('.grid-canvas-right > [style="top: 0px;"]').children().should('have.length', 4);

    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(0)').should('contain', '0');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(1)').should('contain', 'Task 0');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(2)').should('contain', '5 days');

    cy.get('#grid2').find('.grid-canvas-right > [style="top: 0px;"] > .slick-cell:nth(0)').should('contain', '01/01/2009');
    cy.get('#grid2').find('.grid-canvas-right > [style="top: 0px;"] > .slick-cell:nth(1)').should('contain', '01/05/2009');
  });

  it('should have exact Column Pre-Header & Column Header Titles in the grid', () => {
    cy.get('#grid2')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullPreTitles[index]));

    cy.get('#grid2')
      .find('.slick-header-columns:nth(1)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should click on the Grid Menu command "Unfreeze Columns/Rows" to switch to a regular grid without frozen columns and expect 7 columns on the left container', () => {
    cy.get('#grid2').find('button.slick-grid-menu-button').click({ force: true });

    cy.contains('Unfreeze Columns/Rows').click({ force: true });

    cy.get('#grid2').find('[style="top: 0px;"]').should('have.length', 1);
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"]').children().should('have.length', 7);

    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(0)').should('contain', '0');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(1)').should('contain', 'Task 0');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(2)').should('contain', '5 days');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(3)').should('contain', '01/01/2009');
    cy.get('#grid2').find('.grid-canvas-left > [style="top: 0px;"] > .slick-cell:nth(4)').should('contain', '01/05/2009');
  });
});
