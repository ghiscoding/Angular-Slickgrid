describe('Example 23 - Grid AutoHeight', () => {
  const fullTitles = ['Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];
  const GRID_ROW_HEIGHT = 35;

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/autoheight`);
    cy.get('h2').should('contain', 'Example 23: Grid AutoHeight');
  });

  it('should have exact column titles in grid', () => {
    cy.get('#slickGridContainer-grid23')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should search for Duration over 50 and expect rows to be that', () => {
    cy.get('[data-test="search-column-list"]').select('Duration (days)', { force: true });

    cy.get('[data-test="search-operator-list"]').select('>', { force: true });

    cy.get('[data-test="search-value-input"]').type('50', { force: true });

    cy.get('#grid23')
      .find('.slick-row .slick-cell:nth(1)')
      .each(($child, index) => {
        if (index > 10) {
          return;
        }
        expect(+$child.text()).to.be.gt(50);
      });
  });

  it('should search for Duration below 50 and expect rows to be that', () => {
    cy.get('[data-test="search-operator-list"]').select('<', { force: true });

    cy.wait(200);

    cy.get('#grid23')
      .find('.slick-row .slick-cell:nth(1)')
      .each(($child, index) => {
        if (index > 10) {
          return;
        }
        expect(+$child.text()).to.be.lt(50);
      });
  });

  it('should search for Title ending with text "5" expect rows to be (Task 5, 15, 25, ...)', () => {
    cy.get('[data-test="clear-search-value"]').click();

    cy.get('[data-test="search-column-list"]').select('Title', { force: true });

    cy.get('[data-test="search-operator-list"]').select('EndsWith', { force: true });

    cy.get('[data-test="search-value-input"]').type('5', { force: true });

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 5');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 15');
  });

  it('should type a filter which returns an empty dataset', () => {
    cy.get('[data-test="search-value-input"]').clear().type('zzz');

    cy.get('.slick-empty-data-warning:visible').contains('No data to display.');
  });

  it('should clear search input and expect empty dataset warning to go away and also expect data back (Task 0, 1, 2, ...)', () => {
    cy.get('[data-test="clear-search-value"]').click();

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 4');
  });
});
